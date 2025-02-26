// Chat.js - Claude 3.7 Sohbet Sayfası İşlevselliği

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elementleri
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const contacts = document.querySelectorAll('.contact');
    const infoButton = document.querySelector('.action-btn[title="Bilgi"]');
    const chatInfo = document.querySelector('.chat-info');
    const closeInfoButton = document.querySelector('.close-info');
    const emojiButton = document.querySelector('.input-action[title="Emoji"]');
    const attachButton = document.querySelector('.input-action[title="Dosya Ekle"]');
    
    // Ses Efektleri
    const messageSound = document.getElementById('message-sound');
    const notificationSound = document.getElementById('notification-sound');
    const clickSound = document.getElementById('click-sound');
    
    // Sohbet Verileri
    const chatData = {
        claude: {
            name: 'Claude 3.7',
            status: 'online',
            avatar: 'https://placehold.co/50x50/purple/white?text=C',
            messages: [
                {
                    text: 'Merhaba! Ben Claude 3.7, Anthropic\'in en gelişmiş AI asistanıyım. Size nasıl yardımcı olabilirim?',
                    time: '10:00',
                    type: 'received'
                }
            ],
            responses: [
                'Merhaba! Size nasıl yardımcı olabilirim?',
                'Bu konuda size yardımcı olabilirim. Ne bilmek istersiniz?',
                'İlginç bir soru. Bunu araştıralım.',
                'Elbette, bu konuda size detaylı bilgi verebilirim.',
                'Anladım, bu durumda şunları yapmanızı öneririm...',
                'Bu sorunun birkaç farklı cevabı var. İsterseniz hepsini açıklayayım.',
                'Harika bir soru! İşte cevabı...',
                'Bu konuda uzmanlaşmış durumdayım, size yardımcı olabilirim.',
                'Bunu daha önce hiç düşünmemiştim. İlginç bir bakış açısı!',
                'Teşekkür ederim! Başka bir konuda yardıma ihtiyacınız var mı?'
            ]
        },
        sonnet: {
            name: 'Claude Sonnet',
            status: 'online',
            avatar: 'https://placehold.co/50x50/blue/white?text=S',
            messages: [
                {
                    text: 'Yaratıcı yazı konusunda yardım ister misin?',
                    time: '09:55',
                    type: 'received'
                }
            ],
            responses: [
                'Yaratıcı yazı konusunda size yardımcı olabilirim. Ne tür bir içerik oluşturmak istiyorsunuz?',
                'Şiir mi, hikaye mi, yoksa başka bir format mı düşünüyorsunuz?',
                'İşte size ilham verebilecek birkaç fikir...',
                'Bu harika bir başlangıç! Biraz daha detay eklemek ister misiniz?',
                'Karakterlerinizi daha derinlemesine geliştirmek için şunları düşünebilirsiniz...',
                'Metaforlar ve benzetmeler kullanarak anlatımınızı zenginleştirebilirsiniz.',
                'Hikayenizin akışını şu şekilde düzenleyebilirsiniz...',
                'Bu duyguyu ifade etmenin farklı yolları var, işte birkaç örnek...',
                'Yazınızda ritim ve ses uyumu için şu teknikleri deneyebilirsiniz...',
                'Harika bir çalışma! Yazınız gerçekten etkileyici.'
            ]
        },
        opus: {
            name: 'Claude Opus',
            status: 'online',
            avatar: 'https://placehold.co/50x50/green/white?text=O',
            messages: [
                {
                    text: 'Karmaşık problemleri çözebilirim.',
                    time: '09:30',
                    type: 'received'
                }
            ],
            responses: [
                'Bu karmaşık problemi adım adım çözelim.',
                'İlginç bir problem. Önce temel prensipleri belirleyelim.',
                'Bu konuyu derinlemesine analiz edelim.',
                'Problemi farklı açılardan değerlendirelim.',
                'Bu durumda optimum çözüm şu olabilir...',
                'Verilerinizi analiz ettim ve şu sonuçlara ulaştım...',
                'Bu problemin çözümü için birkaç farklı yaklaşım önerebilirim.',
                'Matematiksel olarak düşünürsek, şu formülü kullanabiliriz...',
                'Bu konuda en güncel araştırmalar şunları gösteriyor...',
                'Probleminizi çözmek için şu algoritma en verimli olacaktır.'
            ]
        },
        haiku: {
            name: 'Claude Haiku',
            status: 'online',
            avatar: 'https://placehold.co/50x50/orange/white?text=H',
            messages: [
                {
                    text: 'Kısa ve öz cevaplar için buradayım.',
                    time: '09:00',
                    type: 'received'
                }
            ],
            responses: [
                'Evet, kesinlikle.',
                'Hayır, bu doğru değil.',
                'Bunu öneririm.',
                'Üç adımda çözülebilir.',
                'Ana nokta şudur.',
                'Özet: hemen başlayın.',
                'Kısaca: denemeye değer.',
                'Önemli olan odaklanmak.',
                'Sonuç: verimli çözüm.',
                'Özetle: iyi bir fikir.'
            ]
        }
    };
    
    // Aktif sohbet
    let activeContact = 'claude';
    
    // Mesaj gönderme fonksiyonu
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        // Mesaj zamanı
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Yeni mesaj oluştur
        const newMessage = {
            text: messageText,
            time: timeString,
            type: 'sent'
        };
        
        // Mesajı sohbet verilerine ekle
        chatData[activeContact].messages.push(newMessage);
        
        // Mesajı ekrana ekle
        addMessageToChat(newMessage);
        
        // Mesaj gönderme sesi çal
        playSound('message');
        
        // Input alanını temizle
        messageInput.value = '';
        
        // Yazıyor göstergesi göster
        showTypingIndicator();
        
        // Cevap mesajı oluştur (1-3 saniye sonra)
        const responseTime = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => {
            // Yazıyor göstergesini kaldır
            hideTypingIndicator();
            
            // Rastgele bir cevap seç
            const responses = chatData[activeContact].responses;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            // Cevap zamanı
            const responseNow = new Date();
            const responseHours = responseNow.getHours().toString().padStart(2, '0');
            const responseMinutes = responseNow.getMinutes().toString().padStart(2, '0');
            const responseTimeString = `${responseHours}:${responseMinutes}`;
            
            // Yeni cevap mesajı oluştur
            const responseMessage = {
                text: randomResponse,
                time: responseTimeString,
                type: 'received'
            };
            
            // Cevabı sohbet verilerine ekle
            chatData[activeContact].messages.push(responseMessage);
            
            // Cevabı ekrana ekle
            addMessageToChat(responseMessage);
            
            // Bildirim sesi çal
            playSound('notification');
            
            // Sohbet alanını en alta kaydır
            scrollToBottom();
        }, responseTime);
        
        // Sohbet alanını en alta kaydır
        scrollToBottom();
    }
    
    // Mesajı sohbet alanına ekle
    function addMessageToChat(message) {
        // Yazıyor göstergesini kaldır (eğer varsa)
        const typingIndicator = document.querySelector('.message.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        // Yeni mesaj elementi oluştur
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);
        
        // Mesaj içeriği
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = `<p>${message.text}</p>`;
        
        // Mesaj zamanı
        const messageTime = document.createElement('div');
        messageTime.classList.add('message-time');
        messageTime.textContent = message.time;
        
        // Mesaj elementine ekle
        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);
        
        // Sohbet alanına ekle
        chatMessages.appendChild(messageElement);
    }
    
    // Yazıyor göstergesini göster
    function showTypingIndicator() {
        // Eğer zaten varsa, tekrar oluşturma
        if (document.querySelector('.message.typing')) return;
        
        // Yazıyor göstergesi elementi oluştur
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'received', 'typing');
        
        // Gösterge içeriği
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        // Elementi ekle
        typingElement.appendChild(typingIndicator);
        chatMessages.appendChild(typingElement);
        
        // Sohbet alanını en alta kaydır
        scrollToBottom();
    }
    
    // Yazıyor göstergesini kaldır
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.message.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Sohbet alanını en alta kaydır
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Sohbeti değiştir
    function changeChat(contactId) {
        // Aktif sohbeti güncelle
        activeContact = contactId;
        
        // Sohbet başlığını güncelle
        const contactData = chatData[contactId];
        document.querySelector('.chat-contact-info .contact-details h3').textContent = contactData.name;
        document.querySelector('.chat-contact-info .contact-pic img').src = contactData.avatar;
        
        // Sohbet mesajlarını temizle
        chatMessages.innerHTML = '<div class="message-date">Bugün</div>';
        
        // Sohbet mesajlarını yükle
        contactData.messages.forEach(message => {
            addMessageToChat(message);
        });
        
        // Sohbet alanını en alta kaydır
        scrollToBottom();
        
        // Bilgi panelini güncelle
        document.querySelector('.info-header h3').textContent = contactData.name;
        
        // Okunmamış mesaj sayısını sıfırla
        const unreadBadge = document.querySelector(`.contact[data-contact="${contactId}"] .unread`);
        if (unreadBadge) {
            unreadBadge.remove();
        }
    }
    
    // Ses çalma fonksiyonu
    function playSound(type) {
        let sound;
        switch(type) {
            case 'message':
                sound = messageSound;
                break;
            case 'notification':
                sound = notificationSound;
                break;
            case 'click':
                sound = clickSound;
                break;
            default:
                sound = clickSound;
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
        }
    }
    
    // Dalga efekti
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Event Listeners
    
    // Mesaj gönderme
    sendButton.addEventListener('click', (e) => {
        createRipple(e, sendButton);
        playSound('click');
        sendMessage();
    });
    
    // Enter tuşu ile mesaj gönderme
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Kişi değiştirme
    contacts.forEach(contact => {
        contact.addEventListener('click', function() {
            // Aktif kişiyi güncelle
            contacts.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Sohbeti değiştir
            const contactId = this.getAttribute('data-contact');
            changeChat(contactId);
            
            // Tıklama sesi çal
            playSound('click');
        });
    });
    
    // Bilgi panelini aç/kapat
    infoButton.addEventListener('click', (e) => {
        createRipple(e, infoButton);
        chatInfo.classList.toggle('active');
        playSound('click');
    });
    
    closeInfoButton.addEventListener('click', () => {
        chatInfo.classList.remove('active');
        playSound('click');
    });
    
    // Emoji butonu (placeholder)
    emojiButton.addEventListener('click', (e) => {
        createRipple(e, emojiButton);
        playSound('click');
        alert('Emoji özelliği yakında eklenecek!');
    });
    
    // Dosya ekleme butonu (placeholder)
    attachButton.addEventListener('click', (e) => {
        createRipple(e, attachButton);
        playSound('click');
        alert('Dosya ekleme özelliği yakında eklenecek!');
    });
    
    // Arama butonları (placeholder)
    document.querySelector('.action-btn[title="Sesli Arama"]').addEventListener('click', (e) => {
        const button = e.currentTarget;
        createRipple(e, button);
        playSound('click');
        alert('Sesli arama özelliği yakında eklenecek!');
    });
    
    document.querySelector('.action-btn[title="Görüntülü Arama"]').addEventListener('click', (e) => {
        const button = e.currentTarget;
        createRipple(e, button);
        playSound('click');
        alert('Görüntülü arama özelliği yakında eklenecek!');
    });
    
    // Arama butonu (placeholder)
    document.querySelector('.chat-search button').addEventListener('click', () => {
        playSound('click');
        alert('Arama özelliği yakında eklenecek!');
    });
    
    // Sayfa yüklendiğinde
    window.addEventListener('load', () => {
        // Varsayılan sohbeti yükle
        changeChat(activeContact);
        
        // Sohbet alanını en alta kaydır
        scrollToBottom();
    });
    
    // Mobil cihazlar için menü düğmesi
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        document.querySelector('.chat-header').prepend(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector('.chat-sidebar').classList.toggle('active');
            playSound('click');
        });
        
        // Kişiye tıklandığında mobil menüyü kapat
        contacts.forEach(contact => {
            contact.addEventListener('click', () => {
                document.querySelector('.chat-sidebar').classList.remove('active');
            });
        });
    }
}); 