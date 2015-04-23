//@module

var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

/**
 * Allows inheritance of sorts in js.
 */

/**
 * Sets the parent of the class C with name N to be the class P.
 */
exports.setExtends = function(c, n, p) {
    // Ensure constructor is set.
    c.prototype.constructor = c;
    // Copy functions and instance members.
    Util.mergeInto(c.prototype, p.prototype);
    // Copy static members.
    Util.mergeInto(c, p);
    // Set custom variables for the inheritance.
    c.prototype.__className = n;
    c.prototype.__class = c;
    c.prototype.__parent = p;
}

/**
 * Returns a function that throws an UnimplementedException if the method isn't
 * overridden when it is called.
 */
exports.unimplemented = function(c, fn) {
    return function() {
        message = 'The function "' + fn + '" in class "'
            + c.prototype.__className + '" is not implemented.';
        throw new Test.UnimplementedException(message);
    };
}

/**
 * An interface enforces a certain composition of functions of an object. It is
 * created with an array of strings that correspond to the names of the required
 * functions.
 */
var Interface = function(requiredFunctions) {
    Test.invariant(
        Types.isArray(requiredFunctions),
        'The requiredFunctions argument must be an array of strings.'
    );
    var len = requiredFunctions.length;
    for (var i = 0; i < len; i++) {
        Test.invariant(
            Types.isString(requiredFunctions[i]),
            'The requiredFunctions argument must be an array of strings.'
        );
    }
    this._requiredFunctions = requiredFunctions;
};
Interface.prototype = {
    /* Private members */

    _requiredFunctions: null,

    /* Public members */

    /**
     * Enforces on a class, C, the required functions.
     */
    enforce: function(c) {
        var len = this._requiredFunctions.length;
        for (var i = 0; i < len; i++) {
            Test.invariant(
                (this._requiredFunctions[i] in c.prototype) &&
                    Types.isFunction(c.prototype[this._requiredFunctions[i]]),
                'The function ' + this._requiredFunctions[i]
                    + ' is not implemented.'
            );
        }
    },

    /**
     * Returns whether the object or class, OBJECT, given implements the
     * interface
     */
    implementedBy: function(object) {
        Test.invariant(
            Types.isObject(object) || Types.isFunction(object),
            'The argument object must be an object or class.'
        );
        if (Types.isObject(object)) {
            object = object.__class;
        }
        var len = this._requiredFunctions.length;
        var proto = object.prototype;
        for (var i = 0; i < len; i++) {
            if (!(this._requiredFunctions[i] in proto)
                || !Types.isFunction(proto[this._requiredFunctions[i]])) {
                return false;
            }
        }
        return true;
    },
};

/**
 * Creates an interface that requires the given function.
 */
exports.createInterface = function(requiredFunctions) {
    return new Interface(requiredFunctions || []);
}
