var selDOM = require('./selDOM.js'),
    utils = require('./utils.js');

module.exports = function(selector) {
    var found = selDOM(),
        el;

    this.each(function(i, el) {

        var $items = (selector instanceof selDOM) ? selector : selDOM(selector);

        $items.each(function(idx, item) {
            //https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition
            if (el.compareDocumentPosition(item) & (Node.DOCUMENT_POSITION_CONTAINED_BY + Node.DOCUMENT_POSITION_FOLLOWING)) {

                found.push.call(found, item);
            }
        });
    });

    return utils.deDup(found);
};