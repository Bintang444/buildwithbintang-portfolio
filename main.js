// Tailwind configuration for custom brand colors and font family
window.tailwind = window.tailwind || {};
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-bg': '#f3f4f6',
                'brand-card': '#ffffff',
                'brand-header': '#ffffff',
                'brand-primary': '#2563eb',
                'brand-text': '#111827',
                'brand-text-light': '#4b5563',
                'brand-border': '#e5e7eb',
                'brand-pill': '#eff6ff'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        }
    }
};

// Show one tab content at a time and update active menu items
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const targetContent = document.getElementById(`${tabId}-content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }

    document.querySelectorAll(`.nav-link[data-target="${tabId}"]`).forEach(link => link.classList.add('active'));

    if (window.innerWidth < 1024) {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            window.scrollTo({ top: mainElement.offsetTop - 80, behavior: 'smooth' });
        }
    }
}

// Close the mobile dropdown when a menu item is clicked
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

function switchResumeTab(section) {
    document.querySelectorAll('.resume-section').forEach(el => {
        el.classList.remove('block');
        el.classList.add('hidden');
    });

    document.querySelectorAll('.resume-pill').forEach(el => {
        el.classList.remove('bg-brand-pill', 'text-brand-primary');
        el.classList.add('bg-white/50', 'text-brand-text-light');
    });

    const targetSection = document.getElementById(`resume-${section}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('block');
    }

    const activePill = document.getElementById(`pill-${section}`);
    if (activePill) {
        activePill.classList.remove('bg-white/50', 'text-brand-text-light');
        activePill.classList.add('bg-brand-pill', 'text-brand-primary');
    }
}

// Initialize default tabs and attach button event listeners
window.addEventListener('DOMContentLoaded', () => {
    switchTab('about');
    switchResumeTab('experience');

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    document.querySelectorAll('button[data-target]').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            if (target) {
                switchTab(target);
            }
            if (button.hasAttribute('data-close-mobile')) {
                closeMobileMenu();
            }
        });
    });

    document.querySelectorAll('button[data-resume-tab]').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-resume-tab');
            if (section) {
                switchResumeTab(section);
            }
        });
    });
});
