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
   
    checkBoundary2();
    carousel2.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

carousel2.addEventListener('mouseleave', () => {
  if (isDragging2) {
    isDragging2 = false;

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

    checkBoundary3();
    carousel3.style.transition = 'transform 0.3s ease-in-out'; // Restablecer transición
  }
});

carousel3.addEventListener('mouseleave', () => {
  if (isDragging3) {
    isDragging3 = false;
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

function cambiarTexto(elemento) {
  var textoBoton = elemento.querySelector(".textoBotonCarrito");
  var imagenCarrito = elemento.querySelector(".imagenCarrito");
  
  if (textoBoton.innerHTML === "Agregar") {
    textoBoton.classList.add("hidden");
    imagenCarrito.classList.add("hidden");
    elemento.classList.add("active");
    setTimeout(function () {
      textoBoton.innerHTML = "En carro";
      textoBoton.classList.remove("hidden");
      elemento.classList.remove("active");
      imagenCarrito.classList.remove("hidden");
      imagenCarrito.src = "./Resources/Tic.png"; // Cambia la fuente de la imagen
    }, 300); // Cambia el texto después de que la animación de rotación haya terminado
  } else {
      textoBoton.classList.add("hidden");
      imagenCarrito.classList.add("hidden");
      elemento.classList.add("active");
      setTimeout(function () {
        textoBoton.innerHTML = "Agregar";
        textoBoton.classList.remove("hidden");
        elemento.classList.remove("active");
        imagenCarrito.classList.remove("hidden");
        imagenCarrito.src = "./Resources/2e7395605e0b4152131b853791b21df4.png"; // Restaura la fuente original de la imagen
      }, 300); // Cambia el texto después de que la animación de rotación haya terminado
  }
}


// Menu lateral usuario

// Obtener elementos del DOM
var usuario = document.getElementById("usuarioId");
var menuLateral = document.getElementById("menuLateral");
var fondoSemiTransparente = document.getElementById("fondoSemiTransparente");
var carritoButton = document.getElementById("carritoId");
var carritoMenu = document.getElementById("carritoMenu");

// Agregar un evento de clic al icono de usuario para abrir el menú lateral
usuario.addEventListener("click", function () {
    menuLateral.classList.add("menu-activo");
    if (carritoMenu.classList.contains("carrito-activo")) {
      carritoMenu.classList.remove("carrito-activo");
    }
    fondoSemiTransparente.style.display = "block"; // Mostrar el fondo semi-transparente
});

// Agregar un evento de clic al fondo semi-transparente para cerrar el menú lateral
fondoSemiTransparente.addEventListener("click", function () {
    menuLateral.classList.remove("menu-activo");
    fondoSemiTransparente.style.display = "none"; // Ocultar el fondo semi-transparente
});



// CARRITO

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos del DOM

  // Mostrar el menú de carrito al hacer clic en el botón
  carritoButton.addEventListener("click", function () {
      // Alternar la visibilidad del menú de carrito
      if (carritoMenu.classList.contains("carrito-activo")) {
          carritoMenu.classList.remove("carrito-activo");
      } else {
          carritoMenu.classList.add("carrito-activo");
      }
  });
});

