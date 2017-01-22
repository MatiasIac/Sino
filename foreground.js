var Foreground = {
    id: 'foreground',
    visible: true,
    init: function() {

    },
    draw: function(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "10pt open24display";
        //ctx.fillText("Freq: " + Curve.freq + ", Amp: " + Curve.amp + ", Offset: " + Curve.offset + ", T: " + Curve.t, 10, 20);
        ctx.fillText("Health: " + LevelController.gameStatus.health, 10, 20);
        ctx.fillText("Score: " + LevelController.gameStatus.score, 10, 40);
        ctx.fillText("Level: " + LevelController.gameStatus.level, 10, 60);

        ctx.drawImage(jsGFwk.ResourceManager.graphics.foreground.image, 0, 0);
    }
};
