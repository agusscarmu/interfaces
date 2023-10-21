class PilaFicha extends Figure {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
        this.grosor = this.height*0.6;
    }

    draw() {
        const lineWidth = 1
        this.context.strokeStyle = "black"; // Establece el color del borde
        this.context.lineWidth = lineWidth; // Define el ancho del borde (ajusta según tu preferencia)
        
        // Gradiente para el efecto metálico
        const gradient = context.createLinearGradient(this.posX, this.posY, this.posX + this.width, this.posY + this.height);
        gradient.addColorStop(0, "rgba(192, 192, 192, 1)"); // Color más claro en la parte superior
        gradient.addColorStop(0.5, "rgba(128, 128, 128, 1)"); // Color medio en el centro
        gradient.addColorStop(1, "rgba(192, 192, 192, 1)"); // Color más claro en la parte inferior

        // Dibuja una elipse
        context.fillStyle = gradient;
        this.context.beginPath();
        this.context.ellipse(this.posX + this.width / 2, this.posY + this.grosor, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        this.context.fill();
        this.context.stroke();
        
        // Dibuja un rectangulothis.
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, this.width, this.grosor);
        this.context.fill();
        this.context.strokeRect(this.posX, this.posY, lineWidth/3, this.grosor*1.08);
        this.context.strokeRect(this.posX + this.width - lineWidth/4, this.posY, lineWidth/3, this.grosor*1.08);
        
        // Dibuja una elipse
        this.context.fillStyle = this.fill; // Establece el color de relleno
        this.context.beginPath();
        this.context.ellipse(this.posX + this.width / 2, this.posY, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        this.context.fill();
        this.context.stroke();
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
