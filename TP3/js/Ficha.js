class Ficha extends Figure {
    constructor(posX, posY, radius, fill, context, team, image, draweable = true) {
        super(posX, posY, fill, context);
        this.team = team;
        this.radius = radius;
        this.image = image; // Agregar la imagen
        this.draweable = draweable;
    }

    draw() {
        if(context.globalCompositeOperation == "source-over"){
            if(this.draweable){
                this.context.fillStyle = this.getGradient();
            }else{
                this.context.fillStyle = this.fill;
            }
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.strokeStyle = this.borderColor;
            this.context.lineWidth = 1;
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            this.drawGlowingCircle(this.posX, this.posY, this.radius, this.fill, this.getGradient(), this.radius, 5);

            if (this.image) {
                // Dibuja la imagen en el centro de la ficha
                const imageX = this.posX - this.radius + this.radius*0.1; // Calcula la posición X de la imagen
                const imageY = this.posY - this.radius + this.radius*0.1; // Calcula la posición Y de la imagen
                this.context.drawImage(this.image, imageX, imageY, this.radius*1.8, this.radius*1.8);
            }
        }else{
            if (this.image) {
                // Dibuja la imagen en el centro de la ficha
                const imageX = this.posX - this.radius; // Calcula la posición X de la imagen
                const imageY = this.posY - this.radius; // Calcula la posición Y de la imagen
                this.context.drawImage(this.image, imageX, imageY, this.radius*1.8, this.radius*1.8);
            }
            this.context.fillStyle = this.getGradient();
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.strokeStyle = this.borderColor;
            this.context.lineWidth = 1;
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            this.drawGlowingCircle(this.posX, this.posY, this.radius, this.fill, this.fill, this.radius, 5);
        }
    }

    getFill() {
        return this.fill;
    }
    getTeam() {
        return this.team;
    }
    
    getRadius() {
        return this.radius;
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
    
    
    drawGlowingCircle(x, y, radius, glowColor, borderColor, glowIntensity, numSteps) {
        // Define el radio del círculo interior
        const innerRadius = radius - glowIntensity;
    
        for (let i = 0; i < numSteps; i++) {
            const currentBlur = glowIntensity / numSteps * (i + 1);
    
            // Configura el sombreado (brillo) alrededor del círculo
            context.shadowBlur = currentBlur; // Aumenta la intensidad del brillo
            context.shadowColor = glowColor; // Color del brillo
    
            // Dibuja el círculo con borde
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = borderColor; // Color del borde
            context.lineWidth = 2; // Ancho del borde (ajusta según tu preferencia)
            context.stroke();
    
            // Limpia la configuración de sombra para que no afecte a otros elementos
            context.shadowBlur = 0;
            context.shadowColor = 'transparent'; // Puedes cambiarlo al color de fondo del lienzo
    
            // Dibuja el círculo interior
            context.fillStyle = 'transparent'; // Relleno transparente
            context.arc(x, y, innerRadius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
    }
}
