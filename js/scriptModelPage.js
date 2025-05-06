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

carChoiceItems.forEach(item => {
    item.addEventListener('click', function() {
        item.classList.toggle('active');
    })
});

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
  

isVisible(".footerImg");
isVisible(".generalInfo img");
isVisible(".text");
isVisible(".techInfo .techChoice img");
isVisible(".techChoice ul");

function submitScreenInOut() {
    const buttonSave = document.getElementById("buttonSave");
    const buttonOK = document.getElementById("buttonOK");
    const submitScreen = document.getElementById("submitScreen");

    const carChoice = document.querySelector('input[name="car"]:checked');
    const date = document.getElementById("dateInput");
    const email = document.getElementById("emailInput");

    buttonSave.addEventListener('click', function() {

        if (date.value !== "" && email.value !== "") {
            submitScreen.style.display = 'flex';
        }
        else {
            alert("Не всі дані заповнено");
        }
    });

    buttonOK.addEventListener('click', function() {
        submitScreen.style.display = 'none';

        date.value = null;
        email.value = null;
    });
};

submitScreenInOut();

function closeOtherDetails(event) {
    const clickedDetails = event.target;  
    const detailsElements = document.querySelectorAll("details");  

    if (clickedDetails.open) {
        detailsElements.forEach(function(details) {
            if (details !== clickedDetails) {
                details.removeAttribute("open");
            }
        });
    }
}

function init() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(function(details) {
        details.addEventListener('toggle', closeOtherDetails); 
    });
}

init();

const today = new Date().toISOString().split('T')[0];
  
document.getElementById('dateInput').setAttribute('min', today);














