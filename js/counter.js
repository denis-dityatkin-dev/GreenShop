document.addEventListener('DOMContentLoaded', () => {
    const counterContainer = document.querySelector('.controlls-shop__counter');
    const valueDisplay = document.getElementById('product-count');
    const btnMinus = counterContainer.querySelector('[data-action="decrease"]');
    const btnPlus = counterContainer.querySelector('[data-action="increase"]');

    let count = 1;       // Начальное значение
    const minCount = 1;  // Минимальное значение
    const maxCount = 99; // Максимальное значение

    // Функция обновления интерфейса
    function updateDisplay() {
        valueDisplay.textContent = count;
        
        // Блокируем кнопку минус, если достигнут минимум
        btnMinus.disabled = count <= minCount;
        // Блокируем кнопку плюс, если достигнут максимум
        btnPlus.disabled = count >= maxCount;
    }

    // Обработчик кнопки +
    btnPlus.addEventListener('click', () => {
        if (count < maxCount) {
            count++;
            updateDisplay();
        }
    });

    // Обработчик кнопки -
    btnMinus.addEventListener('click', () => {
        if (count > minCount) {
            count--;
            updateDisplay();
        }
    });

    // Инициализация при загрузке страницы
    updateDisplay();
});