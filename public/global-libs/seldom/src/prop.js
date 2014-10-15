var utils = require('./utils.js');

module.exports = function(propName, propValue) {
    var propNames,
        setProp = function(i, el) {
            el[prop] = propName[prop];
        };

    if (utils.isPlainObject(propName)) {

        for (var prop in propName) {

            if (propName.hasOwnProperty(prop)) {

                this.each(setProp);
            }
        }

        return this;

    } else if (typeof propName === 'string') {

        if (propValue && typeof propValue === 'string') {

            this.each(function(i, el) {

                el[propName] = propValue;
            });

            return this;

        } else if (propValue === undefined) {

            return this[0][propName];
        }
    } else {

        throw new TypeError('The first argument of `prop` must be a propery name as a string or an object representing a hash of property:value pairs.');
    }
};