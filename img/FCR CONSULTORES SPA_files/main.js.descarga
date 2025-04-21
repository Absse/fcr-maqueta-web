
// Iniciar AOS (animaciones scroll)
AOS.init({
  duration: 1000,
  once: true
});

// Variables del DOM
const header = document.querySelector('.main-header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav');
const worldIcon = document.querySelector('#world-icon');
const mobileWorldIcon = document.getElementById('mobile-world-icon');
const logo = document.querySelector('.logo-img');
const body = document.body;

let isScrolled = false;

// Scroll para cambiar colores sin recargar imágenes
window.addEventListener('scroll', function () {
  const scrolledNow = window.scrollY > 50;
  if (scrolledNow !== isScrolled) {
    isScrolled = scrolledNow;
    header.classList.toggle('scrolled', scrolledNow);
    logo.src = `img/logo-fcr-${scrolledNow ? 'color' : 'blanco'}.svg`;
    worldIcon.src = `img/mundo-idiomas-${scrolledNow ? 'color' : 'blanco'}.svg`;
    mobileWorldIcon.src = `img/mundo-idiomas-${scrolledNow ? 'color' : 'blanco'}.svg`;
  }
});

// Evento click para abrir/cerrar menú hamburguesa
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Cerrar menú mobile solo al hacer click en submenús o idiomas
document.querySelectorAll('.submenu a, .language-options a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.stopPropagation();
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});

// Cerrar menú mobile al hacer click afuera
document.addEventListener('click', function(event) {
  const isMenuOpen = navMenu.classList.contains('open');
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);
  if (isMenuOpen && !clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
  }
});

// Swiper Clientes
const swiper = new Swiper('.swiper', {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
  autoplay: { delay: 2500, disableOnInteraction: false },
  breakpoints: {
    768: { slidesPerView: 3 },
    480: { slidesPerView: 2 },
  },
});

// Swiper Testimonios
const testimoniosSwiper = new Swiper('.testimonios-swiper', {
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 6000, disableOnInteraction: false },
  effect: 'fade'
});

// Funciones para idioma en mobile
document.addEventListener('DOMContentLoaded', function() {
  const languageToggleMobile = document.querySelector('.language-toggle-mobile');
  const languageOptionsMobile = document.querySelector('.language-options-mobile');

  if (languageToggleMobile && languageOptionsMobile) {
    languageToggleMobile.addEventListener('click', function(e) {
      e.preventDefault(); 
      languageOptionsMobile.classList.toggle('active');
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', function(e) {
      if (!languageToggleMobile.contains(e.target) && !languageOptionsMobile.contains(e.target)) {
        languageOptionsMobile.classList.remove('active');
      }
    });

    // Cerrar menú de idiomas al hacer click en un idioma
    languageOptionsMobile.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', function() {
        languageOptionsMobile.classList.remove('active');
      });
    });
  }
});
