//@module

var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

/**
 * This module contains a variaty of utility functions for various uses.
 *
 * Includes:
 *      argsAsArray
 *      bind
 *      clone
 *      deflt
 *      emptyFn
 *      filter
 *      has
 *      idx
 *      isEqual
 *      keys
 *      memoize
 *      mergeInto
 *      randInt
 *      setKPRDimensionsFromArray
 */

/**
 * Changes an Arguments object ARGS to an array.
 */
exports.argsAsArray = function(args, indexFrom/*=0*/) {
    indexFrom = exports.deflt(indexFrom, 0);
    var ret = [];
    for (var i = indexFrom; i < args.length; i++) {
        ret.push(args[i]);
    }
    return ret;
};

/**
 * Binds the function FN to the given context CONTEXT.
 */
exports.bind = function(fn, context) {
    return function() {
        return fn.apply(context || this, arguments);
    }
}

/**
 * Clone a variable O for everything but functions and return it.
 */
exports.clone = function(o, deep) {
    if (deep === undefined) {
        deep = true;
    }
    if (o === null || o === undefined || Types.isString(o)
        || Types.isBoolean(o) || Types.isNumber(o)) {
        return o;
    } else if (o instanceof Date) {
        var copy = new Date();
        copy.setTime(o.getTime());
        return copy;
    } else if (Types.isArray(o)) {
        var copy = [];
        for (var i = 0, len = o.length; i < len; i++) {
            copy[i] = exports.clone(o[i]);
        }
        return copy;
    } else if (Types.isObject(o)) {
        var copy = o.constructor();
        for (var attr in o) {
            if (o.hasOwnProperty(attr)) {
                if (deep) {
                    copy[attr] = exports.clone(o[attr]);
                } else {
                    copy[attr] = o[attr];
                }
            }
        }
        return copy;
    } else if (Types.isFunction(o)) {
        return o;
    }

    Test.invariant_violation("Unable to copy! Its type isn't supported.");
};

exports.deflt = function(arg, deflt) {
    return arg === undefined ? deflt : arg;
}

/**
 * Function that does nothing.
 */
exports.emptyFn = function() {};

/**
 * Filter an object O to have only the keys that are in the second argument
 * TEST if it is an array, or if the value of the key returns true if TEST is a
 * function. Returns the result.
 */
exports.filter = function(o, test) {
    Test.invariant(
        Types.isObject(o),
        "The object to filter must be an object."
    );
    var ret = {};
    if (Types.isArray(test)) {
        for (var i in test) {
            ret[i] = o[i];
        }
    } else if (Types.isFunction(test)) {
        for (var i in o) {
            if (test(o[i])) {
                ret[i] = o[i];
            }
        }
    } else {
        Test.invariant_violation("Unable to filter on the given test.");
    }
    return ret;
};

/**
 * Returns if an object has a given property directly on itself (in other words,
 * not on a prototype).
 */
exports.has = function(obj, key) {
    if (obj == null || Types.isUndefined(obj) || Types.isUndefined(key)
        || !(key in obj)) {
        return false;
    } else {
        return !(key in obj.constructor.prototype)
            || obj[key] !== obj.constructor.prototype[key];
    }
};

/**
 * Gets the value of the key INDEX from object OBJ or default to DEF if it does
 * not exist.
 */
exports.idx = function(obj, index, def) {
    if (index in obj) {
        return obj[index];
    }
    return def;
};

/**
 * Deep tests if two things are identical.
 */
exports.isEqual = function(a, b) {
    return _eq(a, b, false, false);
}

/**
 * Internal function used for recursing for isEqual.
 */
var _eq = function(a, b, aStack, bStack) {
    if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
        return a === b;
    }

    if ((Types.isRegExp(a) && Types.isRegExp(b))
        || (Types.isString(a) && Types.isString(b))) {
        return '' + a === '' + b;
    }
    if (Types.isNumber(a) && Types.isNumber(b)) {
        if (+a !== +a) {
            return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    }
    if ((Types.isDate(a) && Types.isDate(b))
        || (Types.isBoolean(a) && Types.isBoolean(b))) {
            return +a === +b;
    }

    var areArrays = (Types.isArray(a) && Types.isArray(b));
    if (!areArrays) {
        if (!Types.isObject(a) || !Types.isObject(b)) {
            return false;
        }

        if (Types.instanceOf(a, Types.getClass(b))) {
            return false;
        }
    }

    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    if (areArrays) {
        length = a.length;
        if (length !== b.length) {
            return false;
        }
        while (length--) {
            if (!_eq(a[length], b[length], aStack, bStack)) {
                return false;
            }
        }
    } else {
        var keys = exports.keys(a), key;
        length = keys.length;
        if (exports.keys(b).length !== length) {
            return false;
        }
        while (length--) {
            key = keys[length];
            if (!(exports.has(b, key) && _eq(a[key], b[key], aStack, bStack))) {
                return false;
            }
        }
    }

    aStack.pop();
    bStack.pop();
    return true;
};

/**
 * Returns the names of the properties of the object, OBJ.
 */
exports.keys = function(obj) {
    Test.invariant(
        Types.isObject(obj),
        'Argument OBJ must be an object.'
    );
    var keys = [];
    for (var key in obj) {
        if (exports.has(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
};

/**
 * Return a memoized version of function FUNC.
 */
exports.memoize = function(func) {
    var cache = {}
    return (function() {
        var args = exports.argsAsArray(arguments);
        if (!(args in cache)) {
            cache[args] = func(args);
        }
        return cache[args];
    });
};

/**
 * Merges 1 or more objects into the TARGET object. Takes the leftmost member
 * if there is a key collision.
 */
exports.mergeInto = function(target /*, source1 ... */) {
    Test.invariant(
        arguments.length > 1,
        "You must provide sources to merge into the target."
    );
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var member in source) {
            if (!(member in target)) {
                target[member] = exports.clone(source[member]);
            }
        }
    }
};

/**
 * Return a random integer in the inclusive range of MIN to MAX.
 */
exports.randInt = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * Sets the TARGET object to have the KPR defined dimensions that are found in
 * object SOURCE.
 */
exports.setKPRDimensionsFromArray = function(target, source) {
    source = source || {};
    target.left = exports.idx(source, 'left', undefined);
    target.right = exports.idx(source, 'right', undefined);
    target.top = exports.idx(source, 'top', undefined);
    target.bottom = exports.idx(source, 'bottom', undefined);
    target.width = exports.idx(source, 'width', undefined);
    target.height = exports.idx(source, 'height', undefined);
};
