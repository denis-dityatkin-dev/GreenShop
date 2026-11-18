"use strict";

// 🔧 Вычисляем ширину скроллбара и сохраняем в CSS-переменную
const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};
setScrollbarWidth();
window.addEventListener('resize', setScrollbarWidth);

// ========== БУРГЕР ==========
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.preventDefault();
    // 🔧 Единый класс состояния — _menu-open на body
    document.body.classList.toggle('_menu-open');
    // Анимация крестика (для совместимости с вашими стилями)
    iconMenu.classList.toggle("_active");
    menuBody?.classList.toggle("_active");
  });
}

// ========== МНОГОУРОВНЕВОЕ МЕНЮ ==========
const isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

// ========== ПРОКРУТКА ПРИ КЛИКЕ ==========
document.addEventListener('click', documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest('[data-goto]')) {
    // Закрываем меню при клике на ссылку
    if (document.body.classList.contains('_menu-open')) {
      document.body.classList.remove('_menu-open');
      iconMenu?.classList.remove('_active');
      menuBody?.classList.remove('_active');
    }

    const goTo = targetElement.closest('[data-goto]').dataset.goto;
    const goToElement = document.querySelector(goTo);
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

    if (goToElement) {
      window.scrollTo({
        top: goToElement.offsetTop - (headerHeight + 5),
        behavior: "smooth"
      });
    }
    e.preventDefault();
  }
}