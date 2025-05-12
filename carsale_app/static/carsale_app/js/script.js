const buttonModel = document.querySelector("#buttonModels");


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
        "{% static 'carsale_app/img/General/MainPhoto1.png' %}",
        "{% static 'carsale_app/img/General/MainPhoto2.jpg' %}",
        "{% static 'carsale_app/img/General/MainPhoto3.jpg' %}",
        "{% static 'carsale_app/img/General/MainPhoto4.jpg' %}"
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

window.addEventListener('load', editHtml);
window.addEventListener('resize', editHtml);



