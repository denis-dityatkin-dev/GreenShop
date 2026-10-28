const rangeSliderInit = () => {
  // 1. Находим элемент, куда будем выводить текст с ценой (под слайдером)
  const rangeValuesText = document.getElementById("price-values");

  // 2. Функция для инициализации одного слайдера, чтобы не дублировать код 4 раза
  const initSingleSlider = (rangeId, minId, maxId, startValues, maxValue) => {
    const range = document.getElementById(rangeId);
    const inputMin = document.getElementById(minId);
    const inputMax = document.getElementById(maxId);

    // Если элементов нет на странице - выходим, чтобы не было ошибок
    if (!range || !inputMin || !inputMax) return;

    const inputs = [inputMin, inputMax];

    // Инициализация слайдера
    noUiSlider.create(range, {
      start: startValues,
      connect: true,
      range: {
        min: 0,
        max: maxValue,
      },
      step: 1,
    });

    // Обновление значений при движении ползунков
    range.noUiSlider.on("update", function (values, handle) {
      inputs[handle].value = parseInt(values[handle]);

      // Если это первый слайдер (цена) - обновляем текст под ним
      if (rangeId === "range" && rangeValuesText) {
        const val1 = Math.round(values[0]);
        const val2 = Math.round(values[1]);
        rangeValuesText.innerHTML = `$${val1} - $${val2}`;
      }
    });

    // Обновление слайдера при вводе в input (если они появятся)
    inputMin.addEventListener("change", function () {
      range.noUiSlider.set([this.value, null]);
    });

    inputMax.addEventListener("change", function () {
      range.noUiSlider.set([null, this.value]);
    });
  };

  // 3. Запускаем инициализацию для всех нужных слайдеров
  // Слайдер цены (макет)
  initSingleSlider("range", "min", "max", [39, 1230], 1500);
  
  // Остальные слайдеры (если они есть на странице)
  initSingleSlider("range-2", "min-2", "max-2", [20, 100], 100);
  initSingleSlider("range-3", "min-3", "max-3", [30, 100], 100);
  initSingleSlider("range-4", "min-4", "max-4", [40, 100], 100);
};

const init = () => {
  rangeSliderInit(); 
};

window.addEventListener("DOMContentLoaded", init);