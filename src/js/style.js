document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('nav#nav'); // Seleciona o <nav> pelo ID
    const overlay = document.querySelector('.overlay');
    const header = document.querySelector('header'); // Para calcular o deslocamento do cabeçalho

    // Lógica existente para o menu mobile (se houver)
    if (menuToggle && siteNav && overlay) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            // Impede a rolagem do corpo da página quando o menu está aberto
            document.body.style.overflow = siteNav.classList.contains('open') ? 'hidden' : '';
        });

        // Opcional: Fechar o menu ao clicar no overlay
        overlay.addEventListener('click', () => {
            if (siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // --- NOVO: Lógica para rolagem suave e fechar menu ---
        const navAnchors = siteNav.querySelectorAll('a[href^="#"]');

        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                event.preventDefault(); // Previne o comportamento padrão de pular para a âncora
                const targetId = this.getAttribute('href'); // Ex: "#sobre"
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // Fecha o menu mobile se estiver aberto
                if (siteNav.classList.contains('open')) {
                    siteNav.classList.remove('open');
                    menuToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        // --- FIM DA NOVA LÓGICA ---

    } else {
        let missingElements = [];
        if (!menuToggle) missingElements.push('.menu-toggle');
        if (!siteNav) missingElements.push('nav#nav');
        if (!overlay) missingElements.push('.overlay');
        if (!header) missingElements.push('header'); // Header é usado para o cálculo do offset
        if (missingElements.length > 0) {
            console.warn(`Funcionalidade de navegação/menu pode estar comprometida. Elementos ausentes: ${missingElements.join(', ')}`);
        }
    }
});

class ResponsiveCarousel {
            constructor() {
                this.wrapper = document.getElementById('carouselWrapper');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicators = document.getElementById('indicators');
                this.cards = document.querySelectorAll('.project-card');
                this.currentIndex = 0;
                this.cardsPerView = this.getCardsPerView();
                
                this.init();
                this.setupEventListeners();
            }

            init() {
                this.createIndicators();
                this.updateCarousel();
                this.updateIndicators();
            }

            getCardsPerView() {
                if (window.innerWidth >= 1024) return 3; // Desktop
                if (window.innerWidth >= 768) return 2;  // Tablet
                return 1; // Mobile
            }

            getTotalSlides() {
                return Math.ceil(this.cards.length / this.cardsPerView);
            }

            createIndicators() {
                this.indicators.innerHTML = '';
                const totalSlides = this.getTotalSlides();
                
                for (let i = 0; i < totalSlides; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'indicator';
                    indicator.addEventListener('click', () => this.goToSlide(i));
                    this.indicators.appendChild(indicator);
                }
            }

            updateCarousel() {
                const cardWidth = 100 / this.cardsPerView;
                const translateX = -(this.currentIndex * cardWidth);
                this.wrapper.style.transform = `translateX(${translateX}%)`;
            }

            updateIndicators() {
                const indicators = this.indicators.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }

            next() {
                const maxIndex = this.getTotalSlides() - 1;
                this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
                this.updateCarousel();
                this.updateIndicators();
            }

            prev() {
                const maxIndex = this.getTotalSlides() - 1;
                this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
                this.updateCarousel();
                this.updateIndicators();
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCarousel();
                this.updateIndicators();
            }

            handleResize() {
                const newCardsPerView = this.getCardsPerView();
                if (newCardsPerView !== this.cardsPerView) {
                    this.cardsPerView = newCardsPerView;
                    this.currentIndex = 0;
                    this.createIndicators();
                    this.updateCarousel();
                    this.updateIndicators();
                }
            }

            setupEventListeners() {
                this.nextBtn.addEventListener('click', () => this.next());
                this.prevBtn.addEventListener('click', () => this.prev());
                
                window.addEventListener('resize', () => this.handleResize());
                
                // Touch/Swipe support
                let startX = 0;
                let startY = 0;
                let isDragging = false;

                this.wrapper.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    isDragging = true;
                });

                this.wrapper.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                });

                this.wrapper.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    
                    const endX = e.changedTouches[0].clientX;
                    const endY = e.changedTouches[0].clientY;
                    const diffX = startX - endX;
                    const diffY = startY - endY;

                    // Verificar se é um swipe horizontal
                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                    
                    isDragging = false;
                });

                // Auto-play (opcional)
                // setInterval(() => this.next(), 5000);
            }
        }

        // Inicializar o carrossel quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', () => {
            new ResponsiveCarousel();
        });

         // Textos para alternar
        const texts = [
            ['Desenvolvedor', 'FRONT-END'],
            ['Designer', 'CRIATIVO'],
            ['Programador', 'INOVADOR'],
            ['Criador', 'DIGITAL'],
            ['Artista', 'VISUAL']
        ];

        let currentIndex = 0;
        const typingElement = document.getElementById('typingText');

        function changeText() {
            // Fade out
            typingElement.style.opacity = '0';
            typingElement.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                const currentText = texts[currentIndex];
                
                typingElement.innerHTML = `
                    <div class="typing-line">${currentText[0]}</div>
                    <div class="typing-line">${currentText[1]}</div>
                `;
                
                // Fade in
                typingElement.style.opacity = '1';
                typingElement.style.transform = 'translateY(0)';
            }, 500);
        }

        // Iniciar animação de troca de texto
        setInterval(changeText, 5000);

        // Efeito de hover aprimorado nos botões
        document.querySelectorAll('.btn-neon').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });

        // CSS para animação de pulse
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: translateY(-3px) scale(1.05); }
                50% { transform: translateY(-3px) scale(1.08); }
                100% { transform: translateY(-3px) scale(1.05); }
            }
        `;
        document.head.appendChild(style);