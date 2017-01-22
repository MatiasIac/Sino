(function (w) {

    var mapBuilder = function () {
    };

    mapBuilder.prototype.constants = {
        BADDIE: "BADDIE",
        GOODIE: "GOODIE",
        SPECIAL: "SPECIAL"
    }

    mapBuilder.prototype.getMap = function (map, entityFoundCallback) {
        var width = map.width;
        var height = map.height;
        var x = 0;
        var y = 0;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        context.drawImage(map, 0, 0);

        var imgData = context.getImageData(0, 0, width, height);

        var red;
        var green;
        var blue;
        var alpha;
        for (var i=0; i < imgData.data.length; i += 4) {
            red = imgData.data[i];
            green = imgData.data[i + 1];
            blue = imgData.data[i + 2];
            alpha = imgData.data[i + 3];

            if (i % (width * 4) === 0) {
                x = 0;
                y++;
            }
            x++;

            var specialization = null;
            if (red === 255) {
                specialization = this.constants.BADDIE;
            } else if (green === 255) {
                specialization = this.constants.GOODIE;
            } else if (blue === 255) {
                specialization = this.constants.SPECIAL
            }

            if (specialization) {
                entityFoundCallback(x - 1, y - 1, specialization);
            }
        }
    };

    w.MapBuilder = new mapBuilder();

}(window));
