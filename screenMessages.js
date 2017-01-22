var ScreenMessages = { 
    id: 'screenMessages',
    visible: false,
    message: "",
    color: "white",
    init: function () {
    },
    setMessage: function (msg, c) {
        this.message = msg;
        this.color = c;
    },
    draw: function (ctx) {
        ctx.font = "50pt open24display";
        ctx.fillStyle = this.color;
        var w = ctx.measureText(this.message).width / 2;
        ctx.fillText(this.message, jsGFwk.settings.width / 2 - w, jsGFwk.settings.height / 2);
    }
};