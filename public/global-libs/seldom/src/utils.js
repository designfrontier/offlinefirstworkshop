var selDOM = require('./selDOM.js');

module.exports = {
    makeArray: function(list) {

        return [].slice.call(list);

    },

    deDup: function(arr) {
        var deDupped = selDOM(),
            _i, _ilen, _iref;

        for (_i = 0, _ilen = arr.length; _i < _ilen; _i++) {
            _iref = arr[_i];

            if (deDupped.indexOf(_iref) === -1) {
                deDupped.push(_iref);
            }
        }

        return deDupped;
    },

    isHTMLstr: function(str) {
        return !!str.match(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/);
    },

    htmlToNodes: function(htmlStr) {
        var frag = doc.createDocumentFragment(),
            temp = frag.appendChild(doc.createElement('div'));

        temp.innerHTML = htmlStr;

        return temp.childNodes;
    },

    indexOfNode: function(el) {
        var parent = el.parentNode,
            children = makeArray(parent.children);

        return children.indexOf(el);
    },

    injectContent: function(content, method) {
        var clone = this.length - 1; // Don't clone node if there's only one in the set, just move it.

        content = selDOM(content); // format the content

        this.each(function(i, el) {
            var parent, childIdx, lastChildIdx;

            if (method === 'after') {
                parent = el.parentNode;
                childIdx = indexOfNode(el);
                lastChildIdx = parent.childElementCount - 1;
            }

            content.each(function(idx, item) {

                var node = clone ? item.cloneNode(true) : item;

                if (method === 'prepend') {

                    el.insertBefore(node, el.firstChild);

                } else if (method === 'append') {

                    el.appendChild(node);

                } else if (method === 'before') {

                    el.parentNode.insertBefore(node, el);

                } else if (method === 'after') {

                    if (childIdx === lastChildIdx) {

                        el.appendChild(node);

                    } else {

                        parent.insertBefore(node, parent.children[++childIdx]);

                    }
                }
            }, (method === 'prepend'));
        });

        return this;
    },
    isPlainObject: function(obj) {
        // Ripped from jQuery source (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js)
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof obj !== "object" || obj.nodeType || obj.window === window) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    }
};