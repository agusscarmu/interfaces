"use strict";

const registrarse = document.getElementById("registrarse");
const tengoCuenta = document.getElementById("tengo-cuenta");
const registro = document.querySelector(".formulario.registro");
const login = document.querySelector(".formulario.login");
let $die; // Declarar $die en el alcance global
let timeoutId; // Declarar timeoutId en el alcance global

registrarse.addEventListener("click", () => {
    registro.classList.remove("hidden");
    login.classList.add("hidden");
});

tengoCuenta.addEventListener("click", () => {
    registro.classList.add("hidden");
    login.classList.remove("hidden");
});

const overlay = document.getElementById("overlay");
const overlayLight = document.getElementById("overlay-light");

function mostrarOverlay() {
    overlay.style.display = "block";
    setTimeout(overlay.classList.add("visible"), 1000);
    setTimeout(mostrarOverlayLight, 4000);
    setTimeout(startAnimation, 300);
}
function mostrarOverlayLight() {
    overlayLight.style.display = "block";
    overlayLight.classList.add("on");
 }

function changeHTML() {
    window.location.href = "menuPrincipal.html";
}

function startAnimation() {
    $die.addClass("rolling");
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
        $die.removeClass("rolling");
    }, 7000);
}

$(document).ready(function () {
    $die = $(".die");
});

// const iniciar = document.querySelectorAll(".button");

// iniciar.forEach((button) => {
//     button.addEventListener("click", () => {
//         mostrarOverlay();
//         setTimeout(changeHTML, 7000);
//     });
// });


const form = document.querySelectorAll(".formulario");

form.forEach((formulario) => {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if(formulario.classList.contains("registro")){
            registro.classList.add("hidden");
            login.classList.remove("hidden");
            let mensaje = document.querySelector(".contenido-login .mensaje");
            mensaje.classList.remove("hidden");
            setTimeout(function() {
                mensaje.classList.add("hidden");
            }, 3000);
        }else{
            mostrarOverlay();
            setTimeout(changeHTML, 7000);
        }
    });
});
