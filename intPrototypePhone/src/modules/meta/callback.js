//@module

var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

/**
 * This module adds a Callback object. It allows creation, tests of whether
 * something is a callback, and a null callback.
 */

/**
 * This corresponds to a function callback. To create one, you use the exported
 * make function which takes two parameters. The first parameter FN is the
 * function to be called. The second parameter is the context CONTEXT in which
 * to call the function as the 'this.'
 */
var Callback = function(fn, context) {
    Test.invariant(
        Types.isFunction(fn),
        'The fn argument must be a function.'
    );
    this._fn = fn;
    this._context = context;
};
Callback.prototype = {
    /* Private members */

    /**
     * The function to be called.
     */
    _fn: null,

    /**
     * The context the function should be called from.
     */
    _context: null,

    /* Public members */

    /**
     * Call the function with the arguments given to this function.
     */
    call: function() {
        return this._fn.apply(this._context, arguments);
    },

    /**
     * Call the function with the array of arguments ARGS.
     */
    apply: function(args) {
        return this._fn.apply(this._context, args);
    },
};
Inheritance.setExtends(Callback, 'Callback', Object);

/**
 * Returns whether O is a callback.
 */
exports.isCallback = function(o) {
    return Types.instanceOf(o, Callback);
};

/**
 * Make a callback that executes function FN in context CONTEXT.
 */
exports.make = function(fn, context) {
    return new Callback(fn, context);
};

/**
 * An empty callback that does nothing.
 */
exports.emptyCallback = exports.make(Util.emptyFn, null);
