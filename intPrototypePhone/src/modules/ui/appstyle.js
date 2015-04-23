//@module

var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Util = require("modules/meta/util");

var XBlock = require("modules/ui/xblock");
var XButton = require("modules/ui/xbutton");
var XPicker = require("modules/ui/xpicker");
var XTextField = require("modules/ui/xtextfield");

exports.klass = AppStyle = function() {
    this.__defaultFontSize = null;
    this.__defaultFont = null;
    this.__titleFontSize = null;
    this.__titleFont = null;
    this.__textColor = null;
    this.__inputColor = null;
    this.__activeColor = null;
    this.__subActiveColor = null;
    this.__inactiveColor = null;
    this.__subInactiveColor = null;
    this.__subSubInactiveColor = null;
    this.__nullColor = null;
    this.__defaultButtonStyle = null;
    this.__buttonPaddingTop = null;
    this.__buttonPaddingBottom = null;
    this.__defaultTextFieldStyle = null;
    this.__textFieldPaddingTop = null;
    this.__textFieldPaddingBottom = null;
    this.__defaultPickerStyle = null;
    this.__pickerPaddingTop = null;
    this.__pickerPaddingBottom = null;
    this.__pickerItemPadding = null;
    this.__defaultBlockStyle = null;
    this.__titleBarPaddingTop = null;
    this.__titleBarPaddingBottom = null;
}
AppStyle.prototype = {

/* Public members */

    /* Fonts */

    defaultFontSize: function() { return this.__defaultFontSize; },
    setDefaultFontSize: function(f) { this.__defaultFontSize = f; },

    defaultFont: function(size) {
        size = Util.deflt(size, this.__defaultFontSize);
        return size + 'px "' + this.__defaultFont + '"';
    },
    setDefaultFont: function(f) { this.__defaultFont = f; },

    titleFontSize: function() { return this.__titleFontSize; },
    setTitleFontSize: function(f) { this.__titleFontSize = f; },

    titleFont: function(size) {
        size = Util.deflt(size, this.__titleFontSize);
        return size + 'px "' + this.__titleFont + '"';
    },
    setTitleFont: function(f) { this.__titleFont = f; },

    /* Colors */

    textColor: function() { return this.__textColor; },
    setTextColor: function(c) { this.__textColor = c; },

    inputColor: function() { return this.__inputColor; },
    setInputColor: function(c) { this.__inputColor = c; },

    activeColor: function() { return this.__activeColor; },
    setActiveColor: function(c) { this.__activeColor = c; },

    subActiveColor: function() { return this.__subActiveColor; },
    setSubActiveColor: function(c) { this.__subActiveColor = c; },

    inactiveColor: function() { return this.__inactiveColor; },
    setInactiveColor: function(c) { this.__inactiveColor = c; },

    subInactiveColor: function() { return this.__subInactiveColor; },
    setSubInactiveColor: function(c) { this.__subInactiveColor = c; },

    subSubInactiveColor: function() { return this.__subSubInactiveColor; },
    setSubSubInactiveColor: function(c) { this.__subSubInactiveColor = c; },

    nullColor: function() { return this.__nullColor; },
    setNullColor: function(c) { this.__nullColor = c; },

    /* Button */

    defaultButtonStyle: function() { return this.__defaultButtonStyle; },
    setDefaultButtonStyle: function(s) { this.__defaultButtonStyle = s; },

    buttonPaddingTop: function() { return this.__buttonPaddingTop; },
    setButtonPaddingTop: function(p) { this.__buttonPaddingTop = p; },

    buttonPaddingBottom: function() { return this.__buttonPaddingBottom; },
    setButtonPaddingBottom: function(p) { this.__buttonPaddingBottom = p; },

    /* Text field */

    defaultTextFieldStyle: function() { return this.__defaultTextFieldStyle; },
    setDefaultTextFieldStyle: function(s) { this.__defaultTextFieldStyle = s; },

    textFieldPaddingTop: function() { return this.__textFieldPaddingTop; },
    setTextFieldPaddingTop: function(p) { this.__textFieldPaddingTop = p; },

    textFieldPaddingBottom: function() { return this.__textFieldPaddingBottom; },
    setTextFieldPaddingBottom: function(p) { this.__textFieldPaddingBottom = p; },

    /* Picker */

    defaultPickerStyle: function() { return this.__defaultPickerStyle; },
    setDefaultPickerStyle: function(s) { this.__defaultPickerStyle = s; },

    pickerPaddingTop: function() { return this.__pickerPaddingTop; },
    setPickerPaddingTop: function(p) { this.__pickerPaddingTop = p; },

    pickerPaddingBottom: function() { return this.__pickerPaddingBottom; },
    setPickerPaddingBottom: function(p) { this.__pickerPaddingBottom = p; },

    pickerItemPadding: function() { return this.__pickerItemPadding; },
    setPickerItemPadding: function(p) { this.__pickerItemPadding = p; },

    /* Block */

    defaultBlockStyle: function() { return this.__defaultBlockStyle; },
    setDefaultBlockStyle: function(s) { this.__defaultBlockStyle = s; },

    /* Title bar */

    titleBarPaddingTop: function() { return this.__titleBarPaddingTop; },
    setTitleBarPaddingTop: function(p) { this.__titleBarPaddingTop = p; },

    titleBarPaddingBottom: function() { return this.__titleBarPaddingBottom; },
    setTitleBarPaddingBottom: function(p) { this.__titleBarPaddingBottom = p; },

/* Private members */

    __defaultFontSize: null,
    __defaultFont: null,
    __titleFontSize: null,
    __titleFont: null,

    __textColor: null,
    __inputColor: null,
    __activeColor: null,
    __subActiveColor: null,
    __inactiveColor: null,
    __subInactiveColor: null,
    __subSubInactiveColor: null,
    __nullColor: null,

    __defaultButtonStyle: null,
    __buttonPaddingTop: null,
    __buttonPaddingBottom: null,

    __defaultTextFieldStyle: null,
    __textFieldPaddingTop: null,
    __textFieldPaddingBottom: null,

    __defaultPickerStyle: null,
    __pickerPaddingTop: null,
    __pickerPaddingBottom: null,
    __pickerItemPadding: null,

    __defaultBlockStyle: null,

    __titleBarPaddingTop: null,
    __titleBarPaddingBottom: null,

}
Inheritance.setExtends(AppStyle, 'AppStyle', Object);

exports.getDefault = function() {
    var ret = new AppStyle();

    ret.setDefaultFontSize(21);
    ret.setDefaultFont('Open Sans');
    ret.setTitleFontSize(24);
    ret.setTitleFont('Open Sans');

    ret.setTextColor('#000000');
    ret.setInputColor('#000000');
    ret.setActiveColor('#0076FF');
    ret.setSubActiveColor('#245EA0');
    ret.setInactiveColor('#8E8E93');
    ret.setSubInactiveColor('#DEDEE2');
    ret.setSubSubInactiveColor('#F2F2F2');
    ret.setNullColor('#FFFFFF');

    ret.setDefaultButtonStyle(XButton.Styles.LINE_ROUND);
    ret.setButtonPaddingTop(8);
    ret.setButtonPaddingBottom(8);

    ret.setDefaultTextFieldStyle(XTextField.Styles.ROUND);
    ret.setTextFieldPaddingTop(8);
    ret.setTextFieldPaddingBottom(8);

    ret.setDefaultPickerStyle(XPicker.Styles.ROUND);
    ret.setPickerPaddingTop(8);
    ret.setPickerPaddingBottom(8);
    ret.setPickerItemPadding(8);

    ret.setDefaultBlockStyle(XBlock.Styles.FILL_ROUND);

    ret.setTitleBarPaddingTop(12);
    ret.setTitleBarPaddingBottom(12);

    return ret;
}
