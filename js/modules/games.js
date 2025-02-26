/**
 * Oyunlar Modülü
 * Claude 3.7 tanıtım sayfası için mini oyunlar
 */

// Oyun modülü
const GamesModule = (function() {
    // Özel değişkenler
    let memoryGame = {
        board: null,
        scoreElement: null,
        timerElement: null,
        score: 0,
        timeLeft: 60,
        timerInterval: null,
        flippedCards: [],
        matchedPairs: 0,
        emojis: ['🚀', '🌟', '🤖', '🧠', '💡', '🔮', '🎮', '🎯']
    };
    
    let colorGame = {
        target: null,
        options: null,
        scoreElement: null,
        levelElement: null,
        score: 0,
        level: 1,
        correctColor: null
    };
    
    let clickGame = {
        board: null,
        scoreElement: null,
        timerElement: null,
        score: 0,
        timeLeft: 30,
        timerInterval: null,
        currentTarget: null
    };
    
    // Yardımcı fonksiyonlar
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Hafıza Oyunu
    function startMemoryGame() {
        memoryGame.board = document.querySelector('.memory-board');
        memoryGame.scoreElement = document.getElementById('memory-score');
        memoryGame.timerElement = document.getElementById('memory-timer');
        memoryGame.score = 0;
        memoryGame.timeLeft = 60;
        memoryGame.flippedCards = [];
        memoryGame.matchedPairs = 0;
        
        // Emoji çiftleri
        const gameEmojis = [...memoryGame.emojis, ...memoryGame.emojis];
        
        // Karıştır
        shuffleArray(gameEmojis);
        
        // Skoru sıfırla
        memoryGame.scoreElement.textContent = `Skor: ${memoryGame.score}`;
        
        // Zamanlayıcıyı başlat
        clearInterval(memoryGame.timerInterval);
        memoryGame.timerElement.textContent = `Süre: ${memoryGame.timeLeft}s`;
        memoryGame.timerInterval = setInterval(() => {
            memoryGame.timeLeft--;
            memoryGame.timerElement.textContent = `Süre: ${memoryGame.timeLeft}s`;
            
            if (memoryGame.timeLeft <= 0 || memoryGame.matchedPairs === memoryGame.emojis.length) {
                clearInterval(memoryGame.timerInterval);
                if (memoryGame.matchedPairs === memoryGame.emojis.length) {
                    window.playSound('success');
                    window.createConfetti(100);
                } else {
                    window.playSound('error');
                }
            }
        }, 1000);
        
        // Kartları oluştur
        memoryGame.board.innerHTML = '';
        gameEmojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.value = emoji;
            
            const front = document.createElement('div');
            front.className = 'front';
            front.innerHTML = '<i class="fas fa-question"></i>';
            
            const back = document.createElement('div');
            back.className = 'back';
            back.textContent = emoji;
            
            card.appendChild(front);
            card.appendChild(back);
            
            card.addEventListener('click', () => flipMemoryCard(card));
            memoryGame.board.appendChild(card);
        });
    }
    
    function flipMemoryCard(card) {
        // Zaten eşleşmiş veya çevrilmiş kartları kontrol et
        if (card.classList.contains('matched') || card.classList.contains('flipped') || memoryGame.flippedCards.length >= 2) {
            return;
        }
        
        // Kartı çevir
        card.classList.add('flipped');
        try {
            window.playSound('flip');
        } catch (e) {
            console.error("Ses çalma hatası:", e);
        }
        
        // Çevrilen kartları takip et
        memoryGame.flippedCards.push(card);
        
        // İki kart çevrildiyse kontrol et
        if (memoryGame.flippedCards.length === 2) {
            setTimeout(() => checkMemoryMatch(), 500);
        }
    }
    
    function checkMemoryMatch() {
        const [card1, card2] = memoryGame.flippedCards;
        
        if (card1.dataset.value === card2.dataset.value) {
            // Eşleşme
            card1.classList.add('matched');
            card2.classList.add('matched');
            memoryGame.score += 10;
            memoryGame.matchedPairs++;
            try {
                window.playSound('success');
            } catch (e) {
                console.error("Ses çalma hatası:", e);
            }
            
            // Tüm çiftler eşleşti mi?
            if (memoryGame.matchedPairs === memoryGame.emojis.length) {
                clearInterval(memoryGame.timerInterval);
                try {
                    window.createConfetti(100);
                } catch (e) {
                    console.error("Konfeti hatası:", e);
                }
            }
        } else {
            // Eşleşmedi
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500);
            memoryGame.score = Math.max(0, memoryGame.score - 2);
            try {
                window.playSound('error');
            } catch (e) {
                console.error("Ses çalma hatası:", e);
            }
        }
        
        // Skoru güncelle
        memoryGame.scoreElement.textContent = `Skor: ${memoryGame.score}`;
        
        // Çevrilen kartları sıfırla
        memoryGame.flippedCards = [];
    }
    
    // Renk Tahmin Oyunu
    function startColorGame() {
        colorGame.target = document.querySelector('.color-code');
        colorGame.options = document.querySelector('.color-options');
        colorGame.scoreElement = document.getElementById('color-score');
        colorGame.levelElement = document.getElementById('color-level');
        colorGame.score = 0;
        colorGame.level = 1;
        
        // Skoru ve seviyeyi sıfırla
        colorGame.scoreElement.textContent = `Skor: ${colorGame.score}`;
        colorGame.levelElement.textContent = `Seviye: ${colorGame.level}`;
        
        // Yeni renk oluştur
        generateColorRound();
    }
    
    function generateColorRound() {
        // Renk seçeneklerini temizle
        colorGame.options.innerHTML = '';
        
        // Zorluk seviyesine göre renk farkını ayarla
        const difficulty = Math.max(50 - (colorGame.level * 5), 5);
        
        // Doğru rengi oluştur
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colorGame.correctColor = `rgb(${r}, ${g}, ${b})`;
        
        // RGB kodunu göster
        colorGame.target.textContent = colorGame.correctColor;
        
        // Renk seçeneklerini oluştur (1 doğru, 2 yanlış)
        const colors = [colorGame.correctColor];
        
        // Yanlış renkleri oluştur
        for (let i = 0; i < 2; i++) {
            // Doğru renge yakın ama farklı bir renk oluştur
            let newR = clamp(r + getRandomInt(-difficulty, difficulty), 0, 255);
            let newG = clamp(g + getRandomInt(-difficulty, difficulty), 0, 255);
            let newB = clamp(b + getRandomInt(-difficulty, difficulty), 0, 255);
            
            // Aynı renk olmamasını sağla
            while (newR === r && newG === g && newB === b) {
                newR = clamp(r + getRandomInt(-difficulty, difficulty), 0, 255);
                newG = clamp(g + getRandomInt(-difficulty, difficulty), 0, 255);
                newB = clamp(b + getRandomInt(-difficulty, difficulty), 0, 255);
            }
            
            colors.push(`rgb(${newR}, ${newG}, ${newB})`);
        }
        
        // Renkleri karıştır
        shuffleArray(colors);
        
        // Renk seçeneklerini ekle
        colors.forEach(color => {
            const option = document.createElement('div');
            option.className = 'color-option';
            option.style.backgroundColor = color;
            option.addEventListener('click', () => checkColorMatch(color));
            colorGame.options.appendChild(option);
        });
    }
    
    function checkColorMatch(selectedColor) {
        if (selectedColor === colorGame.correctColor) {
            // Doğru tahmin
            colorGame.score += colorGame.level * 5;
            colorGame.level++;
            try {
                window.playSound('success');
            } catch (e) {
                console.error("Ses çalma hatası:", e);
            }
            
            // Seviye ve skoru güncelle
            colorGame.scoreElement.textContent = `Skor: ${colorGame.score}`;
            colorGame.levelElement.textContent = `Seviye: ${colorGame.level}`;
            
            // Yeni tur oluştur
            setTimeout(() => generateColorRound(), 500);
        } else {
            // Yanlış tahmin
            colorGame.score = Math.max(0, colorGame.score - 2);
            try {
                window.playSound('error');
            } catch (e) {
                console.error("Ses çalma hatası:", e);
            }
            
            // Skoru güncelle
            colorGame.scoreElement.textContent = `Skor: ${colorGame.score}`;
        }
    }
    
    // Hızlı Tıklama Oyunu
    function startClickGame() {
        clickGame.board = document.querySelector('.click-board');
        clickGame.scoreElement = document.getElementById('click-score');
        clickGame.timerElement = document.getElementById('click-timer');
        clickGame.score = 0;
        clickGame.timeLeft = 30;
        
        // Skoru sıfırla
        clickGame.scoreElement.textContent = `Skor: ${clickGame.score}`;
        
        // Zamanlayıcıyı başlat
        clearInterval(clickGame.timerInterval);
        clickGame.timerElement.textContent = `Süre: ${clickGame.timeLeft}s`;
        clickGame.timerInterval = setInterval(() => {
            clickGame.timeLeft--;
            clickGame.timerElement.textContent = `Süre: ${clickGame.timeLeft}s`;
            
            if (clickGame.timeLeft <= 0) {
                clearInterval(clickGame.timerInterval);
                removeClickTarget();
                window.playSound('error');
            }
        }, 1000);
        
        // Tahtayı temizle
        clickGame.board.innerHTML = '';
        
        // İlk hedefi oluştur
        createClickTarget();
    }
    
    function createClickTarget() {
        // Önceki hedefi kaldır
        removeClickTarget();
        
        // Yeni hedef oluştur
        const target = document.createElement('div');
        target.className = 'click-target';
        
        // Rastgele boyut (30-50px)
        const size = Math.floor(Math.random() * 20) + 30;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        // Rastgele konum
        const maxX = clickGame.board.clientWidth - size;
        const maxY = clickGame.board.clientHeight - size;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        
        // Puan değeri (küçük hedefler daha değerli)
        const points = Math.floor(50 / size * 10);
        target.textContent = points;
        
        // Tıklama olayı
        target.addEventListener('click', () => {
            clickGame.score += points;
            clickGame.scoreElement.textContent = `Skor: ${clickGame.score}`;
            try {
                window.playSound('success');
            } catch (e) {
                console.error("Ses çalma hatası:", e);
            }
            createClickTarget();
        });
        
        // Tahtaya ekle
        clickGame.board.appendChild(target);
        clickGame.currentTarget = target;
    }
    
    function removeClickTarget() {
        if (clickGame.currentTarget) {
            clickGame.currentTarget.remove();
            clickGame.currentTarget = null;
        }
    }
    
    // Dışa açık API
    return {
        init: function() {
            // Oyun başlatma düğmelerini dinle
            const gameButtons = document.querySelectorAll('.game-btn');
            gameButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const gameId = this.getAttribute('data-game');
                    const gameContainer = document.getElementById(gameId + '-game');
                    
                    // Diğer tüm oyun konteynerlerini gizle
                    document.querySelectorAll('.game-container').forEach(container => {
                        container.style.display = 'none';
                    });
                    
                    // Seçilen oyun konteynerini göster
                    gameContainer.style.display = 'block';
                    
                    // Oyunu başlat
                    if (gameId === 'memory') {
                        startMemoryGame();
                    } else if (gameId === 'color') {
                        startColorGame();
                    } else if (gameId === 'click') {
                        startClickGame();
                    }
                    
                    // Tıklama sesi çal
                    try {
                        window.playSound('click');
                    } catch (e) {
                        console.error("Ses çalma hatası:", e);
                    }
                });
            });
            
            // Yeniden başlatma düğmelerini dinle
            const restartButtons = document.querySelectorAll('.restart-btn');
            restartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const gameId = this.getAttribute('data-game');
                    
                    if (gameId === 'memory') {
                        startMemoryGame();
                    } else if (gameId === 'color') {
                        startColorGame();
                    } else if (gameId === 'click') {
                        startClickGame();
                    }
                    
                    // Tıklama sesi çal
                    try {
                        window.playSound('click');
                    } catch (e) {
                        console.error("Ses çalma hatası:", e);
                    }
                });
            });
        }
    };
})();

// Sayfa yüklendiğinde oyun modülünü başlat
document.addEventListener('DOMContentLoaded', function() {
    GamesModule.init();
}); 