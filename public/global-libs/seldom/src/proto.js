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