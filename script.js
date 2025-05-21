// Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Three.js Background Animation
let scene, camera, renderer, particles;
const particleCount = 2000;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    

    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add renderer to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '1';
        renderer.domElement.style.pointerEvents = 'none';
    }
    
    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }
    
    renderer.render(scene, camera);
}

// Initialize Three.js when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    animate();
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Web Developer", "UI/UX Designer", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Hero Section Animation
gsap.from(".hero-content", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.5
});

// Scroll Animations
gsap.from(".about-content", {
    scrollTrigger: {
        trigger: ".about",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out"
});

// Project Section Animations
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll(".project-card");
    
    // Initial entrance animation
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: ".projects",
            start: "top center",
            toggleActions: "play none none reverse"
        },
        duration: 1.2,
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotation: 5,
        stagger: {
            amount: 1,
            from: "random",
            grid: "auto",
            axis: "x"
        },
        ease: "back.out(1.7)"
    });

    // Project Card Hover Animations
    projectCards.forEach(card => {
        const cardContent = card.querySelector(".project-content");
        const cardImage = card.querySelector(".project-image");
        const cardTitle = card.querySelector(".project-title");
        const cardDescription = card.querySelector(".project-description");
        const cardLinks = card.querySelector(".project-links");
        
        // Set initial states
        if (cardDescription) gsap.set(cardDescription, { opacity: 0.8 });
        if (cardLinks) gsap.set(cardLinks, { opacity: 0, y: 20 });
        
        // Hover animations
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                duration: 0.5,
                y: -20,
                scale: 1.03,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                ease: "power2.out"
            });
            
            if (cardImage) {
                gsap.to(cardImage, {
                    duration: 0.5,
                    scale: 1.1,
                    filter: "brightness(1.1)",
                    ease: "power2.out"
                });
            }
            
            if (cardContent) {
                gsap.to(cardContent, {
                    duration: 0.5,
                    y: -10,
                    ease: "power2.out"
                });
            }
            
            if (cardTitle) {
                gsap.to(cardTitle, {
                    duration: 0.5,
                    color: "var(--primary-color)",
                    ease: "power2.out"
                });
            }
            
            if (cardDescription) {
                gsap.to(cardDescription, {
                    duration: 0.5,
                    opacity: 1,
                    ease: "power2.out"
                });
            }
            
            if (cardLinks) {
                gsap.to(cardLinks, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                duration: 0.5,
                y: 0,
                scale: 1,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                ease: "power2.out"
            });
            
            if (cardImage) {
                gsap.to(cardImage, {
                    duration: 0.5,
                    scale: 1,
                    filter: "brightness(1)",
                    ease: "power2.out"
                });
            }
            
            if (cardContent) {
                gsap.to(cardContent, {
                    duration: 0.5,
                    y: 0,
                    ease: "power2.out"
                });
            }
            
            if (cardTitle) {
                gsap.to(cardTitle, {
                    duration: 0.5,
                    color: "inherit",
                    ease: "power2.out"
                });
            }
            
            if (cardDescription) {
                gsap.to(cardDescription, {
                    duration: 0.5,
                    opacity: 0.8,
                    ease: "power2.out"
                });
            }
            
            if (cardLinks) {
                gsap.to(cardLinks, {
                    duration: 0.5,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Contact Section Animation
gsap.from(".contact-content", {
    scrollTrigger: {
        trigger: ".contact",
        start: "top center",
        toggleActions: "play none none reverse"
    },
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out"
});

// Navbar Animation
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove("scroll-up");
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
        navbar.classList.remove("scroll-up");
        navbar.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && navbar.classList.contains("scroll-down")) {
        navbar.classList.remove("scroll-down");
        navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle("toggle");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        
        if (target) {
            if (nav.classList.contains("nav-active")) {
                nav.classList.remove("nav-active");
                burger.classList.remove("toggle");
                navLinks.forEach(link => {
                    link.style.animation = "";
                });
            }

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70,
                    autoKill: false
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Form Animations
const formGroups = document.querySelectorAll(".form-group");

formGroups.forEach(group => {
    const input = group.querySelector("input, textarea");
    const label = group.querySelector("label");
    
    input.addEventListener("focus", () => {
        gsap.to(label, {
            duration: 0.3,
            y: -25,
            scale: 0.8,
            color: "var(--primary-color)"
        });
    });
    
    input.addEventListener("blur", () => {
        if (!input.value) {
            gsap.to(label, {
                duration: 0.3,
                y: 0,
                scale: 1,
                color: "#64748b"
            });
        }
    });
});

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
    initializeProjectAnimations();
}); 