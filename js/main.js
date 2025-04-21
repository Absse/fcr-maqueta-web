
// Iniciar AOS (animaciones scroll)
AOS.init({
  duration: 1000,
  once: true
});

const btnAbrir = document.getElementById('btn-abrir-formulario');
const modal = document.getElementById('modal-contacto');
const btnCerrar = document.getElementById('btn-cerrar-modal');
const overlay = document.querySelector('.modal-overlay');

// Abrir Modal
btnAbrir.addEventListener('click', () => {
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('visible');
  }, 50);
});

// Cerrar Modal
btnCerrar.addEventListener('click', () => {
  modal.classList.remove('visible');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
});

// Cerrar al hacer click en el overlay
overlay.addEventListener('click', () => {
  modal.classList.remove('visible');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
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

//SERVICIOS

const elementosAnimados = document.querySelectorAll('[data-animacion]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animar');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

elementosAnimados.forEach(el => {
  observer.observe(el);
});

//CLIENTES

// Datos de clientes
const clientes = [
  {
    nombre: "Colbún",
    color: "#0061A8",
    proyectos: [
      "Soporte Basis Operación y Proyectos SAP",
      "Implementación de SAP Replication Server (SLT)",
      "Implementación de Single Sign On (SSO)"
    ]
  },
  {
    nombre: "Sigdo Koopers",
    color: "#5F4B8B",
    proyectos: [
      "Implementación de SAP Replication Server (SLT)",
      "Implementación de HANA Data Tiering"
    ]
  },
  {
    nombre: "Grupo Saesa",
    proyectos: [
      "Implementación GRC Access Control ECC + IS-U",
      "Soporte Basis Proyecto implementación SAP IS-U",
      "Implementación de Roles y Perfiles para ECC e IS-U",
      "Implementación de SAP Replication Server (SLT)"
    ]
  },
  {
    nombre: "Latam Airlines",
    proyectos: [
      "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
      "Remediación de Roles y Perfiles por conversión a S/4HANA"
    ]
  },
  {
    nombre: "Carozzi",
    proyectos: [
      "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
      "Remediación de Roles y Perfiles por conversión a S/4HANA"
    ]
  },
  {
    nombre: "Codelco",
    proyectos: [
      "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
      "Remediación de Roles y Perfiles por conversión a S/4HANA",
      "Implementación GRC Risk Management",
      "Implementación GRC Procesos Control"
    ]
  }
];

// Actualizar contenido dinámico
function updateClienteInfo(swiper) {
  const activeIndex = swiper.realIndex;
  const clienteActual = clientes[activeIndex % clientes.length];

  const nombre = document.querySelector('.cliente-nombre');
  const proyecto = document.querySelector('.cliente-proyecto');
  const infoContainer = document.getElementById('cliente-info');
  const borde = document.querySelector('.cliente-borde');

  // Cambiar el contenido
  nombre.textContent = clienteActual.nombre;
  proyecto.innerHTML = `Proyectos realizados:<ul>${clienteActual.proyectos.map(proy => `<li>${proy}</li>`).join('')}</ul>`;

  // Cambiar el color del borde directamente
  if (clienteActual.color) {
    borde.style.backgroundColor = clienteActual.color;
  } else {
    borde.style.backgroundColor = 'var(--color-primario)';
  }

  borde.classList.add('glow');
  setTimeout(() => {
    borde.classList.remove('glow');
  }, 800); // duración de la iluminación

  // Animar aparición
  infoContainer.classList.remove('show');
  setTimeout(() => {
    infoContainer.classList.add('show');
  }, 100);
}

// Inicializar Swiper
const swiper = new Swiper('.clientes-swiper', {
  loop: true,
  centeredSlides: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: {            // 👈 desde 0px hasta 767px
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 10, //
    },
    768: {          // 👈 desde 768px hasta 990px
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 20,
    },
    991: {          // 👈 desde 991px para arriba
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 30,
    }
  },
  on: {
    slideChange: function () {
      updateClienteInfo(this);
    }
  }
});

// Agregar click en logos para cambiar de cliente
document.querySelectorAll('.clientes-swiper .swiper-slide').forEach((slide) => {
  slide.addEventListener('click', () => {
    const realIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    swiper.slideToLoop(realIndex, 500, true);

    // 🔥 Pausar autoplay después del click
    swiper.autoplay.stop(); 
    setTimeout(() => {
      swiper.autoplay.start();
    }, 8000); // pausa 8 segundos antes de volver a girar
  });
});

// Ejecutar al cargar
updateClienteInfo(swiper);

// Pausar al pasar el mouse por encima de los logos
const swiperContainer = document.querySelector('.clientes-swiper');

// Pausar al pasar el mouse por encima de la tarjeta de cliente
const clienteInfoContainer = document.getElementById('cliente-info');

clienteInfoContainer.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

clienteInfoContainer.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});