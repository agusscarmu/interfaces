"use strict";


const carousel = document.querySelector('.carousel-container');
const card = document.querySelector('.carousel-item');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carousel.addEventListener('mousedown', (e) => {
  if (!isDragging) {
    isDragging = true;
    startPosition = e.clientX;
    prevTranslate = currentTranslate;
    carousel.style.cursor = 'grabbing';
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
  }
});

carousel.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    carousel.style.cursor = 'grab';
    checkBoundary();
  }
});

function updateCarouselPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function checkBoundary() {
  const cardWidth = card.offsetWidth;
  const carouselWidth = carousel.offsetWidth;
  const maxTranslate = cardWidth/16; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate = -carouselWidth*(2/3) + cardWidth; // Evita que se desplace más allá del último elemento

  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
  } else if (currentTranslate < minTranslate) {
    currentTranslate = minTranslate;
  }

  updateCarouselPosition();
}




// Carrusel 2
const carousel2 = document.querySelector('.carousel-main-container');
const card2 = document.querySelector('.carousel-item-2');
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
  }
});

carousel2.addEventListener('mouseleave', () => {
  if (isDragging2) {
    isDragging2 = false;
    carousel2.style.cursor = 'grab';
    checkBoundary2();
  }
});

function updateCarouselPosition2() {
  carousel2.style.transform = `translateX(${currentTranslate2}px)`;
}

function checkBoundary2() {
  const cardWidth2 = card2.offsetWidth;
  const carouselWidth2 = carousel2.offsetWidth;
  const maxTranslate2 = 0; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate2 = -carouselWidth2 * (2 / 3) + cardWidth2; // Evita que se desplace más allá del último elemento

  if (currentTranslate2 > maxTranslate2) {
    currentTranslate2 = maxTranslate2;
  } else if (currentTranslate2 < minTranslate2) {
    currentTranslate2 = minTranslate2;
  }

  updateCarouselPosition2();
}