if (!Object.observe) {
	Object.observe = function(o, cb) {
		var getter = function() {
			return val;
		},
			setter = function(newVal) {
				cb( /* mutations array */ );
				val = newVal;
			},
			prop, val;

		for (prop in o) {
			if (o.hasOwnProperty(prop)) {
				val = o[prop];
				delete o[prop];
				Object.defineProperty(o, prop, {
					get: getter,
					set: setter,
					enumerable: true,
					configurable: true
				});
				o[prop] = val;
			}
		}
	};
}