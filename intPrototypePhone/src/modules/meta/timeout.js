//@module

var Callback = require("modules/meta/callback");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

/**
 * This implements Timeouts in a similar way as seen in the ECMA js standard.
 */

/**
 * An internal class for timeout handler behaviors.
 */
var TimeoutBehavior = function() { Behavior.call(this); }
TimeoutBehavior.prototype = Object.create(Behavior.prototype, {
    /* Private members */

    /**
     * The callback for when the timeout is complete.
     */
    callback: { value: null, writable: true },

    /* Public members */

    /**
     * Executed when the timeout handler is created.
     */
    onCreate: { value:
        function(container, data) {
            Behavior.prototype.onCreate.call(this, container);
        },
    },

    /**
     * Executed when the timeout is ended.
     */
    onComplete: {
        value: function(application, message, data) {
            if (this.callback !== null) {
                this.callback.call();
                this.callback = null;
            }
        }
    },
});

/**
 * An internal class for timeout handlers.
 */
var Timeout = Content.template(function($) { return {
    behavior: Object.create(TimeoutBehavior.prototype)
}});

/**
 * Internal class that manages timeouts currently being used.
 */
var TimeoutManager = function() {
    this._timeouts = [];
}
TimeoutManager.prototype = {
    /* Private members */

    /**
     * The list of timeouts that have been created for use.
     */
    _timeouts: null,

    /**
     * Expand the list of usable timeouts by one and return the index of the
     * added timeout.
     */
    _addTimeout: function() {
        var newTimeout = new Timeout();
        return this._timeouts.push(newTimeout) - 1;
    },

    /**
     * Whether the given timeout TIMEOUT is actually being used at the moment.
     */
    _isTimeoutInUse: function(timeout) {
        return timeout.behavior.callback !== null;
    },

    /* Public members */

    /**
     * Start a Timeout that calls CALLBACK in TIME milliseconds. Returns the key
     * for the started timeout.
     */
    startTimeout: function(callback, time) {
        var key = null;

        var len = this._timeouts.length;
        for (var i = 0; i < len; i += 1) {
            if (!this._isTimeoutInUse(this._timeouts[i])) {
                key = i;
                break;
            }
        }
        if (key === null) {
            key = this._addTimeout();
        }

        this._timeouts[key].behavior.callback = callback;
        this._timeouts[key].wait(time);
        return key;
    },

    /**
     * Stops the timeout associated with the given key.
     */
    stopTimeout: function(key) {
        Test.invariant(
            ManagerInstance.validKey(key),
            'The key argument is not a valid key.'
        );
        this._timeouts[key].behavior.callback = null;
    },

    /**
     * Returns whether the given key is a valid key corresponding to an active
     * Timeout handler.
     */
    validKey: function(key) {
        return Types.isNumber(key) && key >= 0 && key < this._timeouts.length
            && this._isTimeoutInUse(this._timeouts[key]);
    },
};

/**
 * The single manager of all timeouts.
 */
var ManagerInstance = new TimeoutManager();

/**
 * Wrapper around ManagerInstance.startTimeout. Calls CALLBACK after TIME
 * milliseconds. If the delay isn't given, TIME is by default, 0. Returns the
 * key to the timeout that you can use to stop the timeout before it is
 * completed.
 */
exports.set = function(callback, time) {
    Test.invariant(
        Callback.isCallback(callback),
        'The callback argument must be a Callback.'
    );
    if (time === undefined) {
        time = 0;
    }
    Test.invariant(
        Types.isNumber(time) && time >= 0,
        'The time argument must be a non-negative number if given.'
    );
    return ManagerInstance.startTimeout(callback, time);
}

/**
 * Wrapper around ManagerInstance.stopTimeout. Stops the timeout key before it
 * is completed.
 */
exports.stop = function(key) {
    if (ManagerInstance.validKey(key)) {
        ManagerInstance.stopTimeout(key);
    }
}
