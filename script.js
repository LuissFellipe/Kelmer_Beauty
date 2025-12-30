document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-fallback]');

    images.forEach(img => {
        const fallbackSrc = img.getAttribute('data-fallback');
        if (!fallbackSrc) return;

        img.addEventListener('error', () => {
            if (img.src === fallbackSrc) return;
            img.src = fallbackSrc;
        });
    });

    // Carrossel de Transformações
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');
    const carouselWrapper = document.querySelector('.carousel-wrapper');

    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;
        const totalSlides = carouselSlides.length;
        let autoPlayInterval;
        const AUTO_PLAY_DELAY = 5000; // 5 segundos

        // Criar indicadores
        carouselSlides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
            carouselIndicatorsContainer.appendChild(indicator);
        });

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;

            // Atualizar indicadores
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Event listeners dos botões
        carouselNextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        carouselPrevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Pausar ao passar o mouse
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);

        // Pausar ao tocar (mobile)
        carouselWrapper.addEventListener('touchstart', stopAutoPlay);
        carouselWrapper.addEventListener('touchend', resetAutoPlay);

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            }
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        });

        // Iniciar auto-play
        startAutoPlay();
    }
});
