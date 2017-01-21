(function (w) {

    var mapBuilder = function () {
    };

    mapBuilder.prototype.getMap = function (map, f) {
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
        for (var i=0; i < imgData.data.length; i += 4) {

            if (i % width === 0) {
                x = 0;
                y++;
            }

            x++;

            if (imgData.data[i] === 255) {
                f(x - 1, y - 1);
            }
        }
    };

    w.MapBuilder = new mapBuilder();

}(window));