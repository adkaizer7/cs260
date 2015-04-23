//@module

var KPRLayer = require("modules/kpr/kprlayer");
var KPRObject = require("modules/kpr/kprobject");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Types = require("modules/meta/types");

var XNode = require("modules/ui/xnode");

exports.klass = XPane /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;
    this.__wrapper = null;
    this.__backColor = null;
}
XPane.prototype = {

/* Private members */

    __kpr: null,
    __wrapper: null,
    __backColor: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    backColor: function() { return this.__backColor; },
    setBackColor: function(c) { this.__backColor = c; return this; },

    /* END OF CONFIG FUNCTIONS */

    canHaveChildren: function() { return true; },

    childKPRContainer: function() {
        return this.__wrapper;
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        if (this.__backColor === null) {
            this.__backColor = this.appstyle().nullColor();
        }

        this.__kpr = KPRLayer.make();
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());
        this.__kpr.setCoordinates({
            left: 0, right: 0,
            top: 0, bottom: 0,
        });

        this.__wrapper = KPRObject.make(true);
        this.__wrapper.addToKPRObject(this.__kpr);
        this.__wrapper.setSkin(new Skin(this.__backColor));
        this.__wrapper.setCoordinates({
            left: 0, right: 0,
            top: 0, bottom: 0,
        });
    },

    setTranslate: function(x, y) {
        this.__kpr.setTranslate(x, y);
    },

}
Inheritance.setExtends(XPane, 'XPane', XNode.klass);
