// ============================================ //
// SERVICES PAGE — COMPLETE SCRIPT            //
// ============================================ //

// ============================================ //
// REGISTER GSAP PLUGINS                       //
// ============================================ //
gsap.registerPlugin(ScrollTrigger);

// ============================================ //
// NAVIGATION                                  //
// ============================================ //
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// ============================================ //
// MENU                                         //
// ============================================ //
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
});

menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target) {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            window.location.href = target;
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================ //
// SCROLL PROGRESS BAR                         //
// ============================================ //
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// ============================================ //
// SERVICE SECTION ANIMATIONS                  //
// ============================================ //

const serviceSections = document.querySelectorAll('.service-section');

serviceSections.forEach((section, index) => {
    const title = section.querySelector('.service-title');
    const desc = section.querySelector('.service-desc');
    const capabilities = section.querySelectorAll('.capability');
    const artwork = section.querySelector('.service-artwork');
    
    // Title reveal
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 1.2,
            ease: 'expo.out',
        });
    }
    
    // Description reveal
    if (desc) {
        gsap.from(desc, {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 1.2,
            delay: 0.2,
            ease: 'expo.out',
        });
    }
    
    // Capabilities stagger
    if (capabilities.length) {
        gsap.from(capabilities, {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: 'expo.out',
        });
    }
    
    // Artwork subtle reveal
    if (artwork) {
        gsap.from(artwork, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
        });
    }
});

// ============================================ //
// SMOOTH SCROLL TO NEXT SERVICE               //
// ============================================ //
document.querySelectorAll('.service-nav-next').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.service-nav-prev').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================ //
// HERO MOUSE EFFECT (on first service)        //
// ============================================ //
const firstService = document.querySelector('.service-graphic');

if (window.innerWidth >= 1024 && firstService) {
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    
    firstService.addEventListener('mousemove', (e) => {
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
    });
    
    gsap.ticker.add(() => {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
        
        const gradient = firstService.querySelector('.service-gradient');
        if (gradient) {
            gradient.style.background = `
                radial-gradient(
                    ellipse at ${mouseX * 100}% ${mouseY * 100}%, 
                    rgba(200, 255, 0, ${0.08 + (1 - Math.abs(mouseX - 0.5) * 2) * 0.04}) 0%, 
                    var(--void-black) 70%
                )
            `;
        }
    });
}

// ============================================ //
// REFRESH AFTER LOAD                          //
// ============================================ //
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// ============================================ //
// RESIZE HANDLER                              //
// ============================================ //
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================ //
// PERFORMANCE CONFIG                          //
// ============================================ //
ScrollTrigger.config({
    ignoreMobileResize: true
});

ScrollTrigger.normalizeScroll(true);

// ============================================ //
// LOG CONSOLE                                 //
// ============================================ //
console.log('%c ALTO Studio ', 'background: #C8FF00; color: #080808; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c Services ', 'color: #F2EFE8; font-size: 14px;');
console.log('%c WE BUILD WHAT OTHERS IMAGINE. ', 'color: #C8FF00; font-size: 12px; font-style: italic;');