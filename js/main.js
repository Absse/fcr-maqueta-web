
// ========== Inicializar animaciones de scroll (AOS) ==========
AOS.init({
  duration: 1000,
  once: true
});

// ========== Modal de Contacto ==========
const btnAbrir = document.getElementById('btn-abrir-formulario');
const modal = document.getElementById('modal-contacto');
const btnCerrar = document.getElementById('btn-cerrar-modal');
const overlay = document.querySelector('.modal-overlay');

if (btnAbrir && modal && btnCerrar && overlay) {
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
}

// ========== Header: Cambia color/logo/mundo al hacer scroll ==========
const header = document.querySelector('.main-header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav');
const worldIcon = document.querySelector('#world-icon');
const mobileWorldIcon = document.getElementById('mobile-world-icon');
const logo = document.querySelector('.logo-img');
const body = document.body;
// ===== Menú principal: abrir formulario de contacto desde "Contacto" =====
const menuContacto = document.getElementById('menu-contacto');
if (menuContacto) {
  menuContacto.addEventListener('click', function(e) {
    e.preventDefault(); // Prevenir scroll o reload
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('visible');
    }, 50);

    // Cerrar menú móvil si está abierto
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
}

let isScrolled = false;

// Detecta si la ruta tiene '/en/' para usar ../ (subir un nivel)
let langPrefix = '';
if (
  window.location.pathname.includes('/en/') ||
  window.location.pathname.includes('/pt/')
) {
  langPrefix = '../';
}

// Scroll para cambiar colores sin recargar imágenes
window.addEventListener('scroll', function () {
  const scrolledNow = window.scrollY > 50;
  if (scrolledNow !== isScrolled) {
    isScrolled = scrolledNow;
    header.classList.toggle('scrolled', scrolledNow);
    if (logo) logo.src = `${langPrefix}img/logo-fcr-${scrolledNow ? 'color' : 'blanco'}.svg`;
    if (worldIcon) worldIcon.src = `${langPrefix}img/mundo-idiomas-${scrolledNow ? 'color' : 'blanco'}.svg`;
    if (mobileWorldIcon) mobileWorldIcon.src = `${langPrefix}img/mundo-idiomas-${scrolledNow ? 'color' : 'blanco'}.svg`;
  }
});

// ========== Menú Hamburguesa y Navegación Mobile ==========
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Cierra menú al hacer click en submenú o idioma
document.querySelectorAll('.submenu a, .language-options a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.stopPropagation();
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});

// Cierra menú al hacer click fuera del menú
document.addEventListener('click', function(event) {
  const isMenuOpen = navMenu.classList.contains('open');
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);
  if (isMenuOpen && !clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
  }
});

// ========== Submenú Idioma en Mobile ==========
document.addEventListener('DOMContentLoaded', function() {
  const languageToggleMobile = document.querySelector('.language-toggle-mobile');
  const languageOptionsMobile = document.querySelector('.language-options-mobile');

  if (languageToggleMobile && languageOptionsMobile) {
    languageToggleMobile.addEventListener('click', function(e) {
      e.preventDefault(); 
      languageOptionsMobile.classList.toggle('active');
    });

    // Cierra menú idioma al hacer click fuera
    document.addEventListener('click', function(e) {
      if (!languageToggleMobile.contains(e.target) && !languageOptionsMobile.contains(e.target)) {
        languageOptionsMobile.classList.remove('active');
      }
    });

    // Cierra menú idioma al hacer click en idioma
    languageOptionsMobile.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', function() {
        languageOptionsMobile.classList.remove('active');
      });
    });
  }
  const scrollOffsets = {
    'quienes-somos': { desktop: 170, mobile: 100 },
    'servicios': { desktop: 30, mobile: 30 },
    'clientes': { desktop: 30, mobile: 30 }
  };

  function getOffset(id) {
    const isMobile = window.innerWidth < 768;
    const sectionOffsets = scrollOffsets[id];
    if (!sectionOffsets) return isMobile ? 80 : 120;
    return isMobile ? sectionOffsets.mobile : sectionOffsets.desktop;
  }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = getOffset(id);
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        // --- Esto es solo para la sección de clientes, puedes dejarlo igual ---
        const clienteName = this.getAttribute('data-cliente');
        if (clienteName) {
          setTimeout(() => {
            mostrarClientePorNombre(clienteName);
            const clienteObj = clientes.find(c => c.nombre.toLowerCase() === clienteName.toLowerCase());
            function normalizarNombre(nombre) {
              // Quita tildes y pasa a minúsculas, reemplaza espacios por guiones
              return nombre
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
                .toLowerCase()
                .replace(/\s+/g, '-');
            }
            const idLogo = 'logo-' + normalizarNombre(clienteName);
            highlightLogoCliente(idLogo, clienteObj?.color);
          }, 600); // espera a que termine el scroll (~0.5s)
        }
        // --- Fin sección clientes ---
      }
    });
  });

  // Bloquear números en nombre y apellido al escribir
  function bloquearNumeros(e) {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  }
  document.getElementById('nombre').addEventListener('keydown', bloquearNumeros);
  document.getElementById('apellido').addEventListener('keydown', bloquearNumeros);

  // === INTERNACIONALIZACIÓN: Detectar idioma actual según ruta ===
let lang = 'es'; // por defecto español
if (window.location.pathname.includes('/en/')) lang = 'en';
if (window.location.pathname.includes('/pt/')) lang = 'pt';

// === Mensajes de error personalizados por idioma ===
const mensajes = {
  es: {
    errorNombre: "Sólo letras, mínimo 3 caracteres.",
    errorApellido: "Sólo letras, mínimo 3 caracteres.",
    errorEmail: "Formato de email no válido.",
    errorMensaje: "El mensaje debe tener entre 10 y 500 caracteres.",
  },
  en: {
    errorNombre: "Only letters, at least 3 characters.",
    errorApellido: "Only letters, at least 3 characters.",
    errorEmail: "Invalid email format.",
    errorMensaje: "The message must be between 10 and 500 characters.",
  },
  pt: {
    errorNombre: "Apenas letras, mínimo 3 caracteres.",
    errorApellido: "Apenas letras, mínimo 3 caracteres.",
    errorEmail: "Formato de e-mail inválido.",
    errorMensaje: "A mensagem deve ter entre 10 e 500 caracteres.",
  }
};

  // Validación y mensajes de error al enviar
  document.getElementById('form-contacto').addEventListener('submit', function (e) {
    let valido = true;

    // Nombre solo letras
    const nombre = document.getElementById('nombre');
    const errorNombre = document.getElementById('error-nombre');
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,}$/.test(nombre.value.trim())) {
      errorNombre.textContent = mensajes[lang].errorNombre;
      valido = false;
    } else {
      errorNombre.textContent = "";
    }

    // Apellido solo letras
    const apellido = document.getElementById('apellido');
    const errorApellido = document.getElementById('error-apellido');
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,}$/.test(apellido.value.trim())) {
      errorApellido.textContent = mensajes[lang].errorApellido;
      valido = false;
    } else {
      errorApellido.textContent = "";
    }

    // Email formato
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('error-email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      errorEmail.textContent = mensajes[lang].errorEmail;
      valido = false;
    } else {
      errorEmail.textContent = "";
    }

    // Mensaje: mínimo 10, máximo 300
    const mensaje = document.getElementById('mensaje');
    const errorMensaje = document.getElementById('error-mensaje');
    if (mensaje.value.trim().length < 10 || mensaje.value.trim().length > 500) {
      errorMensaje.textContent = mensajes[lang].errorMensaje;
      valido = false;
    } else {
      errorMensaje.textContent = "";
    }

    if (!valido) e.preventDefault();
  });

  // Contador de caracteres en mensaje
  const mensaje = document.getElementById('mensaje');
  const contador = document.getElementById('contador-mensaje');
  mensaje.addEventListener('input', function () {
    contador.textContent = `${mensaje.value.length}/500`;
    if (mensaje.value.length > 500) mensaje.value = mensaje.value.slice(0, 500);
  });
});

// ========== Animación de entrada para servicios ==========
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

// ========== Swiper Clientes: configuración e interacción ==========

let clientes = [];
if (window.location.pathname.includes('/en/')) {
  clientes = [
    {
      nombre: "Colbún",
      color: "#043c84",
      proyectos: [
        "Basis Support for SAP Operations and Projects",
        "Implementation of SAP Replication Server (SLT)",
        "Implementation of Single Sign On (SSO)"
      ]
    },
    {
      nombre: "Sigdo Koopers",
      color: "#54545c",
      proyectos: [
        "Implementation of SAP Replication Server (SLT)",
        "Implementation of HANA Data Tiering"
      ]
    },
    {
      nombre: "Grupo Saesa",
      color: "#4c1cfc",
      proyectos: [
        "Implementation of GRC Access Control ECC + IS-U",
        "Basis Support for SAP IS-U Implementation Project",
        "Implementation of Roles and Profiles for ECC and IS-U",
        "Implementation of SAP Replication Server (SLT)"
      ]
    },
    {
      nombre: "Enel Brasil",
      color: "#00ac4b",
      proyectos: [
        "Remediation of Roles and Profiles"
      ]
    },
    {
      nombre: "Latam Airlines",
      color: "#3c448c",
      proyectos: [
        "GRC Access Control Migration and Access Risk Matrix Update",
        "Roles and Profiles Remediation for S/4HANA Conversion"
      ]
    },
    {
      nombre: "Carozzi",
      color: "#e40414",
      proyectos: [
        "GRC Access Control Migration and Access Risk Matrix Update",
        "Roles and Profiles Remediation for S/4HANA Conversion"
      ]
    },
    {
      nombre: "Parque Arauco",
      color: "#0065ad",
      proyectos: [
        "GRC Access Control Migration and Access Risk Matrix Update",
        "Roles and Profiles Remediation for S/4HANA Conversion"
      ]
    },
    {
      nombre: "Mutual de Seguridad",
      color: "#c4d600",
      proyectos: [
        "Support of Roles and Profiles",
        "SAP ECC to SAP RISE Migration"
      ]
    },
    {
      nombre: "Codelco",
      color: "#e44c04",
      proyectos: [
        "GRC Access Control Migration and Access Risk Matrix Update",
        "Roles and Profiles Remediation for S/4HANA Conversion",
        "Implementation of GRC Risk Management",
        "Implementation of GRC Process Control"
      ]
    }
  ];
} else if (window.location.pathname.includes('/pt/')) {
  clientes = [
    {
      nombre: "Colbún",
      color: "#043c84",
      proyectos: [
        "Suporte Basis para Operações e Projetos SAP",
        "Implementação do SAP Replication Server (SLT)",
        "Implementação do Single Sign On (SSO)"
      ]
    },
    {
      nombre: "Sigdo Koopers",
      color: "#54545c",
      proyectos: [
        "Implementação do SAP Replication Server (SLT)",
        "Implementação do HANA Data Tiering"
      ]
    },
    {
      nombre: "Grupo Saesa",
      color: "#4c1cfc",
      proyectos: [
        "Implementação do GRC Access Control ECC + IS-U",
        "Suporte Basis para Projeto de Implementação SAP IS-U",
        "Implementação de Papéis e Perfis para ECC e IS-U",
        "Implementação do SAP Replication Server (SLT)"
      ]
    },
    {
      nombre: "Enel Brasil",
      color: "#00ac4b",
      proyectos: [
        "Remediação de Papéis e Perfis"
      ]
    },
    {
      nombre: "Latam Airlines",
      color: "#3c448c",
      proyectos: [
        "Migração do GRC Access Control e atualização da matriz de risco de acesso",
        "Remediação de Papéis e Perfis para conversão ao S/4HANA"
      ]
    },
    {
      nombre: "Carozzi",
      color: "#e40414",
      proyectos: [
        "Migração do GRC Access Control e atualização da matriz de risco de acesso",
        "Remediação de Papéis e Perfis para conversão ao S/4HANA"
      ]
    },
    {
      nombre: "Parque Arauco",
      color: "#0065ad",
      proyectos: [
        "Migração do GRC Access Control e atualização da matriz de risco de acesso",
        "Remediação de Papéis e Perfis para conversão ao S/4HANA"
      ]
    },
    {
      nombre: "Mutual de Seguridad",
      color: "#c4d600",
      proyectos: [
        "Suporte de Papéis e Perfis",
        "Migração do SAP ECC para SAP RISE"
      ]
    },
    {
      nombre: "Codelco",
      color: "#e44c04",
      proyectos: [
        "Migração do GRC Access Control e atualização da matriz de risco de acesso",
        "Remediação de Papéis e Perfis para conversão ao S/4HANA",
        "Implementação do GRC Risk Management",
        "Implementação do GRC Process Control"
      ]
    }
  ];
} else {
  clientes = [
      {
      nombre: "Colbún",
      color: "#043c84",
      proyectos: [
        "Soporte Basis Operación y Proyectos SAP",
        "Implementación de SAP Replication Server (SLT)",
        "Implementación de Single Sign On (SSO)"
      ]
    },
    {
      nombre: "Sigdo Koopers",
      color: "#54545c",
      proyectos: [
        "Implementación de SAP Replication Server (SLT)",
        "Implementación de HANA Data Tiering"
      ]
    },
    {
      nombre: "Grupo Saesa",
      color: "#4c1cfc",
      proyectos: [
        "Implementación GRC Access Control ECC + IS-U",
        "Soporte Basis Proyecto implementación SAP IS-U",
        "Implementación de Roles y Perfiles para ECC e IS-U",
        "Implementación de SAP Replication Server (SLT)"
      ]
    },
    {
      nombre: "Enel Brasil",
      color: "#00ac4b",
      proyectos: [
        "Remediación de Roles y Perfiles"
      ]
    },
    {
      nombre: "Latam Airlines",
      color: "#3c448c",
      proyectos: [
        "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
        "Remediación de Roles y Perfiles por conversión a S/4HANA"
      ]
    },
    {
      nombre: "Carozzi",
      color: "#e40414",
      proyectos: [
        "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
        "Remediación de Roles y Perfiles por conversión a S/4HANA"
      ]
    },
    {
      nombre: "Parque Arauco",
      color: "#0065ad",
      proyectos: [
        "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
        "Remediación de Roles y Perfiles por conversión a S/4HANA"
      ]
    },
    {
      nombre: "Mutual de Seguridad",
      color: "#c4d600",
      proyectos: [
        "Soporte de Roles y Perfiles",
        "Migración SAP ECC a SAP RISE"
      ]
    },
    {
      nombre: "Codelco",
      color: "#e44c04",
      proyectos: [
        "Migración GRC Access Control y actualización de matriz de riesgo de acceso",
        "Remediación de Roles y Perfiles por conversión a S/4HANA",
        "Implementación GRC Risk Management",
        "Implementación GRC Procesos Control"
      ]
    }
  ];
}
// ========== Actualiza info dinámica de clientes ==========
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
    borde.style.boxShadow = `0 0 15px 4px ${clienteActual.color}, 0 0 28px 8px ${hexToRgba(clienteActual.color, 0.18)}`;
  } else {
    borde.style.backgroundColor = 'var(--color-primario)';
    borde.style.boxShadow = 'none';
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

// ========== Hexadecimal a RGBA ==========
function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0,2), 16);
  let g = parseInt(hex.substring(2,4), 16);
  let b = parseInt(hex.substring(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ========== Inicializar Swiper + eventos ==========
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

// Clic en logo de cliente para centrarlo y pausar autoplay
document.querySelectorAll('.clientes-swiper .swiper-slide').forEach((slide) => {
  slide.addEventListener('click', () => {
    const realIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    swiper.slideToLoop(realIndex, 500, true);

    // 🔥 Pausar autoplay después del click
    swiper.autoplay.stop(); 
    setTimeout(() => {
      swiper.autoplay.start();
    }, 8000);

    // 🔥 Forzar recalcular layout después de centrar
    setTimeout(() => {
      swiper.update(); // 🚀 Esto re-calcula visibilidad, espacios y vuelve a mostrar 5 logos
    }, 550); // esperar que termine el slide antes de actualizar
  });
});

// Ejecutar info de cliente al cargar página
updateClienteInfo(swiper);

// ========== Pausar autoplay al pasar mouse por cliente ==========
const swiperContainer = document.querySelector('.clientes-swiper');
const clienteInfoContainer = document.getElementById('cliente-info');

clienteInfoContainer.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

clienteInfoContainer.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});

function mostrarClientePorNombre(nombre) {
  // Busca el índice del cliente por nombre
  const idx = clientes.findIndex(c => c.nombre.toLowerCase() === nombre.toLowerCase());
  if (idx !== -1 && typeof swiper !== "undefined") {
    swiper.slideToLoop(idx, 500, true);
  }
}

function highlightLogoCliente(idLogo, color) {
  const logoEl = document.getElementById(idLogo);
  if (!logoEl) return;
  // Usa CSS custom property para el color dinámico
  logoEl.style.setProperty('--logo-glow', color || '#ffe167');
  logoEl.classList.add('logo-highlight');
  setTimeout(() => {
    logoEl.classList.remove('logo-highlight');
    logoEl.style.removeProperty('--logo-glow');
  }, 1400);
}