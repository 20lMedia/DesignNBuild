// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initContactForm();
    initProjects();
    initMobileMenu();
    initReviewsSlider();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle internal links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Format the message for WhatsApp
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        
        // WhatsApp number (without any spaces or special characters)
        const whatsappNumber = '919944206600';
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 5000);
}

async function submitForm(data) {
    try {
        const response = await emailjs.send(
            'service_3rfzrlc',  // Updated service ID
            'template_un50gio',  // Template ID
            {
                from_name: data.name,
                name: data.name,      // Added as per template parameters
                email: data.email,    // Added as per template parameters
                message: data.message
            },
            'kF1JhrFnnqyBIzBh3'  // Your public key
        );
        return response;
    } catch (error) {
        console.error('EmailJS error:', error);
        throw new Error('Failed to send message');
    }
}

// Project interactions
function initProjects() {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.querySelector('.project-image').style.transform = 'scale(1.05)';
        });

        project.addEventListener('mouseleave', function() {
            this.querySelector('.project-image').style.transform = 'scale(1)';
        });

        project.addEventListener('click', function() {
            // Check if the project has an image
            const projectImage = this.querySelector('.project-image img');
            if (projectImage) {
                // Determine which gallery to show based on the image source
                const imageSrc = projectImage.src;
                if (imageSrc.includes('/4d/')) {
                    showImagePopup(imageSrc, '4d');
                } else if (imageSrc.includes('/3d/')) {
                    showImagePopup(imageSrc, '3d');
                } else if (imageSrc.includes('/2d/')) {
                    showImagePopup(imageSrc, '2d');
                } else if (imageSrc.includes('/c1/')) { // Add this condition for c1 images
                    showImagePopup(imageSrc, 'c1');
                } else if (imageSrc.includes('/c2/')) { // Add this condition for c2 images
                    showImagePopup(imageSrc, 'c2');
                } else if (imageSrc.includes('/i1/')) { // Add this condition for i1 images
                    showImagePopup(imageSrc, 'i1');
                }
                else {
                    showImagePopup(imageSrc, '1d');
                }
            } else {
                // Fallback to original navigation if no image
                const projectTitle = this.querySelector('.project-title').textContent;
                navigateToProject(projectTitle);
            }
        });
    });
}

// Gallery images arrays
const galleryImages = {
    '1d': [
        '/Domestic files/1d/11-min.jpg',
        '/Domestic files/1d/12-min.jpg',
        '/Domestic files/1d/13-min.jpg',
        '/Domestic files/1d/14-min.jpg',
        '/Domestic files/1d/15-min.jpg',
        '/Domestic files/1d/16-min.jpg',
        '/Domestic files/1d/17-min.jpg',
        '/Domestic files/1d/18-min.jpg',
        '/Domestic files/1d/19-min.jpg'
    ],
    '2d': [
        '/Domestic files/2d/0-min.jpg',
        '/Domestic files/2d/2-min.jpg',
        '/Domestic files/2d/3-min.jpg',
        '/Domestic files/2d/4-min.jpg',
        '/Domestic files/2d/5-min.jpg',
        '/Domestic files/2d/6-min.jpg',
        '/Domestic files/2d/7-min.jpg',
        '/Domestic files/2d/8-min.jpg',
        '/Domestic files/2d/9-min.jpg'
    ],
    '3d': [
        '/Domestic files/3d/0-min.jpg',
        '/Domestic files/3d/01-min.jpg',
        '/Domestic files/3d/1-min.jpg',
        '/Domestic files/3d/2-min.jpg',
        '/Domestic files/3d/3-min.jpg',
        '/Domestic files/3d/4-min.jpg',
        '/Domestic files/3d/5-min.jpg',
        '/Domestic files/3d/6-min.jpg',
        '/Domestic files/3d/7-min.jpg',
        '/Domestic files/3d/8-min.jpg',
        '/Domestic files/3d/9-min.jpg'
    ],
    '4d': [
        '/Domestic files/4d/1-min.jpg',
        '/Domestic files/4d/2-min.jpg',
        '/Domestic files/4d/3-min.jpg',
        '/Domestic files/4d/4-min.jpg',
        '/Domestic files/4d/5-min.jpg',
        '/Domestic files/4d/6-min.jpg',
        '/Domestic files/4d/7-min.jpg',
        '/Domestic files/4d/8-min.jpg'
    ],
    'c1': [
        '/Commercial files/c1/bb1.png',
        '/Commercial files/c1/bb2.png',
        '/Commercial files/c1/bb3.png',
        '/Commercial files/c1/bb4.png',
        '/Commercial files/c1/bb5.png',
    ],
    'c2': [
        '/Commercial files/c2/c1.png',
        '/Commercial files/c2/c2.png',
    ],
    'i1': [
        '/Industrial files/i1/v1.png',
        '/Industrial files/i1/v2.png',
        '/Industrial files/i1/v3.png',
        '/Industrial files/i1/v4.png',
    ]
};

// Image popup gallery functionality
function showImagePopup(imageSrc, galleryType = '1d') {
    // Get the correct gallery array
    const currentGallery = galleryImages[galleryType];

    // Find the index of the clicked image in the gallery array
    let currentIndex = 0;
    const imagePath = imageSrc.split('/').slice(-2).join('/');

    // Try to find the image in our gallery array
    currentGallery.forEach((img, index) => {
        if (img.includes(imagePath) || imageSrc.includes(img)) {
            currentIndex = index;
        }
    });

    // Create popup elements if they don't exist
    let popup = document.querySelector('.popup-gallery');

    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'popup-gallery';

        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';

        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'popup-image-container';

        const image = document.createElement('img');
        image.className = 'popup-image';
        // Add event listener to prevent right-click saving on the main image
        image.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Add loading indicator
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'popup-loading';

        // Add image counter
        const counter = document.createElement('div');
        counter.className = 'popup-counter';

        // Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close gallery');
        closeButton.addEventListener('click', closeImagePopup);

        // Create navigation buttons
        const navContainer = document.createElement('div');
        navContainer.className = 'popup-nav';

        const prevButton = document.createElement('button');
        prevButton.className = 'popup-nav-button prev';
        prevButton.textContent = 'Previous';
        prevButton.setAttribute('aria-label', 'Previous image');
        prevButton.addEventListener('click', () => navigateGallery('prev'));

        const nextButton = document.createElement('button');
        nextButton.className = 'popup-nav-button next';
        nextButton.textContent = 'Next';
        nextButton.setAttribute('aria-label', 'Next image');
        nextButton.addEventListener('click', () => navigateGallery('next'));

        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);

        // Create thumbnails container
        const thumbnailsContainer = document.createElement('div');
        thumbnailsContainer.className = 'popup-thumbnails';

        // Assemble the popup structure
        imageContainer.appendChild(image);
        imageContainer.appendChild(loadingSpinner);
        imageContainer.appendChild(counter);
        imageContainer.appendChild(closeButton);

        popupContent.appendChild(imageContainer);
        popupContent.appendChild(navContainer);
        popupContent.appendChild(thumbnailsContainer);
        popup.appendChild(popupContent);

        // Close popup when clicking outside the content
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeImagePopup();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!popup.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    closeImagePopup();
                    break;
                case 'ArrowLeft':
                    navigateGallery('prev');
                    break;
                case 'ArrowRight':
                    navigateGallery('next');
                    break;
            }
        });

        document.body.appendChild(popup);
    }

    // Store the current gallery type
    popup.dataset.galleryType = galleryType;

    // Update the current image index
    popup.dataset.currentIndex = currentIndex;

    // Clear existing thumbnails
    const thumbnailsContainer = popup.querySelector('.popup-thumbnails');
    thumbnailsContainer.innerHTML = '';

    // Add thumbnails for the current gallery
    currentGallery.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.className = 'popup-thumbnail';
        thumbnail.src = imgSrc;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.setAttribute('aria-label', `View image ${index + 1}`);
        thumbnail.addEventListener('click', () => {
            updateGalleryImage(index);
        });
        // Add event listener to prevent right-click saving on thumbnails
        thumbnail.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Update the gallery image
    updateGalleryImage(currentIndex);

    // Show popup with a slight delay to ensure smooth animation
    setTimeout(() => {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    }, 10);
}

function updateGalleryImage(index) {
    const popup = document.querySelector('.popup-gallery');
    if (!popup) return;

    // Get the current gallery type
    const galleryType = popup.dataset.galleryType || '1d';
    const currentGallery = galleryImages[galleryType];

    // Update current index
    popup.dataset.currentIndex = index;

    // Show loading spinner
    const loadingSpinner = popup.querySelector('.popup-loading');
    if (loadingSpinner) loadingSpinner.style.display = 'block';

    // Update main image
    const popupImage = popup.querySelector('.popup-image');

    // Remove previous fade-in class
    popupImage.classList.remove('fade-in');

    // Create a new image object to preload
    const newImage = new Image();
    newImage.src = currentGallery[index];

    newImage.onload = function() {
        // Hide loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'none';

        // Update the visible image
        popupImage.src = currentGallery[index];
        popupImage.classList.add('fade-in');

        // Update counter
        const counter = popup.querySelector('.popup-counter');
        if (counter) {
            counter.textContent = `${index + 1} / ${currentGallery.length}`;
        }

        // Update thumbnails
        const thumbnails = popup.querySelectorAll('.popup-thumbnail');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
                // Scroll thumbnail into view if needed
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    };

    newImage.onerror = function() {
        // Hide loading spinner on error
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        popupImage.src = ''; // Clear the image
        popupImage.alt = 'Image failed to load';
    };
}

function navigateGallery(direction) {
    const popup = document.querySelector('.popup-gallery');
    if (!popup) return;
    
    // Get the current gallery type
    const galleryType = popup.dataset.galleryType || '1d';
    const currentGallery = galleryImages[galleryType];
    
    let currentIndex = parseInt(popup.dataset.currentIndex);
    
    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    } else {
        currentIndex = (currentIndex + 1) % currentGallery.length;
    }
    
    updateGalleryImage(currentIndex);
}

function closeImagePopup() {
    const popup = document.querySelector('.popup-gallery');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset image after transition completes
        setTimeout(() => {
            const popupImage = popup.querySelector('.popup-image');
            if (popupImage) {
                popupImage.classList.remove('fade-in');
            }
        }, 400); // Match the transition duration
    }
}

function navigateToProject(projectTitle) {
    // Implement project navigation logic here
    console.log('Navigating to project:', projectTitle);
}

// Mobile menu handling
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}

// Reviews slider with touch support
function initReviewsSlider() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const dots = document.querySelectorAll('.slider-dot');
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (reviewsGrid && dots.length) {
        // Touch events for mobile
        reviewsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        reviewsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToReview(index);
            });
        });

        // Auto-scroll every 5 seconds
        let autoScrollInterval = setInterval(() => autoScroll(), 5000);
        
        // Pause auto-scroll on hover
        reviewsGrid.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        reviewsGrid.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => autoScroll(), 5000);
        });
    }
}

function handleSwipe() {
    const SWIPE_THRESHOLD = 50;
    const difference = touchStartX - touchEndX;
    const reviewsGrid = document.querySelector('.reviews-grid');
    const dots = document.querySelectorAll('.slider-dot');
    const currentIndex = getCurrentReviewIndex();

    if (Math.abs(difference) > SWIPE_THRESHOLD) {
        if (difference > 0 && currentIndex < dots.length - 1) {
            // Swipe left
            scrollToReview(currentIndex + 1);
        } else if (difference < 0 && currentIndex > 0) {
            // Swipe right
            scrollToReview(currentIndex - 1);
        }
    }
}

function getCurrentReviewIndex() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const scrollPercentage = reviewsGrid.scrollLeft / (reviewsGrid.scrollWidth - reviewsGrid.clientWidth);
    const dots = document.querySelectorAll('.slider-dot');
    return Math.round(scrollPercentage * (dots.length - 1));
}

function scrollToReview(index) {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const dots = document.querySelectorAll('.slider-dot');
    
    const scrollPosition = reviewsGrid.scrollWidth * (index / dots.length);
    reviewsGrid.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    updateDots(index);
}

function updateDots(activeIndex) {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function autoScroll() {
    const currentIndex = getCurrentReviewIndex();
    const dots = document.querySelectorAll('.slider-dot');
    const nextIndex = (currentIndex + 1) % dots.length;
    scrollToReview(nextIndex);
}

// Sort functionality for projects
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProjects(this.value);
        });
    }
});

function sortProjects(sortType) {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    const projects = Array.from(projectsContainer.querySelectorAll('.project'));
    
    projects.sort(function(a, b) {
        switch(sortType) {
            case 'price-low':
                const priceA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                return priceA - priceB;
            
            case 'price-high':
                const priceHighA = parseInt(a.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                const priceHighB = parseInt(b.querySelector('.price').textContent.replace(/[^0-9]/g, ''));
                return priceHighB - priceHighA;
            
            case 'name-asc':
                const nameA = a.querySelector('.project-title').textContent;
                const nameB = b.querySelector('.project-title').textContent;
                return nameA.localeCompare(nameB);
            
            case 'name-desc':
                const nameDescA = a.querySelector('.project-title').textContent;
                const nameDescB = b.querySelector('.project-title').textContent;
                return nameDescB.localeCompare(nameDescA);
            
            default:
                const numA = parseInt(a.querySelector('.project-number').textContent);
                const numB = parseInt(b.querySelector('.project-number').textContent);
                return numA - numB;
        }
    });
    
    // Clear and re-append sorted projects
    projects.forEach(function(project) {
        projectsContainer.appendChild(project);
    });
}

// Scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    function checkScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

function initCarousel() {
    const images = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Change image every 3 seconds
    setInterval(showNextImage, 3000);
}

// Initialize carousel when the page loads
document.addEventListener('DOMContentLoaded', initCarousel);

// Function to disable right-click save on images
function disableImageSaving() {
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // Prevent the default right-click menu
        });
    });
}

// Initialize functions when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initProjects();
    disableImageSaving(); // Call the new function
});

// Loader functionality
window.addEventListener('load', function() {
    const loaderContainer = document.querySelector('.loader-container');
    setTimeout(() => {
        loaderContainer.classList.add('loader-hidden');
        setTimeout(() => {
            loaderContainer.style.display = 'none';
        }, 500);
    }, 1000);
});

// Reviews Carousel
function initReviewsCarousel() {
    const slides = document.querySelectorAll('.reviews-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        document.querySelectorAll('.dot')[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides every 7 seconds
    setInterval(nextSlide, 7000);

    // Show first slide initially
    showSlide(0);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initReviewsCarousel();
});