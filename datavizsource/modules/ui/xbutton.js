//@module

var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");
var SpriteSheet = require("modules/kpr/spritesheet");

var Callback = require("modules/meta/callback");
var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Rect = require("modules/meta/rect");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

var XNode = require("modules/ui/xnode");

var ResourceManager = require("modules/resourcemanager");

/**
 * Enum representing the styles the button can be drawn in.
 */
exports.Styles = Enum.create([
    'LINE_ROUND',
    'FILL_ROUND',
    'LINE_RECT',
    'FILL_RECT',
    'TEXTURE',
]),

exports.klass = XButton /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__fillWidth = false;
    this.__width = null;
    this.__height = null;
    this.__text = null;
    this.__style = null;
    this.__disabled = false;
    this.__pressed = false;

    this.__spritesheet = null;
    this.__texVar1 = null;
    this.__texVar2 = null;
    this.__texVar3 = null;

    this.__callbacks = [];
    this.__cbData = undefined;
}
XButton.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,

    __fillWidth: null,
    __width: null,
    __height: null,
    __text: null,
    __style: null,
    __disabled: null,
    __pressed: null,
    __disabledColor: null,

    __spritesheet: null,
    __texVar1: null,
    __texVar2: null,
    __texVar3: null,

    __callbacks: null,
    __cbData: null,

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

    height: function() { return this.__height; },
    setHeight: function(h) { this.__height = h; return this; },

    text: function() { return this.__text; },
    setText: function(t) {
        this.__text = t;
        if (this.__kpr !== null) {
            this.drawToRenderTarget();
        }
        return this;
    },

    style: function() { return this.__style; },
    setStyle: function(s) {
        Test.invariant(exports.Styles.isValid(s), 'Invalid style given.');
        this.__style = s;
        return this;
    },

    disabled: function() { return this.__disabled; },
    setDisabled: function(b) {
        this.__disabled = b;
        if (b) {
            this.__pressed = false;
        }
        this.drawToRenderTarget();
        return this;
    },

    disabledColor: function() {
        if (this.__disabledColor === null) {
            this.__disabledColor = this.appstyle().inactiveColor();
        }
        return this.__disabledColor;
    },
    setDisabledColor: function(c) {
        this.__disabledColor = c;
        this.drawToRenderTarget();
        return this;
    },

    addCallback: function(c) { this.__callbacks.push(c); return this; },
    setCallbackData: function(d) { this.__cbData = d; return this; },

    // Indices: Unpressed, pressed, disabled (optional)
    setTextures: function(arg0, arg1, arg2, arg3) {
        if (Types.instanceOf(arg0, SpriteSheet.klass)) {
            this.__spritesheet = arg0;
            this.__texVar1 = Util.deflt(arg1, 0);
            this.__texVar2 = Util.deflt(arg2, 1);
            this.__texVar3 = Util.deflt(arg3, 2);
        } else if (Types.instanceOf(arg1, Rect.klass)) {
            this.__spritesheet = arg0;
            this.__texVar1 = arg1;
            this.__texVar2 = arg2;
            this.__texVar3 = arg3;
        } else {
            this.__texVar1 = arg0;
            this.__texVar2 = arg1;
            this.__texVar3 = arg2;
        }
        return this;
    },

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

    buttonHeight: function() {
        if (this.height() !== null) {
            return this.height();
        }
        return this.appstyle().buttonPaddingTop()
            + this.appstyle().buttonPaddingBottom()
            + this.appstyle().defaultFontSize();
    },

    resizeSelf: function(dim) {
        if (this.__fillWidth) {
            this.__width = dim.width;
            this.__kpr.setCoordinates({
                left: this.__x, width: this.width(),
                top: this.__y, height: this.buttonHeight(),
            });
            this.__rdt.setDimensions(this.width(), this.buttonHeight());
            this.drawToRenderTarget();
        }
        return dim;
    },

    addSelfToParent: function() {
        if (this.__style === null) {
            this.__style = this.appstyle().defaultButtonStyle();
        }

        if (this.style() === exports.Styles.TEXTURE) {
            if (Types.instanceOf(this.__spritesheet, SpriteSheet.klass)) {
                if (this.width() === null) {
                    this.setWidth(
                        this.__spritesheet.frame(this.__texVar1).width());
                }
                if (this.height() === null) {
                    this.setHeight(
                        this.__spritesheet.frame(this.__texVar1).height());
                }
            } else if (Types.instanceOf(this.__texVar1, Rect.klass)) {
                if (this.width() === null) {
                    this.setWidth(this.__texVar1.width());
                }
                if (this.height() === null) {
                    this.setHeight(this.__texVar1.height());
                }
            } else {
                if (this.width() === null) {
                    this.setWidth(this.__texVar1.width);
                }
                if (this.height() === null) {
                    this.setHeight(this.__texVar1.height);
                }
            }
        }
        if (this.width() === null) {
            this.setWidth(292);
        }

        this.__kpr = KPRObject.make(true);
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setCoordinates({
            left: this.__x, width: this.width(),
            top: this.__y, height: this.buttonHeight(),
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
        this.__rdt.setDimensions(this.width(), this.buttonHeight());
        this.drawToRenderTarget();
    },

    kprOnTouchBegan: function(label, id, x, y, ticks) {
        if (!this.focus() || this.disabled()) {
            return;
        }
        this.setPressed(true);
    },

    kprOnTouchEnded: function(label, id, x, y, ticks) {
        if (!this.focus() || this.disabled()) {
            return;
        }
        if (this.__kpr.kprObj().hit(x, y)) {
            for (i in this.__callbacks) {
                this.__callbacks[i].call(this.__cbData);
            }
        }
        this.setPressed(false);
    },

    kprOnTouchMoved: function(label, id, x, y, ticks) {
        if (!this.focus() || this.disabled()) {
            return;
        }
        this.setPressed(this.__kpr.kprObj().hit(x, y));
    },

    drawToRenderTarget: function() {
        if (this.__rdt === null) {
            return;
        }
        this.__rdt.clear();
        if (this.style() === exports.Styles.TEXTURE) {
            if (Types.instanceOf(this.__spritesheet, SpriteSheet.klass)) {
                var rect = this.__spritesheet.frame(this.__texVar1);
                if (this.disabled()) {
                    if (this.__texVar3 === undefined) {
                        rect = this.__spritesheet.frame(this.__texVar2);
                    } else {
                        rect = this.__spritesheet.frame(this.__texVar3);
                    }
                } else if (this.pressed()) {
                    rect = this.__spritesheet.frame(this.__texVar2);
                }
                this.__rdt.drawTextureExt(
                    this.__spritesheet.texture(),
                    rect.x(), rect.y(), rect.width(), rect.height(),
                    0, 0, this.width(), this.buttonHeight()
                );
            } else if (Types.instanceOf(this.__texVar1, Rect.klass)) {
                var rect = this.__texVar1;
                if (this.disabled()) {
                    if (this.__texVar3 === undefined) {
                        rect = this.__texVar2;
                    } else {
                        rect = this.__texVar3;
                    }
                } else if (this.pressed()) {
                    rect = this.__texVar2;
                }
                this.__rdt.drawTextureExt(
                    this.__spritesheet,
                    rect.x(), rect.y(), rect.width(), rect.height(),
                    0, 0, this.width(), this.buttonHeight()
                );
            } else {
                var texture = this.__texVar1;
                if (this.disabled()) {
                    if (this.__texVar3 === undefined) {
                        texture = this.__texVar2;
                    } else {
                        texture = this.__texVar3;
                    }
                } else if (this.pressed()) {
                    texture = this.__texVar2;
                }
                this.__rdt.drawTexture(
                    texture,
                    0, 0, this.width(), this.buttonHeight()
                );
            }
            return;
        }
        if (this.pressed()) {
            switch (this.style()) {
                case exports.Styles.LINE_ROUND:
                    this.__rdt.fillRoundedRect(this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight(), 5);
                    break;
                case exports.Styles.FILL_ROUND:
                    this.__rdt.fillRoundedRect(this.appstyle().subActiveColor(),
                        0, 0, this.width(), this.buttonHeight(), 5);
                    break;
                case exports.Styles.LINE_RECT:
                    this.__rdt.fillRectangle(this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight());
                    break;
                case exports.Styles.FILL_RECT:
                    this.__rdt.fillRectangle(this.appstyle().subActiveColor(),
                        0, 0, this.width(), this.buttonHeight());
                    break;
            }
            if (this.text() !== null) {
                this.__rdt.setFont(this.appstyle().defaultFont());
                var textWidth = this.__rdt.textWidth(this.text());
                var color = this.__isLineStyle(this.style())
                    ? this.appstyle().nullColor()
                    : this.appstyle().nullColor();
                this.__rdt.fillText(this.text(),
                    (this.width() - textWidth) / 2,
                    (this.buttonHeight()
                        - this.appstyle().defaultFontSize()) / 2,
                    color);
            }
        } else {
            var style = this.style();
            if (this.disabled()) {
                if (style == exports.Styles.LINE_ROUND) {
                    this.__rdt.fillRoundedRect(this.disabledColor(),
                        0, 0, this.width(), this.buttonHeight(), 5);
                }
                if (style == exports.Styles.LINE_RECT) {
                    this.__rdt.fillRectangle(this.disabledColor(),
                        0, 0, this.width(), this.buttonHeight());
                }
            }
            switch (style) {
                case exports.Styles.LINE_ROUND:
                    this.__rdt.strokeRoundedRect(this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight(), 5);
                    break;
                case exports.Styles.FILL_ROUND:
                    this.__rdt.fillRoundedRect(this.disabled()
	                        ? this.disabledColor()
	                        : this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight(), 5);
                    break;
                case exports.Styles.LINE_RECT:
                    this.__rdt.strokeRectangle(this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight());
                    break;
                case exports.Styles.FILL_RECT:
                    this.__rdt.fillRectangle(this.disabled()
                            ? this.disabledColor()
                            : this.appstyle().activeColor(),
                        0, 0, this.width(), this.buttonHeight());
                    break;
            }
            if (this.text() !== null) {
                this.__rdt.setFont(this.appstyle().defaultFont());
                var textWidth = this.__rdt.textWidth(this.text());
                var color = this.__isLineStyle(style) && !this.disabled()
                    ? this.appstyle().activeColor()
                    : this.appstyle().nullColor();
                this.__rdt.fillText(this.text(),
                    (this.width() - textWidth) / 2,
                    (this.buttonHeight()
                        - this.appstyle().defaultFontSize()) / 2,
                    color);
            }
        }
    },

/* Private members */

    __isLineStyle: function(s) {
        return s == exports.Styles.LINE_ROUND
            || s == exports.Styles.LINE_RECT;
    },

}
Inheritance.setExtends(XButton, 'XButton', XNode.klass);
