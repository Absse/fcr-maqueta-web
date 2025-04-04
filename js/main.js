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
  