////////////////////////////////////////////////////////////////////////
///// DETECCIÓN Y OPTIMIZACIÓN PARA MÓVILES/TABLETS ////////////////////
////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
///// FIX: FONDO ESTÁTICO EN MÓVIL (evita resize al hacer scroll) //////
////////////////////////////////////////////////////////////////////////

(function fijarAltoBg() {
  // Se ejecuta una sola vez al cargar — nunca en scroll ni en resize.
  // Congela el alto real del viewport en ese instante.
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh-initial', `${vh}px`);
})();


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

// sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('portfolio-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/src/css/Styles_Arbuz.css',
                '/Foto.webp'
            ]);
        })
    );
});

