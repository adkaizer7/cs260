//@module

var KPRLayer = require("modules/kpr/kprlayer");
var KPRObject = require("modules/kpr/kprobject");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

var PaneTransition = require("modules/ui/transitions/panetransition");

var XNode = require("modules/ui/xnode");
var XPane = require("modules/ui/xpane");

exports.klass = XWindow /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__layer = null;

    this.__x = null;
    this.__y = null;
    this.__width = null;
    this.__height = null;
    this.__backColor = null;

    this.__pane = null;
}
XWindow.prototype = {

/* Private members */

    __kpr: null,
    __layer: null,

    __x: null,
    __y: null,
    __width: null,
    __height: null,
    __backColor: null,

    __pane: null,

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

    backColor: function() { return this.__backColor; },
    setBackColor: function(c) { this.__backColor = c; return this; },

    setPane: function(pane, transition) {
        Test.invariant(Types.instanceOf(pane, XPane.klass), 'Must be a XPane.');

        if (this.attached()) {
            Test.invariant(
                Types.instanceOf(transition, PaneTransition.klass),
                'Must be a PaneTransition.'
            );
            this.__children.appendChild(pane);
            pane.setParent(this);
            pane.attach();
            transition.start(this, this.__pane, pane, Callback.make(
                this.transitionEnded, this
            ));
        } else {
            Test.invariant(
                this.__pane === null,
                'You can only transition to a new pane after being attached.'
            );
            this.__pane = pane;
            this.__children.appendChild(pane);
            pane.setParent(this);
        }

        return this;
    },

    /* END OF CONFIG FUNCTIONS */

    canHaveChildren: function() { return false; },

    childKPRContainer: function() {
        return this.__layer;
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        if (this.__backColor === null) {
            this.__backColor = this.appstyle().nullColor();
        }

        this.__kpr = KPRObject.make();
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setSkin(new Skin(this.__backColor));
        this.__kpr.setCoordinates({
            left: this.__x, width: this.__width,
            top: this.__y, height: this.__height,
        });

        this.__layer = KPRLayer.make();
        this.__layer.addToKPRObject(this.__kpr);
        this.__layer.setCoordinates({
            left: 0, right: 0,
            top: 0, bottom: 0,
        });
    },

    transitionEnded: function() {
        this.__children.first().remove();
        this.__pane = this.__children.first();
    },

}
Inheritance.setExtends(XWindow, 'XWindow', XNode.klass);
