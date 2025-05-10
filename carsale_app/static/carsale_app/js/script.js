const buttonModel = document.querySelector("#buttonModels");
const subMenu = document.querySelector(".subMenu");

const buttonContacts = document.querySelector("#buttonContacts");
const contactsMenu = document.querySelector(".contactsMenu");

const buttonServices = document.querySelector("#buttonServices");
const servicesMenu = document.querySelector(".servicesMenu");

const carChoiceItems = document.querySelectorAll('.carChoice li');

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

AddRemMenu(buttonModel, subMenu);
AddRemMenu(buttonContacts, contactsMenu);
AddRemMenu(buttonServices, servicesMenu);

const observe = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.3});

function isVisible(className) {
    document.querySelectorAll(`${className}`).forEach(block => {
        observe.observe(block);
    });
  }

isVisible("footer img");
isVisible(".text");

function ImageSwipe() {
    const articleImg = document.querySelector(".mainPhoto"); 
    const arrImg = [
        "img/General/MainPhoto1.png",  
        "img/General/MainPhoto2.jpg",  
        "img/General/MainPhoto3.jpg",  
        "img/General/MainPhoto4.jpg",
        "img/General/MainPhoto5.jpg",
        "img/General/MainPhoto6.jpg"
    ];
    const ellipses = document.querySelectorAll(".ellipseMain");

    let i = 1; 
    let interval = 5000;

    const changeImage = (index) => {
        articleImg.src = arrImg[index];
    };

    ellipses.forEach((ellipse, index) => {
        ellipse.addEventListener('mouseover', () => {
            changeImage(index); 

            ellipses.forEach(el => el.classList.remove('active'));
            ellipse.classList.add('active');
        });
    });

    setInterval(() => {
        articleImg.src = arrImg[i]; 
        
        i++; 

        if (i >= arrImg.length) {
            i = 0;
        }
    }, interval); 
}

document.addEventListener('DOMContentLoaded', function() {
    ImageSwipe();  
});

function Converted() {
    const priceElement = document.getElementById("price");
    const minPriceElement = document.getElementById("minPrice");
    const maxPriceElement = document.getElementById("maxPrice");

    let currenccy = 43;
    let flag = false;

    priceElement.addEventListener("click", function() {
        const minPrice = parseInt(minPriceElement.textContent.replace(/\s+/g, ''));
        const maxPrice = parseInt(maxPriceElement.textContent.replace(/\s+/g, ''));

        const newMinPrice = minPrice * currenccy;
        const newMaxPrice = maxPrice * currenccy;

        if (!flag) {
            minPriceElement.textContent = newMinPrice.toLocaleString();
            maxPriceElement.textContent = newMaxPrice.toLocaleString();

            flag = true;
        }
    });
}

Converted();


function editHtml() {
    const header = document.getElementById("header");
    const width = window.innerWidth;

    if (width < 768) {
        header.innerHTML = `
            <button class = "menuLogo" id = "buttonNavMenu">
                <img src = "img/General/menuLogo.png" alt = "menuLogo">
            </button>

            <nav id = "nav">
            <ul class="nav-list">
                <li>
                    <details class="navButton" id = "buttonModels">
                        <summary>Моделі</summary>
                            <ul class="subMenuPhone">
                                <li>
                                    <a href="models.html?model=taycan">
                                        <p>Porsche Taycan</p>
                                        <img src = "img/Menu/TaycanMenu.png" alt = "Porsche Taycan">
                                    </a>
                                </li>
                                <li>
                                    <a href="models.html?model=porsche911">
                                        <p>Porsche 911</p>
                                        <img src = "img/Menu/Porsche911Menu.png" alt = "Porsche 911">
                                    </a>
                                </li>
                                <li>
                                    <a href="models.html?model=cayenne">
                                        <p>Porsche Cayenne</p>
                                        <img src = "img/Menu/CayenneMenuPhone.png" alt = "Porsche Cayenne">
                                    </a>
                                </li>
                                <li>
                                    <a href="models.html?model=macan">
                                        <p>Porsche Macan</p>
                                        <img src = "img/Menu/MacanMenu.png" alt = "Porsche Macan">
                                    </a>
                                </li>
                                <li>
                                    <a href="models.html?model=panamera">
                                        <p>Porsche Panamera</p>
                                        <img src = "img/Menu/PanameraMenu.png" alt = "Porsche Panamera">
                                    </a>
                                </li>
                                <li>
                                    <a href = "#">
                                        <p>Інші моделі</p>
                                        <img src = "img/Menu/OtherCarsMenu.png" alt = "OtherCars">
                                    </a>
                                </li>
                            </ul>
                    </details>
                </li>
                    
                <li><a href="contactsPage.html" class="navButton" id = "buttonContacts">Контакти</a></li>
                    <ul class = "contactsMenu">
                        <li>
                            <h2>Наші контакти</h2>
                            <address>
                                <dl>
                                    <dt>моб. телефон:</dt>
                                    <dd><a href="tel:+12345">+12345</a></dd>
                                    <dt>е-пошта:</dt>
                                    <dd><a href="mailto:porsche@test.ua">porsche@test.ua</a></dd>
                                </dl>
                            </address>
                        </li>
                    
                        <li>
                            <h2>Адреса автосалону</h2>
                            <address>
                                <dl>
                                    <dt>місто:</dt>
                                    <dd>м. Київ</dd>
                                    <dt>вулиця:</dt>
                                    <dd>вул. Порша 17</dd>
                                </dl>
                            </address>
                        </li>

                        <img src = "img/General/FooterImg.png" alt = "porscheImg">
                    </ul>
                <li><a href="servicePage.html" class="navButton" id = "buttonServices">Сервіси</a></li>
                    <ul class = "servicesMenu">
                        <li>
                            <a href = "servicePage.html">Сервісне обслуговування</a>
                        </li>
                        <li>
                            <a href = "modelPage.html#testDrive">Test-Drive в автосалонах Porsche</a>
                        </li>
                        <li>
                            <a href = "modelPage.html#sales">Пропозиції з сервісу</a>
                        </li>
                        <li>
                            <a href = "tradeInPage.html">Trade-In</a>
                        </li>
                    </ul>
                <li><a href="accessoriesPage.html" class="navButton" id = "buttonAccessories">Аксесуари</a></li>
                    <ul class = "accessoriesMenu">
                        <li>
                            <a href = "accessoriesPage.html#brand">Брендовий одяг Porsche</a>
                        </li>
                        <li>
                            <a href = "accessoriesPage.html">Аксесуари для автівок</a>
                        </li>

                        <img src = "img/General/porscheLogo.png" alt = "logo">
                    </ul>
            </ul>
            
        </nav>


            <div class = "headerLogo">
                <a href="index.html" class = "headerText">Porsche</a>
                <img src = "img/General/mainLogoPhone.png" alt = "mainLogo" class="main-ico">
            </div>

            <a href = "logInPage.html" class = "logIn">
                <img src = "img/General/headeLogIn.png" alt = "profile">
                <p>Вхід в кабінет</p>
            </a>
        `;

        const buttonNavMenu = document.getElementById("buttonNavMenu");
        const body = document.body;

        buttonNavMenu.addEventListener("click", function() {
            const navMenu = document.getElementById("nav");
            navMenu.classList.toggle("visible");
            body.classList.toggle("no-scroll");
        });
    }
}

window.addEventListener('load', editHtml);
window.addEventListener('resize', editHtml);



