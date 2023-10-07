"use strict";

const flechas = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow")
const flechaIzquierda = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .left-arrow")
const flechaDerecha = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .right-arrow")


function initializeCarousel(carouselSelector, cardSelector, auxTraslate1, auxTraslate2, arrowContent) {
  const flechas = document.querySelector(arrowContent+" .carousel-arrow")
  const flechaIzquierda = document.querySelector(arrowContent+" .carousel-arrow .left-arrow")
  const flechaDerecha = document.querySelector(arrowContent+" .carousel-arrow .right-arrow")
  const h3flechaAdeventure = document.querySelector(".adventure .categoria-carrusel h3")
  const h3flechaRecommended = document.querySelector(".recommended .categoria-carrusel h3")
  

  const carousel = document.querySelector(carouselSelector);
  const card = document.querySelector(cardSelector);
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let startPositionY = 0;

  carousel.style.transition = 'transform 0.3s ease-in-out'; // Agregar transición

  carousel.addEventListener('mousedown', (e) => {
    if (!isDragging) {
      isDragging = true;
      startPosition = e.clientX;
      prevTranslate = currentTranslate;
      carousel.style.transition = 'none'; // Eliminar transición durante el arrastre
    }
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPosition;
    e.preventDefault(); // Prevenir el comportamiento predeterminado del evento
    updateCarouselPosition();
  });

  carousel.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      checkBoundary();
      carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
    }
  });


  carousel.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      checkBoundary();
      carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
    }
  });



carousel.addEventListener('touchstart', (e) => {
  if (!isDragging) {
    isDragging = true;
    startPosition = e.touches[0].clientX;
    startPositionY = e.touches[0].clientY;
    prevTranslate = currentTranslate;
    carousel.style.transition = 'none'; // Eliminar transición durante el arrastre
  }
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentPosition = e.touches[0].clientX;
  const currentPositionY = e.touches[0].clientY;
  const xDiff = currentPosition - startPosition;
  const yDiff = currentPositionY - startPositionY;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    e.preventDefault(); 
    currentTranslate = prevTranslate + currentPosition - startPosition;
    updateCarouselPosition();
  }
});
carousel.addEventListener('touchleave', () => {
  if (isDragging) {
    isDragging = false;
    checkBoundary();
    carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
}
);
carousel.addEventListener('touchend', () => {
  if (isDragging) {
    isDragging = false;
    checkBoundary();
    carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición

  }
});

function updateCarouselPosition() {
  carousel.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
}


  function checkBoundary() {
    const cardWidth = card.offsetWidth;
    const carouselWidth = carousel.offsetWidth;
    const maxTranslate = auxTraslate1 * (carouselWidth - cardWidth); // Limita el desplazamiento a 0 (posición inicial)
    const minTranslate = auxTraslate2 * (carouselWidth - cardWidth); // Evita que se desplace más allá del último elemento
  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
    if(cardSelector.includes("adventure")){
      h3flechaAdeventure.classList.remove("hidden");
    }else if(cardSelector.includes("recommended")){
      h3flechaRecommended.classList.remove("hidden");
    }
    flechas.classList.add("limiteIzquierdo");
    flechas.classList.remove("limiteDerecho");
    flechaIzquierda.classList.add("limiteIzquierdo");
    flechaDerecha.classList.remove("limiteDerecho");
  } else if (currentTranslate < minTranslate) {
    if(cardSelector.includes("adventure")){
      h3flechaAdeventure.classList.add("hidden");
    }else if(cardSelector.includes("recommended")){
      h3flechaRecommended.classList.add("hidden");
    }
    currentTranslate = minTranslate;
    flechas.classList.add("limiteDerecho");
    flechas.classList.remove("limiteIzquierdo");
    flechaDerecha.classList.add("limiteDerecho");
    flechaIzquierda.classList.remove("limiteIzquierdo");
  } else {
    if(cardSelector.includes("adventure")){
      h3flechaAdeventure.classList.remove("hidden");
    }else if(cardSelector.includes("recommended")){
      h3flechaRecommended.classList.remove("hidden");
    }
    flechas.classList.remove("limiteIzquierdo");
    flechas.classList.remove("limiteDerecho");
    flechaIzquierda.classList.remove("limiteIzquierdo");
    flechaDerecha.classList.remove("limiteDerecho");
  }
    updateCarouselPosition();
  }
}

function initializeCarouselElecc(carouselSelector, cardSelector, auxTraslate1Desk, auxTraslate2Desk, auxTraslate1Mobile, auxTraslate2Mobile, arrowContent){
  if(window.innerWidth <= 768){
    initializeCarousel(carouselSelector, cardSelector, auxTraslate1Mobile, auxTraslate2Mobile, arrowContent);
  }else{
    initializeCarousel(carouselSelector, cardSelector, auxTraslate1Desk, auxTraslate2Desk, arrowContent);
  }
}


// Llamar a la función para inicializar ambos carruseles
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



