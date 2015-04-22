//@module

var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Inheritance = require("modules/meta/inheritance");

var XNode = require("modules/ui/xnode");

exports.klass = XCanvas /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__width = 292;
    this.__height = 292;
    this.__color = null;
}
XCanvas.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,
    __width: null,
    __height: null,
    __draw: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    x: function() { return this.__x; },
    setX: function(x) { this.__x = x; return this; },

    y: function() { return this.__y; },
    setY: function(y) { this.__y = y; return this; },

    width: function() { return this.__width; },
    setWidth: function(w) { this.__width = w; return this; },

    height: function() { return this.__height; },
    setHeight: function(h) { this.__height = h; return this; },

    draw: function() { return this.__draw; },
    setDraw: function(cb) { this.__draw = cb; return this; },

    /* END OF CONFIG FUNCTIONS */

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        this.__kpr = KPRObject.make(true);
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setCoordinates({
            left: this.__x, width: this.__width,
            top: this.__y, height: this.__height,
        });

        this.__rdt = new RenderTarget.klass();
        this.__rdt.addToKPRObject(this.__kpr);
        this.__rdt.setDimensions(this.__width, this.__height);
        this.drawToRenderTarget();
    },

    drawToRenderTarget: function() {
        if (this.draw() !== null) {
            this.draw().call(this.__rdt);
        }
    },

}
Inheritance.setExtends(XCanvas, 'XCanvas', XNode.klass);
