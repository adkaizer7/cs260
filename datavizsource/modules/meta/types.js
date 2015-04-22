//@module

var Test = require("modules/meta/test");

/**
 * This module allows for checking if a variable is of a specific type.
 */

toStringShim = function(o) {
    // TODO: remove when toString.call bug is fixed.
    if (o === null) {
        return 'null';
    }
    if (o === undefined) {
        return 'undefined';
    }
    if (typeof o == 'number' || o instanceof Number) {
        return '' + o;
    }
    return toString.call(o);
};

/**
 * Checks if the variable O is a finite number.
 */
exports.isFinite = function(o) {
    return isFinite(o) && !exports.isNaN(parseFloat(o));
};


/**
 * Checks if the variable O is NaN.
 */
exports.isNaN = function(o) {
    return exports.isNumber(obj) && obj !== +obj;
};

/**
 * Checks if the variable O is null.
 */
exports.isNull = function(o) {
    return o === null;
};

/**
 * Checks if the variable O is undefined.
 */
exports.isUndefined = function(o) {
    return o === void 0;
};

/**
 * Checks if the variable O is a string.
 */
exports.isString = function(o) {
    return (typeof o == 'string' || o instanceof String);
};

/**
 * Checks if the variable O is a boolean.
 */
exports.isBoolean = function(o) {
    return (typeof o == 'boolean' || o instanceof Boolean);
};

/**
 * Checks if the variable O is a number.
 */
exports.isNumber = function(o) {
    return (typeof o == 'number' || o instanceof Number);
};

/**
 * Checks if the variable O is a function.
 */
exports.isFunction = function(o) {
    return (typeof o == 'function');
};

/**
 * Checks if the variable O is a RegExp.
 */
exports.isRegExp = function(o) {
    return toStringShim(o) == '[object RegExp]';
};

/**
 * Checks if the variable O is a Date.
 */
exports.isDate = function(o) {
    return toStringShim(o) == '[object Date]';
};

/**
 * Checks if the variable O is an array.
 */
exports.isArray = function(o) {
    return toStringShim(o) === '[object Array]';
};

/**
 * Checks if the variable O is an object.
 */
exports.isObject = function(o) {
    if (exports.isArray(o) || exports.isNumber(o) || exports.isBoolean(o) ||
        exports.isString(o) || exports.isRegExp(o) || exports.isDate(o)) {
        return false;
    }
    return (typeof o === 'object' && o !== null);
};

exports.getClass = function(o) {
    Test.invariant(exports.isObject(o), 'Argument O must be an object.');
    if ('__class' in o) {
        return o.__class;
    }
    return null;
}

/**
 * Checks if the object O is of the type TYPE.
 */
exports.instanceOf = function(o, type) {
    if (!exports.isObject(o)) {
        return false;
    }
    if ('__class' in o) {
        while (o !== Object.prototype) {
            if (o.__className == type.prototype.__className) {
                return true;
            }
            o = o.__parent.prototype;
        }
        return false;
    }
    return false;
};
