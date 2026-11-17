document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector('.mobile-nav');
  const burgerButton = document.querySelector('.menu__icon');

  if (!mobileNav) return;

  // 🔧 НАСТРОЙКА: На сколько пикселей прятать панель вниз
  // 75px — высота панели
  // + 40px — чтобы кнопка (которая выступает вверх) тоже спряталась
  const HIDE_OFFSET = 115; // <-- Регулируйте это значение!

  let lastScrollTop = 0;

  // 1. Логика скрытия при скролле
  window.addEventListener('scroll', () => {
    // Если меню открыто — панель не трогаем
    if (document.body.classList.contains('_menu-open') || burgerButton?.classList.contains('_active')) {
      return;
    }

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
      // Скролл вниз — прячем
      mobileNav.style.transform = `translateY(${HIDE_OFFSET}px)`;
    } else {
      // Скролл вверх — показываем
      mobileNav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });

  // 2. Скрытие при открытии бургер-меню
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      const isMenuOpen = burgerButton.classList.contains('_active') || document.body.classList.contains('_menu-open');

      if (isMenuOpen) {
        // Меню открылось — прячем панель глубоко вниз
        mobileNav.style.transform = `translateY(${HIDE_OFFSET}px)`;
      } else {
        // Меню закрылось — возвращаем панель
        mobileNav.style.transform = 'translateY(0)';
      }
    });
  }
});