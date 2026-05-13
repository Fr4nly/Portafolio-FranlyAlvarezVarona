/////////////////////////////////////////////////////////////////////////////////////////
// SISTEMA DE ENVÍO DE CORREOS CON EMAILJS + TRADUCCIÓN DE MENSAJES
/////////////////////////////////////////////////////////////////////////////////////////

// Configuración de EmailJS (REEMPLAZA CON TUS VALORES REALES)
const EMAILJS_CONFIG = {
  serviceId: 'service_wsitxod',              // Tu Service ID
  templateId: 'template-arbuz1218039607',    // Tu Template ID
  publicKey: 'R381QsKgvbWdj9tI-'             // Tu Public Key
};

// ---------- TRADUCCIONES para los mensajes del formulario ----------
const emailTranslations = {
  es: {
    // Errores de validación
    nameRequired: 'Por favor, ingresa tu nombre completo',
    nameMinLength: 'El nombre debe tener al menos 2 caracteres',
    nameMaxLength: 'El nombre no puede exceder los 100 caracteres',
    emailRequired: 'Por favor, ingresa tu correo electrónico',
    emailInvalid: 'Por favor, ingresa un correo electrónico válido',
    messageRequired: 'Por favor, escribe tu mensaje',
    messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
    messageMaxLength: 'El mensaje no puede exceder los 2000 caracteres',
    // Inicialización fallida
    initErrorTitle: 'Error al cargar el servicio de correo',
    initErrorText: 'Intenta recargar la página o contáctame directamente a franlydev@gmail.com.',
    // Éxito
    successTitle: '¡Mensaje enviado con éxito!',
    successText: 'Te responderé en breve a tu correo electrónico.',
    // Error en envío
    errorTitle: 'Error al enviar el mensaje',
    errorTextDesktop: 'Por favor, verifica tu conexión o intenta de nuevo más tarde.',
    errorTextMobile: 'Parece que hay un problema con la conexión. Intenta de nuevo o contáctame directamente a franlydev@gmail.com.',
    // Botón en estado de envío
    sendingButtonText: 'Enviando...'
  },
  en: {
    nameRequired: 'Please enter your full name',
    nameMinLength: 'Name must be at least 2 characters',
    nameMaxLength: 'Name cannot exceed 100 characters',
    emailRequired: 'Please enter your email address',
    emailInvalid: 'Please enter a valid email address',
    messageRequired: 'Please write your message',
    messageMinLength: 'Message must be at least 10 characters',
    messageMaxLength: 'Message cannot exceed 2000 characters',
    initErrorTitle: 'Error loading email service',
    initErrorText: 'Try reloading the page or contact me directly at franlydev@gmail.com.',
    successTitle: 'Message sent successfully!',
    successText: 'I will reply to your email shortly.',
    errorTitle: 'Error sending message',
    errorTextDesktop: 'Please check your connection and try again later.',
    errorTextMobile: 'There seems to be a connection problem. Please try again or contact me at franlydev@gmail.com.',
    sendingButtonText: 'Sending...'
  }
};

// Obtener idioma actual (coherente con el resto de la página)
function getCurrentLanguage() {
  const saved = localStorage.getItem('lang');
  return (saved === 'en') ? 'en' : 'es';
}

// Función para obtener un texto traducido
function t(key) {
  const lang = getCurrentLanguage();
  return emailTranslations[lang][key] || emailTranslations.es[key];
}

// ─── NUEVO: estado de los mensajes visibles actualmente ───────────────────────
// Guarda la clave de estado del banner principal del formulario:
//   null            → ningún banner visible
//   'initError'     → error al inicializar EmailJS
//   'success'       → mensaje enviado con éxito
//   { type: 'sendError', isMobile: boolean } → error al enviar
let currentFormMessageState = null;

// Guarda los errores de campo visibles como { fieldId: 'translationKey' }
// Ej: { name: 'nameRequired', email: 'emailInvalid' }
let currentFieldErrors = {};

// ─── NUEVO: función pública que re-renderiza todos los mensajes visibles ──────
// Es llamada por translations.js cada vez que el usuario cambia de idioma,
// de forma que cualquier alerta o mensaje en pantalla se traduce al instante.
window.refreshVisibleMessages = function () {
  // 1. Re-renderizar errores de campo visibles
  Object.entries(currentFieldErrors).forEach(([fieldId, errorKey]) => {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement && !errorElement.classList.contains('hidden')) {
      errorElement.textContent = t(errorKey);
    }
  });

  // 2. Re-renderizar el banner principal del formulario si está visible
  const formMessage = document.getElementById('formMessage');
  if (!formMessage || formMessage.classList.contains('hidden') || !currentFormMessageState) return;

  if (currentFormMessageState === 'initError') {
    formMessage.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span class="font-medium">${t('initErrorTitle')}</span>
      </div>
      <p class="text-sm mt-1">${t('initErrorText')}</p>
    `;
  } else if (currentFormMessageState === 'success') {
    formMessage.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span class="font-medium">${t('successTitle')}</span>
      </div>
      <p class="text-sm mt-1">${t('successText')}</p>
    `;
  } else if (currentFormMessageState?.type === 'sendError') {
    const isMobile = currentFormMessageState.isMobile;
    formMessage.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span class="font-medium">${t('errorTitle')}</span>
      </div>
      <p class="text-sm mt-1">${isMobile ? t('errorTextMobile') : t('errorTextDesktop')}</p>
    `;
  }
};

// Inicialización de EmailJS
function initEmailJS() {
  return new Promise((resolve, reject) => {
    const checkEmailJS = setInterval(() => {
      if (typeof emailjs !== 'undefined') {
        clearInterval(checkEmailJS);
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado correctamente');
        resolve();
      }
    }, 200);
    setTimeout(() => {
      clearInterval(checkEmailJS);
      reject(new Error('EmailJS no se cargó en el tiempo esperado'));
    }, 5000);
  });
}

// Restablecer errores visuales
function resetErrors() {
  // ─── NUEVO: limpiar el registro de errores de campo al resetear ───────────
  currentFieldErrors = {};

  const errorElements = [
    document.getElementById('name-error'),
    document.getElementById('email-error'),
    document.getElementById('message-error')
  ];
  errorElements.forEach(el => {
    if (el) {
      el.textContent = '';
      el.classList.add('hidden');
    }
  });
  const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  inputs.forEach(input => {
    input.classList.remove('border-red-500', 'border-red-400');
    input.classList.add('border-light-gray/30');
  });
}

// Mostrar error específico en un campo
// ─── MODIFICADO: ahora recibe la clave de traducción (errorKey) en lugar del
// texto ya traducido, para poder guardarla y re-traducirla al cambiar idioma.
function showError(field, errorKey) {
  // Guardar la clave para poder re-renderizarla si cambia el idioma
  currentFieldErrors[field] = errorKey;

  // Traducir la clave al idioma actual
  const message = t(errorKey);

  let errorElement, inputElement;
  switch (field) {
    case 'name':
      errorElement = document.getElementById('name-error');
      inputElement = document.getElementById('name');
      break;
    case 'email':
      errorElement = document.getElementById('email-error');
      inputElement = document.getElementById('email');
      break;
    case 'message':
      errorElement = document.getElementById('message-error');
      inputElement = document.getElementById('message');
      break;
  }
  if (errorElement && inputElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    inputElement.classList.remove('border-light-gray/30');
    inputElement.classList.add('border-red-500');
    inputElement.focus();
  }
}

// Validación completa del formulario con mensajes traducidos
// ─── MODIFICADO: ahora pasa claves de traducción a showError, no textos ya traducidos
function validateForm() {
  resetErrors();
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const honeypot = document.getElementById('website').value;

  if (honeypot) {
    console.log('🤖 Bot detectado');
    return false;
  }

  // Nombre
  if (!name) {
    showError('name', 'nameRequired');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'nameMinLength');
    isValid = false;
  } else if (name.length > 100) {
    showError('name', 'nameMaxLength');
    isValid = false;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'emailRequired');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'emailInvalid');
    isValid = false;
  }

  // Mensaje
  if (!message) {
    showError('message', 'messageRequired');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'messageMinLength');
    isValid = false;
  } else if (message.length > 2000) {
    showError('message', 'messageMaxLength');
    isValid = false;
  }

  return isValid;
}

// Validación por campo individual (en blur)
// ─── MODIFICADO: ahora trabaja con claves de traducción en lugar de textos ya traducidos,
// y gestiona currentFieldErrors para que refreshVisibleMessages funcione correctamente.
function validateField(field) {
  const value = field.value.trim();
  let errorKey = '';

  switch (field.id) {
    case 'name':
      if (value.length < 2 && value.length > 0) errorKey = 'nameMinLength';
      else if (value.length > 100) errorKey = 'nameMaxLength';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) errorKey = 'emailInvalid';
      break;
    case 'message':
      if (value.length < 10 && value.length > 0) errorKey = 'messageMinLength';
      else if (value.length > 2000) errorKey = 'messageMaxLength';
      break;
  }

  if (errorKey) {
    showError(field.id, errorKey);
  } else {
    // Sin error: limpiar el registro y el elemento visual
    delete currentFieldErrors[field.id];
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
      field.classList.remove('border-red-500');
      field.classList.add('border-light-gray/30');
    }
  }
}

// Evento principal
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar EmailJS
  try {
    await initEmailJS();
  } catch (error) {
    console.error('Error init EmailJS:', error);
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
      // ─── NUEVO: guardar estado para poder re-traducir si cambia el idioma
      currentFormMessageState = 'initError';

      formMessage.className = 'mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400';
      formMessage.innerHTML = `
        <div class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span class="font-medium">${t('initErrorTitle')}</span>
        </div>
        <p class="text-sm mt-1">${t('initErrorText')}</p>
      `;
      formMessage.classList.remove('hidden');
    }
    return;
  }

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnContent = submitBtn.innerHTML;

  // Submit del formulario
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Cambiar estado del botón
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>${t('sendingButtonText')}</span>
    `;
    submitBtn.disabled = true;

    if (formMessage) formMessage.classList.add('hidden');

    // ─── NUEVO: limpiar estado del banner al iniciar un nuevo envío
    currentFormMessageState = null;

    resetErrors();

    try {
      const templateParams = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_email: 'franlydev@gmail.com'
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200 || response.text === 'OK') {
        // Éxito
        if (formMessage) {
          // ─── NUEVO: guardar estado para poder re-traducir si cambia el idioma
          currentFormMessageState = 'success';

          formMessage.className = 'mt-4 p-4 rounded-lg text-center bg-green-500/20 border border-green-500/30 text-green-400';
          formMessage.innerHTML = `
            <div class="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span class="font-medium">${t('successTitle')}</span>
            </div>
            <p class="text-sm mt-1">${t('successText')}</p>
          `;
          formMessage.classList.remove('hidden');
        }
        contactForm.reset();
        setTimeout(() => formMessage?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      } else {
        throw new Error('EmailJS error');
      }
    } catch (error) {
      console.error('Error en envío:', error);
      if (formMessage) {
        const isMobile = /Mobile|Android|iOS|iPad|Tablet/i.test(navigator.userAgent);

        // ─── NUEVO: guardar estado (incluyendo isMobile) para poder re-traducir si cambia el idioma
        currentFormMessageState = { type: 'sendError', isMobile };

        formMessage.className = 'mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400';
        formMessage.innerHTML = `
          <div class="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span class="font-medium">${t('errorTitle')}</span>
          </div>
          <p class="text-sm mt-1">${isMobile ? t('errorTextMobile') : t('errorTextDesktop')}</p>
        `;
        formMessage.classList.remove('hidden');
      }
    } finally {
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }
  });

  // Evento click de respaldo (móvil)
  submitBtn?.addEventListener('click', (e) => {
    if (!submitBtn.disabled && contactForm.checkValidity()) {
      contactForm.dispatchEvent(new Event('submit'));
    }
  });

  // Validación en tiempo real
  const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function () {
      if (this.value.trim()) validateField(this);
    });
    if (input.id === 'email') {
      input.addEventListener('input', function () {
        if (this.value.trim()) validateField(this);
      });
    }
  });
});