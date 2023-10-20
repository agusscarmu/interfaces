class Ficha extends Figure {
    constructor(posX, posY, radius, fill, context, team) {
        super(posX, posY, fill, context);
        this.team = team;
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = 3;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }
}
