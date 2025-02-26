// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Varsayılan olarak koyu tema ayarla
    document.body.classList.add('dark-theme');
    
    // Smooth scroll için tüm iç bağlantıları seç
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Her bağlantıya tıklama olayı ekle
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hedef elemanı al
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Yumuşak kaydırma
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sayfa kaydırıldığında header'ı güncelle
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Feature kartları için animasyon
    const featureCards = document.querySelectorAll('.feature-card');
    
    // IntersectionObserver API kullanarak görünürlüğü izle
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Tüm feature kartlarını gözlemle
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Demo örnekleri için kod bloklarını vurgula
    const codeBlocks = document.querySelectorAll('.code-example code');
    
    codeBlocks.forEach(block => {
        // Kod bloğuna sınıf ekle
        block.classList.add('highlighted');
    });
    
    // Mobil menü için toggle fonksiyonu
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Mobil menü butonu oluştur
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Butonu header'a ekle
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        // Menü açma/kapama olayı
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Menü öğelerine tıklandığında menüyü kapat
        const menuItems = nav.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
    };
    
    // Ekran genişliği 768px veya daha az ise mobil menü oluştur
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });
    
    // CSS'e ek stil ekle
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            header.scrolled {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                background-color: rgba(255, 255, 255, 0.95);
            }
            
            .feature-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .feature-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .mobile-menu-btn {
                display: none;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 30px;
                    height: 25px;
                    position: relative;
                    z-index: 10;
                }
                
                .mobile-menu-btn span {
                    display: block;
                    width: 100%;
                    height: 3px;
                    background-color: var(--primary-color);
                    margin-bottom: 5px;
                    transition: var(--transition);
                }
                
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 6px);
                }
                
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -6px);
                }
                
                nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background-color: var(--background-color);
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                    transition: var(--transition);
                    z-index: 9;
                    padding: 80px 20px 20px;
                }
                
                nav.active {
                    right: 0;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                nav ul li {
                    margin: 10px 0;
                    width: 100%;
                }
                
                nav ul li a {
                    display: block;
                    padding: 10px 0;
                    font-size: 1.2rem;
                }
            }
            
            .visitor-counter {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--primary-color);
                color: white;
                padding: 10px 15px;
                border-radius: 50px;
                font-size: 14px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 100;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            .visitor-counter:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .visitor-counter.clicked {
                transform: scale(1.1);
            }
            
            .visitor-counter .icon {
                font-size: 18px;
            }
            
            .visitor-counter .count {
                font-weight: bold;
                animation: pulse 1.5s infinite;
                display: inline-block;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .cursor-effect {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                position: fixed;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: width 0.2s, height 0.2s;
            }
            
            .cursor-effect.hover {
                width: 50px;
                height: 50px;
                background-color: rgba(255, 255, 255, 0.5);
            }
            
            .confetti-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
            }
            
            .tooltip-container {
                position: absolute;
                background-color: var(--dark-color);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
                z-index: 1000;
                max-width: 200px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            }
            
            .tooltip-container::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: var(--dark-color) transparent transparent transparent;
            }
            
            .interactive-button {
                position: relative;
                overflow: hidden;
            }
            
            .interactive-button .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addStyles();
    
    // Firebase yapılandırması
    const firebaseConfig = {
        apiKey: "AIzaSyBGm3hVLEzwRNiKzCLGaUlHDQYVKGqmTbk",
        authDomain: "claude-visitor-counter.firebaseapp.com",
        databaseURL: "https://claude-visitor-counter-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "claude-visitor-counter",
        storageBucket: "claude-visitor-counter.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:1234567890abcdef123456"
    };
    
    // Firebase'i başlat
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase başlatma hatası:", e);
        // Firebase yüklenemezse, eski ziyaretçi sayacını kullan
        createFallbackVisitorCounter();
        return;
    }
    
    // Anlık ziyaretçi sayısı özelliği
    const createVisitorCounter = () => {
        try {
            // Ziyaretçi sayacı elementi oluştur
            const visitorCounter = document.createElement('div');
            visitorCounter.classList.add('visitor-counter');
            visitorCounter.title = "Tıkla ve konfeti yağmurunu izle!";
            
            // Simge ve sayaç içeriği
            visitorCounter.innerHTML = `
                <span class="icon">👥</span>
                <span>Şu anda sitede: <span class="count">1</span> kişi</span>
            `;
            
            // Sayfaya ekle
            document.body.appendChild(visitorCounter);
            
            // Firebase veritabanı referansı
            const database = firebase.database();
            const visitorRef = database.ref('visitors');
            
            // Benzersiz kullanıcı kimliği oluştur veya al
            let userId = localStorage.getItem('visitorId');
            if (!userId) {
                userId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('visitorId', userId);
            }
            
            // Kullanıcıyı çevrimiçi olarak işaretle
            const userStatusRef = visitorRef.child(userId);
            userStatusRef.set({
                online: true,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            
            // Kullanıcı sayfadan ayrıldığında çevrimdışı olarak işaretle
            window.addEventListener('beforeunload', () => {
                userStatusRef.remove();
            });
            
            // Bağlantı durumunu izle
            const connectedRef = database.ref('.info/connected');
            connectedRef.on('value', (snap) => {
                if (snap.val() === true) {
                    // Bağlantı kurulduğunda
                    userStatusRef.onDisconnect().remove();
                    userStatusRef.set({
                        online: true,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    });
                }
            });
            
            // Ziyaretçi sayısını dinle ve güncelle
            visitorRef.on('value', (snapshot) => {
                try {
                    const countElement = visitorCounter.querySelector('.count');
                    const count = snapshot.numChildren();
                    
                    // Sayı değişimini animasyonlu göster
                    if (countElement.textContent !== count.toString()) {
                        countElement.style.animation = 'none';
                        countElement.style.transform = 'scale(1.5)';
                        countElement.style.color = '#ffcc00';
                        
                        setTimeout(() => {
                            countElement.textContent = count;
                            countElement.style.animation = 'pulse 1.5s infinite';
                            countElement.style.transform = '';
                            countElement.style.color = '';
                        }, 300);
                    } else {
                        countElement.textContent = count;
                    }
                    
                    // 10'dan fazla ziyaretçi varsa konfeti efekti
                    if (count >= 10 && !localStorage.getItem('confettiShown')) {
                        createConfetti(50);
                        playSound('success');
                        localStorage.setItem('confettiShown', 'true');
                        
                        // Bildirim göster
                        showNotification('Tebrikler!', '10 ziyaretçi barajını aştınız!');
                    }
                } catch (e) {
                    console.error("Ziyaretçi sayısı güncelleme hatası:", e);
                    // Hata durumunda en azından 1 göster
                    visitorCounter.querySelector('.count').textContent = '1';
                }
            });
            
            // Tıklama olayı ekle
            visitorCounter.addEventListener('click', function() {
                // Konfeti efekti başlat
                createConfetti(30);
                
                // Ses efekti çal
                playSound('success');
                
                // Animasyon ekle
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 500);
                
                // Rastgele renk değişimi
                const hue = Math.floor(Math.random() * 360);
                this.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 1000);
            });
            
            // Hover efekti
            visitorCounter.addEventListener('mouseenter', function() {
                this.querySelector('.icon').textContent = '🎉';
            });
            
            visitorCounter.addEventListener('mouseleave', function() {
                this.querySelector('.icon').textContent = '👥';
            });
        } catch (error) {
            console.error("Ziyaretçi sayacı oluşturma hatası:", error);
            createFallbackVisitorCounter();
        }
    };
    
    // Firebase yüklenemezse yedek ziyaretçi sayacı
    const createFallbackVisitorCounter = () => {
        console.log("Yedek ziyaretçi sayacı oluşturuluyor...");
        
        // Ziyaretçi sayacı elementi oluştur
        const visitorCounter = document.createElement('div');
        visitorCounter.classList.add('visitor-counter');
        visitorCounter.title = "Tıkla ve konfeti yağmurunu izle!";
        
        // Simge ve sayaç içeriği
        visitorCounter.innerHTML = `
            <span class="icon">👥</span>
            <span>Şu anda sitede: <span class="count">1</span> kişi</span>
        `;
        
        // Sayfaya ekle
        document.body.appendChild(visitorCounter);
        
        // Rastgele ziyaretçi sayısı oluştur ve güncelle
        const updateVisitorCount = () => {
            // Gerçek bir sistem olmadığı için rastgele sayı üretiyoruz
            const baseCount = 3; // Temel ziyaretçi sayısı
            const randomVariation = Math.floor(Math.random() * 5); // 0-4 arası rastgele değişim
            const totalCount = baseCount + randomVariation;
            
            // Sayacı güncelle
            const countElement = visitorCounter.querySelector('.count');
            const oldCount = parseInt(countElement.textContent);
            
            // Sayı değişimini animasyonlu göster
            if (oldCount !== totalCount) {
                countElement.style.animation = 'none';
                countElement.style.transform = 'scale(1.5)';
                countElement.style.color = '#ffcc00';
                
                setTimeout(() => {
                    countElement.textContent = totalCount;
                    countElement.style.animation = 'pulse 1.5s infinite';
                    countElement.style.transform = '';
                    countElement.style.color = '';
                }, 300);
            } else {
                countElement.textContent = totalCount;
            }
            
            // 10'dan fazla ziyaretçi varsa konfeti efekti
            if (totalCount >= 10 && !localStorage.getItem('confettiShown')) {
                createConfetti(50);
                playSound('success');
                localStorage.setItem('confettiShown', 'true');
                
                // Bildirim göster
                showNotification('Tebrikler!', '10 ziyaretçi barajını aştınız!');
            }
        };
        
        // İlk sayıyı ayarla
        updateVisitorCount();
        
        // Belirli aralıklarla sayıyı güncelle (her 30 saniyede bir)
        setInterval(updateVisitorCount, 30000);
        
        // Tıklama olayı ekle
        visitorCounter.addEventListener('click', function() {
            // Konfeti efekti başlat
            createConfetti(30);
            
            // Ses efekti çal
            playSound('success');
            
            // Sayacı hemen güncelle
            updateVisitorCount();
            
            // Animasyon ekle
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
            
            // Rastgele renk değişimi
            const hue = Math.floor(Math.random() * 360);
            this.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 1000);
        });
        
        // Hover efekti
        visitorCounter.addEventListener('mouseenter', function() {
            this.querySelector('.icon').textContent = '🎉';
        });
        
        visitorCounter.addEventListener('mouseleave', function() {
            this.querySelector('.icon').textContent = '👥';
        });
    };
    
    // Firebase'i kontrol et ve ziyaretçi sayacını oluştur
    if (typeof firebase !== 'undefined') {
        createVisitorCounter();
    } else {
        // Firebase CDN'ini dinamik olarak yükle
        const firebaseScript = document.createElement('script');
        firebaseScript.src = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js';
        firebaseScript.onload = function() {
            // Firebase Database'i yükle
            const databaseScript = document.createElement('script');
            databaseScript.src = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js';
            databaseScript.onload = function() {
                createVisitorCounter();
            };
            databaseScript.onerror = function() {
                console.error("Firebase Database yüklenemedi");
                createFallbackVisitorCounter();
            };
            document.head.appendChild(databaseScript);
        };
        firebaseScript.onerror = function() {
            console.error("Firebase App yüklenemedi");
            createFallbackVisitorCounter();
        };
        document.head.appendChild(firebaseScript);
    }
    
    // Özel imleç efekti
    const createCursorEffect = () => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-effect');
        document.body.appendChild(cursor);
        
        // İmleci fare hareketine göre güncelle
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Rastgele renk değişimi
            if (Math.random() < 0.03) { // %3 olasılıkla
                const hue = Math.floor(Math.random() * 360);
                cursor.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.5)`;
            }
        });
        
        // Tıklama efekti
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Bağlantılar üzerinde hover efekti
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .use-case-card, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    };
    
    // Masaüstü cihazlarda imleç efektini etkinleştir
    if (window.matchMedia("(min-width: 768px)").matches) {
        createCursorEffect();
    }
    
    // Konfeti efekti - global olarak erişilebilir
    window.createConfetti = function(amount) {
        try {
            const confettiContainer = document.querySelector('.confetti-container') || createConfettiContainer();
            
            for (let i = 0; i < amount; i++) {
                createConfettiPiece(confettiContainer);
            }
        } catch (error) {
            console.error("Konfeti oluşturma hatası:", error);
        }
    };
    
    function createConfettiContainer() {
        const container = document.createElement('div');
        container.classList.add('confetti-container');
        document.body.appendChild(container);
        return container;
    }
    
    function createConfettiPiece(container) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Rastgele renk
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Rastgele boyut
        const size = Math.random() * 10 + 5;
        
        // Rastgele konum
        const startX = Math.random() * window.innerWidth;
        const startY = -20;
        
        // Rastgele dönüş
        const rotation = Math.random() * 360;
        
        // Rastgele hız
        const speedX = Math.random() * 2 - 1;
        const speedY = Math.random() * 3 + 2;
        
        // Stil ayarları
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.position = 'absolute';
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(confetti);
        
        // Animasyon
        let posX = startX;
        let posY = startY;
        let rotationAngle = rotation;
        
        const animate = () => {
            posY += speedY;
            posX += speedX;
            rotationAngle += 1;
            
            confetti.style.top = `${posY}px`;
            confetti.style.left = `${posX}px`;
            confetti.style.transform = `rotate(${rotationAngle}deg)`;
            
            // Ekrandan çıktıysa kaldır
            if (posY > window.innerHeight) {
                confetti.remove();
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Ses çalma fonksiyonu - global olarak erişilebilir
    window.playSound = function(type) {
        try {
            let sound;
            switch(type) {
                case 'click':
                    sound = document.getElementById('click-sound');
                    break;
                case 'pop':
                    sound = document.getElementById('pop-sound');
                    break;
                case 'success':
                    sound = document.getElementById('success-sound');
                    break;
                case 'surprise':
                    sound = document.getElementById('surprise-sound');
                    break;
                case 'flip':
                    sound = document.getElementById('click-sound'); // Kart çevirme için click sesini kullan
                    break;
                case 'error':
                    // Hata sesi yok, başka bir ses kullanabilirsiniz
                    sound = document.getElementById('pop-sound');
                    break;
                default:
                    sound = document.getElementById('click-sound');
            }
            
            if (sound) {
                // Ses dosyasını baştan başlat
                sound.currentTime = 0;
                
                // Ses dosyasını çal
                const playPromise = sound.play();
                
                // Play promise hatalarını yakala
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Ses çalma hatası:", error);
                    });
                }
            } else {
                console.error("Ses dosyası bulunamadı:", type);
            }
        } catch (error) {
            console.error("Ses çalma fonksiyonu hatası:", error);
        }
    }
    
    // Konfeti efekti
    function showConfetti() {
        createConfetti(100); // 100 konfeti parçası oluştur
    }
    
    // Özellik kartlarına 3D efekti ekle
    const add3DEffect = () => {
        const cards = document.querySelectorAll('.feature-card, .use-case-card');
        
        cards.forEach(card => {
            card.classList.add('interactive-card');
            
            // Kart içeriğini sarmalayan div ekle
            const cardContent = card.innerHTML;
            card.innerHTML = `<div class="card-inner">${cardContent}</div>`;
            
            // Fare hareketi ile 3D efekti
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Dönüş açısını hesapla (maksimum 10 derece)
                const rotateY = mouseX * 0.05;
                const rotateX = -mouseY * 0.05;
                
                card.querySelector('.card-inner').style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            });
            
            // Fare karttan çıktığında efekti sıfırla
            card.addEventListener('mouseleave', () => {
                card.querySelector('.card-inner').style.transform = 'rotateY(0) rotateX(0)';
            });
        });
    };
    
    // Masaüstü cihazlarda 3D efekti etkinleştir
    if (window.matchMedia("(min-width: 768px)").matches) {
        add3DEffect();
    }
    
    // Tooltip özelliği
    const createTooltips = () => {
        // Tooltip container oluştur
        const tooltipContainer = document.createElement('div');
        tooltipContainer.classList.add('tooltip-container');
        document.body.appendChild(tooltipContainer);
        
        // Tooltip özelliği eklenecek elementler
        const elements = [
            { selector: '.feature-icon', text: 'Claude 3.7\'nin özel yetenekleri!' },
            { selector: '.hero .btn', text: 'Hemen keşfetmeye başla!' },
            { selector: '.logo h1', text: 'Claude 3.7 Sonnet - Anthropic\'in en gelişmiş AI modeli' },
            { selector: '.footer-contact .btn', text: 'Anthropic\'in resmi web sitesini ziyaret et' }
        ];
        
        elements.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            
            elements.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    const rect = element.getBoundingClientRect();
                    
                    tooltipContainer.textContent = item.text;
                    tooltipContainer.style.left = `${rect.left + rect.width / 2}px`;
                    tooltipContainer.style.top = `${rect.top - 10}px`;
                    tooltipContainer.style.transform = 'translate(-50%, -100%)';
                    tooltipContainer.style.opacity = '1';
                });
                
                element.addEventListener('mouseleave', () => {
                    tooltipContainer.style.opacity = '0';
                });
            });
        });
    };
    
    // Tooltip özelliğini etkinleştir
    createTooltips();
    
    // Butonlara dalga efekti ekle
    const addRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.classList.add('interactive-button');
            
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };
    
    // Dalga efektini etkinleştir
    addRippleEffect();
    
    // Yazı animasyonu
    const createTypingEffect = () => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content h2');
        
        if (heroTitle && heroSubtitle) {
            const originalTitle = heroTitle.textContent;
            const originalSubtitle = heroSubtitle.textContent;
            
            // Metinleri temizle
            heroTitle.textContent = '';
            heroSubtitle.textContent = '';
            
            // Karakter karakter yazdırma fonksiyonu
            const typeText = (element, text, i = 0, callback) => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    setTimeout(() => typeText(element, text, i + 1, callback), 50);
                } else if (callback) {
                    callback();
                }
            };
            
            // Önce başlığı, sonra alt başlığı yaz
            setTimeout(() => {
                typeText(heroTitle, originalTitle, 0, () => {
                    setTimeout(() => {
                        typeText(heroSubtitle, originalSubtitle);
                    }, 300);
                });
            }, 500);
        }
    };
    
    // Yazı animasyonunu başlat
    createTypingEffect();
    
    // Sayfa yüklendiğinde yükleme animasyonu göster
    const showLoadingAnimation = () => {
        // Yükleme animasyonu container'ı
        const loadingContainer = document.createElement('div');
        loadingContainer.style.position = 'fixed';
        loadingContainer.style.top = '0';
        loadingContainer.style.left = '0';
        loadingContainer.style.width = '100%';
        loadingContainer.style.height = '100%';
        loadingContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        loadingContainer.style.display = 'flex';
        loadingContainer.style.justifyContent = 'center';
        loadingContainer.style.alignItems = 'center';
        loadingContainer.style.zIndex = '9999';
        loadingContainer.style.transition = 'opacity 0.5s';
        
        // Yükleme animasyonu
        const loadingAnimation = document.createElement('div');
        loadingAnimation.classList.add('loading-animation');
        loadingAnimation.innerHTML = '<div></div><div></div><div></div><div></div>';
        
        // Claude logosu
        const logo = document.createElement('div');
        logo.style.fontSize = '2rem';
        logo.style.fontWeight = 'bold';
        logo.style.marginBottom = '20px';
        logo.style.color = 'var(--primary-color)';
        logo.innerHTML = 'Claude <span style="color: var(--secondary-color)">3.7</span>';
        
        // Container'a ekle
        const content = document.createElement('div');
        content.style.textAlign = 'center';
        content.appendChild(logo);
        content.appendChild(loadingAnimation);
        loadingContainer.appendChild(content);
        
        // Sayfaya ekle
        document.body.appendChild(loadingContainer);
        
        // Belirli bir süre sonra kaldır
        setTimeout(() => {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.remove();
                // Yükleme tamamlandığında konfeti efekti başlat
                createConfetti(30);
            }, 500);
        }, 1500);
    };
    
    // Yükleme animasyonunu göster
    showLoadingAnimation();
    
    // Etkileşimli özellikler kartları
    const makeCardsInteractive = () => {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            // Kart içeriğini al
            const icon = card.querySelector('.feature-icon');
            const title = card.querySelector('h3');
            
            // İkon tıklama olayı
            if (icon) {
                icon.style.cursor = 'pointer';
                icon.addEventListener('click', () => {
                    // İkonu büyüt ve döndür
                    icon.style.transform = 'scale(1.5) rotate(360deg)';
                    icon.style.transition = 'transform 0.5s ease';
                    
                    // Konfeti efekti
                    createConfetti(10);
                    
                    // Bir süre sonra normal haline döndür
                    setTimeout(() => {
                        icon.style.transform = '';
                    }, 500);
                });
            }
            
            // Başlık tıklama olayı
            if (title) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', () => {
                    // Rastgele renk değişimi
                    const hue = Math.floor(Math.random() * 360);
                    title.style.color = `hsl(${hue}, 70%, 50%)`;
                    title.style.transition = 'color 0.3s ease';
                    
                    // Bir süre sonra normal rengine döndür
                    setTimeout(() => {
                        title.style.color = '';
                    }, 1000);
                });
            }
        });
    };
    
    // Kartları etkileşimli yap
    makeCardsInteractive();
    
    // Ses efektleri için işlevler
    const playSoundEffect = (soundId) => {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => console.log('Ses çalma hatası:', error));
        }
    };
    
    // Özellik kartlarına ses efekti ekle
    const cardsWithSound = document.querySelectorAll('[data-sound]');
    cardsWithSound.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const soundType = card.getAttribute('data-sound');
            playSoundEffect(soundType + '-sound');
        });
    });
    
    // Demo butonlarına tıklama olayı ekle
    const tryButtons = document.querySelectorAll('.try-button');
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ses efekti çal
            playSoundEffect('success-sound');
            
            // Buton metnini değiştir
            const originalText = this.textContent;
            this.textContent = 'Harika!';
            
            // Konfeti efekti
            createConfetti(30);
            
            // Buton metnini geri al
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
    
    // Sürpriz butonu
    const surpriseButton = document.getElementById('surprise-button');
    if (surpriseButton) {
        surpriseButton.addEventListener('click', function() {
            // Ses efekti çal
            playSoundEffect('surprise-sound');
            
            // Büyük konfeti patlaması
            createConfetti(100);
            
            // Hero görselini değiştir
            const heroImage = document.getElementById('hero-image');
            if (heroImage) {
                heroImage.src = 'https://placehold.co/600x400/purple/white?text=Claude+3.7+Rocks!';
                
                // Görsel animasyonu
                heroImage.style.animation = 'pulse 1s infinite';
                
                // 5 saniye sonra normal haline döndür
                setTimeout(() => {
                    heroImage.src = 'https://placehold.co/600x400';
                    heroImage.style.animation = '';
                }, 5000);
            }
            
            // Sayfa başlığını geçici olarak değiştir
            const originalTitle = document.title;
            document.title = '🎉 Claude 3.7 Harika! 🎉';
            
            // 5 saniye sonra başlığı geri al
            setTimeout(() => {
                document.title = originalTitle;
            }, 5000);
        });
    }
    
    // Tema değiştirme butonu
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Tema değiştiğinde ses çal
            playSound('click');
            
            // Tema durumunu localStorage'a kaydet
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDarkTheme);
            
            // Düğme metnini güncelle
            this.textContent = isDarkTheme ? 'Açık Tema' : 'Koyu Tema';
        });
        
        // Sayfa yüklendiğinde düğme metnini ayarla
        themeToggle.textContent = 'Açık Tema';
    }
    
    // Sosyal medya ikonlarına hover efekti
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Ses efekti çal
            playSoundEffect('pop-sound');
            
            // İkonu büyüt
            this.style.transform = 'scale(1.2)';
            
            // Rastgele renk değişimi
            const hue = Math.floor(Math.random() * 360);
            this.style.color = `hsl(${hue}, 70%, 60%)`;
        });
        
        icon.addEventListener('mouseleave', function() {
            // Normal haline döndür
            this.style.transform = '';
            this.style.color = '';
        });
    });
    
    // Hero görselini etkileşimli yap
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        heroImage.addEventListener('click', function() {
            // Ses efekti çal
            playSoundEffect('success-sound');
            
            // Görsel animasyonu
            this.style.transform = 'scale(1.1) rotate(5deg)';
            
            // Konfeti efekti
            createConfetti(20);
            
            // 1 saniye sonra normal haline döndür
            setTimeout(() => {
                this.style.transform = '';
            }, 1000);
        });
    }
    
    // Oyun Bölümü İşlevselliği
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
            playSound('click');
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
            playSound('click');
        });
    });
    
    // Hafıza Oyunu
    function startMemoryGame() {
        const memoryBoard = document.querySelector('.memory-board');
        const scoreElement = document.getElementById('memory-score');
        const timerElement = document.getElementById('memory-timer');
        let score = 0;
        let timeLeft = 60;
        let timerInterval;
        let flippedCards = [];
        let matchedPairs = 0;
        
        // Emoji çiftleri
        const emojis = ['🚀', '🌟', '🤖', '🧠', '💡', '🔮', '🎮', '🎯'];
        const gameEmojis = [...emojis, ...emojis];
        
        // Karıştır
        shuffleArray(gameEmojis);
        
        // Skoru sıfırla
        scoreElement.textContent = `Skor: ${score}`;
        
        // Zamanlayıcıyı başlat
        clearInterval(timerInterval);
        timerElement.textContent = `Süre: ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Süre: ${timeLeft}s`;
            
            if (timeLeft <= 0 || matchedPairs === emojis.length) {
                clearInterval(timerInterval);
                if (matchedPairs === emojis.length) {
                    playSound('success');
                    showConfetti();
                } else {
                    playSound('error');
                }
            }
        }, 1000);
        
        // Kartları oluştur
        memoryBoard.innerHTML = '';
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
            
            card.addEventListener('click', () => flipCard(card));
            memoryBoard.appendChild(card);
        });
        
        function flipCard(card) {
            // Zaten eşleşmiş veya çevrilmiş kartları kontrol et
            if (card.classList.contains('matched') || card.classList.contains('flipped') || flippedCards.length >= 2) {
                return;
            }
            
            // Kartı çevir
            card.classList.add('flipped');
            playSound('flip');
            
            // Çevrilen kartları takip et
            flippedCards.push(card);
            
            // İki kart çevrildiyse kontrol et
            if (flippedCards.length === 2) {
                setTimeout(() => checkMatch(), 500);
            }
        }
        
        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.value === card2.dataset.value) {
                // Eşleşme
                card1.classList.add('matched');
                card2.classList.add('matched');
                score += 10;
                matchedPairs++;
                playSound('success');
                
                // Tüm çiftler eşleşti mi?
                if (matchedPairs === emojis.length) {
                    clearInterval(timerInterval);
                    showConfetti();
                }
            } else {
                // Eşleşmedi
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                score = Math.max(0, score - 2);
                playSound('error');
            }
            
            // Skoru güncelle
            scoreElement.textContent = `Skor: ${score}`;
            
            // Çevrilen kartları sıfırla
            flippedCards = [];
        }
    }
    
    // Renk Tahmin Oyunu
    function startColorGame() {
        const colorTarget = document.querySelector('.color-code');
        const colorOptions = document.querySelector('.color-options');
        const scoreElement = document.getElementById('color-score');
        const levelElement = document.getElementById('color-level');
        let score = 0;
        let level = 1;
        let correctColor;
        
        // Skoru ve seviyeyi sıfırla
        scoreElement.textContent = `Skor: ${score}`;
        levelElement.textContent = `Seviye: ${level}`;
        
        // Yeni renk oluştur
        generateNewRound();
        
        function generateNewRound() {
            // Renk seçeneklerini temizle
            colorOptions.innerHTML = '';
            
            // Zorluk seviyesine göre renk farkını ayarla
            const difficulty = Math.max(50 - (level * 5), 5);
            
            // Doğru rengi oluştur
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            correctColor = `rgb(${r}, ${g}, ${b})`;
            
            // RGB kodunu göster
            colorTarget.textContent = correctColor;
            
            // Renk seçeneklerini oluştur (1 doğru, 2 yanlış)
            const colors = [correctColor];
            
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
                option.addEventListener('click', () => checkColor(color));
                colorOptions.appendChild(option);
            });
        }
        
        function checkColor(selectedColor) {
            if (selectedColor === correctColor) {
                // Doğru tahmin
                score += level * 5;
                level++;
                playSound('success');
                
                // Seviye ve skoru güncelle
                scoreElement.textContent = `Skor: ${score}`;
                levelElement.textContent = `Seviye: ${level}`;
                
                // Yeni tur oluştur
                setTimeout(() => generateNewRound(), 500);
            } else {
                // Yanlış tahmin
                score = Math.max(0, score - 2);
                playSound('error');
                
                // Skoru güncelle
                scoreElement.textContent = `Skor: ${score}`;
            }
        }
        
        function clamp(num, min, max) {
            return Math.min(Math.max(num, min), max);
        }
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    
    // Hızlı Tıklama Oyunu
    function startClickGame() {
        const clickBoard = document.querySelector('.click-board');
        const scoreElement = document.getElementById('click-score');
        const timerElement = document.getElementById('click-timer');
        let score = 0;
        let timeLeft = 30;
        let timerInterval;
        let currentTarget = null;
        
        // Skoru sıfırla
        scoreElement.textContent = `Skor: ${score}`;
        
        // Zamanlayıcıyı başlat
        clearInterval(timerInterval);
        timerElement.textContent = `Süre: ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Süre: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                removeTarget();
                playSound('error');
            }
        }, 1000);
        
        // Tahtayı temizle
        clickBoard.innerHTML = '';
        
        // İlk hedefi oluştur
        createTarget();
        
        function createTarget() {
            // Önceki hedefi kaldır
            removeTarget();
            
            // Yeni hedef oluştur
            const target = document.createElement('div');
            target.className = 'click-target';
            
            // Rastgele boyut (30-50px)
            const size = Math.floor(Math.random() * 20) + 30;
            target.style.width = `${size}px`;
            target.style.height = `${size}px`;
            
            // Rastgele konum
            const maxX = clickBoard.clientWidth - size;
            const maxY = clickBoard.clientHeight - size;
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);
            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
            
            // Puan değeri (küçük hedefler daha değerli)
            const points = Math.floor(50 / size * 10);
            target.textContent = points;
            
            // Tıklama olayı
            target.addEventListener('click', () => {
                score += points;
                scoreElement.textContent = `Skor: ${score}`;
                playSound('success');
                createTarget();
            });
            
            // Tahtaya ekle
            clickBoard.appendChild(target);
            currentTarget = target;
        }
        
        function removeTarget() {
            if (currentTarget) {
                currentTarget.remove();
                currentTarget = null;
            }
        }
    }
    
    // Yardımcı fonksiyonlar
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}); 