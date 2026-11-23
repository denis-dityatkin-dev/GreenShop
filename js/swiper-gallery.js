document.addEventListener('DOMContentLoaded', function () {
    var thumbsEl  = document.querySelector('.product-gallery__thumbs');
    var mainEl    = document.querySelector('.product-gallery__main');
    var modalEl   = document.getElementById('galleryModal');

    if (!thumbsEl || !mainEl) return;

    if (typeof Swiper === 'undefined') {
        console.warn('Swiper не загружен — галерея работает без слайдера');
        return;
    }

    // ── 1. Миниатюры ────────────────────────────────────────
    var thumbsSwiper = new Swiper(thumbsEl, {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            0:   { direction: 'horizontal', slidesPerView: 4 },
            768: { direction: 'vertical',   slidesPerView: 4 }
        }
    });

    // ── 2. Главный слайдер ──────────────────────────────────
    var mainSwiper = new Swiper(mainEl, {
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: { swiper: thumbsSwiper },
        observer: true,
        observeParents: true,
				loop: true,
        on: {
            init: function () { this.update(); },
            imageReady: function () { this.update(); }
        }
    });

    // ── 3. Модальная галерея ────────────────────────────────
    if (!modalEl) return;

    var modalSwiper = null;
    var modalSwiperEl = modalEl.querySelector('.gallery-modal__swiper');

    function buildModalSwiper(startIndex) {
        // Если уже создан — просто переключаем слайд
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
						loop: true,
            navigation: {
                nextEl: modalEl.querySelector('.gallery-modal__arrow--next'),
                prevEl: modalEl.querySelector('.gallery-modal__arrow--prev')
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            // Раскомментируйте для зума колёсиком:
            // zoom: { maxRatio: 3, minRatio: 1 }
        });
    }

    function openModal(index) {
        buildModalSwiper(index);
        modalEl.classList.add('open');
        modalEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        // Пересчёт после появления (важно!)
        requestAnimationFrame(function () {
            if (modalSwiper) modalSwiper.update();
        });
    }

    function closeModal() {
        modalEl.classList.remove('open');
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    // Клик по большой картинке — открыть модалку на активном слайде
    mainEl.addEventListener('click', function (e) {
        // Игнорируем клик по кнопке лупы — она обрабатывается отдельно
        if (e.target.closest('.product-gallery__zoom')) return;

        var slide = e.target.closest('.swiper-slide');
        if (!slide) return;

        var slides = Array.prototype.slice.call(
            mainEl.querySelectorAll('.swiper-slide')
        );
        var index = slides.indexOf(slide);
        openModal(index >= 0 ? index : 0);
    });

    // Клик по лупе — тоже открыть модалку
    var zoomBtn = document.querySelector('.product-gallery__zoom');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(mainSwiper.activeIndex || 0);
        });
    }

    // Закрытие: клик по фону/крестику (элементы с [data-close])
    modalEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) {
            closeModal();
        }
    });

    // Клик по пустому месту внутри контента (не по картинке и не по кнопкам)
    var content = modalEl.querySelector('.gallery-modal__content');
    if (content) {
        content.addEventListener('click', function (e) {
            var isImage = e.target.closest('img');
            var isArrow = e.target.closest('.gallery-modal__arrow');
            var isClose = e.target.closest('.gallery-modal__close');
            if (!isImage && !isArrow && !isClose) {
                closeModal();
            }
        });
    }

    // Esc — закрыть
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalEl.classList.contains('open')) {
            closeModal();
        }
    });

    // ── 4. Пересчёт при ресайзе ─────────────────────────────
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