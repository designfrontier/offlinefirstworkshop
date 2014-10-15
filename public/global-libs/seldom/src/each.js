module.exports = function(fn) {

	this.forEach(function(el, i, arr) {

		fn.call(el, i, el);

	});

	return this;
};