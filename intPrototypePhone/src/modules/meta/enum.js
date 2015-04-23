//@module

var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

/**
 * This module adds an Enum base class.
 */

/**
 * This is the actual Enum base class
 */
var Enum = function(values) {
    Test.invariant(
        Types.isArray(values) || Types.isObject(values),
        'VALUES must be an array or object of the values.'
    );
    var isArray = Types.isArray(values);

    this._assocs = {};
    this._count = 1;
    for (var j in values) {
        if (isArray) {
            Test.invariant(
                this._validItem(values[j]),
                'Enum item "' + values[j] + '" is not allowed.'
            );
            this._assocs[values[j]] = this._count - 1;
            this[values[j]] = this._count - 1;
        } else {
            Test.invariant(
                this._validItem(j),
                'Enum item "' + j + '" is not allowed.'
            );
            this._assocs[j] = values[j];
            this[j] = values[j];
        }
        this._count += 1;
    }
};
Enum.prototype = {
    /* Private members */

    /**
     * The list items that the enum contains associated with their values.
     */
    _assocs: null,

    /**
     * The number of items the enum contains.
     */
    _count: null,

    /**
     * The number of items the enum contains.
     */
    _validItem: function(item) {
        return (Types.isString(item) && !(item in Enum.prototype));
    },

    /* Public members */

    /**
     * Call the function with the arguments given to this function.
     */
    isValid: function(val) {
        for (item in this._assocs) {
            if (this._assocs[item] == val) {
                return true
            }
        }
        return false;
    },

    /**
     * Returns all items in the Enum.
     */
    getItems: function() {
        return Util.keys(this._assocs);
    },

    /**
     * Returns the first item with the value VALUE.
     */
    getItem: function(value) {
        for (item in this._assocs) {
            if (this._assocs[item] == val) {
                return item;
            }
        }
        Test.invariant_violation('Invalid value given.');
    },
};
Inheritance.setExtends(Enum, 'Enum', Object);

/**
 * Returns whether O is an Enum.
 */
exports.isEnum = function(o) {
    return Types.instanceOf(o, Enum);
};

/**
 * Make an Enum with the given values.
 */
exports.create = function(values) {
    return new Enum(values);
};
