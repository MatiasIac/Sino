/**
 * A bag of cats
 */
jsGFwk.Utils = {
	_plugInName: "Utils",
	_loaded: false,
	_isAvailable: false,

  clamp: function(value, min, max) {
    return Math.min(max, Math.max(min, value));
  },

	onStart: function () {
		this._isAvailable = typeof(Utils) !== "undefined";
	},
	onObjectCreated: function (newObject) {	},
	onStop: function () {},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	},
 	makeAtlas: function(width, height, frames, inverted, offset) {
		offset = offset || 0;
		var spriteCollection = [];
		var newFrame;
		for (var i = 0; i < frames; i++) {
			newFrame = {left: width * (i + offset), top: 0, width: width, height: height, inverted: inverted};
			spriteCollection.push(newFrame);
		}
		return spriteCollection;
	},
	makeDoubleAtlas: function(width, height, frames, inverted, offset) {
		offset = offset || 0;
		var spriteCollection = [];
		var newFrame;
		for (var i = 0; i < frames; i++) {
			newFrame = {left: width * (i + offset), top: 0, width: width, height: height, inverted: inverted};
			spriteCollection.push(newFrame);
		}
		for (i = frames - 1; i > 0; i--) {
			newFrame = {left: width * (i + offset), top: 0, width: width, height: height, inverted: inverted};
			spriteCollection.push(newFrame);
		}
		return spriteCollection;
	}
};
