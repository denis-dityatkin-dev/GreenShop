document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ
       ========================================== */
    const filterButtons = document.querySelectorAll('.control-catalog__filter-title');
    const productContainer = document.getElementById('product-container');
    const productCards = productContainer.querySelectorAll('.product-card');
    
    const sortSelect = document.getElementById('sort-select');
    const sortTitle = sortSelect.querySelector('.sort-select__title .sort-select__current');
    const sortBody = sortSelect.querySelector('.sort-select__body');
    const sortItems = sortSelect.querySelectorAll('.body-sort-catalog__item');

    let currentFilter = 'all';

    /* ==========================================
       2. ЛОГИКА ФИЛЬТРАЦИИ
       ========================================== */
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            currentFilter = this.getAttribute('data-filter');
            applyFilter(currentFilter);
        });
    });

    function applyFilter(filterValue) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    /* ==========================================
       3. ЛОГИКА СОРТИРОВКИ
       ========================================== */
    sortSelect.querySelector('.sort-select__title').addEventListener('click', () => {
        sortBody.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
        if (!sortSelect.contains(e.target)) {
            sortBody.classList.remove('is-open');
        }
    });

    sortItems.forEach(item => {
        item.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            sortTitle.textContent = this.textContent;
            sortBody.classList.remove('is-open');

            const sortedCards = Array.from(productCards);

            sortedCards.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                if (sortType === 'price-up') {
                    return priceA - priceB;
                } else if (sortType === 'price-down') {
                    return priceB - priceA;
                } else {
                    return a.getAttribute('data-index') - b.getAttribute('data-index');
                }
            });

            productContainer.innerHTML = '';
            sortedCards.forEach(card => {
                productContainer.appendChild(card);
            });

            // Применяем фильтр заново после сортировки
            applyFilter(currentFilter);
        });
    });

    // Сохраняем исходный порядок карточек
    productCards.forEach((card, index) => {
        card.setAttribute('data-index', index);
    });
});