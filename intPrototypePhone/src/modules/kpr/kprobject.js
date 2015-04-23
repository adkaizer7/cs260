//@module

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Subscription = require("modules/meta/subscription");
var Util = require("modules/meta/util");

var KPREvents = [
    'onComplete',
    'onCreate',
    'onDisplayed',
    'onDisplaying',
    'onFinished',
    'onFocused',
    'onKeyDown',
    'onKeyUp',
    'onTimeChanged',
    'onTouchBegan',
    'onTouchEnded',
    'onTouchMoved',
    'onTouchCancelled',
    'onTransitionBeginning',
    'onTransitionEnded',
];

var KPRObject = Container.template(function($) { return {
    behavior: Object.create(Behavior.prototype, {
        onComplete: { value: function() {
            $['service'].broadcast(this, ['onComplete', arguments]);
        }},
        onCreate: { value: function() {
            $['service'].broadcast(this, ['onCreate', arguments]);
        }},
        onDisplayed: { value: function() {
            $['service'].broadcast(this, ['onDisplayed', arguments]);
        }},
        onDisplaying: { value: function() {
            $['service'].broadcast(this, ['onDisplaying', arguments]);
        }},
        onFinished: { value: function() {
            $['service'].broadcast(this, ['onFinished', arguments]);
        }},
        onFocused: { value: function() {
            $['service'].broadcast(this, ['onFocused', arguments]);
        }},
        onKeyDown: { value: function() {
            $['service'].broadcast(this, ['onKeyDown', arguments]);
        }},
        onKeyUp: { value: function() {
            $['service'].broadcast(this, ['onKeyUp', arguments]);
        }},
        onTimeChanged: { value: function() {
            $['service'].broadcast(this, ['onTimeChanged', arguments]);
        }},
        onTouchBegan: { value: function() {
            $['service'].broadcast(this, ['onTouchBegan', arguments]);
        }},
        onTouchEnded: { value: function() {
            $['service'].broadcast(this, ['onTouchEnded', arguments]);
        }},
        onTouchMoved: { value: function() {
            $['service'].broadcast(this, ['onTouchMoved', arguments]);
        }},
        onTouchCancelled: { value: function() {
            $['service'].broadcast(this, ['onTouchCancelled', arguments]);
        }},
    }),
}});

var Wrapper = function(touchActive) {
    this._service = Subscription.createService();
    this._service.subscribe(this);

    this._callbacks = {};
    for (var event in KPREvents) {
        this._callbacks[KPREvents[event]] = [];
    }

    this._obj = new KPRObject({
        service: this._service,
    });
    this._obj.active = touchActive;
};
Wrapper.prototype = {
    _obj: null,
    _service: null,
    _callbacks: null,

    kprObj: function() { return this._obj; },

    addToKPRContainer: function(container) { container.add(this._obj); },
    addToKPRObject: function(container) { container._obj.add(this._obj); },

    remove: function(kprobject) { this._obj.remove(kprobject.kprObj()); },
    removeSelf: function() { this._obj.container.remove(this._obj); },

    getSize: function() { return this._obj.size; },
    setCoordinates: function(coords) { this._obj.coordinates = coords; },
    setSkin: function(skin) { this._obj.skin = skin; },
    setReceiveKeyboardEvents: function() { this._obj.focus(); },
    setReceiveBackgroundTouches: function(b) { this._obj.backgroundTouch = b; },
    wait: function(time) { this._obj.wait(time); },
    registerCallback: function(event, cb) {
        Test.invariant(
            KPREvents.indexOf(event) > -1,
            "There is no such event '" + event + "'."
        );
        Test.invariant(
            Callback.isCallback(cb),
            "The given callback is not a Callback."
        );
        this._callbacks[event].push(cb);
    },
    unregisterCallback: function(event, cb) {
        Test.invariant(
            KPREvents.indexOf(event) > -1,
            "There is no such event '" + event + "'."
        );
        Test.invariant(
            Callback.isCallback(cb),
            "The given callback is not a Callback."
        );
        this._callbacks[event].splice(this._callbacks[event].indexOf(cb), 1);
    },
    receiveMessage: function(sender, message) {
        var args = Util.argsAsArray(message[1]);
        for (var cb in this._callbacks[message[0]]) {
            this._callbacks[message[0]][cb].apply(args);
        }
    },
};
Inheritance.setExtends(Wrapper, 'Wrapper', Object);
Subscription.Listener.enforce(Wrapper);

exports.make = function(touchActive) {
    return new Wrapper(touchActive || false);
};
