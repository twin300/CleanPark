document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const mobileQuery = window.matchMedia('(max-width: 992px)');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (isOpen) {
                header?.classList.remove('header-hidden');
            }
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (header && mobileNavToggle && nav) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const closeMobileMenu = () => {
            nav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        };

        const syncHeaderOnScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (!mobileQuery.matches || currentScrollY < 80) {
                header.classList.remove('header-hidden');
            } else if (delta > 8) {
                closeMobileMenu();
                header.classList.add('header-hidden');
            } else if (delta < -8) {
                header.classList.remove('header-hidden');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(syncHeaderOnScroll);
                ticking = true;
            }
        }, { passive: true });

        const resetMobileHeader = () => {
            header.classList.remove('header-hidden');
            closeMobileMenu();
            lastScrollY = window.scrollY;
        };

        if (mobileQuery.addEventListener) {
            mobileQuery.addEventListener('change', resetMobileHeader);
        } else {
            mobileQuery.addListener(resetMobileHeader);
        }
    }

    // Show More logic
    const moreButtons = document.querySelectorAll('.btn-more');
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const moreContent = this.previousElementSibling;
            if (moreContent && moreContent.classList.contains('more-content')) {
                const isOpen = moreContent.classList.toggle('open');
                this.textContent = isOpen ? 'Скрыть' : 'Показать еще';
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll Reveal
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Calculator Logic
    const typeDisplay = document.getElementById('type-display');
    const areaInput = document.getElementById('area');
    const totalPriceSpan = document.getElementById('total-price');
    const prevBtn = document.querySelector('.type-arrow.prev');
    const nextBtn = document.querySelector('.type-arrow.next');

    const cleaningTypes = [
        { name: 'Поддерживающая (от 150 ₽/м²)', value: 150 },
        { name: 'Генеральная (от 250 ₽/м²)', value: 250 },
        { name: 'После ремонта (от 400 ₽/м²)', value: 400 }
    ];

    let currentTypeIndex = 1; // Default to General

    if (typeDisplay && areaInput && totalPriceSpan && prevBtn && nextBtn) {
        const updateUI = () => {
            const type = cleaningTypes[currentTypeIndex];
            typeDisplay.textContent = type.name;
            typeDisplay.dataset.value = type.value;
            calculateTotal();
        };

        const calculateTotal = () => {
            const pricePerMeter = parseInt(typeDisplay.dataset.value);
            const area = parseFloat(areaInput.value) || 0;
            const total = pricePerMeter * area;
            
            totalPriceSpan.textContent = total.toLocaleString('ru-RU');
        };

        prevBtn.addEventListener('click', () => {
            currentTypeIndex = (currentTypeIndex - 1 + cleaningTypes.length) % cleaningTypes.length;
            updateUI();
        });

        nextBtn.addEventListener('click', () => {
            currentTypeIndex = (currentTypeIndex + 1) % cleaningTypes.length;
            updateUI();
        });

        areaInput.addEventListener('input', calculateTotal);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
