var utils = require('./utils.js'),
	text = require('./text.js');

module.exports = function() {

	//Calls the text method with the HTMLFlag set.
	return text.apply(this, utils.makeArray(arguments).concat([true]));
};