var Foreground = {
    id: 'foreground',
    visible: true,
    init: function() {

    },
    draw: function(ctx) {
        ctx.drawImage(jsGFwk.ResourceManager.graphics.foreground.image, 0, 0);

        ctx.fillStyle = "white";
        ctx.font = "20pt open24display";
        ctx.fillText("Health: " + LevelController.gameStatus.health, 50, 45);
        ctx.fillText("Score: " + LevelController.gameStatus.score, 270, 45);
        ctx.fillText("Level: " + LevelController.gameStatus.level, 480, 45);
    },
    postRender: function postRender(ctx) {
        globalObjects.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        globalObjects.fx.glCanvas.draw(globalObjects.fx.glTexture)
            .bulgePinch(jsGFwk.settings.width / 2, jsGFwk.settings.height / 2, jsGFwk.settings.width * 0.75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }
};
