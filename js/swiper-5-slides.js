document.addEventListener('DOMContentLoaded', function() {
    const relatedSwiper = new Swiper('.releted__slider', {
        // Основные настройки
        slidesPerView: 5,       // Показываем 5 слайдов
        slidesPerGroup: 2,      // Прокручиваем по 2 слайда за раз (5 слайдов / 2 = 3 точки)
        spaceBetween: 30,       // Расстояние между слайдами
        loop: false,            // Отключаем бесконечность, чтобы точки считались правильно
        
        // Пагинация
        pagination: {
            el: '.releted__bullets',
            clickable: true,
        },

        // Адаптивность (обязательно, иначе на телефоне будет каша)
        breakpoints: {
            // Мобильные устройства
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20
            },
            479: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 20
            },
            // Планшеты
            768: {
                slidesPerView: 4,
                slidesPerGroup: 2,
                spaceBetween: 30
            },
            // Десктоп (как на макете)
            1024: {
                slidesPerView: 5,   // 5 карточек в ряд
                slidesPerGroup: 2,  // Листаем по 2
                spaceBetween: 30
            }
        }
    });
});