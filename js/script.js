document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    const imageWidthExcess = 20;
    const startTranslateX = imageWidthExcess / 2;
    const endTranslateX = -imageWidthExcess / 2;

    function panImageOnScroll(section, image) {
        if (!section || !image) return;

        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const scrollProgress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionRect.height);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        const translateX = startTranslateX + (clampedProgress * (endTranslateX - startTranslateX));

        image.style.transform = `translateX(${translateX}%)`;
    }

    const approachSection = document.getElementById('our-approach');
    const approachImage = approachSection ? approachSection.querySelector('.approach-image img') : null;

    if (approachSection && approachImage) {
        
        function handleApproachScroll() {
            panImageOnScroll(approachSection, approachImage);
        }

        panImageOnScroll(approachSection, approachImage);
        window.addEventListener('scroll', handleApproachScroll);
        window.addEventListener('resize', handleApproachScroll);
    }

    const whoWeAreSection = document.getElementById('who-we-are');
    const whoWeAreImage = whoWeAreSection ? whoWeAreSection.querySelector('.approach-image img') : null;

    if (whoWeAreSection && whoWeAreImage) {
        const imageWidthExcess = 20;
        const startTranslateX = imageWidthExcess / 2;
        const endTranslateX = -imageWidthExcess / 2;

        function handleWhoWeAreScroll() {
            panImageOnScroll(whoWeAreSection, whoWeAreImage);
        }

        panImageOnScroll(whoWeAreSection, whoWeAreImage);
        window.addEventListener('scroll', handleWhoWeAreScroll);
        window.addEventListener('resize', handleWhoWeAreScroll);
    }

    // --- Scroll Reveal Animation for Our Four Pillars Section ---
    const pillarItems = document.querySelectorAll('.pillar-item');

    if (pillarItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const pillarObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        pillarItems.forEach(item => {
            pillarObserver.observe(item);
        });
    }

    // --- FAQ Expandable Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
            
            // Add keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
            
            // Set proper ARIA attributes for accessibility
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${Array.from(faqItems).indexOf(item)}`);
            
            const answer = item.querySelector('.faq-answer');
            answer.id = `faq-answer-${Array.from(faqItems).indexOf(item)}`;
            
            // Update ARIA attributes when toggling
            question.addEventListener('click', () => {
                const isExpanded = item.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded);
            });
        });
    }
});
