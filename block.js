(function (window) {

  var selectSpecialization = function(specialization) {
    switch (specialization) {
      case MapBuilder.constants.GOODIE:
        return {
          onPlayerTouch: function () {
            LevelController.gameStatus.score += 100;
            this.destroy();
          },
          color: "green"
        }
        break;
      case MapBuilder.constants.BADDIE:
        return {
          onPlayerTouch: function () {

            this.destroy();
            LevelController.damagePlayer();
          },
          color: "red"
        }
        break;
      case MapBuilder.constants.SPECIAL:
        return {
          onPlayerTouch: function () {
            LevelController.gameStatus.health += 1;
            LevelController.gameStatus.score += 500;
            this.destroy();
          },
          color: "blue"
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
      ctx.fillStyle = this.specialization.color;
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      //ctx.moveTo(x, y);

      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.fill();

      //ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
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
