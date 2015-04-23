//@module

var Inheritance = require("modules/meta/inheritance");

exports.klass = Rect = function(x, y, w, h) {
    this.__x = x;
    this.__y = y;
    this.__w = w;
    this.__h = h;
}
Rect.prototype = {
    __x: null,
    x: function() { return this.__x; },

    __y: null,
    y: function() { return this.__y; },

    __w: null,
    width: function() { return this.__w; },

    __h: null,
    height: function() { return this.__h; },
}
Inheritance.setExtends(Rect, 'Rect', Object);
