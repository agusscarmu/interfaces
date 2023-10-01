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
    console.log(cardWidth);
    const carouselWidth = carousel.offsetWidth;
    console.log(carouselWidth);
    const maxTranslate = carouselWidth;
    const minTranslate = -carouselWidth;
    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
    } else if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
    }
  
    updateCarouselPosition();
  }
  
