//@module

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Timeout = require("modules/meta/timeout");
var Types = require("modules/meta/types");

exports.klass = PaneTransition = function() {
    this.__window = null;
    this.__oldPane = null;
    this.__newPane = null;
    this.__callback = null;
    this.__time = null;
}
PaneTransition.prototype = {

/* Private members */

    __window: null,
    __oldPane: null,
    __newPane: null,
    __callback: null,
    __time: null,

/* Public members */

    window: function() { return this.__window; },
    oldPane: function() { return this.__oldPane; },
    newPane: function() { return this.__newPane; },
    time: function() { return this.__time; },

    start: function(window, oldPane, newPane, callback) {
        this.__window = window;
        this.__oldPane = oldPane;
        this.__newPane = newPane;
        this.__callback = callback;
        this.__time = 0;
        this.step();
    },

    step: function() {
        this.__time += 1;
        if (this.transition()) {
            Timeout.set(Callback.make(this.step, this), 16);
        } else {
            this.end();
        }
    },

    end: function() {
        this.__callback.call();
    },

    transition: Inheritance.unimplemented(PaneTransition, 'transition'),

}
Inheritance.setExtends(PaneTransition, 'PaneTransition', Object);
