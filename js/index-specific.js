// js/index-specific.js

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Fitness Gallery Logic ---
    const fitnessSlides = Array.from(document.querySelectorAll('.fitness-slide'));
    if (fitnessSlides.length > 0) {
        let currentSlideIndex = 0;
        fitnessSlides[currentSlideIndex].classList.add('visible');
        setInterval(() => {
            const currentSlide = fitnessSlides[currentSlideIndex];
            const nextSlideIndex = (currentSlideIndex + 1) % fitnessSlides.length;
            const nextSlide = fitnessSlides[nextSlideIndex];
            
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

    // --- 2. Matrix Background Logic ---
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

        setInterval(draw, 33);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        });
    }

    // --- 3. Projects Carousel Logic ---
    const track = document.querySelector('.projects-track');
    if (track && track.children.length > 0) {
        const prevButton = document.getElementById('prev-project');
        const nextButton = document.getElementById('next-project');
        let isMoving = false;
        
        const getVisibleProjectsCount = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };
        
        const updateArrowStates = () => {
            const visibleCount = getVisibleProjectsCount();
            const totalCount = track.children.length;
            const shouldDisable = totalCount <= visibleCount;
            
            prevButton.classList.toggle('disabled', shouldDisable);
            nextButton.classList.toggle('disabled', shouldDisable);
        };

        const moveNext = () => {
            if (isMoving) return;
            isMoving = true;
            
            const cardWidth = track.firstElementChild.offsetWidth;
            const gap = parseFloat(getComputedStyle(track).gap);
            const moveDistance = cardWidth + gap;

            track.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
            track.style.transform = `translateX(-${moveDistance}px)`;

            const handleTransitionEnd = () => {
                track.appendChild(track.firstElementChild);
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';

                setTimeout(() => {
                    track.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
                    isMoving = false;
                });
                
                track.removeEventListener('transitionend', handleTransitionEnd);
            };
            track.addEventListener('transitionend', handleTransitionEnd);
        };

        const movePrev = () => {
            if (isMoving) return;
            isMoving = true;
            
            const cardWidth = track.firstElementChild.offsetWidth;
            const gap = parseFloat(getComputedStyle(track).gap);
            const moveDistance = cardWidth + gap;
            
            track.style.transition = 'none';
            track.insertBefore(track.lastElementChild, track.firstElementChild);
            track.style.transform = `translateX(-${moveDistance}px)`;

            setTimeout(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
                track.style.transform = 'translateX(0)';
            }, 20);

            const handleTransitionEnd = () => {
                isMoving = false;
                track.removeEventListener('transitionend', handleTransitionEnd);
            };
            track.addEventListener('transitionend', handleTransitionEnd);
        };
        
        nextButton.addEventListener('click', moveNext);
        prevButton.addEventListener('click', movePrev);
        window.addEventListener('resize', updateArrowStates);
        
        updateArrowStates();
    }
});
