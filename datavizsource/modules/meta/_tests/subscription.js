//@module

var Inheritance = require("modules/meta/inheritance");
var Subscription = require("modules/meta/subscription");

/**
 * Tests for the callback module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-SUBSCRIPTION TESTS--------');

    var service = Subscription.createService();
    var sub = function(name) {
        this._name = name
    };
    sub.prototype = {
        _name: null,
        receiveMessage: function(sender, message) {
            out.log('[' + this._name + '] got message from [' + sender._name
                + '] saying [' + message + ']');
        },
    };
    Inheritance.setExtends(sub, 'sub', Object);

    var sA = new sub('a');
    var sB = new sub('b');

    var keyA = service.subscribe(sA);
    var keyB = service.subscribe(sB);
    service.broadcast(sA, 'Message 1');
    service.broadcast(sB, 'Message 2');
    service.unsubscribe(keyB);
    service.broadcast(sA, 'Message 3');
    service.broadcast(sB, 'Message 4');

    out.log('-----------------------END-');
}
