var $ = require('./selDOM.js');

module.exports = function(selector) {

	var $items = $(selector, this);

	$items.each(function(i, el) {

		el.parentNode.removeChild(el);
	});

	return $items;
};