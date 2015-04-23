//@module

var Keyboard = require("modules/kpr/keyboard");
var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Callback = require("modules/meta/callback");
var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");

var XNode = require("modules/ui/xnode");

exports.klass = XTitleBar /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__fillWidth = false;
    this.__width = 322;
    this.__text = null;
    this.__backButton = false;
    this.__backButtonXOffset = 12;

    this.__pressed = false;
    this.__callbacks = [];
}
XTitleBar.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,

    __fillWidth: null,
    __width: null,
    __text: null,
    __backButton: null,
    __backButtonXOffset: null,

    __pressed: null,
    __callbacks: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    x: function() { return this.__x; },
    setX: function(x) { this.__x = x; return this; },

    y: function() { return this.__y; },
    setY: function(y) { this.__y = y; return this; },

    fillWidth: function() { return this.__fillWidth; },
    setFillWidth: function(b) { this.__fillWidth = b; return this; },

    width: function() { return this.__width; },
    setWidth: function(w) { this.__width = w; return this; },

    text: function() { return this.__text; },
    setText: function(t) { this.__text = t; return this; },

    backButton: function() { return this.__backButton; },
    setBackButton: function(b) { this.__backButton = b; return this; },

    backButtonXOffset: function() { return this.__backButtonXOffset; },
    setBackButtonXOffset: function(b) { this.__backButtonXOffset = b; return this; },

    addCallback: function(c) { this.__callbacks.push(c); return this; },

    /* END OF CONFIG FUNCTIONS */

    pressed: function() { return this.__pressed; },
    setPressed: function(b) {
        if (this.__pressed !== b) {
            this.__pressed = b;
            this.drawToRenderTarget();
        }
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    resizeSelf: function(dim) {
        if (this.__fillWidth) {
            this.__width = dim.width;
            var fieldHeight = this.appstyle().titleBarPaddingTop()
                + this.appstyle().titleBarPaddingBottom()
                + this.appstyle().titleFontSize();
            this.__kpr.setCoordinates({
                left: this.__x, width: this.width(),
                top: this.__y, height: fieldHeight,
            });
            this.__rdt.setDimensions(this.width(), fieldHeight);
            this.drawToRenderTarget();
        }
        return dim;
    },

    addSelfToParent: function() {
        var fieldHeight = this.appstyle().titleBarPaddingTop()
            + this.appstyle().titleBarPaddingBottom()
            + this.appstyle().titleFontSize();

        this.__kpr = KPRObject.make(true);
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setCoordinates({
            left: this.__x, width: this.width(),
            top: this.__y, height: fieldHeight,
        });
        this.__kpr.registerCallback(
            'onTouchBegan',
            Callback.make(this.kprOnTouchBegan, this)
        );
        this.__kpr.registerCallback(
            'onTouchEnded',
            Callback.make(this.kprOnTouchEnded, this)
        );
        this.__kpr.registerCallback(
            'onTouchMoved',
            Callback.make(this.kprOnTouchMoved, this)
        );

        this.__rdt = new RenderTarget.klass();
        this.__rdt.addToKPRObject(this.__kpr);
        this.__rdt.setDimensions(this.width(), fieldHeight);
        this.drawToRenderTarget();
    },

    kprOnTouchBegan: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        var fieldHeight = this.appstyle().titleBarPaddingTop()
            + this.appstyle().titleBarPaddingBottom()
            + this.appstyle().titleFontSize();
        var buttonWidth = (this.backButtonXOffset() * 2) + (fieldHeight / 2)
            - this.appstyle().titleBarPaddingTop();
        this.setPressed(x - label.position.x < buttonWidth);
    },

    kprOnTouchEnded: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        var fieldHeight = this.appstyle().titleBarPaddingTop()
            + this.appstyle().titleBarPaddingBottom()
            + this.appstyle().titleFontSize();
        var buttonWidth = (this.backButtonXOffset() * 2) + (fieldHeight / 2)
            - this.appstyle().titleBarPaddingTop()
        if (this.__kpr.kprObj().hit(x, y)
            && x - label.position.x < buttonWidth) {
            for (i in this.__callbacks) {
                this.__callbacks[i].call();
            }
        }
        this.setPressed(false);
    },

    kprOnTouchMoved: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        var fieldHeight = this.appstyle().titleBarPaddingTop()
            + this.appstyle().titleBarPaddingBottom()
            + this.appstyle().titleFontSize();
        var buttonWidth = (this.backButtonXOffset() * 2) + (fieldHeight / 2)
            - this.appstyle().titleBarPaddingTop()
        this.setPressed(this.__kpr.kprObj().hit(x, y)
            && x - label.position.x < buttonWidth);
    },

    drawToRenderTarget: function() {
        this.__rdt.clear();
        var fieldHeight = this.appstyle().titleBarPaddingTop()
            + this.appstyle().titleBarPaddingBottom()
            + this.appstyle().titleFontSize();
        this.__rdt.fillRectangle(this.appstyle().activeColor(), 0,
            0, this.width(), fieldHeight);
        var tcolor = this.appstyle().nullColor();
        if (this.text() !== null) {
            this.__rdt.setFont(this.appstyle().titleFont());
            var textWidth = this.__rdt.textWidth(this.text());
            this.__rdt.fillText(this.text(),
                (this.width() - textWidth) / 2,
                this.appstyle().titleBarPaddingTop(),
                tcolor);
        }
        if (this.backButton()) {
            if (this.pressed()) {
                tcolor = this.appstyle().inactiveColor();
            }
            var delta = (fieldHeight / 2)
                - this.appstyle().titleBarPaddingTop();
            this.__rdt.drawLine(tcolor,
                this.backButtonXOffset() - 1.5,
                (fieldHeight / 2) + 1.5,
                this.backButtonXOffset() + delta,
                this.appstyle().titleBarPaddingTop(),
                5);
            this.__rdt.drawLine(tcolor,
                this.backButtonXOffset() - 1.5,
                (fieldHeight / 2) - 1.5,
                this.backButtonXOffset() + delta,
                this.appstyle().titleBarPaddingTop()
                    + this.appstyle().titleFontSize(),
                5);
        }
    },

}
Inheritance.setExtends(XTitleBar, 'XTitleBar', XNode.klass);
