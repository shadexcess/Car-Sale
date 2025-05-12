// Логіка для меню
const buttonModel = document.querySelector("#buttonModels");

const buttonContacts = document.querySelector("#buttonContacts");
const contactsMenu = document.querySelector(".contactsMenu");

const buttonServices = document.querySelector("#buttonServices");
const servicesMenu = document.querySelector(".servicesMenu");

function AddRemMenu(button, menu) {
    button.addEventListener('mouseenter', () => {
        menu.classList.add('visible');
        menu.classList.remove('hidden');
    });
    button.addEventListener('mouseleave', () => {
        menu.classList.add('hidden');
        menu.classList.remove('visible');
    });

    menu.addEventListener('mouseenter', () => {
        menu.classList.add('visible');
        menu.classList.remove('hidden');
    });

    menu.addEventListener('mouseleave', () => {
        menu.classList.add('hidden');
        menu.classList.remove('visible');
    });
}

AddRemMenu(buttonContacts, contactsMenu);
AddRemMenu(buttonServices, servicesMenu);

// Логіка для фільтрів
document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    applyFilters();
});

function applyFilters() {
    // Отримуємо значення фільтрів
    const series = document.getElementById('series').value;
    const powerMin = parseFloat(document.getElementById('power-min').value) || 0;
    const powerMax = parseFloat(document.getElementById('power-max').value) || Infinity;
    const speedMin = parseFloat(document.getElementById('speed-min').value) || 0;
    const speedMax = parseFloat(document.getElementById('speed-max').value) || Infinity;
    const accelerationMin = parseFloat(document.getElementById('acceleration-min').value) || 0;
    const accelerationMax = parseFloat(document.getElementById('acceleration-max').value) || Infinity;
    const rangeMin = parseFloat(document.getElementById('range-min').value) || 0;
    const rangeMax = parseFloat(document.getElementById('range-max').value) || Infinity;
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;

    // Отримуємо всі контейнери серій
    const seriesContainers = document.querySelectorAll('.typeContainer');
    let anyVisible = false;

    seriesContainers.forEach(container => {
        const containerSeries = container.getAttribute('data-series');
        let seriesVisible = false;

        // Перевіряємо, чи відповідає серія фільтру
        if (!series || series === containerSeries) {
            // Отримуємо всі машини в цій серії
            const cars = container.querySelectorAll('.carLink');
            let anyCarVisible = false;

            cars.forEach(car => {
                const power = parseFloat(car.getAttribute('data-power'));
                const maxSpeed = parseFloat(car.getAttribute('data-max-speed'));
                const acceleration = parseFloat(car.getAttribute('data-acceleration'));
                const range = parseFloat(car.getAttribute('data-range'));
                const price = parseFloat(car.getAttribute('data-price'));

                // Перевіряємо, чи відповідає машина всім фільтрам
                const isVisible = 
                    power >= powerMin && power <= powerMax &&
                    maxSpeed >= speedMin && maxSpeed <= speedMax &&
                    acceleration >= accelerationMin && acceleration <= accelerationMax &&
                    range >= rangeMin && range <= rangeMax &&
                    price >= priceMin && price <= priceMax;

                car.style.display = isVisible ? 'block' : 'none';
                if (isVisible) anyCarVisible = true;
            });

            // Показуємо або ховаємо контейнер серії
            container.style.display = anyCarVisible ? 'block' : 'none';
            if (anyCarVisible) seriesVisible = true;
        } else {
            container.style.display = 'none';
        }

        if (seriesVisible) anyVisible = true;
    });

    // Показуємо повідомлення, якщо нічого не знайдено
    const article = document.getElementById('article');
    if (!anyVisible) {
        if (!article.querySelector('.no-results')) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'За вашими критеріями нічого не знайдено.';
            article.appendChild(noResults);
        }
    } else {
        const noResults = article.querySelector('.no-results');
        if (noResults) noResults.remove();
    }
}

function resetFilters() {
    document.getElementById('filter-form').reset();
    applyFilters();
}