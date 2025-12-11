// ========================================
// PORTFOLIO JAVASCRIPT - FUNCIONALIDADES
// ========================================

// Menú móvil
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('#main-nav ul');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (!mobileToggle || !navMenu || !overlay) return;

    const menuIcon = mobileToggle.querySelector('i');

    function toggleMobileMenu() {
        const isOpen = navMenu.classList.toggle('mobile-menu-open');
        overlay.classList.toggle('mobile-menu-open', isOpen);

        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-times', isOpen);
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    // Cerrar al hacer click en un enlace del menú
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('mobile-menu-open')) {
                toggleMobileMenu();
            }
        });
    });
}

// Utilidad genérica para filtros (proyectos, diseño, IA)
function initFilterGroup(filterContainerSelector, cardSelector) {
    const filterContainer = document.querySelector(filterContainerSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (!filterContainer || cards.length === 0) return;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    if (buttons.length === 0) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            cards.forEach(card => {
                const categories = (card.dataset.category || '').split(' ');
                if (filter === 'todos' || categories.includes(filter)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Inicializar grupos de filtros específicos
function initFilters() {
    // Proyectos de programación
    initFilterGroup('.project-filters', '.project-card');

    // Diseño gráfico
    initFilterGroup('.design-filters', '.design-card');

    // IA generativa / Videos IA
    initFilterGroup('.ai-filters', '.ai-card');
}

// Animaciones de entrada simples con IntersectionObserver
function initAnimations() {
    const elements = document.querySelectorAll(
        '.section, .project-card, .design-card, .ai-card, .timeline-item'
    );

    if (elements.length === 0 || !('IntersectionObserver' in window)) return;

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    elements.forEach(el => observer.observe(el));
}

// Smooth scroll para enlaces internos (por si los usás)
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                event.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Carga visual de imágenes / videos con clase .loading (opcional)
function initMediaLoading() {
    const mediaContainers = document.querySelectorAll('.project-media, .design-image, .ai-image');

    mediaContainers.forEach(container => {
        const img = container.querySelector('img');
        const video = container.querySelector('video');

        if (img) {
            img.addEventListener('load', () => {
                container.classList.remove('loading');
            });
            img.addEventListener('error', () => {
                container.classList.remove('loading');
            });
        }

        if (video) {
            video.addEventListener('loadeddata', () => {
                container.classList.remove('loading');
            });
            video.addEventListener('error', () => {
                container.classList.remove('loading');
            });
        }
    });
}

// Tooltips básicos con atributo data-tooltip (por si los usás)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    if (tooltipElements.length === 0) return;

    let tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'tooltip';
    tooltipDiv.style.position = 'fixed';
    tooltipDiv.style.zIndex = '9999';
    tooltipDiv.style.pointerEvents = 'none';
    tooltipDiv.style.background = 'rgba(15, 23, 42, 0.96)';
    tooltipDiv.style.color = '#e5e7eb';
    tooltipDiv.style.fontSize = '0.75rem';
    tooltipDiv.style.padding = '0.25rem 0.6rem';
    tooltipDiv.style.borderRadius = '999px';
    tooltipDiv.style.opacity = '0';
    tooltipDiv.style.transform = 'translateY(4px)';
    tooltipDiv.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

    document.body.appendChild(tooltipDiv);

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', e => {
            const text = el.getAttribute('data-tooltip');
            if (!text) return;
            tooltipDiv.textContent = text;
            tooltipDiv.style.opacity = '1';
            tooltipDiv.style.transform = 'translateY(0)';
            positionTooltip(e);
        });

        el.addEventListener('mousemove', positionTooltip);

        el.addEventListener('mouseleave', () => {
            tooltipDiv.style.opacity = '0';
            tooltipDiv.style.transform = 'translateY(4px)';
        });
    });

    function positionTooltip(e) {
        const padding = 10;
        const rect = tooltipDiv.getBoundingClientRect();
        let x = e.clientX + padding;
        let y = e.clientY + padding;

        if (x + rect.width > window.innerWidth) {
            x = e.clientX - rect.width - padding;
        }
        if (y + rect.height > window.innerHeight) {
            y = e.clientY - rect.height - padding;
        }

        tooltipDiv.style.left = `${x}px`;
        tooltipDiv.style.top = `${y}px`;
    }
}

// Inicializador general
function initPortfolio() {
    initMobileMenu();
    initFilters();
    initAnimations();
    initSmoothScroll();
    initMediaLoading();
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
