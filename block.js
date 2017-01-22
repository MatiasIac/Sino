(function (window) {

  var selectSpecialization = function(specialization) {
    switch (specialization) {
      case MapBuilder.constants.GOODIE:
        return {
          onPlayerTouch: function () {
            LevelController.gameStatus.score += 100;
            this.destroy();
          },
          color: "green",
          sprite: jsGFwk.Sprites.green
        }
        break;
      case MapBuilder.constants.BADDIE:
        return {
          onPlayerTouch: function () {

            for(var i = 0; i < 15; i++) {
                globalObjects.particleContainer.cloneObject({x: this.position.x - 20, y: this.position.y - 20});
            }

            this.destroy();
            LevelController.damagePlayer();
          },
          color: "red",
          sprite: jsGFwk.Sprites.enemy
        }
        break;
      case MapBuilder.constants.SPECIAL:
        return {
          onPlayerTouch: function () {
            LevelController.gameStatus.health += 1;
            LevelController.gameStatus.score += 500;
            this.destroy();
          },
          color: "blue",
          sprite: jsGFwk.Sprites.blue
        }
        break;
    };
  }

  var Block = {
    onInit: function (parameters) {
      this.position = parameters.position;
      this.size = parameters.size;
      this.speed = parameters.speed || -Curve.waveSpeed * Curve.unit;
      this.radius = this.size.width / 2;
      this.specialization = selectSpecialization(parameters.specialization);
    },
    onUpdate: function (delta) {
      this.position.x += this.speed;
      if (this.position.x + this.size.width < 0) {
        this.destroy();
      }
      this.checkForCollision();
      if (this.checkShowing) {
        this.checkShowing();
      }
    },
    onDraw: function (ctx) {
      ctx.drawImage(this.specialization.sprite.sprite.image, this.position.x - 20, this.position.y - 20);
    },
    checkForCollision: function () {
      if (this.position.x < jsGFwk.settings.width) {
        var curveShapeInfo = Curve.getShapeInfo();
        if (Curve.state.playerActive && Math.pow(this.radius + curveShapeInfo.radius, 2) > Math.pow(this.position.x - curveShapeInfo.x, 2) + Math.pow(this.position.y - curveShapeInfo.y, 2)) {
          this.specialization.onPlayerTouch.apply(this);
        }
      }

    }
  };
  window.Block = Block;
})(window)
