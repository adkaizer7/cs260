//@module

var Screen = require("modules/screen");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Util = require("modules/meta/util");

var XBlock = require("modules/ui/xblock");
var XButton = require("modules/ui/xbutton");
var XLabel = require("modules/ui/xlabel");
var XTextField = require("modules/ui/xtextfield");

exports.klass = TextInputPopUpScreen = function(cb, title, help, accept, cancel) {
    Screen.klass.apply(this);
    this.__cb = cb;
    this.__textField = null;
    this.__cancelButton = null;
    this.__acceptButton = null;

    this.__title = title;
    this.__help = Util.deflt(help, 'Tap to enter a value');
    this.__accept = Util.deflt(accept, 'Accept');
    this.__cancel = Util.deflt(cancel, 'Cancel');
}
TextInputPopUpScreen.prototype = {
    initKPR: function() {
        this.setBackgroundColor('rgba(0, 0, 0, 0.2)');
        this.add(
            (new XBlock.klass())
                .setX(10).setY(150).setWidth(302).setHeight(150)
                .setColor(this.appstyle().nullColor())
        );
        this.add(
            (new XLabel.klass())
                .setX(15).setY(165).setWidth(292)
                .setHAlign(XLabel.HAlign.MIDDLE)
                .setText(this.__title)
        );
        this.__textField = (new XTextField.klass())
            .setX(30).setY(200).setWidth(262)
            .setPromptText(this.__help)
            .addCallback(Callback.make(this.__textFieldFinish, this));
        this.add(this.__textField);
        this.__cancelButton = (new XButton.klass())
            .setText(this.__cancel)
            .setX(30).setY(250).setWidth(125)
            .addCallback(Callback.make(this.__cancelPress, this));
        this.add(this.__cancelButton);
        this.__acceptButton = (new XButton.klass())
            .setText(this.__accept)
            .setX(167).setY(250).setWidth(125).setDisabled(true)
            .addCallback(Callback.make(this.__acceptPress, this));
        this.add(this.__acceptButton);
    },

    __cb: null,
    __textField: null,
    __cancelButton: null,
    __acceptButton: null,

    __textFieldFinish: function(text) {
        this.__acceptButton.setDisabled(text === null || text.length == 0);
    },

    __cancelPress: function() {
        this.__cb.call(null);
        this.director().popScreen();
    },

    __acceptPress: function() {
        if (this.__textField.text() !== null) {
            this.__cb.call(this.__textField.text());
            this.director().popScreen();
        }
    },
}
Inheritance.setExtends(TextInputPopUpScreen, 'TextInputPopUpScreen', Screen.klass);
