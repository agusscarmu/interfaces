
"use strict";

let menu = document.querySelector(".menu");

document.addEventListener("DOMContentLoaded", function() {
  var sky = document.querySelector(".first-section .sky");
  var edif = document.querySelector(".edificios");
  var edif1 = document.querySelector(".edificio1");
  var edif2 = document.querySelector(".edificio2");
    const sensibility = 10;

  var edifCenter = document.querySelector(".edificio3");

  var logo = document.querySelector(".first-section .main-logo");
  var logoNav = document.querySelector(".nav-bar .logo");
  const velocityLogo = 2.2;

  var gwen = document.getElementById("g");
  var miles = document.getElementById("m");
  var webMiles = document.querySelector(".web-miles");
  var peter = document.getElementById("p");
  var webPeter = document.querySelector(".web-peter");
  let lastScrolled = 0;
    let scrollDown = document.querySelector(".scroll-down");
  
  
  let secondSectionFront = document.querySelector(".second-section.front");
  let textDuende = document.querySelector(".text-zone");
  let textDuendeP = document.querySelector(".text-zone p");
  let duendeVerde = document.querySelector(".duende-verde");

  let cards = document.querySelector(".third-section .cards");
  let navbar = document.querySelector(".nav-bar");

  let titleCompanion = document.querySelector(".company-section .h2");
  let bp = document.querySelector(".company-section .postal-company .bpanter");
  let ms = document.querySelector(".company-section .postal-company .elastic");
  let hulk = document.querySelector(".company-section .postal-company .hulk");
  let trees = document.querySelector(".company-section .postal-company .trees");
  let grass = document.querySelector(".company-section .postal-company .grass");
  let fifthSection = document.querySelector(".fifth-section .fifth-section-content");

  let image1 = document.getElementById("image1");
  let image2 = document.getElementById("image2");
  let image3 = document.getElementById("image3");
  let image4 = document.getElementById("image4");
  let content1 = document.getElementById("content1");
  let content2 = document.getElementById("content2");
  let content3 = document.getElementById("content3");
  let content4 = document.getElementById("content4");
    let fifthSectionAbs = document.querySelector(".fifth-section-absolute");
  let fifthText = document.querySelector(".fifth-section-text h2");
  let cardsGwen = document.querySelector(".fourth-section .gwen-section .cards-gwen");
  
  // Company effects
  const postalCompany = document.querySelector('.postal-company');
  const heroes = postalCompany.querySelectorAll('.hero');
  const sens = 4; // Ajusta la sensibilidad según sea necesario
  const rangeThreshold = 400; // Ajusta el umbral de rango según sea necesario
  
  function moveImages(image, sensibility, clientX, clientY) {
    const { left, top, width, height } = image.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
  
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
  
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
    if (distance < rangeThreshold) {
      const translateX = (deltaX / sensibility) * -1;
      const translateY = (deltaY / sensibility) * -1;
      image.style.transform = `translate(${translateX}px, ${translateY}px)`;
    } else {
      image.style.transform = 'translate(0, 0)';
    }
  }
  
  postalCompany.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    heroes.forEach((hero) => {
      moveImages(hero, sens, clientX, clientY);
    });
  });
  
  postalCompany.addEventListener('mouseleave', () => {
    heroes.forEach((image) => {
      image.style.transform = 'translate(0, 0)';
    });
  });
  
  
  
  document.addEventListener("scroll", function() {
    var scrolled = window.scrollY;
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total del contenido
    var scrolledPercentage = (scrolled / totalHeight) * 100; // Calcula el porcentaje
    console.log(scrolledPercentage+"%");
    // Edificios
    if(scrolled > 200){
    //   edif.style.transform = "scale(" + ((scrolled-200)* 0.0005 + 1) + ") translateY(" + (-(lastScrolled * 1.00 + 1)) + "px)";
        edifCenter.style.transform = "scale(" + (scrolled * 0.0001 + 1) + ") translateY(" + (lastScrolled * 0.0005 + 1) + "px)";
        edif2.style.width = (388-(scrolled*0.0002*1280/2))+"px";
        edif1.style.width = (388-(scrolled*0.0002*1280/2))+"px";
    }else{
        edif.style.transform = "translateY(" + (-(scrolled * 1.00 + 1)) + "px)";
        edifCenter.style.width = "scale(" + (scrolled * 0.0002 + 1) + ") translateY(" + (scrolled * 0.0005 + 1) + "px)";

    }
    if(scrolled<lastScrolled || scrolledPercentage<6 || menu.classList.contains('active')){
        navbar.classList.remove("nav-hidden");
    }else{
        navbar.classList.add("nav-hidden");
    }
    if(scrolledPercentage>1){
        scrollDown.classList.add("oculto");
    }else{
        scrollDown.classList.remove("oculto");
    }
    // Logo
    if(scrolledPercentage > 6.5){
        logoNav.classList.add("in-nav");
        navbar.classList.add("nav-secondary");
    }else{
        logoNav.classList.remove("in-nav");
        navbar.classList.remove("nav-secondary");
    }
    // Spideys
    if(scrolledPercentage > 4){
       
        peter.classList.add("show");
        webPeter.classList.add("show");
    }else{

        peter.classList.remove("show");
        webPeter.classList.remove("show");
    }
    if(scrolledPercentage > 4.3){
        miles.classList.add("show");
        webMiles.classList.add("show");

        gwen.classList.add("show");
    }else{
        miles.classList.remove("show");
        webMiles.classList.remove("show");

        gwen.classList.remove("show");
    }
    if(scrolledPercentage > 6){
        secondSectionFront.classList.add("active");
    }else{
        secondSectionFront.classList.remove("active");
    }
    if(scrolledPercentage > 9.25){
        textDuende.classList.add("active");
    }else{
        textDuende.classList.remove("active");
    }
    if(scrolledPercentage > 11.8){
        textDuendeP.classList.add("active-text");
    }else{
        textDuendeP.classList.remove("active-text");
    }
    if(scrolledPercentage > 6 && scrolledPercentage < 20){
        duendeVerde.classList.add("active");
        duendeVerde.style.transform = "translateY(" + (scrolledPercentage) + "%)";
    }else if(scrolled < 550){
        duendeVerde.classList.remove("active");
    }
    
    if(scrolledPercentage > 18.33 && scrolledPercentage < 35){
        cards.classList.add("active");
    }else{
        cards.classList.remove("active");
    }
    if(scrolledPercentage > 28 && scrolledPercentage < 35){
        cardsGwen.style.transform = "translateY(" + (scrolledPercentage*2-60) + "%)";
    }
    if(scrolledPercentage > 37){
        titleCompanion.classList.add("active");
    }else{
        titleCompanion.classList.remove("active");
    }
    
    if(scrolledPercentage > 39 ){
        bp.classList.add("active");
    }else{
        bp.classList.remove("active");
    }
    if(scrolledPercentage>40){
        ms.classList.add("active");
    }else{
        ms.classList.remove("active");
    }

    if(scrolledPercentage>35){
        hulk.classList.add("active");
    }else{
        hulk.classList.remove("active");
    }
    if(scrolledPercentage>46){
        fifthText.classList.add("active");
    }else{
        fifthText.classList.remove("active");
    }

    if(scrolledPercentage<67){
        fifthSection.classList.add("active");
    }
    if(scrolledPercentage<55.75){
        image1.classList.add("active");
        content1.classList.add("active");
        image4.classList.remove("active");
        content4.classList.remove("active");
        image2.classList.remove("active");
        content2.classList.remove("active");
        image3.classList.remove("active");
        content3.classList.remove("active");
    }else if(scrolledPercentage>=55.75 && scrolledPercentage<59.5){
        image2.classList.add("active");
        content2.classList.add("active");
        image1.classList.remove("active");
        content1.classList.remove("active");
        image3.classList.remove("active");
        content3.classList.remove("active");
        image4.classList.remove("active");
        content4.classList.remove("active");
    }else if(scrolledPercentage>=59.5 && scrolledPercentage<63.25){
        image3.classList.add("active");
        content3.classList.add("active");
        image2.classList.remove("active");
        content2.classList.remove("active");
        image1.classList.remove("active");
        content1.classList.remove("active");
        image4.classList.remove("active");
        content4.classList.remove("active");
    }else{
        image4.classList.add("active");
        content4.classList.add("active");
        image3.classList.remove("active");
        content3.classList.remove("active");
        image2.classList.remove("active");
        content2.classList.remove("active");
        image1.classList.remove("active");
        content1.classList.remove("active");
    }

    lastScrolled = scrolled;


  });
  


  var gwen2 = document.getElementById("g2");
  var miles2 = document.getElementById("m2");
  var peter2 = document.getElementById("p2");

  var backGroungGwen = document.getElementById("bgwen");
  var backGroungMiles = document.getElementById("bmiles");
  var backGroungPeter = document.getElementById("bpeter");
  var backGroundWhite = document.getElementById("bwhite");

  var botones = document.querySelectorAll(".button");
  var reflex = document.querySelectorAll(".reflex");

  botones.forEach(function(boton) {
    // Añade el event listener para el evento "mouseenter" (cuando el mouse entra)
    boton.addEventListener("mouseenter", function() {
        var indice = Array.from(botones).indexOf(boton);
        var reflex = document.querySelectorAll(".reflex")[indice];  
        reflex.classList.add("activate");  
    });
  
    // Añade el event listener para el evento "mouseleave" (cuando el mouse sale)
    boton.addEventListener("mouseleave", function() {
        var indice = Array.from(botones).indexOf(boton);
        var reflex = document.querySelectorAll(".reflex")[indice];
        reflex.classList.remove("activate");
    });
  });

  function resetHover(){
    backGroundWhite.classList.add("hidden");
    peter2.classList.remove("clicked");
    gwen2.classList.remove("clicked");
    miles2.classList.remove("clicked");
    peter2.classList.remove("blur");
    gwen2.classList.remove("blur");
    miles2.classList.remove("blur");
    backGroungGwen.classList.add("hidden");
    backGroungMiles.classList.add("hidden");
    backGroungPeter.classList.add("hidden");
  }

  // Agrega un listener para el evento de clic
  peter2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.remove("hidden");
      peter2.classList.remove("blur");
      peter2.classList.add("clicked");
      gwen2.classList.remove("clicked");
      miles2.classList.remove("clicked");
      
      gwen2.classList.add("blur");
      miles2.classList.add("blur");

      backGroungGwen.classList.add("hidden");
      backGroungMiles.classList.add("hidden");
      backGroungPeter.classList.remove("hidden");
  });

  peter2.addEventListener("mouseleave", function() {
        resetHover();
    });

  miles2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.remove("hidden");
      miles2.classList.remove("blur");
      miles2.classList.add("clicked");
      gwen2.classList.remove("clicked");
      peter2.classList.remove("clicked");
      
      gwen2.classList.add("blur");
      peter2.classList.add("blur");

      backGroungPeter.classList.add("hidden");
      backGroungGwen.classList.add("hidden");
      backGroungMiles.classList.remove("hidden");
  });

    miles2.addEventListener("mouseleave", function() {
        resetHover();
    });

  gwen2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.remove("hidden");
      gwen2.classList.remove("blur");
      gwen2.classList.add("clicked");
      peter2.classList.remove("clicked");
      miles2.classList.remove("clicked");
      
      peter2.classList.add("blur");
      miles2.classList.add("blur");

      backGroungMiles.classList.add("hidden");
      backGroungPeter.classList.add("hidden");
      backGroungGwen.classList.remove("hidden");
  });

    gwen2.addEventListener("mouseleave", function() {
        resetHover();
    });
});


function activateMenu(){
    let item1 = document.getElementById("item1");
    let item2 = document.getElementById("item2");
    let item3 = document.getElementById("item3");
    let item4 = document.getElementById("item4");
    menu.classList.toggle('active');
    item1.classList.toggle('active');
    item2.classList.toggle('active');
    item3.classList.toggle('active');
    item4.classList.toggle('active');
}
// Hamburguer Menu
function toggleMenu() {
    var menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('active');
    activateMenu();
}


document.addEventListener("DOMContentLoaded", function() {
  // Simula una carga de 5 segundos antes de mostrar el contenido
  setTimeout(function() {
      document.querySelector('.loader-container').style.display = 'none';
      document.querySelector('.content').classList.remove('hidden');
      document.querySelector('.bkg-content').classList.remove('hidden');
      document.querySelector('.nav-bar-container').classList.remove('hidden');
      document.querySelector('.scroll-down').classList.remove('hidden');
  }, 5000);
});

// SPRITE SHEETS
let isVenom = false;
let inAttack = false;
var eddie = document.getElementById('eddie');
var miles = document.getElementById('miles');

eddie.addEventListener('mouseover', function(){
    if(!isVenom){
        eddie.classList.add('transform');
    }
    setTimeout(function(){
        eddie.classList.add('venom');
        eddie.style.backgroundPosition = '-1772px -254px';
        eddie.style.width = '65px';
        },600);
    setTimeout(function(){
        isVenom = true;},1000);
})

eddie.addEventListener('mouseover', function() {
    if(!inAttack && isVenom){
        attack(eddie, miles);
    }
});
miles.addEventListener('mouseover', function() {
    if(!inAttack && isVenom){
        attack(miles, eddie);
    }
});

function attack(elemento1, elemento2) {
    elemento1.classList.add('attack');
    elemento2.classList.add('hitted');
    inAttack = true;
    setTimeout(function() {
        elemento1.classList.remove('attack');
        elemento2.classList.remove('hitted');
        inAttack = false
    }, 700);
}
