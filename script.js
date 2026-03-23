const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }

    });

});
/* ===== TYPING EFFECT ===== */

const typingElement = document.getElementById("typing");

const textArray = [
    "Software Developer",
    "AI Enthusiast",
    "Problem Solver",
    "Competitive Programmer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
/* ===== NAVBAR SHOW ON SCROLL ===== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 200) {
        navbar.classList.add("show");
    } else {
        navbar.classList.remove("show");
    }

});
/* ===== ACTIVE NAVBAR LINK ON SCROLL ===== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});
/* ===== SCROLL PROGRESS ===== */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercent + "%";

});
/* ===== 3D TILT EFFECT ===== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 20);
        const rotateY = ((centerX - x) / 20);

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });

});
/* ===== CURSOR GLOW ===== */

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
});
/* ===== THEME TOGGLE FUNCTIONALITY ===== */

const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
}

/* ===== CONTACT FORM FUNCTIONALITY ===== */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.querySelector('.submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        try {
            // Send data to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Show success message
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                // Show error message
                showMessage(result.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

/* ===== PARALLAX ===== */

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    document.querySelector(".parallax-bg").style.transform =
        `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
});
