var Foreground = {
    id: 'foreground',
    visible: true,
    init: function() {

    },
    draw: function(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "10pt arial";
        //ctx.fillText("Freq: " + Curve.freq + ", Amp: " + Curve.amp + ", Offset: " + Curve.offset + ", T: " + Curve.t, 10, 20);
        ctx.fillText("Health: " + LevelController.gameStatus.health, 10, 20);
        ctx.fillText("Score: " + LevelController.gameStatus.score, 10, 40);
        ctx.fillText("Level: " + LevelController.gameStatus.level, 10, 60);

        ctx.drawImage(jsGFwk.ResourceManager.graphics.foreground.image, 0, 0);
    },
    postRender: function postRender(ctx) {
        globalObjects.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        globalObjects.fx.glCanvas.draw(globalObjects.fx.glTexture)
            .bulgePinch(jsGFwk.settings.width / 2, jsGFwk.settings.height / 2, jsGFwk.settings.width * 0.75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }
};
