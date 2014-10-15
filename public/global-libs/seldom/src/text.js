module.exports = function(content, HTMLFlag) {

    var method = [HTMLFlag ? "HTML" : "Text"],
        inner = "inner" + method,
        asStr = function(i, el) {

            el[inner] = content;
        },

        asFunction = function(i, el) {

            oldContent = this[inner];
            this[inner] = '';
            this[inner] = content.call(el, i, oldContent);
        },

        oldContent;

    if (content) {

        if (typeof content === 'string') {

            this.each(asStr);

        } else if (typeof content === 'function') {

            this.each(asFunction);

        } else {

            throw new TypeError('The first argument in the `' + method + '` method must be a string of ' + method + ' or a function');
        }

        return this;

    } else {

        return this[0] ? this[0][inner] : "";
    }
};