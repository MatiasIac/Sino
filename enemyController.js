var LevelController = {
  id: "levelController",
  visible: false,
  init: function () {
    var time = 10;
    this.enemyTimer = new jsGFwk.Timer({
      action: function () {
        globalObjects.blockContainer.cloneObject({
          position: {
            x: Math.random() * 10 + jsGFwk.settings.width + 10 + 50,
            y: Math.random() * 500 + 20
          },
          size: {
            width: 50,
            height: 50
          }
        });
      },
      tickTime: 2
    });


    var leftMostBlock = null;
    var maxX = 0;
    MapBuilder.getMap(jsGFwk.ResourceManager.graphics.map1.image, function (x, y) {
      var blockSize = 20;
      var block = globalObjects.blockContainer.cloneObject({
        position: {
          x: x * blockSize,
          y: y * blockSize
        },
        size: {
          width: blockSize,
          height: blockSize
        }
      });
      if (!leftMostBlock || block.position.x > maxX) {
        leftMostBlock = block;
      }
    });
  },
  update: function (delta) {
    //this.enemyTimer.tick(delta);
  }
};
