//@module

var Callback = require("modules/meta/callback");
var Promise = require("modules/meta/promise");

/**
 * Tests for the callback module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-PROMISE TESTS--------');

    var defer = Promise.makeDeferral();
    var promise = defer.getPromise();
    context = { out: out, Promise: Promise };
    context.context = context;
    promise.then(
        Callback.make(function() {
            this.out.log('Hello');

            var defer = this.Promise.makeDeferral();
            var promise = defer.getPromise();
            promise.then(
                Callback.make(function() {
                    this.out.log('Error');
                }, this.context),
                Callback.make(function() {
                    this.out.log('World!');
                    this.out.log('------------------END-');
                }, this.context),
            )
            defer.reject();
        }, context)
    );
    defer.resolve();
}
