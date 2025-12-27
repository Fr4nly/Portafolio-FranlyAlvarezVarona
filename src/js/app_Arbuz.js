// src/js/app_Arbuz.js - Agrega al INICIO del archivo

////////////////////////////////////////////////////////////////////////
///// DETECCIÓN Y OPTIMIZACIÓN PARA MÓVILES/TABLETS ////////////////////
////////////////////////////////////////////////////////////////////////

(function optimizarParaMoviles() {
    // Detecta si es un dispositivo táctil o con pantalla pequeña
    const esDispositivoMovil = window.innerWidth <= 1024 || 'ontouchstart' in window;

    if (esDispositivoMovil) {
        console.log('✅ Optimizando animaciones para móvil/tablet...');

        // 1. Agrega una clase al body para control vía CSS
        document.body.classList.add('es-movil');

        // 2. [OPCIONAL] Reducir aún más el framerate de animaciones existentes
        // Esto es un backup si las media queries CSS no son suficientes
        setTimeout(() => {
            const elementosAnimados = document.querySelectorAll('.space-bg [class*="animate-"]');
            elementosAnimados.forEach(el => {
                const estilo = window.getComputedStyle(el);
                if (estilo.animationName !== 'none') {
                    // Cambia animaciones de 'infinite' a duras más cortas o las pausa
                    el.style.animationIterationCount = '1';
                    // Pausa después de una iteración
                    el.addEventListener('animationend', function () {
                        this.style.animation = 'none';
                    });
                }
            });
        }, 1000); // Pequeño delay para no interferir con la carga
    }
})();








///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// CÓDIGO PARA EL FORMULARIO DE CONTACTO CON EMAILJS ////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Configuración de EmailJS (VERIFICA QUE ESTOS VALORES SEAN CORRECTOS)
const EMAILJS_CONFIG = {
    serviceId: 'service_wsitxod',          // Reemplaza con tu Service ID real
    templateId: 'template-arbuz1218039607', // Reemplaza con tu Template ID correcto
    publicKey: 'R381QsKgvbWdj9tI-'       // Reemplaza con tu Public Key correcta
};

document.addEventListener('DOMContentLoaded', function () {
    // Esperar a que EmailJS esté completamente cargado
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS inicializado correctamente');
        } else {
            console.error('EmailJS no está cargado. Verifica el script en el head.');
            setTimeout(initEmailJS, 1000); // Reintentar después de 1 segundo
        }
    }
    initEmailJS();

    // Elementos del DOM
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Elementos para mensajes de error
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Estado original del botón
    const originalBtnContent = submitBtn.innerHTML;

    // Función para restablecer errores
    function resetErrors() {
        [nameError, emailError, messageError].forEach(el => {
            el.textContent = '';
            el.classList.add('hidden');
        });

        // Quitar estilos de error de los inputs
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'border-red-400');
            input.classList.add('border-light-gray/30');
        });
    }

    // Función para mostrar errores
    function showError(field, message) {
        let errorElement;
        let inputElement;

        switch (field) {
            case 'name':
                errorElement = nameError;
                inputElement = document.getElementById('name');
                break;
            case 'email':
                errorElement = emailError;
                inputElement = document.getElementById('email');
                break;
            case 'message':
                errorElement = messageError;
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

    // Validación del formulario
    function validateForm() {
        resetErrors();
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const honeypot = document.getElementById('website').value;

        // Verificación del honeypot (para bots)
        if (honeypot) {
            console.log('Bot detectado mediante honeypot');
            return false;
        }

        // Validación del nombre
        if (!name) {
            showError('name', 'Por favor, ingresa tu nombre completo');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        } else if (name.length > 100) {
            showError('name', 'El nombre no puede exceder los 100 caracteres');
            isValid = false;
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email', 'Por favor, ingresa tu correo electrónico');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Por favor, ingresa un correo electrónico válido');
            isValid = false;
        }

        // Validación del mensaje
        if (!message) {
            showError('message', 'Por favor, escribe tu mensaje');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        } else if (message.length > 2000) {
            showError('message', 'El mensaje no puede exceder los 2000 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Validación en tiempo real para campos individuales
    function validateField(field) {
        const value = field.value.trim();
        let error = '';

        switch (field.id) {
            case 'name':
                if (value.length < 2 && value.length > 0) {
                    error = 'El nombre debe tener al menos 2 caracteres';
                } else if (value.length > 100) {
                    error = 'El nombre no puede exceder los 100 caracteres';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    error = 'Por favor, ingresa un correo electrónico válido';
                }
                break;
            case 'message':
                if (value.length < 10 && value.length > 0) {
                    error = 'El mensaje debe tener al menos 10 caracteres';
                } else if (value.length > 2000) {
                    error = 'El mensaje no puede exceder los 2000 caracteres';
                }
                break;
        }

        if (error) {
            showError(field.id, error);
        } else {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.add('hidden');
                field.classList.remove('border-red-500');
                field.classList.add('border-light-gray/30');
            }
        }
    }

    // Evento de envío del formulario
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar antes de enviar
        if (!validateForm()) {
            return;
        }

        // Estado de carga
        submitBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando...</span>
        `;
        submitBtn.disabled = true;

        // Ocultar mensajes previos
        formMessage.classList.add('hidden');
        resetErrors();

        try {
            // Parámetros para EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim(),
                to_email: 'franlydev@gmail.com'
            };

            // Enviar correo
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            console.log('EmailJS Response:', response);

            if (response.status === 200 || response.text === 'OK') {
                // Mensaje de éxito
                formMessage.className = "mt-4 p-4 rounded-lg text-center bg-green-500/20 border border-green-500/30 text-green-400";
                formMessage.innerHTML = `
                    <div class="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span class="font-medium">¡Mensaje enviado con éxito!</span>
                    </div>
                    <p class="text-sm mt-1">Te responderé en breve a tu correo electrónico.</p>
                `;
                formMessage.classList.remove('hidden');

                // Resetear formulario
                contactForm.reset();

                // Scroll suave al mensaje
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);

            } else {
                throw new Error('Error al enviar el mensaje');
            }

        } catch (error) {
            console.error('Error al enviar:', error);

            // Mensaje de error (adaptado para móviles)
            formMessage.className = "mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400";
            formMessage.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span class="font-medium">Error al enviar el mensaje</span>
                </div>
                <p class="text-sm mt-1">
                    ${navigator.userAgent.match(/Mobile|Android|iOS|iPad|Tablet/i)
                        ? 'Parece que hay un problema con la conexión o el dispositivo. Intenta de nuevo o contáctame directamente a franlydev@gmail.com.'
                        : 'Por favor, verifica tu conexión o intenta de nuevo más tarde.'}
                </p>
            `;
            formMessage.classList.remove('hidden');

        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }
    });

    // Evento de clic para el botón (respaldo para móviles)
    submitBtn.addEventListener('click', function(e) {
        if (contactForm.checkValidity() && !submitBtn.disabled) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                validateField(this);
            }
        });

        // Validación adicional para el campo de correo
        if (input.id === 'email') {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    validateField(this);
                }
            });
        }
    });
});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////SCROLL DEL NAVBAR PARA EL HASH ID////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Scroll positioning - Only "Quién Soy" goes to exact start, others keep consistent margin
document.addEventListener('DOMContentLoaded', function () {
    // Consistent margin for most sections (except "Quién Soy")
    const CONSISTENT_MARGIN = 30;

    // 1. Handle all hash navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                const navbar = document.querySelector('.notch-navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;

                let scrollPosition;

                // SPECIAL CASE: "Quién Soy" goes to exact start
                if (href === '#quien-soy') {
                    // Scroll to very top of the section
                    scrollPosition = targetSection.offsetTop - navbarHeight;
                }
                // NORMAL CASES: Other sections keep consistent margin
                else {
                    // Find the title in the section
                    const sectionTitle = targetSection.querySelector('h1, h2, .section-title');

                    if (sectionTitle) {
                        // Scroll to the title with consistent margin
                        const titleRect = sectionTitle.getBoundingClientRect();
                        scrollPosition = window.pageYOffset + titleRect.top - navbarHeight - CONSISTENT_MARGIN;
                    } else {
                        // Fallback
                        scrollPosition = targetSection.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                    }
                }

                window.scrollTo({
                    top: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });

                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // 2. Fix initial page load with hash
    if (window.location.hash) {
        setTimeout(() => {
            const hash = window.location.hash;
            const targetSection = document.querySelector(hash);

            if (targetSection) {
                const navbar = document.querySelector('.notch-navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;

                let scrollPosition;

                // SPECIAL CASE: "Quién Soy"
                if (hash === '#quien-soy') {
                    scrollPosition = targetSection.offsetTop - navbarHeight;
                }
                // NORMAL CASES: Other sections
                else {
                    const sectionTitle = targetSection.querySelector('h1, h2, .section-title');

                    if (sectionTitle) {
                        scrollPosition = sectionTitle.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                    } else {
                        scrollPosition = targetSection.offsetTop - navbarHeight - CONSISTENT_MARGIN;
                    }
                }

                window.scrollTo({
                    top: Math.max(0, scrollPosition),
                    behavior: 'instant'
                });
            }
        }, 100);
    }

    // 3. CSS scroll-margin for modern browsers (different for "Quién Soy")
    const style = document.createElement('style');
    style.textContent = `
            /* "Quién Soy" - exact start */
            #quien-soy {
                scroll-margin-top: 70px; /* Just navbar height */
            }
            
            /* Other sections - consistent margin */
            #habilidades, #proyectos, #contactame {
                scroll-margin-top: ${70 + CONSISTENT_MARGIN}px;
            }
            
            /* Fallback for older browsers */
            @supports not (scroll-margin-top: 70px) {
                #quien-soy::before {
                    content: '';
                    display: block;
                    height: 70px;
                    margin-top: -70px;
                    visibility: hidden;
                    pointer-events: none;
                }
                
                #habilidades::before,
                #proyectos::before,
                #contactame::before {
                    content: '';
                    display: block;
                    height: ${70 + CONSISTENT_MARGIN}px;
                    margin-top: -${70 + CONSISTENT_MARGIN}px;
                    visibility: hidden;
                    pointer-events: none;
                }
            }
        `;
    document.head.appendChild(style);
});


















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////TOGGLE DE PROYECTOS EN LA SECCION DE PROYECTOS/////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function toggleProject(card) {
    const collapsedView = card.querySelector('.collapsed-view');
    const expandedView = card.querySelector('.expanded-view');
    const isExpanded = !expandedView.classList.contains('hidden');

    if (isExpanded) {
        // Colapsar
        expandedView.classList.remove('opacity-100');
        expandedView.classList.add('opacity-0');
        setTimeout(() => {
            expandedView.classList.add('hidden');
            collapsedView.classList.remove('hidden');
            setTimeout(() => {
                collapsedView.classList.remove('opacity-0');
                collapsedView.classList.add('opacity-100');
            }, 50);
        }, 300);
    } else {
        // Expandir
        collapsedView.classList.remove('opacity-100');
        collapsedView.classList.add('opacity-0');
        setTimeout(() => {
            collapsedView.classList.add('hidden');
            expandedView.classList.remove('hidden');
            setTimeout(() => {
                expandedView.classList.remove('opacity-0');
                expandedView.classList.add('opacity-100');
            }, 50);
        }, 300);
    }
}