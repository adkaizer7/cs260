//@module

var Screen = require("modules/screen");
var ResourceManager = require("modules/resourcemanager");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Timeout = require("modules/meta/timeout");
var Util = require("modules/meta/util");

var XCanvas = require("modules/ui/xcanvas");

exports.klass = TextInputPopUpScreen = function(promise, cb) {
    Screen.klass.apply(this);
    this.__promise = promise;
    this.__cb = cb;
    this.__rt = null;
    this.__step = 0;

    this.__promise.then(Callback.make(
        this.__done, this
    ));
}
TextInputPopUpScreen.prototype = {
    initKPR: function() {
        this.setBackgroundColor('rgba(0, 0, 0, 0.2)');
        this.__canvas = (new XCanvas.klass())
            .setX(0).setY(0).setWidth(322).setHeight(536)
            .setDraw(Callback.make(this.__drawToCanvas, this));
        this.add(this.__canvas);
    },

    __cb: null,
    __promise: null,
    __rt: null,
    __step: null,

    __drawToCanvas: function(renderTarget) {
        this.__step++;
        renderTarget = Util.deflt(renderTarget, this.__rt);
        this.__rt = renderTarget;
        var texture = ResourceManager.get()
            .loadTexture('modules/screens/assets/loading.png');
        renderTarget.clear();
        renderTarget.ctx().save();
        renderTarget.ctx().translate(322 / 2, 536 / 2);
        renderTarget.ctx().rotate(-Math.PI * this.__step / 4);
        renderTarget.ctx().drawImage(texture, -64 / 2, -64 / 2, 64, 64);
        renderTarget.ctx().restore();
        Timeout.set(Callback.make(this.__drawToCanvas, this), 50);
    },

    __done: function() {
        this.director().popScreen();
        this.__cb.apply(arguments);
    },
}
Inheritance.setExtends(TextInputPopUpScreen, 'TextInputPopUpScreen', Screen.klass);
