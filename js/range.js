const rangeSliderInit = () => {
  // создаем функцию инициализации слайдера
  const range = document.getElementById("range"); // Ищем слайдер
  const inputMin = document.getElementById("min"); // Ищем input с меньшим значнием
  const inputMax = document.getElementById("max"); // Ищем input с большим значнием

  const range2 = document.getElementById("range-2");
  const inputMin2 = document.getElementById("min-2");
  const inputMax2 = document.getElementById("max-2");

  const range3 = document.getElementById("range-3");
  const inputMin3 = document.getElementById("min-3");
  const inputMax3 = document.getElementById("max-3");

  const range4 = document.getElementById("range-4");
  const inputMin4 = document.getElementById("min-4");
  const inputMax4 = document.getElementById("max-4");

  if (!range || !inputMin || !inputMax) return; // если этих элементов нет, прекращаем выполнение функции, чтобы не было ошибок
  if (!range2 || !inputMin2 || !inputMax2) return;
  if (!range3 || !inputMin3 || !inputMax3) return;
   if (!range4 || !inputMin4 || !inputMax4) return;

  const inputs = [inputMin, inputMax]; // создаем массив из меньшего и большего значения
  const inputs2 = [inputMin2, inputMax2];
  const inputs3 = [inputMin3, inputMax3];
  const inputs4 = [inputMin4, inputMax4];
  noUiSlider.create(range, {
    // инициализируем слайдер
    start: [39, 1230], // устанавливаем начальные значения
    connect: true, // указываем что нужно показывать выбранный диапазон
    range: {
      // устанавливаем минимальное и максимальное значения
      min: 0,
      max: 2000,
    },
    step: 1, // шаг изменения значений
  });
  noUiSlider.create(range2, {
    // инициализируем слайдер
    start: [20, 100], // устанавливаем начальные значения
    connect: true, // указываем что нужно показывать выбранный диапазон
    range: {
      // устанавливаем минимальное и максимальное значения
      min: 0,
      max: 100,
    },
    step: 1, // шаг изменения значений
  });
   noUiSlider.create(range3, {
     // инициализируем слайдер
     start: [30, 100], // устанавливаем начальные значения
     connect: true, // указываем что нужно показывать выбранный диапазон
     range: {
       // устанавливаем минимальное и максимальное значения
       min: 0,
       max: 100,
     },
     step: 1, // шаг изменения значений
   });
   noUiSlider.create(range4, {
     // инициализируем слайдер
     start: [40, 100], // устанавливаем начальные значения
     connect: true, // указываем что нужно показывать выбранный диапазон
     range: {
       // устанавливаем минимальное и максимальное значения
       min: 0,
       max: 100,
     },
     step: 1, // шаг изменения значений
   });

  range.noUiSlider.on("update", function (values, handle) {
    // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs[handle].value = parseInt(values[handle]);
  });

  range2.noUiSlider.on("update", function (values, handle) {
    // при изменений положения элементов управления слайдера изменяем соответствующие значения
    inputs2[handle].value = parseInt(values[handle]);
  });
   range3.noUiSlider.on("update", function (values, handle) {
     // при изменений положения элементов управления слайдера изменяем соответствующие значения
     inputs3[handle].value = parseInt(values[handle]);
   });
   range4.noUiSlider.on("update", function (values, handle) {
     // при изменений положения элементов управления слайдера изменяем соответствующие значения
     inputs4[handle].value = parseInt(values[handle]);
   });

  inputMin.addEventListener("change", function () {
    // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([this.value, null]);
  });

  inputMin2.addEventListener("change", function () {
    // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
    range2.noUiSlider.set([this.value, null]);
  });
   inputMin3.addEventListener("change", function () {
     // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
     range3.noUiSlider.set([this.value, null]);
   });
   inputMin4.addEventListener("change", function () {
     // при изменении меньшего значения в input - меняем положение соответствующего элемента управления
     range4.noUiSlider.set([this.value, null]);
   });

  inputMax.addEventListener("change", function () {
    // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range.noUiSlider.set([null, this.value]);
  });

  inputMax2.addEventListener("change", function () {
    // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range2.noUiSlider.set([null, this.value]);
  });
  inputMax3.addEventListener("change", function () {
    // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range3.noUiSlider.set([null, this.value]);
  });
  inputMax4.addEventListener("change", function () {
    // при изменении большего значения в input - меняем положение соответствующего элемента управления
    range4.noUiSlider.set([null, this.value]);
  });
};

const init = () => {
  rangeSliderInit(); // запускаем функцию инициализации слайдера
};

window.addEventListener("DOMContentLoaded", init); // запускаем функцию init, когда документ будет загружен и готов к взаимодействию
