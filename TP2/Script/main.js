"use strict";

const flechaIzquierda = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .left-arrow")
const flechaDerecha = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .right-arrow")


function initializeCarousel(carouselSelector, cardSelector, auxTraslate1, auxTraslate2, arrowContent) {
  const flechas = document.querySelector(arrowContent+" .carousel-arrow")
  const flechaIzquierda = document.querySelector(arrowContent + " .carousel-arrow .left-arrow");
  const flechaDerecha = document.querySelector(arrowContent + " .carousel-arrow .right-arrow");
  let touchStartX = 0;
  let isDragging = false;
  const carouselPrincipal = document.querySelector(".carousel-main-container");
  const carousel = document.querySelector(carouselSelector);
  const card = document.querySelector(cardSelector);
  let currentTranslate = 0;
  let cardWidth = card.offsetWidth;
  if(esCarruselPrincipal(carouselSelector)){
    cardWidth = cardWidth + 20; // 10px de margen a la derecha y 10px de margen a la izquierda
    if(window.innerWidth>768){
      const cardsInView = Math.floor(carousel.offsetWidth / cardWidth);
      const maxTranslate = (cardsInView - 1) * (cardWidth/2);
      updateCardSize(cardWidth, 0, maxTranslate);
    }
  }

  function updateCarouselPosition() {
    carousel.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
  }
  
  function moveCarouselRight() {
    const minTranslate = auxTraslate2 * (carousel.offsetWidth - cardWidth);
    
    if ((currentTranslate-cardWidth)> minTranslate) {
      currentTranslate -= cardWidth;
      updateCarouselPosition();
    }else{
      currentTranslate = minTranslate;
      updateCarouselPosition();
    }
  
    if(flechas.classList.contains("limiteIzquierdo")){
      flechas.classList.remove("limiteIzquierdo");
      flechaIzquierda.classList.remove("limiteIzquierdo");
    }

    if(currentTranslate===minTranslate){
      flechas.classList.add("limiteDerecho");
      flechaDerecha.classList.add("limiteDerecho");
    }
  }
  function moveCarouselLeft() {
    const maxTranslate = auxTraslate1 * (carousel.offsetWidth - cardWidth);
    if ((currentTranslate + cardWidth) < maxTranslate) {
      currentTranslate += cardWidth;
      updateCarouselPosition();
    }else{
      currentTranslate = maxTranslate;
      updateCarouselPosition();
    }
    if(flechas.classList.contains("limiteDerecho")){
      flechas.classList.remove("limiteDerecho");
      flechaDerecha.classList.remove("limiteDerecho");
    }

    if(currentTranslate===maxTranslate){
      flechas.classList.add("limiteIzquierdo");
      flechaIzquierda.classList.add("limiteIzquierdo");
    }
  }
  
  
  function updateCarouselPositionPrincipal() {
    carouselPrincipal.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
  }
  function moveCarouselRightPrincipal() {
    const cardsInView = Math.floor(carousel.offsetWidth / cardWidth);
    const maxTranslate = (cardsInView - 1) * (cardWidth/2);
    console.log("CARDWIDTH: "+cardWidth);
    console.log("CARDWIDTH: "+cardWidth);
    console.log("CARDWIDTH: "+cardWidth);

  
    if (currentTranslate > -maxTranslate) {
      currentTranslate -= cardWidth;
    } 
    if(flechas.classList.contains("limiteIzquierdo")){
      flechas.classList.remove("limiteIzquierdo");
      flechaIzquierda.classList.remove("limiteIzquierdo");
    }
    if(currentTranslate<= -maxTranslate){
      flechas.classList.add("limiteDerecho");
      flechaDerecha.classList.add("limiteDerecho");
    }
  
    updateCarouselPositionPrincipal();
    console.log("posicion: ("+currentTranslate+" | "+maxTranslate+") cardWidth: "+cardWidth)
    if(window.innerWidth>768){
      updateCardSize(cardWidth, currentTranslate, maxTranslate);
    }
  }
  
  function moveCaroselLeftPrincipal() {
    const cardsInView = Math.floor(carousel.offsetWidth / cardWidth);
    const maxTranslate = (cardsInView - 1) * (cardWidth/2);
  
    if (currentTranslate < maxTranslate) {
      currentTranslate += cardWidth;
    }
    if(flechas.classList.contains("limiteDerecho")){
      flechas.classList.remove("limiteDerecho");
      flechaDerecha.classList.remove("limiteDerecho");
    }
    if(currentTranslate>=maxTranslate){
      flechas.classList.add("limiteIzquierdo");
      flechaIzquierda.classList.add("limiteIzquierdo");
    }
  
    updateCarouselPositionPrincipal();
    console.log("posicion: ("+currentTranslate+" | "+maxTranslate+") cardWidth: "+cardWidth)
    if(window.innerWidth>768){
      updateCardSize(cardWidth, currentTranslate, maxTranslate);
    }
  }
  
  carouselPrincipal.addEventListener('touchstart', (e) => {
    if (!isDragging) {
      touchStartX = e.touches[0].clientX;
    }
  });
  
  // Agregar event listener para el movimiento del toque (touchmove)
  carouselPrincipal.addEventListener('touchmove', (e) => {
    if (isDragging) {
      return;
    }
  
    const touchCurrentX = e.touches[0].clientX;
    const touchDeltaX = touchCurrentX - touchStartX;
  
    // Puedes ajustar este valor según la sensibilidad del deslizamiento
    const sensitivity = 60;
  
    if (Math.abs(touchDeltaX) > sensitivity) {
      e.preventDefault();
      if (touchDeltaX > 0) {
        moveCaroselLeftPrincipal();
      } else {
        moveCarouselRightPrincipal();
      }
      isDragging = true; // Marcar que se está realizando un deslizamiento
    }
  });
  
  // Agregar event listener para el final del toque (touchend)
  carouselPrincipal.addEventListener('touchend', () => {
    isDragging = false; // Restablecer la variable de estado al finalizar el toque
  });
  flechaIzquierda.addEventListener('click', () => {
    if(cardSelector.includes(".carousel-main-container")){
      moveCaroselLeftPrincipal();
    }else{
      moveCarouselLeft();
    }
  });
  flechaDerecha.addEventListener('click', () => {
    if(cardSelector.includes(".carousel-main-container")){
      moveCarouselRightPrincipal();
    }else{
      moveCarouselRight();
    }
  });


  
}

function initializeCarouselElecc(carouselSelector, cardSelector, auxTraslate1Desk, auxTraslate2Desk, auxTraslate1Mobile, auxTraslate2Mobile, arrowContent){
  if(window.innerWidth <= 768){
    initializeCarousel(carouselSelector, cardSelector, auxTraslate1Mobile, auxTraslate2Mobile, arrowContent);
  }else{
    initializeCarousel(carouselSelector, cardSelector, auxTraslate1Desk, auxTraslate2Desk, arrowContent);
  }
}


// Llamar a la función para inicializar todos los carruseles
initializeCarouselElecc('.carousel-container-recommended', '.carousel-container-recommended .carousel-item', 0, (-0.32), 0, (-0.75),".contenidoEnteroCarouselRecommended");
initializeCarouselElecc('.carousel-container-adventure', '.carousel-container-adventure .carousel-item', 0, (-0.32), 0, (-0.75), ".contenidoEnteroCarouselAdventure");
initializeCarouselElecc('.carousel-main-container', '.carousel-main-container .carousel-item', 0.4, -0.4, 0.474, -0.474,".contenidoEnteroCarouselPrincipal");


function runGame(buttonElement) {
  // Encuentra el elemento .title dentro del mismo .carousel-item
  const carouselItem = buttonElement.closest(".carousel-item");
  const gameNameElement = carouselItem.querySelector(".title");

  // Obtiene el texto del elemento .title como nombre del juego
  const gameName = gameNameElement.textContent;


  switch (gameName) {
    case "Cuatro en Linea: GoT":
        window.location.href = "paginaJuego.html";
        break;
    default:
        console.log("Iniciando juego: " + gameName);
        break;
  }
}
const cards = document.querySelectorAll(".carousel-main-container .carousel-item");
cards.forEach((card) =>
card.addEventListener("click", function() {
  let tituloJuego = card.querySelector(".title");
  switch (tituloJuego.textContent) {
    case "Cuatro en Linea - GoT":
      window.location.href = "paginaJuego.html";
      break;
    default:
      console.log("Iniciando juego: " + tituloJuego.textContent);
      break;
  }
}
));

const cardsCarruselesSecundarios = document.querySelectorAll(".carousel-container-adventure .carousel-item, .carousel-container-recommended .carousel-item");
cardsCarruselesSecundarios.forEach((card) =>
  {
    const imagenJuego = card.querySelector(".carousel-image img");
    const tituloJuego = card.querySelector(".title");
    if(window.innerWidth <= 768){
      imagenJuego.addEventListener("click", function() {
        switch (tituloJuego.textContent) {
          case "Cuatro en Linea: GoT":
            window.location.href = "paginaJuego.html";
            break;
          default:
            console.log("Iniciando juego: " + tituloJuego.textContent);
            break;
        }
      });
    }
  }
);

function updateCardSize(cardWidth, currentTranslate, maxTranslate) {
  currentTranslate *= -1;
  currentTranslate += maxTranslate;
  console.log("currentTranslate: "+currentTranslate);
  const cardScale = 1.1; // Tamaño aumentado para la tarjeta centrada
  const transitionDuration = "0.5s"; // Duración de la transición
  const cards = document.querySelectorAll(".carousel-main-container .carousel-item");
  const mouseoverHandler = function() {
    this.style.boxShadow = "0px 0px 20px 6px rgba(169, 133, 218, 0.80)";
  };
  const mouseoutHandler = function() {
    this.style.boxShadow = "0px 0px 60px -8px rgba(169, 133, 218, 0.80)";
  };

  cards.forEach((card, index) => {
    if (currentTranslate == index*cardWidth) {
      card.style.transform = `scale(${cardScale})`;
      card.style.zIndex = "1";
      card.style.width = "45vw";
      card.style.boxShadow = "0px 0px 20px 6px rgba(169, 133, 218, 0.80)";
      card.style.transition = `transform ${transitionDuration}, width ${transitionDuration}, box-shadow ${transitionDuration}`;
      card.addEventListener("mouseover", mouseoverHandler);
      card.addEventListener("mouseout", mouseoutHandler);
    } else {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "none";
      card.style.zIndex = "0";
      card.style.width = "33vw";
      card.style.transition = `transform ${transitionDuration}, width ${transitionDuration}, box-shadow ${transitionDuration}`;
      card.removeEventListener("mouseout", mouseoverHandler);
      card.removeEventListener("mouseover", mouseoverHandler);
    }
  });
}
function esCarruselPrincipal(selector) {
  // Comprueba si el selector contiene la cadena ".carousel-main-container"
  return selector.includes(".carousel-main-container");
}

const carouselRecommended = document.querySelector(".contenidoEnteroCarouselRecommended");
const carouselAdventure = document.querySelector(".contenidoEnteroCarouselAdventure");
const h3flechaAdeventure = document.querySelector(".adventure .categoria-carrusel h3");
const h3flechaRecommended = document.querySelector(".recommended .categoria-carrusel h3");

carouselRecommended.addEventListener("scroll", function() {

  if (carouselRecommended.scrollLeft + carouselRecommended.clientWidth === carouselRecommended.scrollWidth) {
    h3flechaRecommended.classList.add("hidden");
  }else{
    h3flechaRecommended.classList.remove("hidden");
  }
});

carouselAdventure.addEventListener("scroll", function() {

  if (carouselAdventure.scrollLeft + carouselAdventure.clientWidth === carouselAdventure.scrollWidth) {
    h3flechaAdeventure.classList.add("hidden");
  }else{
    h3flechaAdeventure.classList.remove("hidden");
  }
});
