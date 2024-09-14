document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const logoContainer = document.querySelector('.logo-container');
    const nav = document.querySelector('.nav-container');
    let headerHeight, navHeight, logoHeight;
    let isSticky = false;
    let ticking = false;

    function updateHeights() {
        if (header && logoContainer && nav) {
            headerHeight = header.offsetHeight;
            navHeight = nav.offsetHeight;
            logoHeight = logoContainer.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            document.body.style.paddingTop = `${headerHeight}px`;
        }
    }

    function updateSticky() {
        if (header && logoContainer) {
            const scrollY = window.scrollY;
            const triggerPoint = logoHeight;

            if (scrollY > triggerPoint && !isSticky) {
                isSticky = true;
                header.classList.add('sticky');
                document.body.style.paddingTop = `${headerHeight}px`;
                header.style.transform = `translateY(-${logoHeight}px)`;
            } else if (scrollY <= triggerPoint && isSticky) {
                isSticky = false;
                header.classList.remove('sticky');
                document.body.style.paddingTop = `${headerHeight}px`;
                header.style.transform = 'translateY(0)';
            }
        }
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateSticky);
            ticking = true;
        }
    }

    if (header && logoContainer && nav) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateHeights);
        
        // Improved zoom detection
        let lastWidth = window.innerWidth;
        window.addEventListener('resize', function() {
            const newWidth = window.innerWidth;
            if (newWidth !== lastWidth) {
                lastWidth = newWidth;
                setTimeout(updateHeights, 100);
            }
        });

        // Initial setup
        updateHeights();
        updateSticky();
    }
});