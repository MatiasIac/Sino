
(function () {

  var LevelController = {
    loadNextLevel: function (xOffset) {
      var levels = [jsGFwk.ResourceManager.graphics.map1.image, jsGFwk.ResourceManager.graphics.map2.image, jsGFwk.ResourceManager.graphics.map3.image, jsGFwk.ResourceManager.graphics.map4.image];
      this.gameStatus.level++;
      var rightMostBlock = null;
      var maxX = 0;

      if (!levels[this.gameStatus.level - 1]) {
        return;
      }

      MapBuilder.getMap(levels[this.gameStatus.level - 1], function (x, y, specialization) {

        var blockSize = 20;
        var block = globalObjects.blockContainer.cloneObject({
          position: {
            x: x * blockSize + (xOffset || 0),
            y: y * blockSize
          },
          size: {
            width: blockSize,
            height: blockSize
          },
          specialization: specialization
        });

        if (!rightMostBlock || block.position.x > maxX) {
          rightMostBlock = block;
          maxX = rightMostBlock.position.x;
          console.log(rightMostBlock.position);
        }
      }.bind(this));
      rightMostBlock.checkShowing = function () {
        if (this.position.x < jsGFwk.settings.width) {
          this.checkShowing = null;
          LevelController.loadNextLevel(this.position.x + this.size.width);
        }
      }

    },
    damagePlayer: function () {
      if (this.gameStatus.health === 0) {
        Curve.state = Curve.states.gameOver;
        new Alarm(1, function endGame() {
          globalObjects.blockContainer.clearAll();
          jsGFwk.Scenes.scenes.game.enable();
        });
        //jsGFwk.Scenes.scenes.game.disable();
      } else {
        this.gameStatus.health --;
      }
    },
    resetGameStatus: function () {
      return {
        health: 10,
        score: 0,
        level: 0,
        multiplier: 1
      }
    },
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
      this.gameStatus = this.resetGameStatus();
      this.loadNextLevel();


    },
    update: function (delta) {
      //this.enemyTimer.tick(delta);
    }
  };
  window.LevelController = LevelController;
})();
