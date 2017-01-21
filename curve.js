/*globals jsGFwk */
'use strict';

var Curve = {
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
  ampIncrement: 0.05,
  offset: 2,
  speed: 0.01,
  waveSpeed: 0.01,
  init: function () {

  },
  update: function (delta) {
    // if (this.freqIncrement < 0 && this.freq < 1 || this.freqIncrement > 0 && this.freq > 20) {
    //   this.freqIncrement = -this.freqIncrement;
    // }
    //this.setFrequency(this.freq + this.freqIncrement);
    this.t = (this.t + this.waveSpeed);

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

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.M]) {
      this.phase -= this.speed * this.freq;
      this.offset += this.speed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.N]) {
      this.phase += this.speed * this.freq;
      this.offset -= this.speed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.J]) {
      this.offset -= this.speed + this.waveSpeed;
    }

    if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.K]) {
      this.offset += this.speed - this.waveSpeed;
    }
  },

  setFrequency: function(newFrequency) {
    var oldFreq = this.freq;
    var oldPhase = this.phase;

    this.freq = newFrequency;
    this.phase = (this.t + this.offset) * (oldFreq - this.freq) + oldPhase;
  },
  draw: function (ctx) {
    var x = 0;
    var y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);


    ctx.beginPath();
    ctx.moveTo(x * this.unit, this.unit * y + this.xAxis);
    // Loop to draw segments

    for (x = 0; x <= this.width; x += this.step) {
      y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);
      ctx.lineTo(x * this.unit, this.unit * y + this.xAxis);
    }
    ctx.stroke();

    this.drawCircle(ctx);

    ctx.fillStyle = "black";
    ctx.font = "10pt arial";
    ctx.fillText("Freq: " + this.freq + ", Amp: " + this.amp + ", Offset: " + this.offset + ", T: " + this.t, 10, 20);

  },
  drawCircle: function (ctx) {
    var x = this.offset;
    var y = this.getHeight(x, this.t, this.freq, this.phase, this.amp);
    //var y = Math.sin(this.t + this.offset * this.freq + this.phase) * this.amp * this.unit;
    ctx.beginPath();
    //ctx.moveTo(x, y);

    ctx.arc(x * this.unit, this.unit * y + this.xAxis, 10, 0, 2*Math.PI, false);
    ctx.stroke();
  },
  getHeight: function (x, t, freq, phase, amp) {
    return Math.sin((x + t) * freq + phase) * amp;
  }


};
