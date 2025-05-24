// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate');
                
                // If this is a feature item, add staggered animation
                if (entry.target.classList.contains('feature-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            } else {
                // Optional: Remove animation class when scrolling up
                entry.target.classList.remove('animate');
                // Reset transition delay
                if (entry.target.classList.contains('feature-item')) {
                    entry.target.style.transitionDelay = '';
                }
            }
        });
    }, options);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate], .feature-item, .project').forEach(item => {
        observer.observe(item);
    });

    // Observe quote
    const quote = document.querySelector('.why-choose-quote');
    if (quote) {
        observer.observe(quote);
    }
});