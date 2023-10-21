class PilaFicha extends Figure {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        this.context.fillStyle = this.fill; // Establece el color de relleno
        this.context.strokeStyle = this.borderColor; // Establece el color del borde
        this.context.lineWidth = 2; // Define el ancho del borde (ajusta según tu preferencia)
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        this.context.strokeRect(this.posX, this.posY, this.width, this.height); // Dibuja el borde del rectángulo
    }
    
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
