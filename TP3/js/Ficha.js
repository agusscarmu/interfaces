class Ficha extends Figure {
    constructor(posX, posY, radius, fill, context, team, image) {
        super(posX, posY, fill, context);
        this.team = team;
        this.radius = radius;
        this.image = image; // Agregar la imagen
    }

    draw() {
        this.context.fillStyle = this.getGradient();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = 1;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();

        if (this.image) {
            // Dibuja la imagen en el centro de la ficha
            const imageX = this.posX - this.radius; // Calcula la posición X de la imagen
            const imageY = this.posY - this.radius; // Calcula la posición Y de la imagen
            this.context.drawImage(this.image, imageX, imageY, this.radius*2, this.radius*2);
        }
    }

    getTeam() {
        return this.team;
    }

    getGradient() {
        let mezclado = this.mezclarColores(
            this.extraerComponentesRGBA(this.fill), [255, 255, 255, 1], 0.75);
        // Gradiente para el efecto metálico
        const gradient = this.context.createLinearGradient(this.posX-this.radius/2, this.posY-this.radius/2, this.posX + this.radius/2, this.posY + this.radius/2);
        gradient.addColorStop(0, "rgba(120, 120, 120, 1)");
        gradient.addColorStop(0.2, this.mezclarColores(this.extraerComponentesRGBA(mezclado), [120, 120, 120, 1], 0.5));
        gradient.addColorStop(0.5, mezclado); 
        gradient.addColorStop(0.8, this.mezclarColores(this.extraerComponentesRGBA(mezclado), [120, 120, 120, 1], 0.5));
        gradient.addColorStop(1, "rgba(120, 120, 120, 1)");
        return gradient;
    }
    
    getRadius() {
        return this.radius;
    }
    mezclarColores(color1, color2, proporcion) {
        // Extraer los componentes de color RGBA de cada color
        const r1 = color1[0];
        const g1 = color1[1];
        const b1 = color1[2];
        const a1 = color1[3];
        
        const r2 = color2[0];
        const g2 = color2[1];
        const b2 = color2[2];
        const a2 = color2[3];
    
        // Calcular los nuevos componentes mezclados
        const rM = r1 * (1 - proporcion) + r2 * proporcion;
        const gM = g1 * (1 - proporcion) + g2 * proporcion;
        const bM = b1 * (1 - proporcion) + b2 * proporcion;
        const aM = a1 * (1 - proporcion) + a2 * proporcion;
    
        // Devolver el nuevo color mezclado en formato RGBA
        return `rgba(${Math.round(rM)}, ${Math.round(gM)}, ${Math.round(bM)}, ${aM})`;
    }
    extraerComponentesRGBA(colorRGBA) {
        // Utilizamos una expresión regular para extraer los valores de r, g, b y a
        const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
        const coincidencia = colorRGBA.match(regex);
    
        if (coincidencia) {
            const r = parseInt(coincidencia[1]);
            const g = parseInt(coincidencia[2]);
            const b = parseInt(coincidencia[3]);
            const a = parseFloat(coincidencia[4]);
            return [r, g, b, a];
        } else {
            // Si no se encuentra un formato válido, devolvemos null o manejamos el error según sea necesario
            return null;
        }
    }
    
    
    
}
