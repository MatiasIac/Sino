var Enemy = {
    onInit: function (parameters) {
        this.position = parameters.position;
        this.size = parameters.size;
        this.speed = parameters.speed || - Curve.waveSpeed * Curve.unit;
    },
    onUpdate: function (delta) {
        this.position.x += this.speed;
        if (this.position.x + this.size.width < 0) {
            this.destroy();
        }
    },
    onDraw: function (ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
};
