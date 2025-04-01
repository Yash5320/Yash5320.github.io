document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Image Changer for About Me ---
    const dynamicImage = document.getElementById('dynamic-image');
    const imageUrls = [
        'images/about1.jpg', // Make sure these paths are correct
        'images/about2.jpg',
        'images/about3.jpg'
        // Add more image paths if you have them
    ];
    let currentImageIndex = 0;
    const imageChangeInterval = 4000; // Time in milliseconds (4 seconds)

    function changeAboutImage() {
        if (!dynamicImage) return; // Exit if element not found

        currentImageIndex = (currentImageIndex + 1) % imageUrls.length; // Cycle through images

        // Fade out
        dynamicImage.style.opacity = 0;

        // Wait for fade out, then change src and fade in
        setTimeout(() => {
            dynamicImage.src = imageUrls[currentImageIndex];
            dynamicImage.style.opacity = 1;
        }, 700); // Should match the opacity transition duration in CSS
    }

    // Start the image rotation if the element exists
    if (dynamicImage && imageUrls.length > 1) {
        setInterval(changeAboutImage, imageChangeInterval);
    }

    // --- Intersection Observer for Fade-In Animations ---
    // Select all elements that should fade in
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running'; // Start the animation
                // Optional: Unobserve after animation starts to save resources
                observer.unobserve(entry.target);
            } else {
                 // Optional: Pause animation if it goes out of view (if you want it to re-animate)
                 // entry.target.style.animationPlayState = 'paused';
            }
        });
    };

    // Create the observer
    const fadeInObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each fade-in element
    fadeElements.forEach(el => {
        // Initially pause the animation defined in CSS
        el.style.animationPlayState = 'paused';
        fadeInObserver.observe(el);
    });

    // --- Optional: Smooth Scrolling for internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align top of the target element to the top of the viewport
                });
            }
        });
    });

    // --- Optional: Dark Mode Toggle (Example) ---
    // Add a button or switch in your HTML with id="darkModeToggle"
    /*
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Optional: Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Optional: Check for saved theme preference on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    */

}); // End DOMContentLoaded
