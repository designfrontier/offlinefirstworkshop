module.exports = function(propName) {
	this.each(function(i, el) {
		delete el[propName];
	});
	return this;
};