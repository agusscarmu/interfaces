"use strict";

const registrarse = document.getElementById("registrarse");
const tengoCuenta = document.getElementById("tengo-cuenta");
const registro = document.querySelector(".formulario.registro");
const login = document.querySelector(".formulario.login");

registrarse.addEventListener("click", () => {
    registro.classList.remove("hidden");
    login.classList.add("hidden");
    }
);
tengoCuenta.addEventListener("click", () => {
    registro.classList.add("hidden");
    login.classList.remove("hidden");
    }
);

const iniciar = document.querySelectorAll(".button");

iniciar.forEach((button) => {
    button.addEventListener("click", () => {
        window.location.href = "menuPrincipal.html";
    });
}
);
