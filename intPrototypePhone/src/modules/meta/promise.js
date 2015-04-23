//@module

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Timeout = require("modules/meta/timeout");

/**
 * This module corresponds to the Promise paradigm. You do not actually make a
 * promise, instead you interact with this module by creating a deferral of
 * action. This deferral can either be resolved or rejected. On doing so, it
 * calls corresponding callbacks for these actions. When you make a deferral,
 * it promises to call those callbacks. You can access this promise and through
 * it, attach new callbacks.
 */

/**
 * This is the Promise object you can get from the Defer object. You can add
 * callbacks for when it is resolved or rejected.
 */
var Promise = function () {
      this._resolveCbs = [];
      this._rejectCbs = [];
};
Promise.prototype = {
    /* Private members */

    /**
     * The callbacks for if this is resolved.
     */
    _resolveCbs: null,

    /**
     * The callbacks for if this is rejected.
     */
    _rejectCbs: null,

    /* Public members */

    /**
     * Adds callbacks to the promise for if it was rejected or resolved. It
     * takes two Callback objects. The second is optional. They are for when it
     * is resolved and rejected respectively.
     */
    then: function (resolveCb, rejectCb) {
        Test.invariant(
            Callback.isCallback(resolveCb),
            'The resolveCb argument must be a Callback.'
        );
        this._resolveCbs.push(resolveCb);
        if (rejectCb) {
            Test.invariant(
                Callback.isCallback(rejectCb),
                'The rejectCb argument must be a Callback or undefined.'
            );
            this._rejectCbs.push(rejectCb);
        }
    },
};
Inheritance.setExtends(Promise, 'Promise', Object);

/**
 * This is the Defer object created with the 'makeDeferral' method.
 */
var Defer = function () {
    this._promise = new Promise();
    this._completed = false;
};
Defer.prototype = {
    /* Private members */

    /**
     * The promise that is to be kept.
     */
    _promise: null,

    /**
     * Whether this has already been completed.
     */
    _completed: null,

    /* Public members */

    /**
     * This returns a Promise object corresponding to the promise made by the
     * deferral.
     */
    getPromise: function() {
        return this._promise;
    },

    /**
     * This triggers the promise made by the deferral to be resolved.
     */
    resolve: function() {
        if (this._completed) {
            return;
        }
        var data = arguments;
        this._promise._resolveCbs.forEach(function(callback) {
            Timeout.set(Callback.make(function () {
                this.callback.apply(this.args);
            }, {
                callback: callback,
                args: data
            }), 0);
        });
    },

    /**
     * This triggers the promise made by the deferral to be rejected.
     */
    reject: function() {
        if (this._completed) {
            return;
        }
        var data = arguments;
        this._promise._rejectCbs.forEach(function(callback) {
            Timeout.set(Callback.make(function () {
                this.callback.apply(this.args);
            }, {
                callback: callback,
                args: data
            }), 0);
        });
    }
};
Inheritance.setExtends(Defer, 'Defer', Object);

/**
 * This creates the deferal. It takes no arguments and returns a Defer object.
 */
exports.makeDeferral = function() {
    return new Defer();
};
