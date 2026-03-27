document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load Animation
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    // Only apply if not on mobile (cursor elements exist)
    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Outline interpolates for smooth effect
        const smoothCursor = () => {
            // Speed of outline following
            const easing = 0.15;
            outlineX += (mouseX - outlineX) * easing;
            outlineY += (mouseY - outlineY) * easing;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(smoothCursor);
        };
        smoothCursor();

        // Hover effects
        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            target.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Config for observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into full view
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach((el) => {
        observer.observe(el);
    });

    // 4. Parallax Effect for Project Image Containers (Optional premium detail)
    const projectImages = document.querySelectorAll('.project-image-container');
    
    // Add multiple image URLs to represent the projects
    const images = [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract design 1
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop', // Tech / AI 1
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop', // Design system UI
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop'  // Abstract brand 2
    ];

    projectImages.forEach((container, index) => {
        // Set background image
        if (images[index]) {
            container.style.backgroundImage = `url('${images[index]}')`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
            container.style.transition = 'background-position 0.5s ease-out';
        }

        // Slight parallax on mousemove over the card
        container.parentElement.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            // Calculate mouse position relative to center of element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move background slightly
            const moveX = (x / rect.width) * 10;
            const moveY = (y / rect.height) * 10;
            
            container.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        });

        // Reset on leave
        container.parentElement.addEventListener('mouseleave', () => {
            container.style.backgroundPosition = 'center';
        });
    });
});
