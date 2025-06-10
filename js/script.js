// In js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing hamburger menu logic (keep as is)
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

    // --- Parallax Image Pan Animation ---
    const approachSection = document.getElementById('our-approach');
    const approachImage = approachSection ? approachSection.querySelector('.approach-image img') : null;

    if (approachSection && approachImage) {
        const imageWidthExcess = 20; // Corresponds to the 120% width (120 - 100 = 20)
        
        // Define the start and end translateX values
        // Start: +10% (pushes image right, revealing more of its left side)
        const startTranslateX = imageWidthExcess / 2; // 10%
        // End: -10% (pushes image left, revealing more of its right side)
        const endTranslateX = -imageWidthExcess / 2; // -10%

        // Function to calculate image position based on scroll
        function panImageOnScroll() {
            const sectionRect = approachSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the section is visible in the viewport
            const scrollProgress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionRect.height);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // Map clampedProgress (0 to 1) to the new translateX range (+10% to -10%)
            const translateX = startTranslateX + (clampedProgress * (endTranslateX - startTranslateX));

            // Apply the transform
            approachImage.style.transform = `translateX(${translateX}%)`;
        }

        // Initial call to set position correctly on load
        panImageOnScroll();

        // Add scroll event listener (can be throttled for very high performance needs)
        window.addEventListener('scroll', panImageOnScroll);
        window.addEventListener('resize', panImageOnScroll);
    }
});