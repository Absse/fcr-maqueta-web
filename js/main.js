// Iniciar AOS (animaciones scroll)
AOS.init({
    duration: 1000,
    once: true
  });
  
  // Iniciar Swiper (carrusel clientes)
  const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 2,
      },
    },
  });

  const testimoniosSwiper = new Swiper('.testimonios-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    effect: 'fade'
  });

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    const logo = document.querySelector('.logo-img');
    const worldIcon = document.querySelector('#world-icon');
  
    if (!header || !logo) return; // prevención por si no existe
  
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      logo.src = 'img/logo-fcr-color.svg';
      worldIcon.src = 'img/mundo-idiomas-color.svg'; // cambia a ícono azul
    } else {
      header.classList.remove('scrolled');
      logo.src = 'img/logo-fcr-blanco.svg';
      worldIcon.src = 'img/mundo-idiomas-blanco.svg'; // vuelve al blanco
    }
  });