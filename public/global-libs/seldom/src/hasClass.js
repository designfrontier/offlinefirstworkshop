module.exports = function(className) {

	var hasClass = false;

	this.each(function(i, el) {

		if (el.classList.contains(className)) {

			hasClass = true;
		}
	});

	return hasClass;
};