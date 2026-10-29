document.addEventListener('DOMContentLoaded', () => {
    
    // Находим все кастомные селекты на странице
    const sortSelects = document.querySelectorAll('.sort-select');

    sortSelects.forEach(select => {
        const title = select.querySelector('.sort-select__title');
        const currentText = select.querySelector('.sort-select__current');
        const items = select.querySelectorAll('.body-sort-catalog__item');

        // 1. Открытие/закрытие по клику на кнопку
        title.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие, чтобы не закрылся сразу
            
            // Закрываем все остальные открытые селекты перед открытием текущего
            sortSelects.forEach(s => {
                if (s !== select) s.classList.remove('_active');
            });

            select.classList.toggle('_active');
        });

        // 2. Выбор элемента
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Меняем текст в кнопке
                currentText.textContent = item.textContent;
                
                // Закрываем список
                select.classList.remove('_active');
                
                // Здесь можно добавить логику сортировки (например, AJAX запрос или вызов функции)
                console.log(`Выбрана сортировка: ${item.textContent}`);
            });
        });
    });

    // 3. Закрытие при клике вне селекта
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sort-select')) {
            sortSelects.forEach(select => {
                select.classList.remove('_active');
            });
        }
    });
});