"use strict";

const textarea = document.querySelector('textarea[name="comentario"]');
const divContenedor = document.querySelector('.comentar');
const boton = document.querySelector('.boton-comentar');


textarea.addEventListener("input", function() {
    boton.classList.add("activado");
    if(textarea.value === "") {
        boton.classList.remove("activado");
    }
});

textarea.addEventListener("focus", function() {
    divContenedor.classList.add("activado");
}
);

textarea.addEventListener("blur", function() {
    divContenedor.classList.remove("activado");
});

"use strict";

let container = document.querySelector("#mg-container");
let mg = container.querySelector(".mg");


container.addEventListener("click", function(e){
    if(mg){
        mg.classList.add('mg-click');
    }
    mg.addEventListener("animationend", function(e){
        if(mg){
            mg.classList.remove('mg-click');
        }
    }
    );
});