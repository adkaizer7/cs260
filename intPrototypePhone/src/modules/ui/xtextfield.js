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
 * Enum representing the styles the text field can be drawn in.
 */
exports.Styles = Enum.create([
    'ROUND',
    'RECT',
]),

exports.klass = XTextField /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__fillWidth = false;
    this.__width = 292;
    this.__promptText = null;
    this.__text = null;
    this.__style = null;
    this.__startTextXOffset = 15;
    this.__endTextXOffset = 15;
    this.__scrollOffset = 0;

    this.__callbacks = [];

    this.__active = false;
    this.__cursor = 0;
}
XTextField.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __x: null,
    __y: null,

    __fillWidth: null,
    __width: null,
    __promptText: null,
    __text: null,
    __style: null,
    __startTextXOffset: null,
    __endTextXOffset: null,
    __scrollOffset: null,

    __active: null,

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

    promptText: function() { return this.__promptText; },
    setPromptText: function(t) { this.__promptText = t; return this; },

    text: function() { return this.__text; },
    setText: function(t) { this.__text = t; return this; },

    startTextXOffset: function() { return this.__startTextXOffset; },
    setStartTextXOffset: function(t) { this.__startTextXOffset = t; return this; },

    endTextXOffset: function() { return this.__endTextXOffset; },
    setEndTextXOffset: function(t) { this.__endTextXOffset = t; return this; },

    style: function() { return this.__style; },
    setStyle: function(s) {
        Test.invariant(exports.Styles.isValid(s), 'Invalid style given.');
        this.__style = s;
        return this;
    },

    addCallback: function(c) { this.__callbacks.push(c); return this; },

    /* END OF CONFIG FUNCTIONS */

    setTextAdd: function(index, t) {
        if (this.__text === null) {
            this.__text = t;
        } else {
            this.__text = this.__text.slice(0, index) + t
                + this.__text.slice(index)
        }
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    resizeSelf: function(dim) {
        if (this.__fillWidth) {
            this.__width = dim.width;
            var fieldHeight = this.appstyle().textFieldPaddingTop()
                + this.appstyle().textFieldPaddingBottom()
                + this.appstyle().defaultFontSize();
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
        var fieldHeight = this.appstyle().textFieldPaddingTop()
            + this.appstyle().textFieldPaddingBottom()
            + this.appstyle().defaultFontSize();

        if (this.__style === null) {
            this.__style = this.appstyle().defaultTextFieldStyle();
        }

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
        this.__kpr.registerCallback(
            'onKeyDown',
            Callback.make(this.kprOnKeyDown, this)
        );

        this.__rdt = new RenderTarget.klass();
        this.__rdt.addToKPRObject(this.__kpr);
        this.__rdt.setDimensions(this.width(), fieldHeight);
        this.drawToRenderTarget();
    },

    activate: function() {
        if (!this.__active) {
            this.__active = true;
            Keyboard.setOpen(true);
            this.__kpr.setReceiveKeyboardEvents();
        }
        this.__cursor = 0;
    },

    inactivate: function() {
        if (this.__active) {
            this.__active = false;
            Keyboard.setOpen(false);
            for (i in this.__callbacks) {
                this.__callbacks[i].call(this.text());
            }
        }
    },

    kprOnTouchBegan: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        this.activate();
        this.kprOnTouchMoved(label, id, x, y, ticks);
    },

    kprOnTouchEnded: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        this.kprOnTouchMoved(label, id, x, y, ticks);
    },

    kprOnTouchMoved: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        if (this.text() !== null) {
            var _x = x - (label.position.x + this.startTextXOffset())
                + this.__scrollOffset;
            this.__rdt.setFont(this.appstyle().defaultFont());
            this.__cursor = 0;
            while (this.__rdt.textWidth(this.text().substring(0, this.__cursor))
                <= _x && this.__cursor <= this.text().length) {
                this.__cursor += 1;
            }
            this.scrollToIncludeCursor();
        }
        this.drawToRenderTarget();
    },

    kprOnKeyDown: function(label, key, repeat, ticks) {
        if (!this.focus()) {
            return;
        }
        if (this.__active) {
            if (key) {
                var code = key.charCodeAt(0);
                switch (code) {
                    case 1: /* home */
                        this.__cursor = 0;
                        break;
                    case 2: /* delete selection */
                        this.setText(null);
                        break;
                    case 3: /* enter */
                        this.inactivate();
                        break;
                    case 4: /* end */
                        this.__cursor = this.text().length;
                        break;
                    case 5: /* help */
                        return false;
                    case 8: /* backspace */
                        if (this.text() === null ||this.__cursor == 0) {
                            return false;
                        }
                        this.setText(this.text().slice(0, this.__cursor - 1)
                            + this.text().slice(this.__cursor));
                        this.__cursor -= 1;
                        if (this.text().length === 0) {
                            this.setText(null);
                        }
                        break;
                    case 9: /* tab */
                    case 11: /* page up */
                    case 12: /* page down */
                        return false;
                    case 13: /* return */
                    case 27: /* escape */
                        this.inactivate();
                        break;
                    case 28: /* left */
                        if (this.__cursor > 0) {
                            this.__cursor -= 1;
                        }
                        break;
                    case 29: /* right */
                        if (this.__cursor < this.text().length) {
                            this.__cursor += 1;
                        }
                        break;
                    case 30: /* up */
                    case 31: /* down */
                        return false;
                    case 127: /* delete */
                        if (this.text() === null || this.__cursor == this.text().length) {
                            return false;
                        }
                        this.setText(this.text().slice(0, this.__cursor)
                            + this.text().slice(this.__cursor + 1));
                        if (this.text().length === 0) {
                            this.setText(null);
                        }
                        break;
                    default:
                        if ((Event.FunctionKeyPlay <= code) && (code <= Event.FunctionKeyPower))
                            return false;
                        if (code > 0x000F0000)
                            return false;
                        this.setTextAdd(this.__cursor, key);
                        this.__cursor += 1;
                }
            }
            else {
                this.setText(null);
            }
            this.scrollToIncludeCursor();
            this.drawToRenderTarget();
        }
    },

    scrollToIncludeCursor: function() {
        if (this.text() === null) {
            this.__scrollOffset = 0;
            return;
        }
        var l = this.__rdt.textWidth(this.text().substring(0, this.__cursor))
            - this.__scrollOffset;
        if (l < 0) {
            this.__scrollOffset += l;
        } else {
            var w = this.width() - this.startTextXOffset()
                - this.endTextXOffset();
            if (l > w) {
                this.__scrollOffset += l - w;
            }
        }
    },

    containerTouchEvent: function(x, y) {
        XNode.klass.prototype.containerTouchEvent.call(this, x, y);
        if (this.__active && !this.__kpr.kprObj().hit(x, y)) {
            this.inactivate();
            this.drawToRenderTarget();
        }
    },

    focusChanged: function() {
        if (!this.focus() && this.__active) {
            this.inactivate();
            this.drawToRenderTarget();
        }
    },

    drawToRenderTarget: function() {
        this.__rdt.clear();
        var fieldHeight = this.appstyle().textFieldPaddingTop()
            + this.appstyle().textFieldPaddingBottom()
            + this.appstyle().defaultFontSize();
        if (this.text() !== null) {
            this.__rdt.setFont(this.appstyle().defaultFont());
            this.__rdt.fillText(this.text(),
                this.startTextXOffset() - this.__scrollOffset,
                this.appstyle().textFieldPaddingTop(),
                this.appstyle().inputColor());
            if (this.__active) {
                cX = this.startTextXOffset() + this.__rdt.textWidth(
                    this.text().substring(0, this.__cursor))
                    - this.__scrollOffset;
                this.__rdt.drawLine(this.appstyle().inputColor(), cX,
                    this.appstyle().textFieldPaddingTop(), cX,
                    this.appstyle().textFieldPaddingTop()
                    + this.appstyle().defaultFontSize(), 2);
            }
        } else if (this.promptText() !== null) {
            this.__rdt.setFont(this.appstyle().defaultFont());
            this.__rdt.fillText(this.promptText(),
                this.startTextXOffset(),
                this.appstyle().textFieldPaddingTop(),
                this.appstyle().inactiveColor());
            if (this.__active) {
                cX = this.startTextXOffset();
                this.__rdt.drawLine(this.appstyle().inputColor(), cX,
                    this.appstyle().textFieldPaddingTop(), cX,
                    this.appstyle().textFieldPaddingTop()
                    + this.appstyle().defaultFontSize(), 2);
            }
        }
        switch (this.style()) {
            case exports.Styles.ROUND:
                this.__rdt.strokeRoundedRect(this.appstyle().activeColor(), 0,
                    0, this.width(), fieldHeight, 5);
                break;
            case exports.Styles.RECT:
                this.__rdt.strokeRectangle(this.appstyle().activeColor(), 0,
                    0, this.width(), fieldHeight);
                break;
        }
    },

}
Inheritance.setExtends(XTextField, 'XTextField', XNode.klass);
