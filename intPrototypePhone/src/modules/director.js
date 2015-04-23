//@module

var KPRObject = require("modules/kpr/kprobject");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

var Screen = require("modules/screen");
var AppStyle = require("modules/ui/appstyle");

exports.run = function(application, screen, appstyle) {
    Test.invariant(
        Types.instanceOf(screen, Screen.klass),
        'The screen argument must be a Screen.'
    );
    Test.invariant(
        appstyle === undefined || Types.instanceOf(appstyle, AppStyle.klass),
        'The screen appstyle, if defined, must be an AppStyle.'
    );

    var director = new Director(application);
    if (appstyle !== undefined) {
        director.setAppStyle(appstyle);
    }

    var ApplicationBehavior = function(content, data) {
        Behavior.call(this, content, data);
    }
    ApplicationBehavior.prototype = Object.create(
        Behavior.prototype, {
            onLaunch: { value: function(application) {
                director.init(screen);
            }},
            onQuit: { value: function(application) {
                director.die();
            }},
            onAdapt: { value: function(application) {
                director.rotated();
            }},
        }
    );
    application.behavior = new ApplicationBehavior(application);
}

var Director = function(application) {
    this.__application = application;
    this.__screens = [];
    this.__dimensions = null;
    this.__appstyle = AppStyle.getDefault();

    this.__resizeTester = KPRObject.make();
    this.__resizeTester.addToKPRContainer(application);
    this.__resizeTester.setCoordinates({ left: 0, top: 0, right: 0, bottom: 0 });
    this.__resizeTester.registerCallback(
        'onComplete',
        Callback.make(this.__resizeTest, this)
    );

}
Director.prototype = {

/* Public members */

    application: function() { return this.__application; },
    appStyle: function() { return this.__appstyle; },
    setAppStyle: function(appstyle) { this.__appstyle = appstyle; },
    dimensions: function() { return this.__dimensions; },

    init: function(startScreen) {
        this.__application.skin = new Skin({ fill: "#000" });

        this.__dimensions = this.__resizeTester.getSize();
        this.__resizeTester.wait(10);

        this.addScreen(startScreen);
    },

    die: function() {
        // Nothing to do.
    },

    resized: function() {
        for (var i = 0; i < this.__screens.length; i += 1) {
            var screen = this.__screens[i];
            screen.resized(this.__dimensions);
        }
    },

    rotated: function() {
        // Nothing to do.
    },

    addScreen: function(screen) {
        this.__screens.push(screen);
        screen.init(this);
        this.resetEnabledScreens();
    },

    popScreen: function() {
        if (this.__screens.length == 0) {
            return;
        }
        var removed = this.__screens.pop();
        removed.remove();
        this.resetEnabledScreens();
    },

    resetEnabledScreens: function() {
        var topIndex = this.__screens.length - 1;
        for (var i = topIndex; i >= 0; i -= 1) {
            var screen = this.__screens[i];
            screen.setFocus(i == topIndex);
        }
    },

/* Private members */

    __resizeTest: function() {
        var curDim = this.__resizeTester.getSize();
        if (!Util.isEqual(curDim, this.__dimensions)) {
            this.__dimensions = curDim;
            this.resized();
        }
        this.__resizeTester.wait(10);
    },

    __application: null,
    __screens: null,
    __appstyle: null,
    __dimensions: null,
    __resizeTester: null,

}
Inheritance.setExtends(Director, 'Director', Object);
