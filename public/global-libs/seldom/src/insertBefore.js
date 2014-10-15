var $ = require('./selDOM.js'),
	injectContent = require('./utils.js').injectContent;

module.exports = insertBefore = function(target) {

	target = (typeof target === 'string') ? $(target) : target;

	if (target instanceof $) {

		injectContent.call(target, this, 'before');

		return this;

	} else {

		throw new TypeError('The `target` parameter of the insertBefore method must be selector or selDOM object');
	}
};