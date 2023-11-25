
"use strict";



document.addEventListener("DOMContentLoaded", function() {
  var sky = document.querySelector(".first-section .sky");
  var edif = document.querySelector(".edificios");
  var edif1 = document.querySelector(".edificio1");
  var edif2 = document.querySelector(".edificio2");


  var edifCenter = document.querySelector(".edificio3");

  var logo = document.querySelector(".first-section .main-logo");
  const velocityLogo = 2.2;

  var gwen = document.getElementById("g");
  var miles = document.getElementById("m");
  var webMiles = document.querySelector(".web-miles");
  var peter = document.getElementById("p");
  var webPeter = document.querySelector(".web-peter");
  let lastScrolled = 0;

  

  let secondSectionFront = document.querySelector(".second-section.front");
  let textDuende = document.querySelector(".text-zone");
  let textDuendeP = document.querySelector(".text-zone p");
  let duendeVerde = document.querySelector(".duende-verde");

  let cards = document.querySelector(".third-section .cards");

  let titleCompanion = document.querySelector(".company-section .h2");
  let bp = document.querySelector(".company-section .postal-company .bpanter");
  let ms = document.querySelector(".company-section .postal-company .elastic");
  let hulk = document.querySelector(".company-section .postal-company .hulk");
  let trees = document.querySelector(".company-section .postal-company .trees");
  let grass = document.querySelector(".company-section .postal-company .grass");
  document.addEventListener("scroll", function() {
    var scrolled = window.scrollY;
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total del contenido
    var scrolledPercentage = (scrolled / totalHeight) * 100; // Calcula el porcentaje
    // Edificios
    if(scrolled > 200){
    //   edif.style.transform = "scale(" + ((scrolled-200)* 0.0005 + 1) + ") translateY(" + (-(lastScrolled * 1.00 + 1)) + "px)";
        edifCenter.style.transform = "scale(" + (scrolled * 0.0001 + 1) + ") translateY(" + (lastScrolled * 0.0005 + 1) + "px)";
        edif2.style.width = (388-(scrolled*0.0002*1280/2))+"px";
        edif1.style.width = (388-(scrolled*0.0002*1280/2))+"px";
    }else{
        edif.style.transform = "translateY(" + (-(scrolled * 1.00 + 1)) + "px)";
        edifCenter.style.width = "scale(" + (scrolled * 0.0002 + 1) + ") translateY(" + (scrolled * 0.0005 + 1) + "px)";
        lastScrolled = scrolled;
    }
    // Logo
    if(scrolled/velocityLogo < 150)
      logo.style.transform = "scale(" + (scrolled/velocityLogo * 0.02 + 1) + ") translateY(" + (scrolled/velocityLogo * 1.00 + 1) + "px)";

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
    if(scrolledPercentage > 5){
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
    if(scrolledPercentage > 7 && scrolledPercentage < 20){
        duendeVerde.classList.add("active");
        duendeVerde.style.transform = "translateY(" + (scrolledPercentage) + "%)";
    }else if(scrolled < 550){
        duendeVerde.classList.remove("active");
    }
    
    if(scrolledPercentage > 18.33){
        cards.classList.add("active");
    }else{
        cards.classList.remove("active");
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



  });
  


  var gwen2 = document.getElementById("g2");
  var miles2 = document.getElementById("m2");
  var peter2 = document.getElementById("p2");

  var backGroungGwen = document.getElementById("bgwen");
  var backGroungMiles = document.getElementById("bmiles");
  var backGroungPeter = document.getElementById("bpeter");
  var backGroundWhite = document.getElementById("bwhite");

  // Agrega un listener para el evento de clic
  peter2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.add("over");
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

  miles2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.add("over");
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

  gwen2.addEventListener("mouseenter", function() {
      backGroundWhite.classList.add("over");
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
});

document.addEventListener("DOMContentLoaded", function() {
  // Simula una carga de 5 segundos antes de mostrar el contenido
  setTimeout(function() {
      document.querySelector('.loader-container').style.display = 'none';
      document.querySelector('.content').classList.remove('hidden');
      document.querySelector('.bkg-content').classList.remove('hidden');
  }, 100);
});

// SPRITE SHEETS
let isVenom = false;
let inAttack = false;
var eddie = document.getElementById('eddie');
var miles = document.getElementById('miles');

eddie.addEventListener('click', function(){
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

eddie.addEventListener('click', function() {
    if(!inAttack && isVenom){
        attack(eddie, miles);
    }
});
miles.addEventListener('click', function() {
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
