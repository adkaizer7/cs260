//@module

var KPRObject = require("modules/kpr/kprobject");
var KPRLayer = require("modules/kpr/kprlayer");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

var XNode = require("modules/ui/xnode");

exports.klass = XScroller /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__wrapper = null;
    this.__layer = null;

    this.__x = null;
    this.__y = null;
    this.__width = null;
    this.__height = null;

    this.__scrollX = false;
    this.__scrollY = true;
    this.__maxScrollX = 0;
    this.__maxScrollY = 0;

    this.__sX = 0;
    this.__sY = 0;
    this.__pSX = 0;
    this.__pSY = 0;
}
XScroller.prototype = {

/* Private members */

    __wrapper: null,
    __layer: null,

    __x: null,
    __y: null,
    __width: null,
    __height: null,

    __scrollX: null,
    __scrollY: null,
    __maxScrollX: null,
    __maxScrollY: null,

    __sX: null,
    __sY: null,
    __pSX: null,
    __pSY: null,

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

    scrollX: function() { return this.__scrollX; },
    setScrollX: function(b) { this.__scrollX = b; return this; },

    scrollY: function() { return this.__scrollY; },
    setScrollY: function(b) { this.__scrollY = b; return this; },

    maxScrollX: function() { return this.__maxScrollX; },
    setMaxScrollX: function(l) { this.__maxScrollX = l; return this; },

    maxScrollY: function() { return this.__maxScrollY; },
    setMaxScrollY: function(l) { this.__maxScrollY = l; return this; },

    /* END OF CONFIG FUNCTIONS */

    canHaveChildren: function() { return true; },

    childKPRContainer: function() {
        return this.__layer;
    },

    removeSelf: function() {
        this.__wrapper.removeSelf();
    },

    addSelfToParent: function() {
        this.__wrapper = KPRLayer.make(true);
        this.__wrapper.setReceiveBackgroundTouches(true);
        this.__wrapper.addToKPRObject(this.parent().childKPRContainer());
        this.__wrapper.setCoordinates({
            left: this.__x, width: this.__width,
            top: this.__y, height: this.__height,
        });
        this.__wrapper.registerCallback(
            'onTouchBegan',
            Callback.make(this.__kprOnTouchBegan, this)
        );
        this.__wrapper.registerCallback(
            'onTouchEnded',
            Callback.make(this.__kprOnTouchEnded, this)
        );
        this.__wrapper.registerCallback(
            'onTouchMoved',
            Callback.make(this.__kprOnTouchMoved, this)
        );

        this.__layer = KPRObject.make();
        this.__layer.addToKPRObject(this.__wrapper);
        this.__layer.setCoordinates({
            left: 0, width: Math.max(this.__width, this.maxScrollX()),
            top: 0, height: Math.max(this.__height, this.maxScrollY()),
        });
    },

    prevMouseX: function() { return this.__prevMouseX; },
    setPrevMouseX: function(x) { this.__prevMouseX = x; },

    prevMouseY: function() { return this.__prevMouseY; },
    setPrevMouseY: function(y) { this.__prevMouseY = y; },

    __kprOnTouchBegan: function(label, id, x, y, ticks) {
        this.setPrevMouseX(x);
        this.setPrevMouseY(y);
    },

    __kprOnTouchEnded: function(label, id, x, y, ticks) {
        this.__kprOnTouchMoved(label, id, x, y, ticks);
    },

    __kprOnTouchMoved: function(label, id, x, y, ticks) {
        if (this.scrollX()) {
            this.__setSX(this.__sX + (x - this.prevMouseX()));
            this.__layer.kprObj().x += this.__sX - this.__pSX;
            this.__pSX = this.__sX;
        }
        if (this.scrollY()) {
            this.__setSY(this.__sY + (y - this.prevMouseY()));
            this.__layer.kprObj().y += this.__sY - this.__pSY;
            this.__pSY = this.__sY;
        }
        this.setPrevMouseX(x);
        this.setPrevMouseY(y);
    },

    __setSX: function(val) {
        this.__sX = Math.min(
            0,
            Math.max(
                -(this.maxScrollX() - this.width()),
                val
            )
        );
    },

    __setSY: function(val) {
        this.__sY = Math.min(
            0,
            Math.max(
                -(this.maxScrollY() - this.height()),
                val
            )
        );
    },

}
Inheritance.setExtends(XScroller, 'XScroller', XNode.klass);
