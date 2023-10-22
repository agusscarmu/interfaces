class Tablero {
    constructor(context, cantFichas, fill, image){
        this.fill = fill;
        this.image = image;
        this.context = context;
        this.filas = cantFichas+2;
        this.columnas = cantFichas+3;
        this.casillas = [];
        for (let i = 0; i < this.filas; i++) {
            this.casillas[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.casillas[i][j] = new Casilla((j*55)+((canvasWidth-this.columnas*55)/2), (i*55)+this.getSuperior(), 55, context);
            }
        }
        this.entradaFichas = [];
        for(let i=0; i<this.columnas; i++){
            this.entradaFichas[i] = new Casilla((i*55)+((canvasWidth-this.columnas*55)/2),this.getSuperior()-55,55,context, "rgba(0, 0, 255, 0)");
        }
        this.draw();
    }

    getSuperior(){
        return canvasHeight-30-this.filas*55;
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
        this.context.fillRect(((canvasWidth-this.columnas*55)/2)-15, this.getSuperior(), this.columnas*55+30, this.filas*55);
        this.context.globalCompositeOperation = "source-in";
        let zoom = 1.6;
        this.context.drawImage(this.image, ((canvasWidth-this.columnas*55)/2)-210, this.getSuperior()-130, (this.columnas*55+100)*zoom, (this.filas*55)*zoom);
        this.context.strokeStyle = this.getGradient();
        this.context.lineWidth = 5;
        this.context.globalCompositeOperation = "source-over";
        this.context.strokeRect(((canvasWidth-this.columnas*55)/2)-15, this.getSuperior(), this.columnas*55+30, this.filas*55);
    }

    getGradient(){
        // Gradiente para el efecto metálico
        const gradient = context.createLinearGradient(((canvasWidth-this.columnas*55)/2)-15, this.getSuperior(), this.columnas*55+30, this.filas*55);
        gradient.addColorStop(0, "rgba(92, 92, 92, 1)"); // Color más claro en la parte superior
        gradient.addColorStop(0.5, "rgba(128, 128, 128, 1)"); // Color medio en el centro
        gradient.addColorStop(1, "rgba(92, 92, 90, 1)"); // Color más claro en la parte inferior
        return gradient;
    }
}