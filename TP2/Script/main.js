"use strict";

const flechas = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow")
const flechaIzquierda = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .left-arrow")
const flechaDerecha = document.querySelector(".contenidoEnteroCarouselPrincipal .carousel-arrow .right-arrow")


function initializeCarousel(carouselSelector, cardSelector, auxTraslate1, auxTraslate2) {
  const carousel = document.querySelector(carouselSelector);
  const card = document.querySelector(cardSelector);
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
    const maxTranslate = auxTraslate1 * (carouselWidth - cardWidth); // Limita el desplazamiento a 0 (posición inicial)
    const minTranslate = auxTraslate2 * (carouselWidth - cardWidth); // Evita que se desplace más allá del último elemento
  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
    flechas.classList.add("limiteIzquierdo");
    flechaIzquierda.classList.add("limiteIzquierdo");
  } else if (currentTranslate < minTranslate) {
    currentTranslate = minTranslate;
    flechas.classList.add("limiteDerecho");
    flechaDerecha.classList.add("limiteDerecho");
  } else {
    flechas.classList.remove("limiteIzquierdo");
    flechas.classList.remove("limiteDerecho");
    flechaIzquierda.classList.remove("limiteIzquierdo");
    flechaDerecha.classList.remove("limiteDerecho");
  }
    updateCarouselPosition();
  }
}

// Llamar a la función para inicializar ambos carruseles
initializeCarousel('.carousel-container-recommended', '.carousel-container-recommended .carousel-item', 0, (-0.35));
initializeCarousel('.carousel-container-adventure', '.carousel-container-adventure .carousel-item', 0, (-0.35));
initializeCarousel('.carousel-main-container', '.carousel-main-container .carousel-item', 0.4, -0.4);




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


