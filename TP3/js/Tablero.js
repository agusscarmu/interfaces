class Tablero {
    constructor(context, cantFichas, fill){
        this.fill = fill;
        this.context = context;
        this.filas = cantFichas+2;
        this.columnas = cantFichas+3;
        this.casillas = [];
        for (let i = 0; i < this.filas; i++) {
            this.casillas[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.casillas[i][j] = new Casilla((j*55)+((canvasWidth-this.columnas*55)/2), (i*55)+(canvasHeight-this.filas*55), 55, context);
            }
        }
        this.entradaFichas = [];
        for(let i=0; i<this.columnas; i++){
            this.entradaFichas[i] = new Casilla((i*55)+((canvasWidth-this.columnas*55)/2),this.getSuperior()-55,55,context, "rgba(0, 0, 255, 0)");
        }
        this.draw();
    }

    getSuperior(){
        return canvasHeight-this.filas*55;
    }
    getLateral(){
        return (canvasWidth-this.columnas*55)/2;
    }

    draw() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                this.casillas[i][j].draw();
            }
        }
        this.context.globalCompositeOperation = "source-out";
        this.context.fillStyle = this.fill;
        this.context.fillRect((canvasWidth-this.columnas*55)/2, this.getSuperior(), this.columnas*55, this.filas*55);
    }
}