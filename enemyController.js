var EnemyController = {
  id: "enemyController",
  visible: false,
  init: function () {
    var time = 10;
    this.enemyTimer = new jsGFwk.Timer({
      action: function () {
        globalObjects.enemiesContainer.cloneObject({
          position: {
            x: Math.random() *  10 + jsGFwk.settings.width + 10 + 50,
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
  },
  update: function (delta) {
    this.enemyTimer.tick(delta);
  }
};
