(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();(function(){(window.innerWidth<=1024||"ontouchstart"in window)&&(console.log("✅ Optimizando animaciones para móvil/tablet..."),document.body.classList.add("es-movil"),setTimeout(()=>{document.querySelectorAll('.space-bg [class*="animate-"]').forEach(o=>{window.getComputedStyle(o).animationName!=="none"&&(o.style.animationIterationCount="1",o.addEventListener("animationend",function(){this.style.animation="none"}))})},1e3))})();const d={serviceId:"service_wsitxod",templateId:"template-arbuz1218039607",publicKey:"R381QsKgvbWdj9tI-"};function p(){return new Promise((n,t)=>{const e=setInterval(()=>{typeof emailjs<"u"&&(clearInterval(e),emailjs.init(d.publicKey),console.log("✅ EmailJS inicializado correctamente"),n())},200);setTimeout(()=>{clearInterval(e),t(new Error("❌ EmailJS no se cargó correctamente"))},5e3)})}function f(){[document.getElementById("name-error"),document.getElementById("email-error"),document.getElementById("message-error")].forEach(e=>{e&&(e.textContent="",e.classList.add("hidden"))}),document.querySelectorAll("input, textarea").forEach(e=>{e.classList.remove("border-red-500","border-red-400"),e.classList.add("border-light-gray/30")})}function l(n,t){let e,o;switch(n){case"name":e=document.getElementById("name-error"),o=document.getElementById("name");break;case"email":e=document.getElementById("email-error"),o=document.getElementById("email");break;case"message":e=document.getElementById("message-error"),o=document.getElementById("message");break}e&&o&&(e.textContent=t,e.classList.remove("hidden"),o.classList.remove("border-light-gray/30"),o.classList.add("border-red-500"),o.focus())}function h(){f();let n=!0;const t=document.getElementById("name").value.trim(),e=document.getElementById("email").value.trim(),o=document.getElementById("message").value.trim();return document.getElementById("website").value?(console.log("🤖 Bot detectado mediante honeypot"),!1):(t?t.length<2?(l("name","El nombre debe tener al menos 2 caracteres"),n=!1):t.length>100&&(l("name","El nombre no puede exceder los 100 caracteres"),n=!1):(l("name","Por favor, ingresa tu nombre completo"),n=!1),e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||(l("email","Por favor, ingresa un correo electrónico válido"),n=!1):(l("email","Por favor, ingresa tu correo electrónico"),n=!1),o?o.length<10?(l("message","El mensaje debe tener al menos 10 caracteres"),n=!1):o.length>2e3&&(l("message","El mensaje no puede exceder los 2000 caracteres"),n=!1):(l("message","Por favor, escribe tu mensaje"),n=!1),n)}function u(n){const t=n.value.trim();let e="";switch(n.id){case"name":t.length<2&&t.length>0?e="El nombre debe tener al menos 2 caracteres":t.length>100&&(e="El nombre no puede exceder los 100 caracteres");break;case"email":t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)&&(e="Por favor, ingresa un correo electrónico válido");break;case"message":t.length<10&&t.length>0?e="El mensaje debe tener al menos 10 caracteres":t.length>2e3&&(e="El mensaje no puede exceder los 2000 caracteres");break}if(e)l(n.id,e);else{const o=document.getElementById(`${n.id}-error`);o&&(o.textContent="",o.classList.add("hidden"),n.classList.remove("border-red-500"),n.classList.add("border-light-gray/30"))}}document.addEventListener("DOMContentLoaded",async function(){try{await p()}catch(r){console.error("Error al inicializar EmailJS:",r);const i=document.getElementById("formMessage");i&&(i.className="mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400",i.innerHTML=`
        <div class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span class="font-medium">Error al cargar el servicio de correo</span>
        </div>
        <p class="text-sm mt-1">Intenta recargar la página o contáctame directamente a franlydev@gmail.com.</p>
      `,i.classList.remove("hidden"));return}const n=document.getElementById("contactForm"),t=document.getElementById("formMessage"),e=n.querySelector('button[type="submit"]'),o=e.innerHTML;n.addEventListener("submit",async r=>{if(r.preventDefault(),!!h()){e.innerHTML=`
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Enviando...</span>
    `,e.disabled=!0,t&&t.classList.add("hidden"),f();try{const i={from_name:document.getElementById("name").value.trim(),from_email:document.getElementById("email").value.trim(),message:document.getElementById("message").value.trim(),to_email:"franlydev@gmail.com"},a=await emailjs.send(d.serviceId,d.templateId,i);if(console.log("📧 EmailJS Response:",a),a.status===200||a.text==="OK")t&&(t.className="mt-4 p-4 rounded-lg text-center bg-green-500/20 border border-green-500/30 text-green-400",t.innerHTML=`
            <div class="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span class="font-medium">¡Mensaje enviado con éxito!</span>
            </div>
            <p class="text-sm mt-1">Te responderé en breve a tu correo electrónico.</p>
          `,t.classList.remove("hidden")),n.reset(),setTimeout(()=>{t&&t.scrollIntoView({behavior:"smooth",block:"nearest"})},100);else throw new Error("Error al enviar el mensaje")}catch(i){console.error("❌ Error al enviar:",i),t&&(t.className="mt-4 p-4 rounded-lg text-center bg-red-500/20 border border-red-500/30 text-red-400",t.innerHTML=`
          <div class="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span class="font-medium">Error al enviar el mensaje</span>
          </div>
          <p class="text-sm mt-1">
            ${navigator.userAgent.match(/Mobile|Android|iOS|iPad|Tablet/i)?"Parece que hay un problema con la conexión. Intenta de nuevo o contáctame directamente a franlydev@gmail.com.":"Por favor, verifica tu conexión o intenta de nuevo más tarde."}
          </p>
        `,t.classList.remove("hidden"))}finally{e.innerHTML=o,e.disabled=!1}}}),e&&e.addEventListener("click",function(r){!e.disabled&&n.checkValidity()&&n.dispatchEvent(new Event("submit"))}),n.querySelectorAll("input[required], textarea[required]").forEach(r=>{r.addEventListener("blur",function(){this.value.trim()&&u(this)}),r.id==="email"&&r.addEventListener("input",function(){this.value.trim()&&u(this)})})});document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(o){const s=this.getAttribute("href");if(s==="#"||s==="#!")return;o.preventDefault();const r=document.querySelector(s);if(r){const i=document.querySelector(".notch-navbar"),a=i?i.offsetHeight:70;let c;if(s==="#quien-soy")c=r.offsetTop-a;else{const m=r.querySelector("h1, h2, .section-title");if(m){const g=m.getBoundingClientRect();c=window.pageYOffset+g.top-a-30}else c=r.offsetTop-a-30}window.scrollTo({top:Math.max(0,c),behavior:"smooth"}),history.pushState&&history.pushState(null,null,s)}})}),window.location.hash&&setTimeout(()=>{const e=window.location.hash,o=document.querySelector(e);if(o){const s=document.querySelector(".notch-navbar"),r=s?s.offsetHeight:70;let i;if(e==="#quien-soy")i=o.offsetTop-r;else{const a=o.querySelector("h1, h2, .section-title");a?i=a.offsetTop-r-30:i=o.offsetTop-r-30}window.scrollTo({top:Math.max(0,i),behavior:"instant"})}},100);const t=document.createElement("style");t.textContent=`
            /* "Quién Soy" - exact start */
            #quien-soy {
                scroll-margin-top: 70px; /* Just navbar height */
            }
            
            /* Other sections - consistent margin */
            #habilidades, #proyectos, #contactame {
                scroll-margin-top: 100px;
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
                    height: 100px;
                    margin-top: -100px;
                    visibility: hidden;
                    pointer-events: none;
                }
            }
        `,document.head.appendChild(t)});function v(n){const t=n.querySelector(".collapsed-view"),e=n.querySelector(".expanded-view");!e.classList.contains("hidden")?(e.classList.remove("opacity-100"),e.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>{e.classList.add("hidden"),t.classList.remove("hidden","opacity-0"),t.classList.add("opacity-100")},300)):(t.classList.remove("opacity-100"),t.classList.add("opacity-0"),setTimeout(()=>{t.classList.add("hidden"),e.classList.remove("hidden","opacity-0","pointer-events-none"),e.classList.add("opacity-100","pointer-events-auto")},300))}document.addEventListener("click",n=>{if(n.target.closest("[data-ignore-toggle]"))return;const t=n.target.closest("[data-project-card]");t&&v(t)});self.addEventListener("install",n=>{n.waitUntil(caches.open("portfolio-v1").then(t=>t.addAll(["/","/src/css/Styles_Arbuz.css","/src/img/Foto.webp"])))});
