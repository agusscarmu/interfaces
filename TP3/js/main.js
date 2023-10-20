let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let cantEnLinea = 2
let totalFichas = (cantEnLinea+2)*(cantEnLinea+3)
let fichas = []
let pilaA = []
let pilaB = []
let tablero = new Tablero(context, cantEnLinea)
let currentPlayer = 1; // Variable para realizar un seguimiento del jugador actual (1 o 2)
let fichaActual = null;

function play() {
    if(fichas.length!=totalFichas){
        if (currentPlayer == 2) {
            addFicha(canvasWidth-25, canvasHeight/2, 20,`rgba(255,0,0,255)`, 2);
            pilaA.pop();
        } else {
            addFicha(25, canvasHeight/2, 20,`rgba(255,255,0,255)`, 1);
            pilaB.pop();
        }
        drawAll();
    }
}

function addFicha(posX, posY, radius, color, team){
    let ficha = new Ficha(posX, posY, radius, color, context, team);
    fichas.push(ficha);
}

function drawAll(gCO = "source-over") {
    clearCanvas();
    tablero.draw();
    context.globalCompositeOperation = gCO;

    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw();
    }

    context.globalCompositeOperation = "source-over";
    for (let i = 0; i < pilaA.length; i++) {
        pilaA[i].draw();
    }
    for (let i = 0; i < pilaB.length; i++) {
        pilaB[i].draw();
    }
    drawEntrada();
}



function crearPila(){
    for (let i = 1; i < (totalFichas/2)+1; i++) {
        fichaPila = new PilaFicha(canvasWidth-50, canvasHeight-(11*i),40,10,`rgba(255,0,0,255)`, context)
        pilaA.push(fichaPila)
    }
    for (let i = 1; i < (totalFichas/2)+1; i++) {
        fichaPila = new PilaFicha(5, canvasHeight-(11*i),40,10,`rgba(255,255,0,255)`, context)
        pilaB.push(fichaPila)
    }
    drawAll();
}
setTimeout(function(){
    crearPila();
    play();
}, 1000)




function clearCanvas() {
    context.globalCompositeOperation = "source-out";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.globalCompositeOperation = "source-over";
}



let isMousePressed = false;
canvas.addEventListener("mousedown", function (event) {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    console.log("X: "+clickX+" | Y: "+clickY);

    fichaActual = fichas[fichas.length-1];
    // Verifica si el clic ocurrió dentro del radio de la ficha
    if (Math.sqrt((fichaActual.posX - clickX) ** 2 + (fichaActual.posY - clickY) ** 2) <= fichaActual.radius) {
        isMousePressed = true;
        // Verifica si es el turno del jugador actual (1 o 2)
        if (fichaActual.team == currentPlayer) {
            drawAll();
        }
    }
});

function drawEntrada(){
    if(fichaActual){
        let i = getEntradaApuntada();
        if (i>=0) {
            tablero.entradaFichas[i].draw();
        }
    }
}
function getEntradaApuntada(){
    if(fichaActual){
        if(fichaActual.posY < tablero.getSuperior()){
            for (let i = 0; i < tablero.entradaFichas.length; i++) {
                if (tablero.entradaFichas[i].getPosX() < fichaActual.posX 
                && tablero.entradaFichas[i].getPosX()+55 > fichaActual.posX) {
                    return i;
                }
            }
        }
    }
}
canvas.addEventListener("mousemove", function (event) {
    if (isMousePressed) {
        fichaActual.posX = event.clientX - canvas.getBoundingClientRect().left;
        fichaActual.posY = event.clientY - canvas.getBoundingClientRect().top;
        drawAll();
    }
});

canvas.addEventListener("mouseup", function (event) {
    if (isMousePressed)  {
        isMousePressed = false;
        if(getEntradaApuntada()>=0
         && tablero.entradaFichas[getEntradaApuntada()].drawable){
            animateFichaFall(); // Inicia la animación de caída
        }
    }
});

function animateFichaFall() {
    const targetY = tablero.getSuperior()+27.5+(55)*filaDisponible(getEntradaApuntada()); // Posición de destino (por ejemplo, el centro del canvas)
    fichaActual.posX = tablero.getLateral()+27.5+(55)*getEntradaApuntada();
    const gravity = 0.8; // Velocidad de la animación
    let index = -5;
    let rebote = 0;
    function animate() {
        drawAll("destination-over");
        if (fichaActual.posY <= targetY && rebote<4) {
            if(fichaActual.posY+(index*gravity)>targetY){
                fichaActual.posY = targetY;
            }else{
                fichaActual.posY += index*gravity;
            }
            index++;
            requestAnimationFrame(animate);
            if(fichaActual.posY==targetY){
                index = index*(-0.4);
                rebote++;
            }
        }else{
            // La ficha ha llegado a su destino
            currentPlayer = currentPlayer === 1 ? 2 : 1; // Cambia el turno
            play(); // Inicia el turno del siguiente jugador
        }
    }
    animate();
    context.globalCompositeOperation = "source-over";
}

function filaDisponible(columna){
    let fila = tablero.filas-1;
    for (let i = tablero.filas-1; i >= 0; i--) {
        const c = tablero.casillas[i][columna];
        if(c.ficha == null){
            c.setFicha(fichaActual);
            if(fila == 0){
                tablero.entradaFichas[columna].drawable = false;
            }
            return fila;
        }else{
            fila--;
        }
    }
    return -1;
}