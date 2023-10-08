"use strict";

// Menu lateral usuario

// Obtener elementos del DOM
var usuario = document.querySelectorAll(".usuario");
var menuLateral = document.getElementById("menuLateral");
var fondoSemiTransparente = document.getElementById("fondoSemiTransparente");
var carritoButton = document.querySelector(".carrito");
var carritoButtonMobile = document.querySelector(".mobile-carrito");
var notificacionCarritoMobile = document.querySelector(".notificacion-usuario");
var carritoMenu = document.getElementById("carritoMenu");
const logos = document.querySelectorAll(".logo");
const inputBuscarJuego = document.querySelector(".input-buscar-juego");

inputBuscarJuego.addEventListener("input", function() {
    let botonBuscar = document.querySelector(".botonBuscar");
    if(inputBuscarJuego.value === "") {
        botonBuscar.classList.remove("activado");
    } else {
        botonBuscar.classList.add("activado");
    }
}
);

inputBuscarJuego.addEventListener("focus", function() {
    inputBuscarJuego.classList.add("activado");
    }
);

inputBuscarJuego.addEventListener("blur", function() {
    inputBuscarJuego.classList.remove("activado");
    }
);

logos.forEach(function(logo) {
logo.addEventListener("click", () => {
    window.location.href = "menuPrincipal.html";
});

logo.addEventListener("mouseenter", () => {
    const reflejo = logo.querySelector(".logo .reflejo");
    const logoImg = logo.querySelector("img");
    logoImg.classList.add("activado");
    logo.classList.add("activado");
    reflejo.classList.add("activado");
});

logo.addEventListener("mouseleave", () => {
    const reflejo = logo.querySelector(".reflejo");
    const logoImg = logo.querySelector("img");
    logoImg.classList.remove("activado");
    logo.classList.remove("activado");
    reflejo.classList.remove("activado");
});
});
// Menu hamburguesa
var burger = document.querySelector(".mobile-navbar-left");
var sidebarMobile = document.querySelector(".sidebar-mobile");

usuario.forEach(function(elemento) {
  elemento.addEventListener("click", function () {
    sidebarMobile.classList.remove("sidebar-mobile-active");
    carritoMenu.classList.remove("carrito-activo");
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


const cerrarSesion = document.getElementById("cerrar-sesion");

cerrarSesion.addEventListener("click", () => {
  window.location.href = "index.html";
});