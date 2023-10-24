let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height


function iniciarJuego(cantEnLinea, imagen1, imagen2) {
    let totalFichas = (cantEnLinea+2)*(cantEnLinea+3)
    let sizeFicha = 120/cantEnLinea;
    let pilaA = []
    let pilaB = []
    let tablero = new Tablero(context, cantEnLinea, 'rgba(0, 0, 255, 1)', backgroundImage, sizeFicha)
    let currentPlayer = 1; // Variable para realizar un seguimiento del jugador actual (1 o 2)
    let fichaActual =  new Ficha(getPosXInicialFicha(), getPosYInicialFicha(), sizeFicha,`rgba(255,0,0,255)`, context, 2, imagen2);
    let finished = false;
    
    function play() {
        if(!finished){
            if(searchWinner(1)){
                setTimeout(function(){ mostrarMensajeGanador("Gano el jugador 1"); }, 100);
                finished = true;
            }else if(searchWinner(2)){
                setTimeout(function(){ mostrarMensajeGanador("Gano el jugador 2"); }, 100);
                finished = true;
            }
            if(pilaA.length+pilaB.length>0){
                if(!finished){
                    if (currentPlayer == 2) {
                        addFicha(getPosXInicialFicha(), getPosYInicialFicha(), sizeFicha,`rgba(255,0,0,255)`, 2, imagen2);
                        pilaA.pop();
                    } else {
                        addFicha(getPosXInicialFicha(), getPosYInicialFicha(), sizeFicha,`rgba(255,255,0,255)`, 1, imagen1);
                        pilaB.pop();
                    }
                    // Recorro las entradas del tablero
                    for (let i = 0; i < tablero.entradaFichas.length; i++) {
                        // Si la entrada es dibujable
                        tablero.entradaFichas[i].ficha = fichaActual;
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
            return sizeFicha+5;
        }else{
            return canvasWidth-sizeFicha-10;
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
        function winVerical(){
            for (let i = 0; i < tablero.filas-cantEnLinea+1; i++) {
                for(let j = 0; j < tablero.columnas; j++){
                    if(winVerticalFila(i, j, 1)){
                        return true;
                    }
                }
            }
            return false;
        }
        function winVerticalFila(fila, columna, cont){
            if(tablero.casillas[fila][columna].getTeam() == null){
                return false;
            }else if(cont == cantEnLinea){
                if(tablero.casillas[fila][columna].getTeam() == team){
                    tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    return true;
                }else{
                    return false;
                }
            }else{
                if(tablero.casillas[fila][columna].getTeam() == team){
                    if(winVerticalFila(fila+1, columna, cont+1)){
                        tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    }
                    return winVerticalFila(fila+1, columna, cont+1);
                }else{
                    return false;
                }
            }
        }
        function winHorizontal(){
            for (let i = 0; i < tablero.filas; i++) {
                for(let j = 0; j < tablero.columnas-cantEnLinea+1; j++){
                    if(winHorizontalFila(i, j, 1)){
                        return true;
                    }
                }
            }
            return false;
        }
        function winHorizontalFila(fila, columna, cont){
            if(tablero.casillas[fila][columna].getTeam() == null){
                return false;
            }else if(cont == cantEnLinea){
                if(tablero.casillas[fila][columna].getTeam() == team){
                    tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    return true;
                }else{
                    return false;
                }
            }else{
                if(tablero.casillas[fila][columna].getTeam() == team){
                    if(winHorizontalFila(fila, columna+1, cont+1)){
                        tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    }
                    return winHorizontalFila(fila, columna+1, cont+1);
                }else{
                    return false;
                }
            }
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
                if(tablero.casillas[fila][columna].getTeam() == team){
                    tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    return true;
                }else{
                    return false;
                }
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
                if(tablero.casillas[fila][columna].getTeam() == team){
                    tablero.casillas[fila][columna].setColorFicha(`rgba(0,255,0,255)`);
                    return true;
                }else{
                    return false;
                }
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
    
    function addFicha(posX, posY, radius, color, team, image){
        let ficha = new Ficha(posX, posY, radius, color, context, team, image);
        fichaActual = ficha;
    }
    
    function drawAll(gCO = "source-over") {
        clearCanvas();
        tablero.draw();
        context.globalCompositeOperation = gCO;
    
        // for (let i = 0; i < fichas.length; i++) {
        //     fichas[i].draw();
        // }
        fichaActual.draw();
    
        context.globalCompositeOperation = "source-over";
        for (let i = 0; i < pilaA.length; i++) {
            pilaA[i].draw();
        }
        for (let i = 0; i < pilaB.length; i++) {
            pilaB[i].draw();
        }
        drawEntrada();
        drawBackground();
    }
    function drawBackground(){
        context.globalCompositeOperation = "destination-over";
        context.drawImage(piedraFondo, ((canvasWidth-tablero.columnas*sizeFicha*2.75)/2)-15, tablero.getSuperior(), tablero.columnas*sizeFicha*2.75+30, tablero.filas*sizeFicha*2.75);
        context.fillStyle = "rgba(0,0,0,0.2)";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(background2, 0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = "source-over";
    }
    
    
    
    function crearPila(){
        for (let i = 1; i < (totalFichas/2)+1; i++) {
            fichaPila = new PilaFicha(canvasWidth-sizeFicha*2-10, canvasHeight-10-(7*i),sizeFicha*2,15,`rgba(255,0,0,255)`, imagen2, context)
            pilaA.push(fichaPila)
        }
        for (let i = 1; i < (totalFichas/2)+1; i++) {
            fichaPila = new PilaFicha(5, canvasHeight-10-(7*i),sizeFicha*2,15,`rgba(255,255,0,255)`, imagen1, context)
            pilaB.push(fichaPila)
        }
        drawAll();
    }
    
    
    let isMousePressed = false;
    canvas.addEventListener("mousedown", function (event) {
        const clickX = event.clientX - canvas.getBoundingClientRect().left;
        const clickY = event.clientY - canvas.getBoundingClientRect().top;
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
                    && tablero.entradaFichas[i].getPosX()+sizeFicha*2.75 > fichaActual.posX) {
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
        const targetX = getPosXInicialFicha();
        const targetY = getPosYInicialFicha()-fichaActual.radius;
        const gravity = 0.1; // Velocidad de la animación
        let index = 0;
        function animate() {
            drawAll();
            if (index == 100) {
                fichaActual.posX = targetX;
                fichaActual.posY = targetY;
                drawAll();
            } else {
                fichaActual.posX += (targetX-fichaActual.posX) * gravity;
                fichaActual.posY += (targetY-fichaActual.posY) * gravity;
                index++;
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    function animateFichaFall() {
        const entradaApuntada = getEntradaApuntada();
        const fDisponible = filaDisponible(entradaApuntada); // Fila disponible para la ficha
        const targetY = tablero.getSuperior()+sizeFicha*(2.75/2)+(sizeFicha*2.75)*fDisponible; // Posición de destino (por ejemplo, el centro del canvas)
        fichaActual.posX = tablero.getLateral()+sizeFicha*(2.75/2)+(sizeFicha*2.75)*entradaApuntada;
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
                tablero.casillas[fDisponible][entradaApuntada].setFicha(fichaActual);
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
                // c.setFicha(fichaActual);
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
        const rectanguloWidth = canvas.width * 0.6;
        const rectanguloHeight = canvas.height * 0.7;
        const rectanguloX = (canvas.width - rectanguloWidth) / 2;
        const rectanguloY = -300;
        
        // Dibujar el Letrero
        context.drawImage(smoke,0,-260,canvas.width*1.5,canvas.height);
        context.drawImage(letrero, rectanguloX, rectanguloY, rectanguloWidth, rectanguloHeight);
        // Dibujar el texto del mensaje
        context.font = "40px 'MedievalSharp', serif";
        context.fillStyle = "lightyellow";
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.textAlign = "center";
        let x = canvas.width / 2;
        let y = 50;
        context.strokeText(mensaje, x, y);
        context.fillText(mensaje, x, y);
    }
    tablero.draw();
    console.log("tablero dibujado");
    crearPila();
    console.log("pila creada");
    play();
    console.log("play iniciado");
}

// Cargar una imagen de fondo
const backgroundImage = new Image();
backgroundImage.src = "./Juego/images/trono.jpg";
// Cargar imágenes para los botones
const botonEnLinea = new Image();
botonEnLinea.src = "./Juego/images/boton1.png";
// Cargar imágenes para el fondo del juego
const background2 = new Image();
background2.src = "./Juego/images/batalla.jpg";
// Cargar imágenes fondo tablero
const piedraFondo = new Image();
piedraFondo.src = "./Juego/images/piedraFondo.jpg";
// Cargar ficha targaryen
const fichaTargaryen = new Image();
fichaTargaryen.src = "./Juego/images/fichaTargaryen.png";
// Cargar ficha baratheon
const fichaBaratheon = new Image();
fichaBaratheon.src = "./Juego/images/fichaBaratheon.png";
// Cargar ficha stark
const fichaStark = new Image();
fichaStark.src = "./Juego/images/fichaStark.png";
// Cargar ficha greyjoy
const fichaGreyjoy = new Image();
fichaGreyjoy.src = "./Juego/images/fichaGreyjoy.png";
// Cargar letrero
const letrero = new Image();
letrero.src = "./Juego/images/Letrero.png";
// Cargar smoke
const smoke = new Image();
smoke.src = "./Juego/images/smoke.png";


function CargarImagenes() {    
    let contador = 0;
    let listenerEnabled = true;
    let listenerEnabledSelector = false;
    let modoJuego = 0;
    // Función para mostrar las instrucciones y los botones en el canvas
    function mostrarInstrucciones() {
        contador++;
        if(contador==10){
            mostrarMenu();
        }
    }   
    function mostrarMenu() {
        listenerEnabledSelector = false;
        context.drawImage(backgroundImage, -15, 0, canvas.width+15, canvas.height);
        // Título e instrucciones
        context.font = "45px 'MedievalSharp', serif";
        context.fillStyle = "lightyellow";
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.textAlign = "center";
        let texto = "¡Bienvenido al juego!";
        let x = canvas.width / 2;
        let y = 80;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y); 

        context.font = "25px 'MedievalSharp', serif";
        context.fillStyle = "lightyellow";
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.textAlign = "center";
        texto = "Selecciona la cantidad de fichas en línea:";
        x = canvas.width / 2;
        y = 200;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);
        // Dibuja los botones con imágenes
        y = 240;
        context.drawImage(botonEnLinea, 100, y, 200, 100);
        context.drawImage(botonEnLinea, 300, y, 200, 100);
        context.drawImage(botonEnLinea, 500, y, 200, 100);
        texto = "4 en línea";
        y = 299;
        x = 200;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);
        texto = "5 en línea";
        x = 400;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);
        texto = "6 en línea";
        x = 600;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);


        y=240;
        // Event listeners para los botones
        canvas.addEventListener("click", function (event) {
            if(listenerEnabled){
                const clickX = event.clientX - canvas.getBoundingClientRect().left;
                const clickY = event.clientY - canvas.getBoundingClientRect().top;
                if (clickX >= 100 && clickX <= 300 && clickY >= y && clickY <= y+100) {
                    console.log("4 en línea "+y)
                    modoJuego = 4;
                    mostrarSeleccionBandos(); // Iniciar juego de 4 en línea
                } else if (clickX >= 300 && clickX <= 500 && clickY >= y && clickY <= y+100) {
                    modoJuego = 5;
                    mostrarSeleccionBandos(); // Iniciar juego de 5 en línea
                } else if (clickX >= 500 && clickX <= 700 && clickY >= y && clickY <= y+100) {
                    modoJuego = 6;
                    mostrarSeleccionBandos(); // Iniciar juego de 6 en línea
                }
            }
        });
    }
    let ficha1 = null;
    let ficha2 = null;
    bando1 = []; 
    bando2 = []; 
    function mostrarSeleccionBandos() {
        listenerEnabled = false;
        listenerEnabledSelector = true;
        ficha1 = null;
        ficha2 = null;
        bando1 = [];
        bando2 = [];
        // Arreglo de bandos
        console.log("Cargando bandos");
        // Dibuja para bando 1
        let y = 250;
        let size = 80;
        let radius = size/2;
        let color = `rgba(0,0,0,255)`;
        let image = fichaTargaryen;
        let f1 = new Ficha(150, y, radius, color, context, 1, image);
        bando1.push(f1);
        image = fichaBaratheon;
        let f2 = new Ficha(250, y, radius, color, context, 1, image);
        bando1.push(f2);
        image = fichaStark;
        y += 100;
        let f3 = new Ficha(150, y, radius, color, context, 1, image);
        bando1.push(f3);
        image = fichaGreyjoy;
        let f4 = new Ficha(250, y, radius, color, context, 1, image);
        bando1.push(f4);
        // Dibuja para bando 2
        y -= 100;
        image = fichaTargaryen;
        let f5 = new Ficha(canvasWidth-250, y, radius, color, context, 1, image);
        bando2.push(f5);
        image = fichaBaratheon;
        let f6 = new Ficha(canvasWidth-150, y, radius, color, context, 1, image);
        bando2.push(f6);
        image = fichaStark;
        y += 100;
        let f7 = new Ficha(canvasWidth-250, y, radius, color, context, 1, image);
        bando2.push(f7);
        image = fichaGreyjoy;
        let f8 = new Ficha(canvasWidth-150, y, radius, color, context, 1, image);
        bando2.push(f8);
        mostrarBandos();
    }
    function mostrarBandos() {
        clearCanvas();
        context.drawImage(backgroundImage, -15, 0, canvas.width+15, canvas.height);
        // Título e instrucciones
        context.font = "45px 'MedievalSharp', serif";
        context.fillStyle = "lightyellow";
        let x = canvas.width / 2;
        let y = 80;
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.textAlign = "center";
        let texto = "¡Bienvenido al juego!";
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y); 

        context.font = "25px 'MedievalSharp', serif";
        texto = "Selecciona el bando:";
        y = 170;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);
        
        texto = "VS";
        y = 300;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);

        
        texto = "volver";
        x = 60;
        y = canvasHeight - 30;
        context.strokeText(texto, x, y);
        context.fillText(texto, x, y);

        // Dibuja los botones con imágenes
        bando1.forEach(function (ficha) {
            ficha.draw();
        });
        bando2.forEach(function (ficha) {
            ficha.draw();
        });

        // Checkea si existe ficha1 y ficha2
        if(ficha1 != null && ficha2 != null){
            context.drawImage(botonEnLinea, 300, 400, 200, 100);
            context.font = "25px 'MedievalSharp', serif";
            context.fillStyle = "lightyellow";
            context.strokeStyle = "black";
            texto = "Iniciar juego";
            x = 400;
            y = 460;
            context.strokeText(texto, x, y);
            context.fillText(texto, x, y);
        }
    }
    canvas.addEventListener("click", function (event) {
        if(listenerEnabledSelector){
            const clickX = event.clientX - canvas.getBoundingClientRect().left;
            const clickY = event.clientY - canvas.getBoundingClientRect().top;
            if (clickX <= 150 && clickY >= canvasHeight - 100) {
                // Volver
                listenerEnabledSelector = false;
                listenerEnabled = true;
                mostrarMenu();
            }else if (clickX >= 300 && clickX <= 500 && clickY >= 400 && clickY <= 500) {
                if(ficha1 != null && ficha2 != null){
                    // Iniciar juego
                    listenerEnabledSelector = false;
                    iniciarJuego(modoJuego, ficha1.image, ficha2.image);
                }
            }else{
                for (let i = 0; i < bando1.length; i++) {
                    const ficha = bando1[i];
                    if (ficha.draweable && Math.sqrt((ficha.posX - clickX) ** 2 + (ficha.posY - clickY) ** 2) <= ficha.radius) {
                        if(ficha2 != null && ficha.image == ficha2.image){
                            
                        }else{
                            for (let j = 0; j < bando1.length; j++) {
                                if (j != i) {
                                    bando1[j].fill = "rgba(0,0,0,255)";
                                    bando2[j].draweable = true;
                                }else{
                                    bando1[j].fill = "rgba(255,255,0,255)";
                                    ficha1 = bando1[j];
                                    bando2[j].draweable = false;
                                }      
                            }
                        }
                    }
                }
                for (let i = 0; i < bando2.length; i++) {
                    const ficha = bando2[i];
                    if (ficha.draweable && Math.sqrt((ficha.posX - clickX) ** 2 + (ficha.posY - clickY) ** 2) <= ficha.radius) {
                        if(ficha1 != null && ficha.image == ficha1.image){
                            
                        }else{
                            for (let j = 0; j < bando2.length; j++) {
                                if (j != i) {
                                    bando2[j].fill = "rgba(0,0,0,255)";
                                    bando1[j].draweable = true;
                                }else{
                                    bando2[j].fill = "rgba(255,0,0,255)";
                                    ficha2 = bando2[j];
                                    bando1[j].draweable = false;
                                }               
                            }
                        }    
                    }
                }
                mostrarBandos();
            }
        }
    });
    backgroundImage.onload = function () {
        mostrarInstrucciones();
    };
    botonEnLinea.onload = function () {
        mostrarInstrucciones();
    };
    background2.onload = function () {
        mostrarInstrucciones();
    }
    piedraFondo.onload = function () {
        mostrarInstrucciones();
    }
    fichaTargaryen.onload = function () {
        mostrarInstrucciones();
    }
    fichaBaratheon.onload = function () {
        mostrarInstrucciones();
    }
    letrero.onload = function () {
        mostrarInstrucciones();
    }
    smoke.onload = function () {
        mostrarInstrucciones();
    }
    fichaStark.onload = function () {
        mostrarInstrucciones();
    }
    fichaGreyjoy.onload = function () {
        mostrarInstrucciones();
    }
}
function clearCanvas() {
    context.globalCompositeOperation = "source-out";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.globalCompositeOperation = "source-over";
}
CargarImagenes();