var Particle = {
    onInit: function (parameters) {
        this.particleAcc = 0;
        this.x = parameters.x + (Math.random() * 2);
        this.y = parameters.y + (Math.random() * 2);
        this.speed = (Math.random() * 2) + 1;
        this.angle = Math.atan2((Math.random() * 480) - parameters.y, 
                                (Math.random() * 640) - parameters.x);
        this.gama = 1;
        this.gamaAcc = 0;
        this.particleColor = parameters.particleColor || { r: 100, g: 100, b: 100 };
    },
    onUpdate: function (delta) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        this.gamaAcc += delta;
        if (this.gamaAcc > 0.1) {
            this.gamaAcc = 0;
            this.gama -= 0.2;
            this.gama = Math.max(0, this.gama);
        }
        
        this.particleAcc += delta;
        if (this.particleAcc > 0.5) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(' + this.particleColor.r + ', ' + this.particleColor.g + ', ' + this.particleColor.b + ',' + this.gama + ')';
        context.fill();
        context.closePath();
    }
};