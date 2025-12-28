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
});
