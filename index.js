// ========================================
// PORTFOLIO JAVASCRIPT - FUNCIONALIDADES CENTRALIZADAS
// ========================================

// Menú móvil
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('#main-nav ul');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!mobileToggle || !navMenu || !overlay) return;
    
    const menuIcon = mobileToggle.querySelector('i');

    function toggleMobileMenu() {
        navMenu.classList.toggle('mobile-menu-open');
        overlay.classList.toggle('active');
        
        // Cambiar icono
        if (navMenu.classList.contains('mobile-menu-open')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            mobileToggle.setAttribute('aria-label', 'Cerrar menú');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            mobileToggle.setAttribute('aria-label', 'Abrir menú');
        }
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();
            }
        });
    });
}

// Filtrado de proyectos
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'todos' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Filtrado de diseño gráfico
function initDesignFilters() {
    const filterButtons = document.querySelectorAll('.design-filters .filter-btn');
    const designCards = document.querySelectorAll('.design-card');
    
    if (filterButtons.length === 0 || designCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            designCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'todos' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Filtrado de IA Generativa
function initAIFilters() {
    const filterButtons = document.querySelectorAll('.ai-filters .filter-btn');
    const aiCards = document.querySelectorAll('.ai-card');
    
    if (filterButtons.length === 0 || aiCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            aiCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'todos' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Estados de carga para imágenes y videos
function initMediaLoading() {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');

    images.forEach(img => {
        if (!img.complete) {
            img.parentElement.classList.add('loading');
            img.addEventListener('load', () => {
                img.parentElement.classList.remove('loading');
            });
            img.addEventListener('error', () => {
                img.parentElement.classList.remove('loading');
                img.style.display = 'none';
            });
        }
    });

    videos.forEach(video => {
        video.addEventListener('loadstart', () => {
            video.parentElement.classList.add('loading');
        });
        video.addEventListener('canplay', () => {
            video.parentElement.classList.remove('loading');
        });
        video.addEventListener('error', () => {
            video.parentElement.classList.remove('loading');
        });
    });
}

// Animaciones de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.project-card, .design-card, .ai-card, .testimonial-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading para imágenes
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Tooltips para elementos interactivos
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.title;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Función principal de inicialización
function initPortfolio() {
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initProjectFilters();
    initDesignFilters();
    initAIFilters();
    initMediaLoading();
    initAnimations();
    initSmoothScroll();
    initLazyLoading();
    initTooltips();
    
    console.log('Portfolio JavaScript inicializado correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}