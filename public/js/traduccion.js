(() => {
  if (window.translationsLoaded) return;
  window.translationsLoaded = true;

  // ---------- ESTILOS GLOBALES (fade + toast) ----------
  if (!document.getElementById('lang-global-styles')) {
    const style = document.createElement('style');
    style.id = 'lang-global-styles';
    style.textContent = `
      /* Animación fade para los textos al cambiar idioma */
      .lang-text-fade {
        animation: langFadeAnimation 0.2s ease-in-out;
      }
      @keyframes langFadeAnimation {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
      /* Toast de notificación de idioma */
      #language-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        color: white;
        padding: 12px 24px;
        border-radius: 48px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.2);
        font-size: 1rem;
      }
      #language-toast.show {
        opacity: 1;
      }
      #language-toast svg {
        width: 28px;
        height: 28px;
        display: block;
      }
      @media (max-width: 640px) {
        #language-toast {
          bottom: 20px;
          padding: 8px 20px;
        }
        #language-toast svg {
          width: 24px;
          height: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ---------- TRADUCCIONES COMPLETAS ----------
  const translations = {
    es: {
      // Navbar
      aboutme: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contactme: "Contáctame",
      // Sobre Mí
      profTitle: "Desarrollador Web Frontend",
      intro: "Desarrollador web con <strong class='font-semibold text-cyan-400'>más de 1 año de experiencia</strong> en proyectos empresariales. Especializado en sistemas privados y soluciones escalables para empresas. Comprometido con el aprendizaje continuo y las mejores prácticas tecnológicas.",
      cv: "Ver CV",
      // Habilidades
      skillsTittle: "Habilidades",
      // Proyectos
      projectsTittle: "Proyectos",
      tiempoModaTittle: "Tiempo Moda",
      tiempoModaDate: "Enero 2026 - Abril 2026",
      tiempoModaTittleExpanded: "Tiempo Moda",
      tiempoModaDataExpanded: "E-commerce hecho en colaboración con un equipo de desarrollo. Este proyecto se desarrollo en base a las espectativas y requisitos del cliente junto a la libertad creativa que se me ha dado para crear la interfaz de la página.",
      tiempoModaLinkExpanded: "Abrir Proyecto",
      distritoJaponesTittle: "Distrito Japones",
      distritoJaponesDate: "Febrero 2026 - Junio 2026",
      distritoJaponesTittleExpanded: "Distrito Japones",
      distritoJaponesDataExpanded: "Diseñé y desarrollé la interfaz de una plataforma de comercio electrónico moderna desarrollada para la venta digital de contenido japonés oficial como anime, música y videografía mediante cangeo de monedas virtuales. <br> <span class='text-cyan-400 font-semibold'>PROYECTO DE PRÁCTICA</span>",
      distritoJaponesLinkExpanded: "Abrir Proyecto",
      cateSISDate: "Octubre 2025 - Diciembre 2025",
      cateSISDataExpanded: "Diseñé y desarrollé la interfáz de un sistema web académico de catesismo para una escuela Católica en Otavalo, Ecuador. <br> <span class='text-cyan-400 font-semibold'>SISTEMA PRIVADO</span>",
      cateSISLinkExpanded: "Abrir Proyecto",
      statifyDate: 'Septiembre 2024 - Junio 2025',
      statifyDataExpanded: 'Sistema Web de registro, reporte y visualización de datos estadísticos sobre incidentes y siniestros de la zona norte de la provincia Imbabura en Ecuador para la empresa de movilidad Movidelnor EP mediante gráficas interactivas.',
      statifyLinkExpanded: 'Abrir Proyecto',
      contadorFallecidosTittle: 'Contador de fallecidos y lesionados',
      contadorFallecidosDate: 'Marzo 2024 - Julio 2024',
      contadorFallecidosTittleExpanded: 'Contador de fallecidos y lesionados',
      contadorFallecidosDataExpanded: 'Página web desarrollada para llevar un registro actualizado de fallecidos y lesionados en la provincia de Imbabura en Ecuador para la empresa de movilidad Movidelnor EP en Ibarra Ecuador mediante un promedio semanal calculado por la misma empresa.',
      contadorFallecidosLinkExpanded: 'Abrir Proyecto',
      // Contacto
      contactTittle: 'Contáctame',
      contactLabelName: 'Nombre completo',
      contactLabelEmail: 'Correo electrónico',
      contactLabelMessage: 'Mensaje',
      contactbutton: 'Enviar mensaje',
      contactNamePlaceholder: "Escriba su nombre",
      contactEmailPlaceholder: "tu.correo@empresa.com",
      contactMessagePlaceholder: "Hola Franly..."
    },
    en: {
      // Navbar
      aboutme: "About Me",
      skills: "Skills",
      projects: "Projects",
      contactme: "Contact Me",
      // Sobre Mí
      profTitle: "Frontend Web Developer",
      intro: "Web developer with <strong class='font-semibold text-cyan-400'>more than 1 year of experience</strong> in enterprise projects. Specialized in private systems and scalable solutions for companies. Committed to continuous learning and best technological practices.",
      cv: "View CV",
      // Habilidades
      skillsTittle: "Skills",
      // Proyectos
      projectsTittle: "Projects",
      tiempoModaTittle: "Time Fashion",
      tiempoModaDate: "January 2026 - April 2026",
      tiempoModaTittleExpanded: "Time Fashion",
      tiempoModaDataExpanded: "E-commerce site created in collaboration with a development team. This project was developed based on the clients expectations and requirements, along with the creative freedom I was given to design the website interface.",
      tiempoModaLinkExpanded: "Open Project",
      distritoJaponesTittle: "Japanese District",
      distritoJaponesDate: "February 2026 - June 2026",
      distritoJaponesTittleExpanded: "Japanese District",
      distritoJaponesDataExpanded: "I designed and developed the interface of a modern e-commerce platform developed for the digital sale of official Japanese content such as anime, music and videography through the exchange of virtual currencies. <br> <span class='text-cyan-400 font-semibold'>PRACTICE PROJECT</span>",
      distritoJaponesLinkExpanded: "Open Project",
      cateSISDate: "October 2025 - December 2025",
      cateSISDataExpanded: "I designed and developed the interface for an academic catechism web system for a Catholic school in Otavalo, Ecuador. <br> <span class='text-cyan-400 font-semibold'>PRIVATE SYSTEM</span>",
      cateSISLinkExpanded: "Open Project",
      statifyDate: 'September 2024 - June 2025',
      statifyDataExpanded: 'Web system for registering, reporting and visualizing statistical data on incidents and accidents in the northern area of the Imbabura province in Ecuador for the mobility company Movidelnor EP through interactive graphics.',
      statifyLinkExpanded: 'Open Project',
      contadorFallecidosTittle: 'Counter of deaths and injuries',
      contadorFallecidosDate: 'March 2024 - July 2024',
      contadorFallecidosTittleExpanded: 'Counter of deaths and injuries',
      contadorFallecidosDataExpanded: 'Website developed to keep an updated record of deaths and injuries in the province of Imbabura in Ecuador for the mobility company Movidelnor EP in Ibarra Ecuador using a weekly average calculated by the company itself.',
      contadorFallecidosLinkExpanded: 'Open Project',
      // Contacto
      contactTittle: 'Contact me',
      contactLabelName: 'Full name',
      contactLabelEmail: 'Email',
      contactLabelMessage: 'Message',
      contactbutton: 'Send message',
      contactNamePlaceholder: "Enter your name",
      contactEmailPlaceholder: "your.email@company.com",
      contactMessagePlaceholder: "Hi Franly..."
    }
  };

  // ---------- FUNCIONES CON ANIMACIÓN FADE ----------
  const addFadeAnimation = (element) => {
    if (!element) return;
    element.classList.remove('lang-text-fade');
    void element.offsetWidth;  // Forzar reflow
    element.classList.add('lang-text-fade');
    setTimeout(() => {
      if (element) element.classList.remove('lang-text-fade');
    }, 200);
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = value;
      addFadeAnimation(el);
    }
  };
  const setHtml = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = value;
      addFadeAnimation(el);
    }
  };
  const setPlaceholder = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = value;
    // No se aplica fade al placeholder (opcional)
  };

  let currentLang = localStorage.getItem("lang") || "es";

  // ---------- TOAST DE IDIOMA CON BANDERAS ----------
  let toastTimeout = null;
  const toastBaseUrl = '/Portafolio-FranlyAlvarezVarona/icons.svg'; // Ruta del sprite

  // Crear el contenedor del toast si no existe
  if (!document.getElementById('language-toast')) {
    const toastDiv = document.createElement('div');
    toastDiv.id = 'language-toast';
    document.body.appendChild(toastDiv);
  }

  function showLanguageToast(lang) {
    const toast = document.getElementById('language-toast');
    if (!toast) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    const iconId = lang === 'es' ? 'icon-espana' : 'icon-uk';
    toast.innerHTML = `
      <svg width="28" height="28">
        <use href="${toastBaseUrl}#${iconId}" />
      </svg>
      <span>${lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English'}</span>
    `;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  }

  // ---------- APLICAR IDIOMA (con todas las actualizaciones) ----------
  function applyLanguage(lang) {
    // Navbar
    setText("aboutme", translations[lang].aboutme);
    setText("skills", translations[lang].skills);
    setText("projects", translations[lang].projects);
    setText("contactme", translations[lang].contactme);

    // Sobre Mí
    setText("professional-title", translations[lang].profTitle);
    setHtml("intro-text", translations[lang].intro);
    setText("cv-button", translations[lang].cv);

    // Habilidades
    setText("skillsTittle", translations[lang].skillsTittle);

    // Proyectos
    setText("projectsTittle", translations[lang].projectsTittle);
    setText("tiempoModaTittle", translations[lang].tiempoModaTittle);
    setText("tiempoModaDate", translations[lang].tiempoModaDate);
    setText("tiempoModaTittleExpanded", translations[lang].tiempoModaTittleExpanded);
    setHtml("tiempoModaDataExpanded", translations[lang].tiempoModaDataExpanded);
    setText("tiempoModaLinkExpanded", translations[lang].tiempoModaLinkExpanded);

    setText("distritoJaponesTittle", translations[lang].distritoJaponesTittle);
    setText("distritoJaponesDate", translations[lang].distritoJaponesDate);
    setText("distritoJaponesTittleExpanded", translations[lang].distritoJaponesTittleExpanded);
    setHtml("distritoJaponesDataExpanded", translations[lang].distritoJaponesDataExpanded);
    setText("distritoJaponesLinkExpanded", translations[lang].distritoJaponesLinkExpanded);

    setText("cateSISDate", translations[lang].cateSISDate);
    setHtml("cateSISDataExpanded", translations[lang].cateSISDataExpanded);
    setText("cateSISLinkExpanded", translations[lang].cateSISLinkExpanded);

    setText("statifyDate", translations[lang].statifyDate);
    setHtml("statifyDataExpanded", translations[lang].statifyDataExpanded);
    setText("statifyLinkExpanded", translations[lang].statifyLinkExpanded);

    setText("contadorFallecidosTittle", translations[lang].contadorFallecidosTittle);
    setText("contadorFallecidosDate", translations[lang].contadorFallecidosDate);
    setText("contadorFallecidosTittleExpanded", translations[lang].contadorFallecidosTittleExpanded);
    setHtml("contadorFallecidosDataExpanded", translations[lang].contadorFallecidosDataExpanded);
    setText("contadorFallecidosLinkExpanded", translations[lang].contadorFallecidosLinkExpanded);

    // Contacto (textos)
    setText("contactTittle", translations[lang].contactTittle);
    setText("contactLabelName", translations[lang].contactLabelName);
    setText("contactLabelEmail", translations[lang].contactLabelEmail);
    setText("contactLabelMessage", translations[lang].contactLabelMessage);
    setText("contactbutton", translations[lang].contactbutton);

    // Placeholders del formulario
    setPlaceholder("name", translations[lang].contactNamePlaceholder);
    setPlaceholder("email", translations[lang].contactEmailPlaceholder);
    setPlaceholder("message", translations[lang].contactMessagePlaceholder);

    // Indicador de idioma (si existe)
    const langIndicator = document.getElementById("lang-indicator");
    if (langIndicator) {
      langIndicator.innerText = lang.toUpperCase();
      addFadeAnimation(langIndicator);
    }

    // Guardar en localStorage
    localStorage.setItem("lang", lang);
    currentLang = lang;

    // Actualizar mensajes visibles del formulario (alertas, éxito, error)
    if (typeof window.refreshVisibleMessages === 'function') {
      window.refreshVisibleMessages();
    }
  }

  // ---------- TOGGLE + TOAST ----------
  function toggleLanguage() {
    const newLang = currentLang === "es" ? "en" : "es";
    applyLanguage(newLang);
    showLanguageToast(newLang);   // Notificación con bandera
  }

  // ---------- INICIALIZACIÓN ----------
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "es" || savedLang === "en") {
      applyLanguage(savedLang);
    } else {
      applyLanguage("es");
    }
  });

  // Exponer la función para el botón (onclick="toggleLang()")
  window.toggleLang = toggleLanguage;
})();