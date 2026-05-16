document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
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
