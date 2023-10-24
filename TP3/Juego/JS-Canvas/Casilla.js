class Casilla extends Figure {
    constructor(posX, posY, sideLength, context, sizeFicha, color = 'rgba(0, 0, 255, 1)') {
        super(posX, posY, color, context);
        this.sizeFicha = sizeFicha;
        this.sideLength = sideLength;
        this.ficha = null;
        this.drawable = true;
    }

    draw() {
        if(this.drawable){
            // Dibuja un círculo en el centro
            const centerX = this.posX + this.sideLength / 2;
            const centerY = this.posY + this.sideLength / 2;
            if(this.ficha){
                this.context.strokeStyle = this.ficha.draw();
            }else{
                this.context.fillStyle = this.darkness(this.fill, 0.5);
            }
            this.context.lineWidth = 2; // Ancho del contorno
            this.context.beginPath();
            this.context.arc(centerX, centerY, this.sizeFicha, 0, Math.PI * 2);
            this.context.fill();
            this.context.stroke();
        }
    }
    setColorFicha(color){
        if(this.ficha){
            this.ficha.fill = color;
        }
    }
    getColorFicha(){
        if(this.ficha){
            return this.ficha.fill;
        }else{
            return null;
        }
    }
    getTeam(){
        if(this.ficha){
            return this.ficha.getTeam();
        }else{
            return null;
        }
    }
    setFicha(ficha){
        this.ficha = ficha;
    }
    darkness(color, factor) {
        const rgba = color.match(/\d+/g); // Extraer los componentes R, G, B y A
        if (rgba) {
            const r = rgba[0] * factor;
            const g = rgba[1] * factor;
            const b = rgba[2] * factor;
            const a = rgba[3];
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
            return color; // Si el color no es válido, devolverlo sin cambios
        }
    }
    getX(){
        return this.posX;
    }
    getY(){
        return this.posY;
    }
}
