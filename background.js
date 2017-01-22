var Background = {
    id: 'background',
    visible: true,
    init: function() {

    },
    draw: function(ctx) {
        ctx.drawImage(jsGFwk.ResourceManager.graphics.background.image, 0, 0);
    }
};