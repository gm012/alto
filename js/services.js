// ============================================ //
// SERVICES PAGE — COMPLETE SCRIPT             //
// ============================================ //

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // ========================================== //
    // REGISTER GSAP PLUGINS                       //
    // ========================================== //
    gsap.registerPlugin(ScrollTrigger);

    // ========================================== //
    // NAVIGATION                                  //
    // ========================================== //
    const navbar = document.getElementById("nav");
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            if (currentScrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
            lastScrollY = currentScrollY;
        });
    }

    // ========================================== //
    // MENU                                       //
    // ========================================== //
    const menuToggle = document.getElementById("menuToggle");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuLinks = document.querySelectorAll(".menu-link");

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener("click", function () {
            const isActive = menuToggle.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            document.body.style.overflow = isActive ? "hidden" : "";
        });

        menuLinks.forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const href = this.getAttribute("href");
                if (href) {
                    menuToggle.classList.remove("active");
                    menuOverlay.classList.remove("active");
                    document.body.style.overflow = "";
                    window.location.href = href;
                }
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
                menuToggle.classList.remove("active");
                menuOverlay.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // ========================================== //
    // SCROLL PROGRESS BAR                        //
    // ========================================== //
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + "%";
    });

    // ========================================== //
    // SERVICE SECTION REVEALS — GSAP             //
    // ========================================== //

    const serviceSections = document.querySelectorAll(".service-section");

    serviceSections.forEach(function (section, index) {
        // Get elements
        const number = section.querySelector(".service-number");
        const label = section.querySelector(".service-label");
        const title = section.querySelector(".service-title");
        const desc = section.querySelector(".service-desc");
        const capabilities = section.querySelectorAll(".capability");
        const nav = section.querySelector(".service-nav");
        const artwork = section.querySelector(".service-artwork");

        // Number reveal
        if (number) {
            gsap.from(number, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "expo.out",
                delay: 0.1,
            });
        }

        // Label reveal
        if (label) {
            gsap.from(label, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "expo.out",
                delay: 0.2,
            });
        }

        // Title reveal
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 0.3,
            });
        }

        // Description reveal
        if (desc) {
            gsap.from(desc, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 0.4,
            });
        }

        // Capabilities stagger
        if (capabilities.length) {
            gsap.from(capabilities, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "expo.out",
                delay: 0.5,
            });
        }

        // Navigation reveal
        if (nav) {
            gsap.from(nav, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "expo.out",
                delay: 0.9,
            });
        }

        // Artwork subtle reveal
        if (artwork) {
            gsap.from(artwork, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.2,
            });
        }
    });

    // ========================================== //
    // SMOOTH SCROLL TO NEXT SERVICE              //
    // ========================================== //
    document.querySelectorAll(".service-nav-next").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = link.getAttribute("href");
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    document.querySelectorAll(".service-nav-prev").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = link.getAttribute("href");
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ========================================== //
    // HERO MOUSE EFFECT (First Service)          //
    // ========================================== //
    const firstService = document.querySelector(".service-graphic");

    if (window.innerWidth >= 1024 && firstService) {
        let mouseX = 0.5;
        let mouseY = 0.5;
        let targetX = 0.5;
        let targetY = 0.5;

        firstService.addEventListener("mousemove", function (e) {
            targetX = e.clientX / window.innerWidth;
            targetY = e.clientY / window.innerHeight;
        });

        gsap.ticker.add(function () {
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;

            const gradient = firstService.querySelector(".service-gradient");
            if (gradient) {
                gradient.style.background = `
                    radial-gradient(
                        ellipse at ${mouseX * 100}% ${mouseY * 100}%, 
                        rgba(200, 255, 0, ${0.06 + (1 - Math.abs(mouseX - 0.5) * 2) * 0.04}) 0%, 
                        var(--void-black) 70%
                    )
                `;
            }
        });
    }

    console.log("Services — Script loaded successfully");
});