//@module

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

/**
 * This module allows for services that one can subscribe to if they implement
 * the Listener interface. Allows for broadcasting of messages to all of the
 * subscriptions who can then filter based on the message contents. The method
 * is 'createService.'
 */

/**
 * The Listener interface that objects must implement to subscribe.
 */
exports.Listener = Inheritance.createInterface([
    /**
     * This function should take two arguments. The first should be the sender
     * of the message. The second should be the message itself.
     */
    'receiveMessage',
]);

/**
 * The Service object that allows subscription, unsubscription, and
 * broadcasting.
 */
var Service = function() {
    this._subscribers = [];
};
Service.prototype = {
    /* Private members */

    _subscribers: null,

    /* Public members */

    /**
     * This method takes a Callback object as the one and only argument. It
     * returns the key that you use to unsubscribe from the service.
     */
    subscribe: function(listener) {
        Test.invariant(
            exports.Listener.implementedBy(listener),
            'Argument LISTENER did not implement interface Listener.'
        );
        for (var i = 0; i < this._subscribers.length; i += 1) {
            if (this._subscribers[i] === null) {
                this._subscribers[i] = listener;
                return i;
            }
        }
        return this._subscribers.push(listener) - 1;
    },

    /**
     * This method allows unsubscription from the service. It takes the key
     * given by the 'subscribe' object as its one and only argument.
     */
    unsubscribe: function(key) {
        Test.invariant(
            Types.isNumber(key) && key >= 0 && key < this._subscribers.length,
            'Invalid parameter key given to Service.unsubscribe.'
        );
        Test.invariant(
            this._subscribers[key] !== null,
            'Parameter key was already unsubscribed.'
        );
        this._subscribers[key] = null;
    },

    /**
     * This method allows broadcasting a message to all the subscribers,
     * including the sender, if the sender is subscribed. It takes two
     * arguments, the sender and the message. These are then passed directly to
     * each of the callbacks.
     */
    broadcast: function(sender, message) {
        this._subscribers.forEach(function(listener) {
            if (listener === null) {
                return;
            }
            listener.receiveMessage(sender, message);
        });
    }
};
Inheritance.setExtends(Service, 'Service', Object);

/**
 * Creates the service object. Takes no arguments. See documentation on the
 * Service object.
 */
exports.createService = function() {
    return new Service();
}
