var $ = require('./selDOM.js'),
	injectContent = require('./utils.js').injectContent;

module.exports = function(target) {

	target = (typeof target === 'string') ? $(target) : target;

	if (target instanceof $) {

		injectContent.call(target, this, 'after');

		return this;

	} else {

		throw new TypeError('The `target` parameter of the insertAfter method must be selector or selDOM object');
	}
};