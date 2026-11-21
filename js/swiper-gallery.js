document.addEventListener('DOMContentLoaded', function () {
    // 1. Инициализация миниатюр
    var thumbsSwiper = new Swiper('.product-gallery__thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        // Настройки для разных экранов
        breakpoints: {
            // Мобильные
            0: {
                direction: 'horizontal',
                slidesPerView: 4,
            },
            // Десктоп
            768: {
                direction: 'vertical',
                slidesPerView: 4,
            }
        }
    });

    // 2. Инициализация главного слайдера
    var mainSwiper = new Swiper('.product-gallery__main', {
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
        // Если картинки не грузятся, добавьте:
        observer: true,
        observeParents: true,
    });
});