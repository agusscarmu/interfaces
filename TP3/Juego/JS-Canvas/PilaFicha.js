class PilaFicha extends Figure {
    constructor(posX, posY, width, height, color, image, context) {
        super(posX, posY, color, context);
        this.image = image;
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
        this.context.fillStyle = this.getGradient(); // Establece el color de relleno
        this.context.beginPath();
        this.context.ellipse(this.posX + this.width / 2, this.posY, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        this.context.fill();
        this.context.stroke();
   
        // Dibuja una imagen.
        this.context.drawImage(this.image, this.posX, this.posY-this.height/2, this.width, this.height);
        
    }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

     
    getGradient() {
        let mezclado = this.mezclarColores(
            this.extraerComponentesRGBA(this.fill), [255, 255, 255, 1], 0.75);
        // Gradiente para el efecto metálico
        const g = this.context.createLinearGradient(this.posX, this.posY, this.posX + this.width/2, this.posY + this.height/2);
        g.addColorStop(0, "rgba(120, 120, 120, 1)");
        g.addColorStop(0.2, this.mezclarColores(this.extraerComponentesRGBA(mezclado), [120, 120, 120, 1], 0.5));
        g.addColorStop(0.5, mezclado); 
        g.addColorStop(0.8, this.mezclarColores(this.extraerComponentesRGBA(mezclado), [120, 120, 120, 1], 0.5));
        g.addColorStop(1, "rgba(120, 120, 120, 1)");
        return g;
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
