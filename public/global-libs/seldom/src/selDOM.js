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
selDOM.version = '<%= version %>';

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