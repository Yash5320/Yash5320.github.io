// js/index-specific.js

// Fitness Gallery Logic
document.addEventListener('DOMContentLoaded', function() {
    const slides = Array.from(document.querySelectorAll('.fitness-slide'));
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        slides[currentSlideIndex].classList.add('visible');
        setInterval(() => {
            const currentSlide = slides[currentSlideIndex];
            const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
            const nextSlide = slides[nextSlideIndex];
            
            nextSlide.style.zIndex = parseInt(window.getComputedStyle(currentSlide).zIndex || 1) + 1;
            nextSlide.classList.add('is-transitioning');

            setTimeout(() => {
                currentSlide.classList.remove('visible');
                currentSlide.classList.remove('is-transitioning');
                currentSlide.style.zIndex = '';
                
                nextSlide.classList.remove('is-transitioning');
                nextSlide.classList.add('visible');

                currentSlideIndex = nextSlideIndex;
            }, 1200);
        }, 4000);
    }
});


// Matrix Background Logic
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const characters = 'अआइईउऊऋॠऌॡएऐओऔकखगघचछजझटठडढतथदधनऩपफबभमयरलकवशषहलळ';
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#00aaff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < columns; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(draw, 33);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });
}
