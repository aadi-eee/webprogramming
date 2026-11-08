// ========================================
// Y2K VINTAGE PORTFOLIO - JavaScript
// ========================================

// ---------- DOM ELEMENTS ----------
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navInner = document.querySelector('.nav-inner');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const starsContainer = document.getElementById('starsContainer');

// ---------- TAB NAVIGATION ----------
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show target page with animation
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === target) {
                page.classList.add('active');
                // Animate skill bars when skills page is shown
                if (target === 'skills') {
                    animateSkillBars();
                }
            }
        });

        // Close mobile menu
        navInner.classList.remove('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ---------- MOBILE HAMBURGER MENU ----------
hamburger.addEventListener('click', () => {
    navInner.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.tab-nav')) {
        navInner.classList.remove('active');
    }
});

// ---------- SKILL BAR ANIMATION ----------
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        // Reset then animate
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 100);
    });
}

// ---------- CONTACT FORM HANDLER ----------
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = '⚠️ Please fill out all fields!';
        return;
    }

    // Simulate success
    formFeedback.style.color = '#F5A0B8';
    formFeedback.textContent = `💖 Thank you, ${name}! Your message has been sent~ ✧`;

    // Clear form
    contactForm.reset();

    // Clear feedback after 4 seconds
    setTimeout(() => {
        formFeedback.textContent = '';
    }, 4000);
});

// ---------- FLOATING STARS BACKGROUND ----------
function createFloatingStars() {
    const starSymbols = ['⭐', '✦', '★', '✧', '·'];
    const numStars = 25;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('span');
        star.classList.add('floating-star');
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
        star.style.animationDuration = (Math.random() * 4 + 4) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        starsContainer.appendChild(star);
    }
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
    createFloatingStars();

    // Animate skill bars if skills page is initially active
    const skillsPage = document.getElementById('skills');
    if (skillsPage && skillsPage.classList.contains('active')) {
        animateSkillBars();
    }
});

// ---------- ADD SPARKLE ON CLICK ----------
document.addEventListener('click', (e) => {
    // Don't sparkle on form elements
    if (e.target.closest('form') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('button')) {
        return;
    }

    const sparkle = document.createElement('span');
    sparkle.textContent = '✧';
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.color = '#FFD700';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 0.8s ease';
    sparkle.style.opacity = '1';
    document.body.appendChild(sparkle);

    // Animate and remove
    requestAnimationFrame(() => {
        sparkle.style.transform = 'translateY(-40px) scale(0)';
        sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 800);
});
