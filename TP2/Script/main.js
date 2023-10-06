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




// Menu lateral usuario

// Obtener elementos del DOM
var usuario = document.querySelectorAll(".usuario");
var menuLateral = document.getElementById("menuLateral");
var fondoSemiTransparente = document.getElementById("fondoSemiTransparente");
var carritoButton = document.querySelector(".carrito");
var carritoButtonMobile = document.querySelector(".mobile-carrito");
var notificacionCarritoMobile = document.querySelector(".notificacion-usuario");
var carritoMenu = document.getElementById("carritoMenu");



// Menu hamburguesa
var burger = document.querySelector(".mobile-navbar-left");
var sidebarMobile = document.querySelector(".sidebar-mobile");

usuario.forEach(function(elemento) {
  elemento.addEventListener("click", function () {
    sidebarMobile.classList.remove("sidebar-mobile-active");
    burger.classList.remove("mobile-navbar-left-active");
    menuLateral.classList.add("menu-activo");
    fondoSemiTransparente.style.display = "block"; // Mostrar el fondo semi-transparente
  });
}
);
// Agregar un evento de clic al fondo semi-transparente para cerrar el menú lateral
fondoSemiTransparente.addEventListener("click", function () {
    menuLateral.classList.remove("menu-activo");
    fondoSemiTransparente.style.display = "none"; // Ocultar el fondo semi-transparente
});

burger.addEventListener("click", function () {
  menuLateral.classList.remove("menu-activo");
  fondoSemiTransparente.style.display = "none"; // Ocultar el fondo semi-transparente
  sidebarMobile.classList.toggle("sidebar-mobile-active");
  burger.classList.toggle("mobile-navbar-left-active");
});

// Ocultar barra de busqueda en mobile 
let prevScrollPosMobile = window.pageYOffset;

window.onscroll = function() {
  const currentScrollPosMobile = window.pageYOffset;
  
  // Verifica si el desplazamiento es hacia arriba
  if (prevScrollPosMobile > currentScrollPosMobile || currentScrollPosMobile < 80) {
    document.querySelector(".mobile-search-navbar").classList.remove("oculto");
  } else {
    document.querySelector(".mobile-search-navbar").classList.add("oculto");
    document.querySelector(".mobile-search-navbar").classList.remove("enfoque");
  }

  prevScrollPosMobile = currentScrollPosMobile;

};

let inputMobile = document.querySelector(".input-buscar-mobile");

inputMobile.addEventListener("click", function() {
  document.querySelector(".mobile-search-navbar").classList.add("enfoque");
}
);

// CARRITO

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
        carritoButtonMobile.querySelector("span").textContent = "";
        notificacionCarritoMobile.classList.add("oculto");
        carritoButtonMobile.classList.remove("ampliado");
        carritoButtonMobile.querySelector("span").classList.remove("show");
        carritoButtonMobile.classList.remove("wElem");
      }else{
        notificacionCarritoMobile.classList.remove("oculto");
        carritoButton.querySelector("span").classList.add("show");
        carritoButton.classList.add("ampliado");
        carritoButton.querySelector("span").textContent = Object.keys(carrito).length; // Actualizar el número de productos en el botón del carrito
        carritoButtonMobile.querySelector("span").classList.add("show");
        carritoButtonMobile.classList.add("ampliado");
        carritoButtonMobile.querySelector("span").textContent = Object.keys(carrito).length;
        carritoButtonMobile.classList.add("wElem");
        notificacionCarritoMobile.textContent = Object.keys(carrito).length;
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


function cambiarContenido() {
  var elementosGratis = document.querySelectorAll(".free");

  elementosGratis.forEach(function(elemento) {
    if (window.innerWidth <= 768) {
      elemento.textContent = "Gratuito";
    } else {
      elemento.textContent = "*Gratis";
    }
  });
}

// Llama a la función cuando se carga la página y cuando se cambia el tamaño de la ventana
window.addEventListener("load", cambiarContenido);
window.addEventListener("resize", cambiarContenido);





// Espera a que se cargue el documento
document.addEventListener("DOMContentLoaded", function() {
  // Selecciona el div generado por reCAPTCHA
  var recaptchaDiv = document.querySelector('div[style="width: 304px; height: 78px;"]');

  // Modifica el tamaño del div
  recaptchaDiv.style.width = '200px'; // Ancho deseado
  recaptchaDiv.style.height = '50px'; // Alto deseado
});

const cerrarSesion = document.getElementById("cerrar-sesion");

cerrarSesion.addEventListener("click", () => {
  window.location.href = "index.html";
});