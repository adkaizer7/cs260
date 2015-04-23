//@module

var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");

var XNode = require("modules/ui/xnode");

/**
 * Enum representing the styles the block can be drawn in.
 */
exports.Styles = Enum.create([
    'LINE_ROUND',
    'FILL_ROUND',
    'LINE_RECT',
    'FILL_RECT',
]),

exports.klass = XBlock /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__width = 292;
    this.__height = 292;
    this.__color = null;
    this.__style = null;
}
XBlock.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,
    __width: null,
    __height: null,
    __color: null,
    __style: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    x: function() { return this.__x; },
    setX: function(x) { this.__x = x; return this; },

    y: function() { return this.__y; },
    setY: function(y) { this.__y = y; return this; },

    width: function() { return this.__width; },
    setWidth: function(w) { this.__width = w; this.drawToRenderTarget(); return this; },

    height: function() { return this.__height; },
    setHeight: function(h) { this.__height = h; this.drawToRenderTarget(); return this; },

    color: function() { return this.__color; },
    setColor: function(c) { this.__color = c; this.drawToRenderTarget(); return this; },

    style: function() { return this.__style; },
    setStyle: function(s) {
        Test.invariant(exports.Styles.isValid(s), 'Invalid style given.');
        this.__style = s;
        return this;
    },

    /* END OF CONFIG FUNCTIONS */

    canHaveChildren: function() { return true; },

    childKPRContainer: function() {
        return this.__kpr;
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        if (this.__style === null) {
            this.__style = this.appstyle().defaultBlockStyle();
        }

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
        if (this.__rdt === null || this.color() === null) {
            return;
        }
        if (this.__width == 0 || this.__height == 0) {
            return;
        }
        this.__kpr.setCoordinates({
            left: this.__x, width: this.__width,
            top: this.__y, height: this.__height,
        });
        this.__rdt.setDimensions(this.__width, this.__height);
        this.__rdt.clear();
        switch (this.style()) {
            case exports.Styles.LINE_ROUND:
                this.__rdt.strokeRoundedRect(this.color(),
                    0, 0, this.width(), this.height(), 5);
                break;
            case exports.Styles.FILL_ROUND:
                this.__rdt.fillRoundedRect(this.color(),
                    0, 0, this.width(), this.height(), 5);
                break;
            case exports.Styles.LINE_RECT:
                this.__rdt.strokeRectangle(this.color(),
                    0, 0, this.width(), this.height());
                break;
            case exports.Styles.FILL_RECT:
                this.__rdt.fillRectangle(this.color(),
                    0, 0, this.width(), this.height());
                break;
        }
    },

}
Inheritance.setExtends(XBlock, 'XBlock', XNode.klass);
