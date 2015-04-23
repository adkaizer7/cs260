//@module

var Keyboard = require("modules/kpr/keyboard");
var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Callback = require("modules/meta/callback");
var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var List = require("modules/meta/list");
var Test = require("modules/meta/test");
var Timeout = require("modules/meta/timeout");
var Util = require("modules/meta/util");

var TextInputPopUpScreen = require("modules/screens/textinputpopupscreen");

var XNode = require("modules/ui/xnode");

/**
 * Enum representing the styles the picker can be drawn in.
 */
exports.Styles = Enum.create([
    'ROUND',
    'RECT',
]),

exports.klass = XPicker /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__rdt = null;

    this.__pickerKpr = null;
    this.__pickerRdt = null;

    this.__x = 0;
    this.__y = 0;
    this.__fillWidth = false;
    this.__width = 292;

    this.__pSpeed = 15;
    this.__pHeight = 170;

    this.__promptText = null;
    this.__items = new List.klass();
    this.__scrollY = 0;
    this.__selectedIndex = null;
    this.__style = null;
    this.__startTextXOffset = 15;

    this.__prevMouseY = null;
    this.__tweenTimeout = null;

    this.__customItem = null;
    this.__customItemValue = null;

    this.__active = false;

    this.__callbacks = [];
}
XPicker.prototype = {

/* Private members */

    __kpr: null,
    __rdt: null,

    __pickerKpr: null,
    __pickerRdt: null,

    __x: null,
    __y: null,
    __fillWidth: null,
    __width: null,

    __pSpeed: null,
    __pHeight: null,

    __promptText: null,
    __items: null,
    __scrollY: null,
    __selectedIndex: null,
    __style: null,
    __startTextXOffset: null,

    __prevMouseY: null,
    __tweenTimeout: null,

    __customItem: null,
    __customItemValue: null,

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

    pSpeed: function() { return this.__pSpeed; },
    setPSpeed: function(h) { this.__pSpeed = h; return this; },

    pHeight: function() { return this.__pHeight; },
    setPHeight: function(h) { this.__pHeight = h; return this; },

    promptText: function() { return this.__promptText; },
    setPromptText: function(t) { this.__promptText = t; return this; },

    items: function() { return this.__items; },
    setItems: function(i) { this.__items = i; return this; },

    selectedIndex: function() { return this.__selectedIndex; },
    setSelectedIndex: function(i) { this.__selectedIndex = i; return this; },

    startTextXOffset: function() { return this.__startTextXOffset; },
    setStartTextXOffset: function(t) { this.__startTextXOffset = t; return this; },

    style: function() { return this.__style; },
    setStyle: function(s) {
        Test.invariant(exports.Styles.isValid(s), 'Invalid style given.');
        this.__style = s;
        return this;
    },

    enableCustomItem: function(text) {
        this.__customItem = text;
        return this;
    },

    addCallback: function(c) { this.__callbacks.push(c); return this; },

    /* END OF CONFIG FUNCTIONS */

    prevMouseY: function() { return this.__prevMouseY; },
    setPrevMouseY: function(y) { this.__prevMouseY = y; },

    scrollY: function() { return this.__scrollY; },
    setScrollY: function(y) { this.__scrollY = y; },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    resizeSelf: function(dim) {
        if (this.__fillWidth) {
            this.__width = dim.width;
            var fieldHeight = this.appstyle().pickerPaddingTop()
                + this.appstyle().pickerPaddingBottom()
                + this.appstyle().defaultFontSize();
            this.__kpr.setCoordinates({
                left: this.__x, width: this.width(),
                top: this.__y, height: fieldHeight,
            });
            this.__rdt.setDimensions(this.width(), fieldHeight);
            this.drawToRenderTarget();
        }
        if (this.__active) {
            var dirDim = this.director().dimensions();
            if (this.pickerTop() < dirDim.height - this.pHeight()) {
                this.setPickerTop(dirDim.height - this.pHeight());
            }
        }
        return dim;
    },

    addSelfToParent: function() {
        var fieldHeight = this.appstyle().pickerPaddingTop()
            + this.appstyle().pickerPaddingBottom()
            + this.appstyle().defaultFontSize();

        if (this.__style === null) {
            this.__style = this.appstyle().defaultPickerStyle();
        }

        // Interface

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

        this.__rdt = new RenderTarget.klass();
        this.__rdt.addToKPRObject(this.__kpr);
        this.__rdt.setDimensions(this.width(), fieldHeight);
        this.drawToRenderTarget();

        // Picker

        if (this.selectedIndex() === null) {
            this.setSelectedIndex(0);
        }
        this.setScrollY(this.selectedIndex() * this.pickerLineHeight());

        var dim = this.director().dimensions();
        this.__pickerKpr = KPRObject.make(true);
        this.__pickerKpr.setCoordinates({
            left: 0, width: dim.width,
            top: dim.height, height: this.pHeight(),
        });
        this.__pickerKpr.setSkin(new Skin('#fff'));
        this.__pickerKpr.registerCallback(
            'onTouchBegan',
            Callback.make(this.kprPickerOnTouchBegan, this)
        );
        this.__pickerKpr.registerCallback(
            'onTouchEnded',
            Callback.make(this.kprPickerOnTouchEnded, this)
        );
        this.__pickerKpr.registerCallback(
            'onTouchMoved',
            Callback.make(this.kprPickerOnTouchMoved, this)
        );

        this.__pickerRdt = new RenderTarget.klass();
        this.__pickerRdt.addToKPRObject(this.__pickerKpr);
        this.__pickerRdt.setDimensions(dim.width, this.pHeight());
        this.drawToPickerTarget();
    },

    activate: function() {
        if (!this.__active) {
            this.__active = true;
            this.__pickerKpr.addToKPRContainer(this.application());
            this.tweenPickerOn();
        }
    },

    inactivate: function() {
        if (this.__active) {
            this.__active = false;
            this.tweenPickerOff();
            if (this.countOfItems() - 1 == this.selectedIndex()) {
                this.director().addScreen(new TextInputPopUpScreen.klass(
                    Callback.make(this.returnFromPopUp, this),
                    this.__customItem
                ));
            } else {
                for (i in this.__callbacks) {
                    this.__callbacks[i].call(this.items().item(this.selectedIndex()));
                }
            }
        }
    },

    returnFromPopUp: function(text) {
        for (i in this.__callbacks) {
            this.__callbacks[i].call(text);
        }
        if (text === null) {
            return;
        }
        this.items().appendChild(text);
        this.drawToRenderTarget();
        this.drawToPickerTarget();
    },

    pickerTop: function() {
        return this.__pickerKpr.kprObj().coordinates.top;
    },
    setPickerTop: function(top) {
        var temp = this.__pickerKpr.kprObj().coordinates;
        temp.top = top;
        this.__pickerKpr.kprObj().coordinates = temp;
    },

    tweenPickerOn: function() {
        var dim = this.director().dimensions();
        this.setPickerTop(this.pickerTop() - this.pSpeed());
        if (this.pickerTop() < dim.height - this.pHeight()) {
            this.setPickerTop(dim.height - this.pHeight());
        } else if (this.__active) {
            Timeout.set(Callback.make(this.tweenPickerOn, this), 16);
        }
    },

    tweenPickerOff: function() {
        var dim = this.director().dimensions();
        this.setPickerTop(this.pickerTop() + this.pSpeed());
        if (this.pickerTop() > dim.height) {
            this.__pickerKpr.removeSelf();
        } else if (!this.__active) {
            Timeout.set(Callback.make(this.tweenPickerOff, this), 16);
        }
    },

    kprOnTouchBegan: function(label, id, x, y, ticks) {
        if (!this.focus()) {
            return;
        }
        this.activate();
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

    kprPickerOnTouchBegan: function(label, id, x, y, ticks) {
        if (this.__tweenTimeout !== null) {
            Timeout.stop(this.__tweenTimeout);
            this.__tweenTimeout = null;
        }
        this.setPrevMouseY(y);
    },

    kprPickerOnTouchEnded: function(label, id, x, y, ticks) {
        this.kprPickerOnTouchMoved(label, id, x, y, ticks);
        this.tweenToSelectedIndex();
    },

    kprPickerOnTouchMoved: function(label, id, x, y, ticks) {
        var dY = y - this.prevMouseY();
        var sy = this.scrollY() - dY;
        this.setScrollY(Math.max(0, Math.min(sy,
            (this.countOfItems() - 1) * this.pickerLineHeight()
        )));
        this.setPrevMouseY(y);

        this.setSelectedIndex(
            Math.round(this.scrollY() / this.pickerLineHeight())
        );

        this.drawToPickerTarget();
    },

    tweenToSelectedIndex: function() {
        var target = this.pickerLineHeight() * this.selectedIndex();
        if (Math.abs(this.scrollY() - target) < 1) {
            this.setScrollY(target);
            this.__tweenTimeout = null;
        } else {
            this.setScrollY(target + ((this.scrollY() - target) * 0.9));
            this.__tweenTimeout = Timeout.set(
                Callback.make(this.tweenToSelectedIndex, this), 16);
        }
        this.drawToPickerTarget();
    },

    drawToRenderTarget: function() {
        this.__rdt.clear();
        var fieldHeight = this.appstyle().pickerPaddingTop()
            + this.appstyle().pickerPaddingBottom()
            + this.appstyle().defaultFontSize();
        if (this.selectedIndex() !== null
            && (this.items().item(this.selectedIndex()) !== null
                || this.__customItemValue !== null)) {
            var text = this.items().item(this.selectedIndex());
            if (text === null) {
                text = this.__customItemValue;
            }
            this.__rdt.setFont(this.appstyle().defaultFont());
            this.__rdt.fillText(text,
                this.startTextXOffset(),
                this.appstyle().pickerPaddingTop(),
                this.appstyle().inputColor());
        } else if (this.promptText() !== null) {
            this.__rdt.setFont(this.appstyle().defaultFont());
            this.__rdt.fillText(this.promptText(),
                this.startTextXOffset(),
                this.appstyle().pickerPaddingTop(),
                this.appstyle().inactiveColor());
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

    countOfItems: function() {
        var b = (this.__customItem !== null);
        return this.items().length() + (b ? 1 : 0);
    },

    pickerLineHeight: function() {
        return this.appstyle().defaultFontSize() + this.appstyle().pickerItemPadding();
    },

    drawToPickerTarget: function() {
        this.__pickerRdt.clear();
        var midX = this.__pickerRdt.width() / 2;
        var midY = this.__pickerRdt.height() / 2;
        var lineHeight = this.pickerLineHeight();
        var halfRounded = Math.round(lineHeight / 2);

        var b = (this.__customItem !== null);
        for (var i = 0; i < this.items().length() + (b ? 1 : 0); i += 1) {
            var item = this.items().item(i);
            if (i == this.items().length()) {
                item = this.__customItem;
            }
            this.__pickerRdt.setFont(this.appstyle().defaultFont());
            var width = this.__pickerRdt.textWidth(item);
            var color = this.selectedIndex() == i
                ? this.appstyle().inputColor()
                : this.appstyle().inactiveColor();
            this.__pickerRdt.fillText(item, midX - (width / 2),
                midY - this.scrollY() - (this.appstyle().defaultFontSize() / 2)
                    + (i * this.pickerLineHeight()),
                color);
        }

        this.__pickerRdt.drawLine(this.appstyle().inactiveColor(), 0,
            midY - halfRounded, this.__pickerRdt.width(),
            midY - halfRounded, 1);
        this.__pickerRdt.drawLine(this.appstyle().inactiveColor(), 0,
            midY + halfRounded, this.__pickerRdt.width(),
            midY + halfRounded, 1);

        this.__pickerRdt.drawLine(this.appstyle().inactiveColor(), 0, 0,
            this.__pickerRdt.width(), 0, 1);
    },

}
Inheritance.setExtends(XPicker, 'XPicker', XNode.klass);
