 // Menu mobile funcional
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');

    function openMenu() {
      nav.classList.add('open');
      overlay.classList.add('active');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      nav.classList.remove('open');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    menuToggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    overlay.addEventListener('click', closeMenu);
    // Fecha menu ao clicar em link
    nav.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('click', closeMenu);
    });
    // Acessibilidade: abrir menu com Enter/Espaço
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        menuToggle.click();
      }
    });

     // Efeito de máquina de escrever apenas no h2
    function typeWriter(element, text, delay = 250, callback) { // <-- delay ainda mais lento
      let i = 0;
      element.innerHTML = '';
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.textContent = '|';
      element.appendChild(cursor);

      function type() {
        if (i <= text.length) {
          element.innerHTML = text.slice(0, i) + cursor.outerHTML;
          i++;
          setTimeout(type, delay);
        } else {
          element.innerHTML = text; // Remove cursor ao terminar
          if (callback) callback();
        }
      }
      type();
    }

    window.addEventListener('DOMContentLoaded', () => {
      const h2 = document.getElementById('about-typer-title');
      typeWriter(h2, 'Sobre Mim', 200); // <-- delay ainda mais lento
    });

      // Simulação de envio de formulário (apenas frontend)
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = "Enviando...";
      setTimeout(() => {
        status.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
        form.reset();
        setTimeout(() => status.textContent = "", 4000);
      }, 1200);
    });
  });

