//@module

var Enum = require("modules/meta/enum");
var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

/**
 * This module describes option dictionaries that can be specified to contain
 * certain things.
 */

/**
 * The types of variables that can be required.
 */
var VTypes = Enum.create([
    'String',
    'Boolean',
    'Number',
    'Function',
    'RegExp',
    'Date',
    'Array',
    'Object',
    'Callback',
    'Variable',
]);
exports.Types = VTypes;

/**
 * This allows testing against defined characteristics.
 */
var Options = function(ops) {
    this._options = {};
    for (var op in ops) {
        var data = ops[op];
        Test.invariant(
            'required' in data,
            'The required flag must be set for the option ' + op + '.'
        );
        this._options[op].required = ops[op].required;
        if (!this._options[op].required) {
            Test.invariant(
                'def' in data,
                'The def flag must be set for unrequired option ' + op + '.'
            );
            this._options[op].def = ops[op].def;
        }
        Test.invariant(
            'type' in data,
            'The type flag must be set for the option ' + op + '.'
        );
        this._options[op].data = {};
        Test.invariant(
            ('name' in ops[op].type) && VTypes.isValid(ops[op].type.name),
            'The name flag must be set to a Types for the type flag for option '
                + op + '.'
        );
        this._options[op].data.name = ops[op].type.name;
        if ('fn' in ops[op].type) {
            Test.invariant(
                Types.isFunction(ops[op].type.fn),
                'The function flag must be set to a function for the type flag '
                   + 'for option ' + op + ' if it is given.'
            );
            this._options[op].data.fn = ops[op].type.fn;
        } else {
            Test.invariant(
                this._options[op].data.name !== VTypes.Variable,
                'The function flag must be given to a function for the type '
                   + 'flag for option ' + op + ' because it is a variable type.'
            );
        }
    }
};
Options.prototype = {

    _options: null,

    _returnTrue: Callback.make(function() {
        return true;
    }, null),

    _isType: function(value, type) {
        var fn = _returnTrue;
        if ('fn' in type) {
            fn = type.fn;
        }
        switch (type.name) {
            case VTypes.String:
                return Types.isString(value) && fn.call(value);
            case VTypes.Boolean:
                return Types.isBoolean(value) && fn.call(value);
            case VTypes.Number:
                return Types.isNumber(value) && fn.call(value);
            case VTypes.Function:
                return Types.isFunction(value) && fn.call(value);
            case VTypes.RegExp:
                return Types.isRegExp(value) && fn.call(value);
            case VTypes.Date:
                return Types.isDate(value) && fn.call(value);
            case VTypes.Array:
                return Types.isArray(value) && fn.call(value);
            case VTypes.Object:
                return Types.isObject(value) && fn.call(value);
            case VTypes.Callback:
                return Callback.isCallback(value) && fn.call(value);
            case VTypes.Variable:
                return fn.call(value);
        };
        Test.invariant_violation('Unknown type given to Options.');
    },

    _matches: function(test, ops) {
        var op;
        for (op in test) {
            if (!(op in _options)) {
                return false;
            }
        }
        for (op in ops) {
            var details = ops[op];
            if (!(op in test)) {
                if (details.required) {
                    return false;
                } else {
                    test[op] = details.def;
                }
            } else {
                var value = test[op];
                if (!this._isType(value, details.type)) {
                    return false;
                }
            }
        }
        return test;
    },

    matches: function(test) {
        return this._matches(test, this._options);
    },
};
Inheritance.setExtends(Options, 'Options', Object);

exports.create = function(ops) {
    return new Options(ops);
}
