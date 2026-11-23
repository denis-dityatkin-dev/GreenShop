document.addEventListener('DOMContentLoaded', function () {
    var thumbsEl = document.querySelector('.product-gallery__thumbs');
    var mainEl   = document.querySelector('.product-gallery__main');
    var modalEl  = document.getElementById('galleryModal');

    if (!thumbsEl || !mainEl) return;
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper не загружен');
        return;
    }

    // ── 1. Главный слайдер ──────────────────────────────────
    var mainSwiper = new Swiper(mainEl, {
        spaceBetween: 10,
        slidesPerView: 1,
        initialSlide: 1,          // вторая картинка по умолчанию
        observer: true,
        observeParents: true,
        on: {
            init: function () { this.update(); },
            imageReady: function () { this.update(); }
        }
    });

    // ── 2. Миниатюры ────────────────────────────────────────
    var thumbsSwiper = new Swiper(thumbsEl, {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            0:   { direction: 'horizontal', slidesPerView: 4 },
            768: { direction: 'vertical',   slidesPerView: 4 }
        }
    });

    // ── 3. РУЧНАЯ синхронизация ─────────────────────────────
    // В HTML класс swiper-slide-thumb-active уже стоит на второй миниатюре.
    // Эта функция при смене главного слайда снимает его со всех и вешает на нужную.
    function syncActiveThumb(index) {
        var thumbs = thumbsEl.querySelectorAll('.swiper-slide');
        thumbs.forEach(function (s) {
            s.classList.remove('swiper-slide-thumb-active');
        });
        if (thumbs[index]) {
            thumbs[index].classList.add('swiper-slide-thumb-active');
        }
    }

    mainSwiper.on('slideChange', function () {
        syncActiveThumb(mainSwiper.activeIndex);
    });

    // Клик по миниатюре — переключаем главный
    thumbsEl.querySelectorAll('.swiper-slide').forEach(function (slide, idx) {
        slide.addEventListener('click', function () {
            mainSwiper.slideTo(idx);
        });
    });

    // Первичная синхронизация: снимаем активный со всех и вешаем на activeIndex
    // (учитывает, что в HTML класс уже стоит на второй — это страховка)
    syncActiveThumb(mainSwiper.activeIndex);

    // ── 4. Модалка ──────────────────────────────────────────
    if (!modalEl) return;

    var modalSwiper = null;
    var modalSwiperEl = modalEl.querySelector('.gallery-modal__swiper');

    function buildModalSwiper(startIndex) {
        if (modalSwiper) {
            modalSwiper.slideTo(startIndex, 0);
            return;
        }
        modalSwiper = new Swiper(modalSwiperEl, {
            initialSlide: startIndex || 0,
            spaceBetween: 20,
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: modalEl.querySelector('.gallery-modal__arrow--next'),
                prevEl: modalEl.querySelector('.gallery-modal__arrow--prev')
            },
            keyboard: { enabled: true, onlyInViewport: true }
        });
    }

    function openModal(index) {
        buildModalSwiper(index);
        modalEl.classList.add('open');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        requestAnimationFrame(function () {
            if (modalSwiper) modalSwiper.update();
        });
    }

    function closeModal() {
        modalEl.classList.remove('open');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    mainEl.addEventListener('click', function (e) {
        if (e.target.closest('.product-gallery__zoom')) return;
        var slide = e.target.closest('.swiper-slide');
        if (!slide) return;
        var slides = Array.prototype.slice.call(mainEl.querySelectorAll('.swiper-slide'));
        var index = slides.indexOf(slide);
        openModal(index >= 0 ? index : 0);
    });

    var zoomBtn = document.querySelector('.product-gallery__zoom');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(mainSwiper.activeIndex || 0);
        });
    }

    modalEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) closeModal();
    });

    var content = modalEl.querySelector('.gallery-modal__content');
    if (content) {
        content.addEventListener('click', function (e) {
            var isImage = e.target.closest('img');
            var isArrow = e.target.closest('.gallery-modal__arrow');
            var isClose = e.target.closest('.gallery-modal__close');
            if (!isImage && !isArrow && !isClose) closeModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (thumbsSwiper) thumbsSwiper.update();
            if (mainSwiper)   mainSwiper.update();
            if (modalSwiper)  modalSwiper.update();
        }, 200);
    });
});