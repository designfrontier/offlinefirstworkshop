var utils = require('./utils.js');

module.exports = function(selector, context) {
    var selF = this;

    // empty case
    if (!selector && !context) {
        return selF;
    }

    // root
    if (selector === document && !context) {
        selF.push(document);
        return selF;
    }

    // context checking
    if (!(context instanceof selDOM)) {
        if (!context) {
            context = selF.constructor(document);
        } else if (typeof context === 'string') {
            context = selF.constructor(context);
        } else {
            throw new TypeError('`context` must be a selector string or selDOM object');
        }
    }

    //selector checking

    // If no selector, return empty selDOM object
    if (!selector) {
        // return selF; // No-op;
    } else if (selector === document || selector === window || selector.nodeType) {

        selF.push(selector);

    } else if (typeof selector === 'string') {

        if (utils.isHTMLstr(selector)) {

            selF.push.apply(selF, utils.makeArray(utils.htmlToNodes(selector)));

        } else {

            context.each(function(idx, el) {

                selF.push.apply(selF, utils.makeArray(el.querySelectorAll(selector)));

            });
        }

    } else if (selector instanceof selDOM) {

        if (context.length === 1 && context[0] === document) {

            selF.push.apply(selF, selector);

        } else {

            context.each(function(ctx_i, ctx_el) {

                var $ctx_el = selDOM(ctx_el);

                selF.push.apply(selF, $ctx_el.find(selector));
            });
        }

    } else if (Array.isArray(selector)) {

        selF.splice(0, 0, selector);
    }

    return selF;
};