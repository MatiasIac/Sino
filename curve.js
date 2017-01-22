/*globals jsGFwk,Utils*/
'use strict';

var Curve = {
  states: {
    running: {
      playerActive: true,
      update: function (delta) {
        // if (this.freqIncrement < 0 && this.freq < 1 || this.freqIncrement > 0 && this.freq > 20) {
        //   this.freqIncrement = -this.freqIncrement;
        // }
        //this.setFrequency(this.freq + this.freqIncrement);
        this.t = (this.t + this.waveSpeed);
        this.handleInput(delta);
        this.animTime.tick(delta);
      }
    },
    playerActive: false,
    gameOver: {
      update: function (delta) {
        this.t = (this.t + this.waveSpeed);
        this.deadTime.tick(delta);
      }
    }
  },
  step: (Math.PI * 2) / 360,

  freq: 3,
  amp: 1,
  phase: 4,
  id: "curve",
  visible: true,
  t: 0,
  unit: 100,
  width: jsGFwk.settings.width,
  xAxis: Math.floor(jsGFwk.settings.height / 2),
  yAxis: Math.floor(jsGFwk.settings.width / 4),

  freqIncrement: 0.05,
  minFreq: 1,
  maxFreq: 8,
  minAmp: 0.03,
  maxAmp: 2,
  ampIncrement: 0.05,
  offset: 2,
  speed: 0.05,
  waveSpeed: 0.01,
  radius: 10,
  init: function () {
    this.state = this.states.running;
    this.freq = 3;
    this.amp = 1;
    this.phase = 4;
    this.offset = 2;
    this.drawCircleParticles = false;

    jsGFwk.Sprites.player.reset();
    jsGFwk.Sprites.playerDead.reset();

    this.animTime = new jsGFwk.Timer({
      action: function () {
        jsGFwk.Sprites.player.next();
      },
      tickTime: 0.08
    });

    this.deadTime = new jsGFwk.Timer({
      action: function () {
        jsGFwk.Sprites.playerDead.next();
      },
      tickTime: 0.05
    });

  },
  update: function (delta) {
    this.state.update.call(this, delta);
  },
  handleInput: function (delta) {
    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
      this.setFrequency(jsGFwk.Utils.clamp(this.freq + this.freqIncrement * this.freq, this.minFreq, this.maxFreq));
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
      this.setFrequency(jsGFwk.Utils.clamp(this.freq - this.freqIncrement * this.freq, this.minFreq, this.maxFreq));
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
      this.amp = jsGFwk.Utils.clamp(this.amp + this.ampIncrement, this.minAmp, this.maxAmp);
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
      this.amp = jsGFwk.Utils.clamp(this.amp - this.ampIncrement, this.minAmp, this.maxAmp);
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.L]) {
      this.phase -= this.speed * this.freq;
      this.offset += this.speed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.J]) {
      this.phase += this.speed * this.freq;
      this.offset -= this.speed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.K]) {
      this.offset -= this.speed + this.waveSpeed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.I]) {
      this.offset += this.speed - this.waveSpeed;
    }

    this.drawCircleParticles = jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.I] || jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.K];

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.SPACEBAR]) {
      this.waveSpeed = 0.04;
      LevelController.gameStatus.score += 1;
    } else {
      this.waveSpeed = 0.01;
    }

    this.offset = jsGFwk.Utils.clamp(this.offset, 0.15, 6.15);
  },

  setFrequency: function (newFrequency) {
    var oldFreq = this.freq;
    var oldPhase = this.phase;

    this.freq = newFrequency;
    this.phase = (this.t + this.offset) * (oldFreq - this.freq) + oldPhase;
  },
  draw: function (ctx) {

    var grad= ctx.createLinearGradient(0, 0, 640, 480);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(0.5, "#0CD906");
    grad.addColorStop(1, "#00FF00");
    ctx.strokeStyle = grad;

    ctx.fillStyle = "#50FA4B";
    ctx.lineWidth = 3;

    var x = 0;
    var y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);

    ctx.beginPath();
    ctx.moveTo(x * this.unit, this.unit * y + this.xAxis);

    for (x = 0; x <= this.width; x += this.step) {
      y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);
      ctx.lineTo(x * this.unit, this.unit * y + this.xAxis);
    }
    ctx.stroke();

    this.drawCircle(ctx);
  },
  drawCircle: function (ctx) {
    var x = this.offset;
    var y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);

    if (!this.state.playerActive) {
      ctx.drawImage(jsGFwk.Sprites.playerDead.sprite.image, (x * this.unit) - 20, (this.unit * y + this.xAxis) - 20);
      return;
    }

    ctx.drawImage(jsGFwk.Sprites.player.sprite.image, (x * this.unit) - 20, (this.unit * y + this.xAxis) - 20);

    if (this.drawCircleParticles) {
      for(var i = 0; i < 5; i++) {
        globalObjects.particleContainer.cloneObject({
          x: (x * this.unit),
          y: (this.unit * y + this.xAxis),
          particleColor: { r: 0, g: 255, b: 0 }
        });
      }
    }

    this.x = x;
    this.y = y;
  },
  getHeight: function (x, t, freq, phase, amp) {
    return Math.sin((x + t) * freq + phase) * amp;
  },
  getShapeInfo: function () {
    return {
      x: this.x * this.unit,
      y: this.y * this.unit + this.xAxis,
      radius: this.radius
    };
  }
};
