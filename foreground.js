var Foreground = {
    id: 'foreground',
    visible: true,
    init: function() {

    },
    draw: function(ctx) {
        ctx.drawImage(jsGFwk.ResourceManager.graphics.foreground.image, 0, 0);
    }
};