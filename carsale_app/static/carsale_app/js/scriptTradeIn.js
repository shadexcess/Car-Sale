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

isVisible(".generalBlock img");
isVisible(".generalInfo img");
isVisible(".generalInfo .text");
isVisible(".footerImg");
isVisible(".stepBlock");

function changeCarInfo() {
    const carModelImg = document.getElementById("carModelImg");
    const selectedCar = document.getElementById("selectedCar");
    const price = document.getElementById("priceValue");

    if (selectedCar.value === "Porsche 911") {
        carModelImg.src = "img/General/porscheTradeIn3.png";
        price.textContent = "140 000";
    }
    else if (selectedCar.value === "Panamera") {
        carModelImg.src = "img/General/porscheTradeInPanamera.png";
        price.textContent = "90 000";
    }
    else if (selectedCar.value === "Taycan") {
        carModelImg.src = "img/General/porscheTradeIn.png";
        price.textContent = "80 000";
    }
    else if (selectedCar.value === "Cayenne") {
        carModelImg.src = "img/General/porscheTradeInCayenne.png";
        price.textContent = "80 000";
    }
    else if (selectedCar.value === "Macan") {
        carModelImg.src = "img/General/porscheTradeInMacan.png";
        price.textContent = "60 000";
    }
}

document.getElementById("selectedCar").addEventListener('change', changeCarInfo);
changeCarInfo();

function calculateTradeIn() {
    const carModelImg = document.getElementById("carModelImgStep2");
    const selectedCar = document.getElementById("selectedCarStep2");
    const price = document.getElementById("priceValueStep2");

    if (selectedCar.value === "Porsche 911") {
        carModelImg.src = "img/General/porscheTradeIn3.png";
        price.textContent = "100 000";
    }
    else if (selectedCar.value === "Panamera") {
        carModelImg.src = "img/General/porscheTradeInPanamera.png";
        price.textContent = "40 000";
    }
    else if (selectedCar.value === "Taycan") {
        carModelImg.src = "img/General/porscheTradeIn.png";
        price.textContent = "50 000";
    }
    else if (selectedCar.value === "Cayenne") {
        carModelImg.src = "img/General/porscheTradeInCayenne.png";
        price.textContent = "40 000";
    }
    else if (selectedCar.value === "Macan") {
        carModelImg.src = "img/General/porscheTradeInMacan.png";
        price.textContent = "30 000";
    }
}

document.getElementById("selectedCarStep2").addEventListener('change', calculateTradeIn);
calculateTradeIn();


function submitScreenInOut() {
    const buttonSave = document.getElementById("saveButton");
    const buttonOK = document.getElementById("buttonOK");
    const successScreen = document.getElementById("successScreen");
    const messageInfo = document.getElementById("messageInfo");
    const infoLogo = document.getElementById("informationLogo");

    const nameInput = document.getElementById("nameInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");

    buttonSave.addEventListener('click', function() {
        if (nameInput.value !== "" && dateInput.value !== "" && timeInput.value !== "") {
            successScreen.style.display = 'flex';
        }
        else {
            alert("Не всі дані заповнено");
        }
    });

    buttonOK.addEventListener('click', function() {
        successScreen.style.display = 'none';

        nameInput.value = null;
        dateInput.value = null;
        timeInput.value = null;
    });

    infoLogo.addEventListener('click', function() {
        if (messageInfo.style.display === 'flex') {
            messageInfo.style.display = 'none';
        }
        else {
            messageInfo.style.display = 'flex';
        }
    });
};

submitScreenInOut();

const carData = {
    BMW: ["3 Series", "5 Series", "X5"],
    Porsche: ["911", "Panamera", "Taycan", "Cayenne", "Macan"],
    Ford: ["Focus", "Mondeo", "Mustang"],
    Toyota: ["Corolla", "Camry", "RAV4"],
    Volkswagen: ["Polo", "Passat", "Golf"],
    Mercedes: ["C-Class", "E-Class", "GLA"],
    Renault: ["Clio", "Megane", "Duster"],
    Honda: ["Civic", "Accord", "CR-V"],
    Hyundai: ["i30", "Tucson", "Santa Fe"]
};

const years = Array.from({ length: 24 }, (_, i) => 2024 - i);

const selectedCar = document.getElementById("selectedCar");
const selectedModel = document.getElementById("selectedModel");
const selectedYear = document.getElementById("selectedYear");

console.log("Скрипт завантажено"); 

selectedCar.addEventListener("change", () => {
    const brand = selectedCar.value;
    console.log("Обрано марку:", brand);

    selectedModel.innerHTML = "";
    selectedYear.innerHTML = "";
    selectedYear.style.display = "none";

    if (carData[brand]) {
        console.log("Знайдено моделі для бренду:", carData[brand]);

        carData[brand].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            selectedModel.appendChild(option);
        });

        selectedModel.style.display = "inline-block";
    } else {
        console.log("Бренд не знайдено в carData");
        selectedModel.style.display = "none";
    }
});

selectedModel.addEventListener("change", () => {
    const model = selectedModel.value;
    console.log("Обрано модель:", model);

    if (!model) {
        selectedYear.style.display = "none";
        return;
    }

    selectedYear.innerHTML = "";
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        selectedYear.appendChild(option);
    });

    console.log("Роки додано");
    selectedYear.style.display = "inline-block";
});

