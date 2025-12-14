/* ============================================
   SMOOTH SCROLL NAVIGATION
   ============================================ */

/**
 * smoothScroll(event, targetSelector)
 * Smoothly scrolls to the target element
 * @param {Event} event - The click event
 * @param {string} targetSelector - CSS selector of target element
 */
function smoothScroll(event, targetSelector) {
    event.preventDefault();
    const targetElement = document.querySelector(targetSelector);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ============================================
   GALLERY & IMAGE INTERACTION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to gallery images for modal view
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
        
        // Add cursor pointer to show images are clickable
        image.style.cursor = 'pointer';
    });

    // Add click handlers to portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    portfolioImages.forEach(image => {
        image.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
        
        image.style.cursor = 'pointer';
    });
});

/**
 * openImageModal(imageSrc, imageAlt)
 * Opens a modal to display the clicked image in full size
 * @param {string} imageSrc - Source URL of the image
 * @param {string} imageAlt - Alt text of the image
 */
function openImageModal(imageSrc, imageAlt) {
    // Remove existing modal if present
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeImageModal()">✕</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
        </div>
    `;

    document.body.appendChild(modal);

    // Trigger fade-in animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

/**
 * closeImageModal()
 * Closes the image modal with fade-out animation
 */
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.removeEventListener('keydown', handleEscapeKey);
        }, 300);
    }
}

/**
 * handleEscapeKey(event)
 * Closes modal when Escape key is pressed
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Intersection Observer for fade-in animations on scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-animation');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Apply observer to animatable elements
    const animateElements = document.querySelectorAll('.plan-card, .gallery-item, .note-item, .portfolio-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

/* ============================================
   PAGE LOAD COMPLETION
   ============================================ */

window.addEventListener('load', function() {
    console.log('Cookie Factory website loaded successfully!');
});

/* ============================================
   ACCESSIBILITY: KEYBOARD NAVIGATION
   ============================================ */

document.addEventListener('keydown', function(e) {
    // Tab navigation support (browsers handle this natively)
    if (e.key === 'Tab') {
        // Custom handling if needed
    }
});

