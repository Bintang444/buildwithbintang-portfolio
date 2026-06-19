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

function updateLearnMoreButton(tabId) {
    const learnMoreBtn = document.querySelector('.js-tab-button');
    if (learnMoreBtn) {
        if (tabId === 'projects') {
            learnMoreBtn.textContent = 'About';
            learnMoreBtn.setAttribute('data-target', 'about');
        } else {
            learnMoreBtn.textContent = 'Learn More';
            learnMoreBtn.setAttribute('data-target', 'projects');
        }
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const targetContent = document.getElementById(`${tabId}-content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }

    document.querySelectorAll(`.nav-link[data-target="${tabId}"]`).forEach(link => link.classList.add('active'));
    
    updateLearnMoreButton(tabId);

    if (window.innerWidth < 1024) {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            window.scrollTo({ top: mainElement.offsetTop - 80, behavior: 'smooth' });
        }
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-btn');
    if (menu) {
        const isHidden = menu.classList.toggle('hidden');
        if (button) {
            button.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
        }
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-btn');
    if (menu) {
        menu.classList.add('hidden');
    }
    if (button) {
        button.setAttribute('aria-expanded', 'false');
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

function initNavigation() {
    switchTab('about');
    switchResumeTab('experience');

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
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

    const brandHomeLink = document.getElementById('brand-home');
    if (brandHomeLink) {
        brandHomeLink.addEventListener('click', event => {
            event.preventDefault();
            switchTab('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMobileMenu();
            document.querySelectorAll('.project-modal').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    closeModal(modal.id);
                }
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectModals();
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function initProjectModals() {
    document.querySelectorAll('[data-modal-target]').forEach(element => {
        element.addEventListener('click', () => {
            const target = element.getAttribute('data-modal-target');
            if (target) openModal(target);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-modal');
            if (modal && modal.id) {
                closeModal(modal.id);
            }
        });
    });

    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}
