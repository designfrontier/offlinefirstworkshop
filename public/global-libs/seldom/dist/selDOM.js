(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {

	//Flatten nested arrays and normalize space delimited class lists
	var args = [].slice.call(arguments, 0).toString().split(/[\s,]/);

	this.each(function(i, el) {

		el.classList.add.apply(el.classList, args);

	});

	return this;
};
},{}],2:[function(require,module,exports){
var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	injectContent.call(this, content, 'after');

	return this;
};
},{"./utils.js":27}],3:[function(require,module,exports){
var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	return injectContent.call(this, content, 'append');
};
},{"./utils.js":27}],4:[function(require,module,exports){
var $ = require('./selDOM.js'),
	injectContent = require('./utils.js').injectContent;

module.exports = function(target) {

	target = (typeof target === 'string') ? $(target) : target;

	if (target instanceof $) {

		injectContent.call(target, this, 'append');

		return this;

	} else {

		throw new TypeError('The `target` parameter of the appendTo method must be selector or selDOM object');
	}
};
},{"./selDOM.js":24,"./utils.js":27}],5:[function(require,module,exports){
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
},{"./utils.js":27}],6:[function(require,module,exports){
var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	injectContent.call(this, content, 'before');

	return this;
};
},{"./utils.js":27}],7:[function(require,module,exports){
module.exports = function(fn) {

	this.forEach(function(el, i, arr) {

		fn.call(el, i, el);

	});

	return this;
};
},{}],8:[function(require,module,exports){
module.exports = function() {

	this.each(function(i, el) {

		el.innerHTML = '';
	});
};
},{}],9:[function(require,module,exports){
var utils = require('./utils.js'),
    proto = require('./proto.js'),
    selDOM,
    _$;

selDOM = function(selector, context) {
    return new proto.init(selector, context);
};

proto.constructor = selDOM;

selDOM.prototype = proto;

selDOM.noConflict = function() {
    if (typeof _$ !== 'undefined' && window.$ === this) {
        window.$ = _$;
    }

    return this;
};

// Adding the object check utility to the selDOM object.
selDOM.isPlainObject = utils.isPlainObject;

// Exposing the version number on the selDOM object.
selDOM.version = '0.3.0';

// exposing selDOM to the global object
this.selDOM = selDOM;

//cache for noconflict implementation
_$ = window.$;

//add a jQuery compatible shortcut
//setup seldom as $
window.$ = window.selDOM;

// makeing sure it's nodic.
// TODO: Find out what the node version of `Pythonic` is.
module.exports = selDOM;
},{"./proto.js":19,"./utils.js":27}],10:[function(require,module,exports){
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
},{"./selDOM.js":24,"./utils.js":27}],11:[function(require,module,exports){
module.exports = function(className) {

	var hasClass = false;

	this.each(function(i, el) {

		if (el.classList.contains(className)) {

			hasClass = true;
		}
	});

	return hasClass;
};
},{}],12:[function(require,module,exports){
var utils = require('./utils.js'),
	text = require('./text.js');

module.exports = function() {

	//Calls the text method with the HTMLFlag set.
	return text.apply(this, utils.makeArray(arguments).concat([true]));
};
},{"./text.js":25,"./utils.js":27}],13:[function(require,module,exports){
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
},{"./utils.js":27}],14:[function(require,module,exports){
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
},{"./selDOM.js":24,"./utils.js":27}],15:[function(require,module,exports){
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
},{"./selDOM.js":24,"./utils.js":27}],16:[function(require,module,exports){
var injectContent = require('./utils.js').injectContent;

module.exports = function(content) {

	return injectContent.call(this, content, 'prepend');
};
},{"./utils.js":27}],17:[function(require,module,exports){
var $ = require('./selDOM.js'),
	injectContent = require('./utils.js').injectContent;

module.exports = function(target) {

	target = (typeof target === 'string') ? $(target) : target;

	if (target instanceof $) {

		injectContent.call(target, this, 'prepend');

		return this;

	} else {

		throw new TypeError('The `target` parameter of the prependTo method must be a selector or selDOM object');
	}
};
},{"./selDOM.js":24,"./utils.js":27}],18:[function(require,module,exports){
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
},{"./utils.js":27}],19:[function(require,module,exports){
var proto = [];

proto.init = require('./init.js');
proto.each = require('./each.js');
proto.find = require('./find.js');
proto.addClass = require('./addClass.js');
proto.toggleClass = require('./toggleClass.js');
proto.removeClass = require('./removeClass.js');
proto.hasClass = require('./hasClass.js');
proto.empty = require('./empty.js');
proto.html = require('./html.js');
proto.text = require('./text.js');
proto.attr = require('./attr.js');
proto.removeAttr = require('./removeAttr.js');
proto.remove = require('./remove.js');
proto.prepend = require('./prepend.js');
proto.append = require('./append.js');
proto.prependTo = require('./prependTo.js');
proto.appendTo = require('./appendTo.js');
proto.before = require('./before.js');
proto.after = require('./after.js');
proto.insertBefore = require('./insertBefore.js');
proto.insertAfter = require('./insertAfter.js');
proto.prop = require('./prop.js');
proto.removeProp = require('./removeProp.js');

proto.init.prototype = proto;

module.exports = proto;
},{"./addClass.js":1,"./after.js":2,"./append.js":3,"./appendTo.js":4,"./attr.js":5,"./before.js":6,"./each.js":7,"./empty.js":8,"./find.js":10,"./hasClass.js":11,"./html.js":12,"./init.js":13,"./insertAfter.js":14,"./insertBefore.js":15,"./prepend.js":16,"./prependTo.js":17,"./prop.js":18,"./remove.js":20,"./removeAttr.js":21,"./removeClass.js":22,"./removeProp.js":23,"./text.js":25,"./toggleClass.js":26}],20:[function(require,module,exports){
var $ = require('./selDOM.js');

module.exports = function(selector) {

	var $items = $(selector, this);

	$items.each(function(i, el) {

		el.parentNode.removeChild(el);
	});

	return $items;
};
},{"./selDOM.js":24}],21:[function(require,module,exports){
module.exports = function(attrName) {

	this.each(function(i, el) {

		el.removeAttribute(attrName);
	});
};
},{}],22:[function(require,module,exports){
module.exports = function() {

	//Flatten nested arrays and normalize space delimited class lists
	var args = [].slice.call(arguments, 0).toString().split(/[\s,]/);

	this.each(function(i, el) {

		el.classList.remove.apply(el.classList, args);

	});

	return this;
};
},{}],23:[function(require,module,exports){
module.exports = function(propName) {
	this.each(function(i, el) {
		delete el[propName];
	});
	return this;
};
},{}],24:[function(require,module,exports){
module.exports=require(9)
},{"./proto.js":19,"./utils.js":27}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
module.exports = function() {

	//Flatten nested arrays and normalize space delimited class lists
	var args = [].slice.call(arguments, 0).toString().split(/[\s,]/);

	this.each(function(i, el) {

		el.classList.toggle.apply(el.classList, args);

	});

	return this;
};
},{}],27:[function(require,module,exports){
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
},{"./selDOM.js":24}]},{},[9])


//# sourceMappingURL=selDOM.js.map