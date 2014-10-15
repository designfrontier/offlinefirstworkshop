var utils = require('./utils.js');

module.exports = function(attrName, attrValue) {

    var setAttr = function(i, el) {
        el.setAttribute(attr, attrName[attr]);
    },
        val;

    if (utils.isPlainObject(attrName)) {

        for (var attr in attrName) {

            if (attrName.hasOwnProperty(attr)) {

                this.each(setAttr);
            }
        }

        return this;

    } else if (typeof attrName === 'string') {

        if (typeof attrValue === 'string') {

            this.each(function(i, el) {

                el.setAttribute(attrName, attrValue);
            });

        } else if (attrValue === undefined) {

            val = this[0].getAttribute(attrName);
        }

        return (val === undefined) ? this : val;

    } else {

        throw new TypeError('The first argument of `attr` must be a propery name as a string or an object representing a hash of attribute:value pairs.');
    }
};