
(function () {

  var LevelController = {
    loadNextLevel: function (xOffset) {
      var levels = [
        jsGFwk.ResourceManager.graphics.map1.image, 
        jsGFwk.ResourceManager.graphics.map2.image,
        jsGFwk.ResourceManager.graphics.map3.image,
        jsGFwk.ResourceManager.graphics.map4.image
      ];

      this.gameStatus.level++;
      var rightMostBlock = null;
      var maxX = 0;

      if (!levels[this.gameStatus.level - 1]) {
        return;
      }

        var closureThis = this;
        new Alarm(0, function () {
          ScreenMessages.visible = true;
          ScreenMessages.setMessage("Level " + closureThis.gameStatus.level, "white");
          
          new Alarm(2, function () {
            ScreenMessages.visible = false;
          });

        });

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
    visible: true,
    init: function () {

      jsGFwk.Sprites.enemy.reset();
      jsGFwk.Sprites.blue.reset();
      jsGFwk.Sprites.green.reset();

      this.objectsTimer = new jsGFwk.Timer({
        action: function () {
          jsGFwk.Sprites.enemy.next();
          jsGFwk.Sprites.blue.next();
          jsGFwk.Sprites.green.next();
        },
        tickTime: 0.08
      });

      this.otherBallTime = new jsGFwk.Timer({
        action: function () {
          jsGFwk.Sprites.enemy.next();
          jsGFwk.Sprites.blue.next();
        },
        tickTime: 0.05
      });

      this.gameStatus = this.resetGameStatus();
      this.loadNextLevel();
    },
    update: function (delta) {
      this.otherBallTime.tick(delta);
      this.objectsTimer.tick(delta);
    }
  };
  window.LevelController = LevelController;
})();
