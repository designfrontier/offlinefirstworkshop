module.exports = function(attrName) {

	this.each(function(i, el) {

		el.removeAttribute(attrName);
	});
};