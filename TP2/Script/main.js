"use strict";


const carousel = document.querySelector('.carousel-container-recommended');
const card = document.querySelector('.carousel-container-recommended .carousel-item');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carousel.style.transition = 'transform 0.3s ease-in-out'; // Agregar transición

carousel.addEventListener('mousedown', (e) => {
  if (!isDragging) {
    isDragging = true;
    startPosition = e.clientX;
    prevTranslate = currentTranslate;
    carousel.style.cursor = 'grabbing';
    carousel.style.transition = 'none'; // Eliminar transición durante el arrastre
  }
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const currentPosition = e.clientX;
  currentTranslate = prevTranslate + currentPosition - startPosition;
  updateCarouselPosition();
});

carousel.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    carousel.style.cursor = 'grab';
    checkBoundary();
    carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

carousel.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    carousel.style.cursor = 'grab';
    checkBoundary();
    carousel.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

function updateCarouselPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function checkBoundary() {
  const cardWidth = card.offsetWidth;
  const carouselWidth = carousel.offsetWidth;
  const maxTranslate = 0; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate = -carouselWidth*(1/2) + cardWidth * 1.45; // Evita que se desplace más allá del último elemento

  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
  } else if (currentTranslate < minTranslate) {
    currentTranslate = minTranslate;
  }

  updateCarouselPosition();
}




// Carrusel 2
const carousel2 = document.querySelector('.carousel-main-container');
const card2 = document.querySelector('.carousel-main-container .carousel-item');
let isDragging2 = false;
let startPosition2 = 0;
let currentTranslate2 = 0;
let prevTranslate2 = 0;

carousel2.addEventListener('mousedown', (e) => {
  if (!isDragging2) {
    isDragging2 = true;
    startPosition2 = e.clientX;
    prevTranslate2 = currentTranslate2;
    carousel2.style.cursor = 'grabbing';
    carousel2.style.transition = 'none'; // Eliminar transición durante el arrastre
  }
});

carousel2.addEventListener('mousemove', (e) => {
  if (!isDragging2) return;
  const currentPosition2 = e.clientX;
  currentTranslate2 = prevTranslate2 + currentPosition2 - startPosition2;
  updateCarouselPosition2();
});

carousel2.addEventListener('mouseup', () => {
  if (isDragging2) {
    isDragging2 = false;
    carousel2.style.cursor = 'grab';
    checkBoundary2();
    carousel2.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

carousel2.addEventListener('mouseleave', () => {
  if (isDragging2) {
    isDragging2 = false;
    carousel2.style.cursor = 'grab';
    checkBoundary2();
    carousel2.style.transition = 'transform 0.4s ease-in-out'; // Restablecer transición
  }
});

function updateCarouselPosition2() {
  carousel2.style.transform = `translateX(${currentTranslate2}px)`;
}

function checkBoundary2() {
  const cardWidth2 = card2.offsetWidth;
  const carouselWidth2 = carousel2.offsetWidth;
  const maxTranslate2 = carouselWidth2/2 - cardWidth2 * 0.9; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate2 = -carouselWidth2/2 + cardWidth2 * 0.97; // Evita que se desplace más allá del último elemento

  if (currentTranslate2 > maxTranslate2) {
    currentTranslate2 = maxTranslate2;
  } else if (currentTranslate2 < minTranslate2) {
    currentTranslate2 = minTranslate2;
  }

  updateCarouselPosition2();
}


'use strict';

const carousel3 = document.querySelector('.carousel-container-adventure');
const card3 = document.querySelector('.carousel-container-adventure .carousel-item');
let isDragging3 = false;
let startPosition3 = 0;
let currentTranslate3 = 0;
let prevTranslate3 = 0;

carousel3.style.transition = 'transform 0.3s ease-in-out'; // Agregar transición

carousel3.addEventListener('mousedown', (e) => {
  if (!isDragging3) {
    isDragging3 = true;
    startPosition3 = e.clientX;
    prevTranslate3 = currentTranslate3;
    carousel3.style.cursor = 'grabbing';
    carousel3.style.transition = 'none'; // Eliminar transición durante el arrastre
  }
});

carousel3.addEventListener('mousemove', (e) => {
  if (!isDragging3) return;
  const currentPosition3 = e.clientX;
  currentTranslate3 = prevTranslate3 + currentPosition3 - startPosition3;
  updateCarouselPosition3();
});

carousel3.addEventListener('mouseup', () => {
  if (isDragging3) {
    isDragging3 = false;
    carousel3.style.cursor = 'grab';
    checkBoundary3();
    carousel3.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

carousel3.addEventListener('mouseleave', () => {
  if (isDragging3) {
    isDragging3 = false;
    carousel3.style.cursor = 'grab';
    checkBoundary3();
    carousel3.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

function updateCarouselPosition3() {
  carousel3.style.transform = `translateX(${currentTranslate3}px)`;
}

function checkBoundary3() {
  const cardWidth3 = card3.offsetWidth;
  const carouselWidth3 = carousel3.offsetWidth;
  const maxTranslate3 = 0; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate3 = -carouselWidth3 * (1/2) + cardWidth3 * 1.45; // Evita que se desplace más allá del último elemento

  if (currentTranslate3 > maxTranslate3) {
    currentTranslate3 = maxTranslate3;
  } else if (currentTranslate3 < minTranslate3) {
    currentTranslate3 = minTranslate3;
  }

  updateCarouselPosition3();
}



// Funcionalidad agregar al carro
// function toggleCarrito(botonID) {
//   const botonCarrito = document.getElementById(`botonCarrito${botonID}`);
//   const imgCarrito = document.getElementById(`imagenCarrito${botonID}`);
//   console.log(botonID);
//   console.log(imgCarrito);
//   console.log(botonCarrito);
//   if (imgCarrito.style.visibility === 'hidden') {
//     botonCarrito.textContent = 'Agregar';
//     imgCarrito.style.visibility = 'visible';
//   } else {
//     botonCarrito.textContent = 'En el carro';
//     imgCarrito.style.visibility = 'hidden';
//     console.log(document.getElementById(`botonCarrito${botonID}`));
//     console.log(document.getElementById(`imagenCarrito${botonID}`));
//   }
//   console.log('2');
//   console.log(imgCarrito);

// }
function toggleCarrito(botonID) {
  const botonCarrito = document.getElementById(`botonCarrito${botonID}`);
  if (botonCarrito.textContent === 'En el carro') {
    botonCarrito.innerHTML = 'Agregar<img id="imagenCarrito1" src="./Resources/2e7395605e0b4152131b853791b21df4.png">';
  } else {
    botonCarrito.textContent = 'En el carro';
  }
}