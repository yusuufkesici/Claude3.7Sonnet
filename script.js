// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
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
            }
            
            .visitor-counter .icon {
                font-size: 18px;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .visitor-counter .count {
                font-weight: bold;
                animation: pulse 1.5s infinite;
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
    
    // Anlık ziyaretçi sayısı özelliği
    const createVisitorCounter = () => {
        // Ziyaretçi sayacı elementi oluştur
        const visitorCounter = document.createElement('div');
        visitorCounter.classList.add('visitor-counter');
        
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
            // Normalde bu veri sunucu tarafından sağlanır
            const baseCount = 3; // Temel ziyaretçi sayısı
            const randomVariation = Math.floor(Math.random() * 5); // 0-4 arası rastgele değişim
            const totalCount = baseCount + randomVariation;
            
            // Sayacı güncelle
            const countElement = visitorCounter.querySelector('.count');
            countElement.textContent = totalCount;
        };
        
        // İlk sayıyı ayarla
        updateVisitorCount();
        
        // Belirli aralıklarla sayıyı güncelle (her 30 saniyede bir)
        setInterval(updateVisitorCount, 30000);
        
        // Tıklama olayı ekle
        visitorCounter.addEventListener('click', function() {
            // Konfeti efekti başlat
            createConfetti(20);
            
            // Sayacı hemen güncelle
            updateVisitorCount();
            
            // Animasyon ekle
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
        });
    };
    
    // Ziyaretçi sayacını oluştur
    createVisitorCounter();
    
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
    
    // Konfeti efekti
    const createConfetti = (count = 50) => {
        // Konfeti container'ı oluştur veya mevcut olanı kullan
        let container = document.querySelector('.confetti-container');
        if (!container) {
            container = document.createElement('div');
            container.classList.add('confetti-container');
            document.body.appendChild(container);
        }
        
        // Belirtilen sayıda konfeti oluştur
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Rastgele renk, boyut ve pozisyon
            const size = Math.random() * 10 + 5; // 5-15px arası
            const hue = Math.floor(Math.random() * 360); // Rastgele renk
            const left = Math.random() * 100; // Rastgele yatay pozisyon
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
            confetti.style.left = `${left}%`;
            
            // Rastgele animasyon süresi ve gecikme
            const duration = Math.random() * 3 + 2; // 2-5s arası
            const delay = Math.random() * 0.5; // 0-0.5s arası
            
            confetti.style.animation = `confetti-fall ${duration}s ease-in-out ${delay}s`;
            
            // Konfeti container'a ekle
            container.appendChild(confetti);
            
            // Animasyon bittiğinde konfeti'yi kaldır
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    };
    
    // Sayfa yüklendiğinde konfeti efekti başlat
    setTimeout(() => {
        createConfetti(30);
    }, 1000);
    
    // Hero bölümündeki butona tıklandığında konfeti efekti
    const heroButton = document.querySelector('.hero .btn');
    if (heroButton) {
        heroButton.addEventListener('click', () => {
            createConfetti(50);
        });
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
            // Ses efekti çal
            playSoundEffect('click-sound');
            
            // Body'ye dark-theme sınıfı ekle/çıkar
            document.body.classList.toggle('dark-theme');
            
            // Buton metnini güncelle
            this.textContent = document.body.classList.contains('dark-theme') ? 'Açık Tema' : 'Koyu Tema';
            
            // Tema değişikliği için CSS değişkenlerini güncelle
            if (document.body.classList.contains('dark-theme')) {
                document.documentElement.style.setProperty('--background-color', '#121212');
                document.documentElement.style.setProperty('--text-color', '#f8f9fa');
                document.documentElement.style.setProperty('--section-bg', '#1e1e1e');
                document.documentElement.style.setProperty('--card-bg', '#2d2d2d');
            } else {
                document.documentElement.style.setProperty('--background-color', '#ffffff');
                document.documentElement.style.setProperty('--text-color', '#333');
                document.documentElement.style.setProperty('--section-bg', '#f8f9fa');
                document.documentElement.style.setProperty('--card-bg', '#ffffff');
            }
        });
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
}); 