var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	injectContent.call(this, content, 'after');

	return this;
};