var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	return injectContent.call(this, content, 'prepend');
};