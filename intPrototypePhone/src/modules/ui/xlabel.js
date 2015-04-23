//@module

var Keyboard = require("modules/kpr/keyboard");
var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Callback = require("modules/meta/callback");
var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");

var XNode = require("modules/ui/xnode");

/**
 * Enum representing the styles the button can be drawn in.
 */
exports.HAlign = Enum.create([
    'LEFT',
    'MIDDLE',
    'RIGHT',
]),

exports.klass = XTitleBar /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__width = null;
    this.__text = null;
    this.__color = null;
    this.__fontHeight = null;
    this.__halign = exports.HAlign.LEFT;
}
XTitleBar.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,
    __width: null,
    __text: null,
    __color: null,
    __fontHeight: null,
    __halign: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    x: function() { return this.__x; },
    setX: function(x) { this.__x = x; return this; },

    y: function() { return this.__y; },
    setY: function(y) { this.__y = y; return this; },

    width: function() { return this.__width; },
    setWidth: function(w) { this.__width = w; return this; },

    text: function() { return this.__text; },
    setText: function(t) {
        this.__text = t;
        this.drawToRenderTarget();
        return this;
    },

    color: function() {
        return this.__color === null
            ? this.appstyle().textColor()
            : this.__color;
    },
    setColor: function(c) {
        this.__color = c;
        this.drawToRenderTarget();
        return this;
    },

    fontHeight: function() {
        return this.__fontHeight === null
            ? this.appstyle().defaultFontSize()
            : this.__fontHeight;
    },
    setFontHeight: function(h) {
        this.__fontHeight = h;
        this.drawToRenderTarget();
        return this;
    },

    hAlign: function() { return this.__halign; },
    setHAlign: function(h) {
        Test.invariant(exports.HAlign.isValid(h), 'Invalid style given.');
        this.__halign = h;
        return this;
    },

    /* END OF CONFIG FUNCTIONS */

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        this.__kpr = KPRObject.make(true);
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setCoordinates({
            left: this.__x, width: this.width(),
            top: this.__y, height: this.fontHeight(),
        });

        this.__rdt = new RenderTarget.klass();
        this.__rdt.addToKPRObject(this.__kpr);
        this.__rdt.setDimensions(this.width(), this.fontHeight());
        this.drawToRenderTarget();
    },

    drawToRenderTarget: function() {
        if (this.__rdt === null) {
            return;
        }
        this.__rdt.clear();
        this.__rdt.setFont(this.appstyle().defaultFont(this.fontHeight()));
        var textWidth = this.__rdt.textWidth(this.text());
        switch (this.__halign) {
            case exports.HAlign.LEFT:
                this.__rdt.fillText(this.text(),
                    0, 0, this.color());
                break;
            case exports.HAlign.MIDDLE:
                this.__rdt.fillText(this.text(),
                    (this.width() - textWidth) / 2, 0,
                    this.color());
                break;
            case exports.HAlign.RIGHT:
                this.__rdt.fillText(this.text(),
                    this.width() - textWidth, 0,
                    this.color());
                break;
        }
    },

}
Inheritance.setExtends(XTitleBar, 'XTitleBar', XNode.klass);
