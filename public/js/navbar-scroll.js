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