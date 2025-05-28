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
