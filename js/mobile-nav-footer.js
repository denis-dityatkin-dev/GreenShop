// ========== MOBILE NAV (появление при скролле вниз / скрытие при скролле вверх) ==========
document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector('.mobile-nav');
  const burgerButton = document.querySelector('.menu__icon');

  if (!mobileNav) return;

  const HIDE_OFFSET = 115;
  const SCROLL_THRESHOLD = 50;

  let lastScrollTop = 0;
  let ticking = false;

  const hideNav = () => {
    mobileNav.style.transform = `translateY(${HIDE_OFFSET}px)`;
    mobileNav.style.opacity = '0';
    mobileNav.style.visibility = 'hidden';
    mobileNav.style.pointerEvents = 'none';
  };

  const showNav = () => {
    mobileNav.style.transform = 'translateY(0)';
    mobileNav.style.opacity = '1';
    mobileNav.style.visibility = 'visible';
    mobileNav.style.pointerEvents = 'auto';
  };

  const updateMobileNav = () => {
    // Если меню открыто — панель не трогаем (её скрывает CSS через body._menu-open)
    if (document.body.classList.contains('_menu-open')) {
      ticking = false;
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= SCROLL_THRESHOLD) {
      hideNav();
    } else if (scrollTop > lastScrollTop) {
      showNav();
    } else if (scrollTop < lastScrollTop) {
      hideNav();
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateMobileNav);
      ticking = true;
    }
  }, { passive: true });

  // При закрытии меню синхронизируем lastScrollTop, чтобы логика скролла работала корректно
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      requestAnimationFrame(() => {
        const isMenuOpen = document.body.classList.contains('_menu-open');
        if (!isMenuOpen) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          lastScrollTop = scrollTop;
          if (scrollTop > SCROLL_THRESHOLD) {
            showNav();
          } else {
            hideNav();
          }
        }
      });
    });
  }
});