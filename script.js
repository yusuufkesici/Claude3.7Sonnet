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
        `;
        document.head.appendChild(style);
    };
    
    addStyles();
}); 