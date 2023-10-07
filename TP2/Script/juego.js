"use strict";

const textarea = document.querySelector('textarea[name="comentario"]');
const divContenedor = document.querySelector('.comentar');
const boton = document.querySelector('.boton-comentar');
const comentariosZona = document.querySelector('.comentario-zone');
const comm = document.querySelector(".comentarios");

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

boton.addEventListener("click", function() {
    if(textarea.value !== "") {
        let div = document.createElement("div");
        div.classList.add("mi-comentario");

        let div2 = document.createElement("div");
        div2.classList.add("usuario-comentario");
        div.appendChild(div2);

        let img = document.createElement("img");
        img.src = "./Resources/9a76c051333d3e47fdc6aa00a7883865.png";
        div2.appendChild(img);

        let div3 = document.createElement("div");
        div3.classList.add("contenido-comentario");
        div.appendChild(div3);

        let h4 = document.createElement("h4");
        h4.innerHTML = "Usuario";
        div3.appendChild(h4);

        let p = document.createElement("p");
        p.innerHTML = textarea.value;
        div3.appendChild(p);

        let div4 = document.createElement("div");
        div4.classList.add("valoracion");
        div.appendChild(div4);

        let div5 = document.createElement("div");
        div5.classList.add('cont')
        div5.classList.add("mg-container");
        div4.appendChild(div5);

        let imgMg = document.createElement("img");
        imgMg.src = "./Resources/megusta.png";
        imgMg.classList.add("mg");
        div5.appendChild(imgMg);

        let div6 = document.createElement("div");
        div6.classList.add('contador')
        div6.innerHTML = "0";
        
        div4.appendChild(div6);

        let div7 = document.createElement("div");
        div7.classList.add('cont')
        div7.classList.add("no-mg-container");
        div4.appendChild(div7);

        let imgNoMg = document.createElement("img");
        imgNoMg.src = "./Resources/nomegusta.png";
        imgNoMg.classList.add("nomg");
        div7.appendChild(imgNoMg);

        comentariosZona.appendChild(div);
        textarea.value = "";
        boton.classList.remove("activado");
        
        
        comm.classList.add("activado");
        setTimeout(function() {
            div.classList.add("show");
        }, 600);
        setTimeout(function() {
            comm.classList.remove("activado");
          }, 900);
    }
});



let containers = document.querySelectorAll(".mg-container");

containers.forEach(function(container) {
    container.addEventListener("click", function(e){
        let mg = container.querySelector(".mg");
        if(!container.classList.contains('activado')){
            if(mg){
                mg.classList.add('mg-click');
                container.classList.add('activado')
                mg.classList.add('activado')
            }
            
            mg.addEventListener("animationend", function(e){
                if(mg){
                    mg.classList.remove('mg-click');
                }
            });

            // Accede al elemento contador
            let contador = container.parentNode.querySelector(".contador");
            let opuesto = container.parentNode.querySelector(".no-mg-container");
            let mgopuesto = container.parentNode.querySelector(".nomg");
            if(mgopuesto){
                mgopuesto.classList.remove('activado');
            }
            opuesto.classList.remove('activado');
            contador.innerHTML = parseInt(contador.innerHTML) + 1;
        }
    });
});

containers = document.querySelectorAll(".no-mg-container");

containers.forEach(function(container) {
    container.addEventListener("click", function(e){
        let mg = container.querySelector(".nomg");
        
        if(!container.classList.contains('activado')){

            if(mg){
                mg.classList.add('mg-click');
                container.classList.add('activado')
                mg.classList.add('activado')
            }
            
            mg.addEventListener("animationend", function(e){
                if(mg){
                    mg.classList.remove('mg-click');
                }
            });

            // Accede al elemento contador
            let contador = container.parentNode.querySelector(".contador");
            let opuesto = container.parentNode.querySelector(".mg-container");
            let mgopuesto = container.parentNode.querySelector(".mg");
            if(mgopuesto){
                mgopuesto.classList.remove('activado');
            }
            opuesto.classList.remove('activado');
            contador.innerHTML = parseInt(contador.innerHTML) - 1;
        }
    });
});

