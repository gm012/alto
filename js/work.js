// ============================================ //
// WORK PAGE — DIGITAL EXHIBITION              //
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
// PROJECT REVEAL ANIMATIONS                   //
// ============================================ //

const projects = document.querySelectorAll('.work-project');

projects.forEach((project, index) => {
    const image = project.querySelector('.work-project-image');
    const info = project.querySelector('.work-project-info');
    
    // Image clip reveal
    if (image) {
        gsap.to(image, {
            scrollTrigger: {
                trigger: project,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
            onStart: () => {
                image.classList.add('revealed');
            },
            duration: 0.01, // Just triggers the class
        });
    }
    
    // Info reveal
    if (info) {
        gsap.to(info, {
            scrollTrigger: {
                trigger: project,
                start: 'top 75%',
                toggleActions: 'play none none none',
            },
            onStart: () => {
                info.classList.add('revealed');
            },
            duration: 0.01,
        });
    }
});

// ============================================ //
// FILTER SYSTEM                               //
// ============================================ //

const filterBtns = document.querySelectorAll('.work-filter-btn');
const projectItems = document.querySelectorAll('.work-project');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach((project) => {
            const category = project.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                project.classList.remove('hidden');
                project.style.display = 'block';
            } else {
                project.classList.add('hidden');
                // Use timeout to allow transition
                setTimeout(() => {
                    if (project.classList.contains('hidden')) {
                        project.style.display = 'none';
                    }
                }, 600);
            }
        });
        
        // Refresh ScrollTrigger after filter
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 700);
    });
});

// ============================================ //
// FINAL STATEMENT ANIMATION                   //
// ============================================ //

gsap.from('.work-statement-title', {
    scrollTrigger: {
        trigger: '.work-statement',
        start: 'top 75%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    filter: 'blur(6px)',
    duration: 1.2,
    ease: 'expo.out',
});

gsap.from('.work-statement-line', {
    scrollTrigger: {
        trigger: '.work-statement',
        start: 'top 75%',
        toggleActions: 'play none none none',
    },
    scaleX: 0,
    duration: 1,
    delay: 0.2,
    ease: 'expo.out',
});

gsap.from('.work-statement-content .btn-primary', {
    scrollTrigger: {
        trigger: '.work-statement',
        start: 'top 75%',
        toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'expo.out',
});

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
console.log('%c Work Archive ', 'color: #F2EFE8; font-size: 14px;');
console.log('%c WE BUILD WHAT OTHERS IMAGINE. ', 'color: #C8FF00; font-size: 12px; font-style: italic;');