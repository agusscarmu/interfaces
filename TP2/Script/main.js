"use strict";


const carousel = document.querySelector('.carousel-container-recommended');
const card = document.querySelector('.carousel-container-recommended .carousel-item');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const flechas = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow")
const flechaIzquierda = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .left-arrow")
const flechaDerecha = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .right-arrow")


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
  const maxTranslate2 = carouselWidth2 / 2 - cardWidth2 * 1.2; // Limita el desplazamiento a 0 (posición inicial)
  const minTranslate2 = -carouselWidth2 / 2 + cardWidth2 * 1.2; // Evita que se desplace más allá del último elemento

  if (currentTranslate2 > maxTranslate2) {
    currentTranslate2 = maxTranslate2;
    console.log("maxTranslate2");
    console.log(maxTranslate2);
    console.log("currentTranslate2");
    console.log(currentTranslate2);
    console.log("----------------");

    flechas.classList.add("limiteIzquierdo");
    flechaIzquierda.classList.add("limiteIzquierdo");
  } else if (currentTranslate2 < minTranslate2) {
    currentTranslate2 = minTranslate2;
    flechas.classList.add("limiteDerecho");
    flechaDerecha.classList.add("limiteDerecho");
  } else {

    console.log("currentTranslate2");
    console.log(currentTranslate2);
    console.log("----------------");

    flechas.classList.remove("limiteIzquierdo");
    flechas.classList.remove("limiteDerecho");
    flechaIzquierda.classList.remove("limiteIzquierdo");
    flechaDerecha.classList.remove("limiteDerecho");
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
  var botonCarrito = elemento.querySelector(".botonCarrito");
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
      elemento.classList.add("activado");
      imagenCarrito.src = "./Resources/Tic.png"; // Cambia la fuente de la imagen
    }, 300); // Cambia el texto después de que la animación de rotación haya terminado
  } else {
      textoBoton.classList.add("hidden");
      imagenCarrito.classList.add("hidden");
      elemento.classList.add("active");
      elemento.classList.remove("activado");
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
var carritoButton = document.querySelector(".carrito");
var carritoMenu = document.getElementById("carritoMenu");

// Agregar un evento de clic al icono de usuario para abrir el menú lateral
usuario.addEventListener("click", function () {
    menuLateral.classList.add("menu-activo");
    fondoSemiTransparente.style.display = "block"; // Mostrar el fondo semi-transparente
});

// Agregar un evento de clic al fondo semi-transparente para cerrar el menú lateral
fondoSemiTransparente.addEventListener("click", function () {
    menuLateral.classList.remove("menu-activo");
    fondoSemiTransparente.style.display = "none"; // Ocultar el fondo semi-transparente
});



// CARRITO


document.addEventListener("DOMContentLoaded", function () {
  // Obtener el carrito y el elemento del menú del carrito
  const carrito = {};
  const carritoMenu = document.getElementById("carritoMenu");
  const carritoList = carritoMenu.querySelector("ul");

  // Función para agregar un producto al carrito
  function agregarAlCarrito(productoId, productoImage, productoPrice) {
          carrito[productoId] = {imagen: productoImage , precio: productoPrice};
  }

  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(productoId) {
      delete carrito[productoId];
  }

  // Función para actualizar la interfaz del carrito
  function actualizarCarrito() {
      carritoList.innerHTML = ""; // Limpiar la lista de productos
      var totalPrecio = 0;
      if(Object.keys(carrito).length === 0){
        carritoButton.querySelector("span").textContent = "";
        carritoButton.classList.remove("ampliado");
        carritoButton.querySelector("span").classList.remove("show");
      }else{
        carritoButton.querySelector("span").classList.add("show");
        carritoButton.classList.add("ampliado");
        carritoButton.querySelector("span").textContent = Object.keys(carrito).length; // Actualizar el número de productos en el botón del carrito
      }
      // Agregar productos al menú del carrito
      for (const productoId in carrito) {
          const listItem = document.createElement("li");

          const contenedorImagen = document.createElement("div");
          contenedorImagen.classList.add("contenedorImagenCarrito");
          listItem.appendChild(contenedorImagen);

          const imagen = document.createElement("img");
          imagen.src = carrito[productoId].imagen;
          imagen.classList.add("imagenCarrito");
          
          
          contenedorImagen.appendChild(imagen);

          const contenedorTexto = document.createElement("div");
          contenedorTexto.classList.add("contenedorTextoCarrito");
          listItem.appendChild(contenedorTexto);

          const texto = document.createElement("span");
          texto.classList.add("textoCarrito");
          texto.textContent = `${productoId}`;
          contenedorTexto.appendChild(texto);

          const precio = document.createElement("span");
          precio.classList.add("precioCarrito");
          precio.textContent = `Precio: $${carrito[productoId].precio}`;
          contenedorTexto.appendChild(precio);

          const separador = document.createElement("hr");
          listItem.appendChild(separador);

          carritoList.appendChild(listItem);

          totalPrecio += carrito[productoId].precio;
      }
      const contenedorTotalCarrito = document.createElement("div");
      contenedorTotalCarrito.classList.add("contenedorTotalCarrito");
      carritoList.appendChild(contenedorTotalCarrito);
      contenedorTotalCarrito.classList.remove("hidden");
      const total = document.createElement("li");
      total.classList.add("totalCarrito");
      total.textContent = `Total: $${totalPrecio}`;
      contenedorTotalCarrito.appendChild(total);

      // Si el carrito está vacío, mostrar un mensaje
      if (Object.keys(carrito).length === 0) {
          contenedorTotalCarrito.classList.add("hidden");
          const contenedorMensajeVacio = document.createElement("div");
          contenedorMensajeVacio.classList.add("contenedorMensajeVacio");
          carritoList.appendChild(contenedorMensajeVacio);

          const emptyCartMessage = document.createElement("li");
          emptyCartMessage.textContent = "El carrito está vacío";
          contenedorMensajeVacio.appendChild(emptyCartMessage);
      }
  }

  // Agregar un evento de clic a los botones "Agregar" en los productos
  const botonesAgregar = document.querySelectorAll(".comprar.botonCarrito");
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", function () {

      // Obtener el nombre del artículo
      const nombreProducto = boton.closest(".product").querySelector(".title").innerText.trim();

      // Obtener el precio del artículo
      const precioTexto = boton.closest(".product").querySelector(".price").innerText.trim();
      const precio = parseFloat(precioTexto.replace("$", "").trim());

      // Obtener la imagen del artículo
      const imagenProducto = boton.closest(".product").querySelector(".carousel-image img").src;
      if(boton.closest(".product").querySelector(".textoBotonCarrito").innerText.trim() === "Agregar"){
        agregarAlCarrito(nombreProducto, imagenProducto, precio);
      }
      else{
        eliminarDelCarrito(nombreProducto);
      }
      actualizarCarrito();
    });
});

carritoButton.addEventListener("click", function () {
  // Alternar la visibilidad del menú de carrito
  if (carritoMenu.classList.contains("carrito-activo")) {
      carritoMenu.classList.remove("carrito-activo");
  } else {
      carritoMenu.classList.add("carrito-activo");
      actualizarCarrito();
  }
});
});


