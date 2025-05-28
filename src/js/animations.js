document.addEventListener('DOMContentLoaded', function() {
    // Animação de partículas no contêiner de contato
    const contactContainer = document.getElementById('contact-container');
    if (contactContainer) {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('contact-particles');
        for (let i = 1; i <= 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('contact-particle', `p${i}`);
            particleContainer.appendChild(particle);
        }
        contactContainer.insertBefore(particleContainer, contactContainer.firstChild);
    }

    // Animações de rolagem
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = 'translateY(50px)';
            }
        });
    }, { threshold: 0.3 });

    scrollElements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Interação de mouse na seção de Projetos
    const projectsContainer = document.getElementById('projects-container');
    if(projectsContainer){
       
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('nav'); // Seleciona o elemento <nav>
    const overlay = document.querySelector('.overlay');

    if (menuToggle && siteNav && overlay) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');

            // Impede a rolagem do corpo da página quando o menu está aberto
            if (siteNav.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
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

        // Opcional: Fechar o menu ao clicar em um link da navegação (útil para SPAs ou navegação na mesma página)
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Verifica se o menu mobile está aberto e se o link não é para abrir em nova aba ou algo do tipo
                if (siteNav.classList.contains('open') && link.getAttribute('target') !== '_blank') {
                    siteNav.classList.remove('open');
                    menuToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

    } else {
        console.warn('Elementos essenciais da navegação (menu-toggle, nav, overlay) não foram encontrados no DOM.');
    }
});
