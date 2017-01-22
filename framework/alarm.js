var Alarm = function Alarm(timeout, callback) {
	this.id = "Timer" + Math.random();
	var self = this;
	self.timer = new jsGFwk.Timer({
		action: function() {
			callback();
			self.destroy();
		},
		tickTime: timeout
	});	
	jsGFwk.createObject(self);
};

Alarm.prototype.update = function(delta) {
	this.timer.tick(delta);
};