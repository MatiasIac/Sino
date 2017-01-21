/*globals jsGFwk */
'use strict';

var Curve = {
  step: 1,
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
  freqIncrement: 0.1,
  ampIncrement: 0.1,
  offset: 4,
  init: function () {

  },
  update: function (delta) {
    // if (this.freqIncrement < 0 && this.freq < 1 || this.freqIncrement > 0 && this.freq > 20) {
    //   this.freqIncrement = -this.freqIncrement;
    // }
    //this.setFrequency(this.freq + this.freqIncrement);
    this.t = this.t + delta * 1;

    this.handleInput(delta);

  },
  handleInput: function(delta) {
    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
      this.setFrequency(this.freq + this.freqIncrement);
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
      this.setFrequency(this.freq - this.freqIncrement);
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
      this.amp += this.ampIncrement;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
      this.amp -= this.ampIncrement;
    }
  },

  setFrequency: function(newFrequency) {
    var oldFreq = this.freq;
    var oldPhase = this.phase;

    this.freq = newFrequency;
    this.phase = (this.t + this.offset) * (oldFreq - this.freq) + oldPhase;
  },
  draw: function (ctx) {
    var x = this.t;
    var y = Math.sin(x * this.freq + this.phase) * this.amp;

    ctx.beginPath();
    ctx.moveTo(this.yAxis, this.unit * y + this.xAxis);
    // Loop to draw segments

    for (var i = this.yAxis; i <= this.width; i += this.step) {
      x = this.t + (-this.yAxis + i) / this.unit;
      y = Math.sin(x * this.freq + this.phase) * this.amp;
      ctx.lineTo(i, this.unit * y + this.xAxis);
    }
    ctx.stroke();
  }
};
