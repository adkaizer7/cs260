//@module

var KPRObject = require("modules/kpr/kprobject");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");

var XNode = require("modules/ui/xnode");

exports.klass = XDocument /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__color = null;
}
XDocument.prototype = {

/* Private members */

    __kpr: null,
    __color: null,

/* Public members */

    canHaveChildren: function() { return true; },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        this.__kpr = KPRObject.make(true);
        this.application().add(this.__kpr.kprObj());
        if (this.__color === null) {
            this.__color = this.appstyle().nullColor();
        }
        this.__kpr.setSkin(new Skin(this.__color));
        this.__kpr.setCoordinates({
            left: 0, right: 0,
            top: 0, bottom: 0,
        });
        this.__kpr.setReceiveBackgroundTouches(true);
        this.__kpr.registerCallback(
            'onTouchBegan',
            Callback.make(this.kprOnTouchBegan, this)
        );
    },

    kprOnTouchBegan: function(label, id, x, y, ticks) {
        this.containerTouchEvent(x, y);
    },

    childKPRContainer: function() {
        return this.__kpr;
    },

    setColor: function(color) {
        this.__color = color;
    },

    _internalAdd: function() {
        this.addSelfToParent();
    },

}
Inheritance.setExtends(XDocument, 'XDocument', XNode.klass);
