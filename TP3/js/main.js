let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let cantEnLinea = 2
let totalFichas = (cantEnLinea+2)*(cantEnLinea+3)
let fichas = []
let pilaA = []
let pilaB = []
let tablero = new Tablero(context, cantEnLinea, 'rgba(0, 0, 255, 1)')
let currentPlayer = 1; // Variable para realizar un seguimiento del jugador actual (1 o 2)
let fichaActual = null;
let finished = false;

function play() {
    if(!finished){
        if(searchWinner(1)){
            setTimeout(function(){ mostrarMensajeGanador("Gano el jugador 1"); }, 1000);
            finished = true;
        }else if(searchWinner(2)){
            setTimeout(function(){ mostrarMensajeGanador("Gano el jugador 2"); }, 1000);
            finished = true;
        }
        if(fichas.length!=totalFichas){
            if(!finished){
                if (currentPlayer == 2) {
                    addFicha(getPosXInicialFicha(), getPosYInicialFicha(), 20,`rgba(255,0,0,255)`, 2);
                    pilaA.pop();
                } else {
                    addFicha(getPosXInicialFicha(), getPosYInicialFicha(), 20,`rgba(255,255,0,255)`, 1);
                    pilaB.pop();
                }
                drawAll();
            }
        }else{
            console.log("Empate");
            finished = true;
        }
    }
    drawAll();
}
function getPosXInicialFicha(){
    if(currentPlayer == 1){
        return 25;
    }else{
        return canvasWidth-30;
    }
}
function getPosYInicialFicha(){
    if(currentPlayer == 1){
        return canvasHeight-20-pilaB.length*11;
    }else{
        return canvasHeight-20-pilaA.length*11;
    }
}

function searchWinner(team){
    let contador = 0;
    let casilla = null;
    function winVerical(){
        for (let i = 0; i < tablero.columnas; i++) {
            contador = 0;
            for(let j = 0; j < tablero.filas; j++){
                casilla = tablero.casillas[j][i];
                if(casilla.getTeam()!=null){
                    if(casilla.getTeam() == team){
                        contador++;
                        if(contador === cantEnLinea){
                            return true;
                        }
                    }else{
                        contador = 0;
                    }
                }else{
                    contador = 0;
                }
            }
        }
        return false;
    }
    function winHorizontal(){
        for (let i = 0; i < tablero.filas; i++) {
            contador = 0;
            for(let j = 0; j < tablero.columnas; j++){
                casilla = tablero.casillas[i][j];
                if(casilla.getTeam()!=null){
                    if(casilla.getTeam() == team){
                        contador++;
                        if(contador == cantEnLinea){
                            return true;
                        }
                    }else{
                        contador = 0;
                    }
                }else{
                    contador = 0;
                }
            }
        }
        return false;
    }
    function winDiagonal(){
        for (let i = 0; i < tablero.filas; i++) {
            for(let j = 0; j < tablero.columnas; j++){
                if(winDiagonalDerechaAbajo(i, j, 1) || winDiagonalDerechaArriba(i, j, 1)){
                    return true;
                }
            }
        }
        return false;
    }
    function winDiagonalDerechaAbajo(fila, columna, cont){
        if(tablero.casillas[fila][columna].getTeam() == null){
            return false;
        }else if(cont == cantEnLinea){
            tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
            return true;
        }else{
            if(fila+1 < tablero.filas && columna+1 < tablero.columnas
                && tablero.casillas[fila][columna].getTeam() == team){
                    if(winDiagonalDerechaAbajo(fila+1, columna+1, cont+1)){
                        tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    }
                    return winDiagonalDerechaAbajo(fila+1, columna+1, cont+1);
            }else{
                return false;
            }
        }
    }
    function winDiagonalDerechaArriba(fila, columna, cont){
        if(tablero.casillas[fila][columna].getTeam() == null){
            return false;
        }else if(cont == cantEnLinea){
            tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
            return true;
        }else{
            if(fila-1 >= 0 && columna+1 < tablero.columnas
                && tablero.casillas[fila][columna].getTeam() == team){
                    if(winDiagonalDerechaArriba(fila-1, columna+1, cont+1)){
                        tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    }
                return winDiagonalDerechaArriba(fila-1, columna+1, cont+1);
            }else{
                return false;
            }
        }
    }
    if(winHorizontal() || winVerical() || winDiagonal()){
        return true;
    }else{
        return false;
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
crearPila();
play();




function clearCanvas() {
    context.globalCompositeOperation = "source-out";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.globalCompositeOperation = "source-over";
}



let isMousePressed = false;
canvas.addEventListener("mousedown", function (event) {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    fichaActual = fichas[fichas.length-1];
    // Verifica si el clic ocurrió dentro del radio de la ficha
    if (Math.sqrt((fichaActual.posX - clickX) ** 2 + (fichaActual.posY - clickY) ** 2) <= fichaActual.radius && !finished) {
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

canvas.addEventListener("mouseup", function () {
    if (isMousePressed)  {
        if(getEntradaApuntada()>=0
        && tablero.entradaFichas[getEntradaApuntada()].drawable){
            animateFichaFall(); // Inicia la animación de caída
        }else{
            animateRetorno(); // Inicia la animación de retorno
        }
        isMousePressed = false;
    }
});

function animateRetorno() {
    const aux = fichaActual;
    const targetX = getPosXInicialFicha();
    const targetY = getPosYInicialFicha()-fichaActual.radius;
    const gravity = 0.1; // Velocidad de la animación
    let index = 0;
    fichaActual = null;
    function animate() {
        drawAll();
        if (index == 100) {
            aux.posX = targetX;
            aux.posY = targetY;
            fichaActual = aux;
            drawAll();
        } else {
            aux.posX += (targetX-aux.posX) * gravity;
            aux.posY += (targetY-aux.posY) * gravity;
            index++;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

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
// Función para mostrar un mensaje de victoria en el canvas con un borde
function mostrarMensajeGanador(mensaje) {
    // Tamaño y posición del rectángulo
    const rectanguloWidth = canvas.width / 2;
    const rectanguloHeight = canvas.height / 4;
    const rectanguloX = (canvas.width - rectanguloWidth) / 2;
    const rectanguloY = (canvas.height - rectanguloHeight) / 2;

    context.fillStyle = "white"; // Color del fondo del mensaje
    context.fillRect(rectanguloX, rectanguloY, rectanguloWidth, rectanguloHeight);

    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde
    context.strokeRect(rectanguloX, rectanguloY, rectanguloWidth, rectanguloHeight);

    context.fillStyle = "black"; // Color del texto del mensaje
    context.font = "32px Arial";
    context.textAlign = "center";
    context.fillText(mensaje, canvas.width / 2, canvas.height / 2+12);
}

// function filter(color, factor) {
//     const rgba = color.match(/\d+/g); // Extraer los componentes R, G, B y A
//     if (rgba) {
//         const r = rgba[0] * factor;
//         const g = rgba[1] * factor;
//         const b = rgba[2] * factor;
//         const a = rgba[3];
//         return `rgba(${r}, ${g}, ${b}, ${a})`;
//     } else {
//         return color; // Si el color no es válido, devolverlo sin cambios
//     }
// }