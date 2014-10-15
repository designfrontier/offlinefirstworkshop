module.exports = function() {

	//Flatten nested arrays and normalize space delimited class lists
	var args = [].slice.call(arguments, 0).toString().split(/[\s,]/);

	this.each(function(i, el) {

		el.classList.remove.apply(el.classList, args);

	});

	return this;
};