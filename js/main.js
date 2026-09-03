// ============================================ //
// ALTO Studio — POLISHED VERSION             //
// ============================================ //

// ============================================ //
// REGISTER GSAP PLUGINS                       //
// ============================================ //
gsap.registerPlugin(ScrollTrigger);

// ============================================ //
// SAFETY VISIBILITY RESET                     //
// ============================================ //
gsap.set([
    '.statement-title',
    '.statement-text',
    '.stat',
    '.service-card',
    '.project-card',
    '.contact-info',
    '.contact-form'
], {
    opacity: 1,
    x: 0,
    y: 0
});

// ============================================ //
// SCROLL PROGRESS BAR                         //
// ============================================ //
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

    progressBar.style.width = progress + '%';
});

// ============================================ //
// NAVIGATION — POLISHED                       //
// ============================================ //
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll =
        window.pageYOffset ||
        document.documentElement.scrollTop;

    if (!nav) return;

    // Background after scrolling
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Hide while scrolling down
    if (
        currentScroll > lastScroll &&
        currentScroll > 100
    ) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// ============================================ //
// MENU                                        //
// ============================================ //
const menuToggle =
    document.getElementById('menuToggle');

const menuOverlay =
    document.getElementById('menuOverlay');

const menuLinks =
    document.querySelectorAll('.menu-link');

if (menuToggle && menuOverlay) {

    menuToggle.addEventListener('click', () => {

        const isActive =
            menuToggle.classList.toggle('active');

        menuOverlay.classList.toggle('active');

        document.body.style.overflow =
            isActive ? 'hidden' : '';
    });

    menuLinks.forEach((link) => {

        link.addEventListener('click', (e) => {

            e.preventDefault();

            const target =
                link.getAttribute('href');

            if (target) {

                menuToggle.classList.remove('active');
                menuOverlay.classList.remove('active');

                document.body.style.overflow = '';

                window.location.href = target;
            }
        });
    });

    document.addEventListener('keydown', (e) => {

        if (
            e.key === 'Escape' &&
            menuOverlay.classList.contains('active')
        ) {

            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');

            document.body.style.overflow = '';
        }
    });
}

// ============================================ //
// NUMBER ANIMATION — COUNT UP                 //
// ============================================ //
function animateNumbers() {

    const stats =
        document.querySelectorAll('.stat-number');

    stats.forEach((stat) => {

        const target =
            parseInt(stat.textContent);

        if (isNaN(target)) return;

        const label =
            stat.parentElement
                ?.querySelector('.stat-label');

        let suffix = '';

        if (
            label &&
            label.textContent.includes('Projects')
        ) {
            suffix = '+';
        }

        gsap.fromTo(
            stat,

            {
                innerText: 0
            },

            {
                innerText: target,

                duration: 1.5,

                ease: 'expo.out',

                snap: {
                    innerText: 1
                },

                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions:
                        'play none none none'
                },

                onUpdate: function () {

                    stat.textContent =
                        Math.floor(
                            this.targets()[0].innerText
                        ) + suffix;
                }
            }
        );
    });
}

document.addEventListener(
    'DOMContentLoaded',
    animateNumbers
);

// ============================================ //
// REVEAL ANIMATIONS                           //
// ============================================ //

// STATEMENT TITLE
if (document.querySelector('.statement-title')) {

    gsap.fromTo(
        '.statement-title',

        {
            y: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.statement',
                start: 'top 75%',
                toggleActions:
                    'play none none none'
            },

            y: 0,
            opacity: 1,

            duration: 1.2,

            ease: 'expo.out'
        }
    );
}

// STATEMENT TEXT
if (document.querySelector('.statement-text')) {

    gsap.fromTo(
        '.statement-text',

        {
            y: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.statement',
                start: 'top 75%',
                toggleActions:
                    'play none none none'
            },

            y: 0,
            opacity: 1,

            duration: 1.2,

            delay: 0.2,

            ease: 'expo.out'
        }
    );
}

// STATISTICS
if (document.querySelector('.statement-stats')) {

    gsap.fromTo(
        '.stat',

        {
            y: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.statement-stats',
                start: 'top 85%',
                toggleActions:
                    'play none none none'
            },

            y: 0,
            opacity: 1,

            duration: 0.8,

            stagger: 0.15,

            ease: 'expo.out'
        }
    );
}

// ============================================ //
// SERVICES                                    //
// ============================================ //
if (document.querySelector('.services-grid')) {

    gsap.fromTo(
        '.service-card',

        {
            y: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions:
                    'play none none none'
            },

            y: 0,
            opacity: 1,

            duration: 0.9,

            stagger: 0.2,

            ease: 'expo.out'
        }
    );
}

// ============================================ //
// PROJECTS                                    //
// ============================================ //
if (document.querySelector('.projects-grid')) {

    gsap.fromTo(
        '.project-card',

        {
            y: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions:
                    'play none none none'
            },

            y: 0,
            opacity: 1,

            duration: 0.9,

            stagger: 0.15,

            ease: 'expo.out'
        }
    );
}

// ============================================ //
// CONTACT                                     //
// ============================================ //
if (document.querySelector('.contact-info')) {

    gsap.fromTo(
        '.contact-info',

        {
            x: -40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 75%',
                toggleActions:
                    'play none none none'
            },

            x: 0,
            opacity: 1,

            duration: 1.2,

            ease: 'expo.out'
        }
    );
}

if (document.querySelector('.contact-form')) {

    gsap.fromTo(
        '.contact-form',

        {
            x: 40,
            opacity: 0
        },

        {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 75%',
                toggleActions:
                    'play none none none'
            },

            x: 0,
            opacity: 1,

            duration: 1.2,

            delay: 0.2,

            ease: 'expo.out'
        }
    );
}

// ============================================ //
// HORIZONTAL SCROLL SECTION — FIXED           //
// ============================================ //

if (window.innerWidth >= 1024) {

    const section =
        document.querySelector('.horizontal-section');

    const track =
        document.querySelector('.horizontal-track');

    if (section && track) {

        const distance =
            track.scrollWidth -
            window.innerWidth;

        gsap.to(track, {

            x: -distance,

            ease: 'none',

            scrollTrigger: {

                trigger: section,

                start: 'top top',

                end: () =>
                    `+=${distance}`,

                pin: true,

                pinSpacing: true,

                scrub: 0.8,

                invalidateOnRefresh: true
            }
        });
    }
}

// ============================================ //
// HERO MOUSE EFFECT — DESKTOP ONLY            //
// ============================================ //
const hero =
    document.querySelector('.hero');

if (
    window.innerWidth >= 1024 &&
    hero
) {

    let mouseX = 0.5;
    let mouseY = 0.5;

    let targetX = 0.5;
    let targetY = 0.5;

    hero.addEventListener(
        'mousemove',
        (e) => {

            targetX =
                e.clientX /
                window.innerWidth;

            targetY =
                e.clientY /
                window.innerHeight;
        }
    );

    gsap.ticker.add(() => {

        mouseX +=
            (targetX - mouseX) *
            0.08;

        mouseY +=
            (targetY - mouseY) *
            0.08;

        const gradient =
            hero.querySelector(
                '.hero-gradient'
            );

        if (gradient) {

            gradient.style.background = `
                radial-gradient(
                    ellipse at
                    ${mouseX * 100}%
                    ${mouseY * 100}%,

                    rgba(
                        200,
                        255,
                        0,
                        ${
                            0.02 +
                            (
                                1 -
                                Math.abs(
                                    mouseX - 0.5
                                ) * 2
                            ) *
                            0.02
                        }
                    )
                    0%,

                    transparent
                    70%
                )
            `;
        }
    });
}

// ============================================ //
// REFRESH AFTER FULL PAGE LOAD                //
// ============================================ //
window.addEventListener(
    'load',
    () => {

        ScrollTrigger.refresh();
    }
);

// ============================================ //
// RESIZE HANDLER                              //
// ============================================ //
let resizeTimeout;

window.addEventListener(
    'resize',
    () => {

        clearTimeout(
            resizeTimeout
        );

        resizeTimeout =
            setTimeout(
                () => {

                    ScrollTrigger.refresh();

                },
                250
            );
    }
);

// ============================================ //
// PERFORMANCE CONFIG                          //
// ============================================ //
ScrollTrigger.config({
    ignoreMobileResize: true
});

ScrollTrigger.normalizeScroll(true);

// ============================================ //
// CONSOLE BRANDING                            //
// ============================================ //
console.log(
    '%c ALTO Studio ',
    'background: #C8FF00; color: #080808; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
);

console.log(
    '%c Digital Experience Studio ',
    'color: #F2EFE8; font-size: 14px;'
);

console.log(
    '%c WE BUILD WHAT OTHERS IMAGINE. ',
    'color: #C8FF00; font-size: 12px; font-style: italic;'
);