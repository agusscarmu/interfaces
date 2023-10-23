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
    setTimeout(mostrarOverlayLight, 3000);
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
    }, 5000);
}

$(document).ready(function () {
    $die = $(".die");
});


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
            let nickname = document.getElementById("nickname");
            let password = document.getElementById("pass");
            let contenido = login.querySelector(".formulario.login");
            let carga = document.querySelector(".loader");
            if(nickname.value === "" || password.value === ""){
                let mensaje = document.querySelector(".msj.error");
                let context = document.querySelector(".contexto-error");
                context.textContent = "Por favor, complete todos los campos.";
                carga.classList.remove("escondido");
                contenido.classList.add("escondido");
                setTimeout(function() {
                    mensaje.classList.remove("escondido");
                    carga.classList.add("escondido");
                }, 800);
                setTimeout(function() {
                    mensaje.classList.add("escondido");
                    contenido.classList.remove("escondido");
                }, 3000);
            }else{
                let mensaje = document.querySelector(".msj.exito");
                carga.classList.remove("escondido");
                contenido.classList.add("escondido");
                setTimeout(function() {
                    mensaje.classList.remove("escondido");
                    carga.classList.add("escondido");
                }, 800);
                setTimeout(function() {
                    mostrarOverlay();
                    setTimeout(changeHTML, 5000);
                }, 1000);
                
            }
        }
    });
});
