//@module

var Types = require("modules/meta/types");

/**
 * Tests for the inheritance module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-TYPES TESTS--------');

    var types = {
        'null': null,
        'undefined': undefined,
        'string_empty': '',
        'string_zero': '0',
        'string_null': 'null',
        'string_undefined': 'undefined',
        'string_true': 'true',
        'string_false': 'false',
        'string_test': 'test',
        'string_new': new String('test'),
        'bool_true': true,
        'bool_false': false,
        'bool_new': new Boolean(true),
        'number_test': 42,
        'number_zero': 0,
        'number_one': 1,
        'number_negative': -1,
        'number_decimal': 0.1,
        'number_new': new Number(0),
        'function': function() {},
        'array_braces': [],
        'array_new': new Array(),
        'object_braces': {},
        'object_new': new (function(){}),
        'object_arguments': arguments,
        'regexp': /ab+c/,
    };
    var functions = {
        'null': Types.isNull,
        'undefined': Types.isUndefined,
        'string': Types.isString,
        'bool': Types.isBoolean,
        'number': Types.isNumber,
        'function': Types.isFunction,
        'array': Types.isArray,
        'object': Types.isObject,
        'regexp': Types.isRegExp,
    };
    var answers = {
        'null': 'none',
        'undefined': 'none',
        'string_empty': 'string',
        'string_zero': 'string',
        'string_null': 'string',
        'string_undefined': 'string',
        'string_true': 'string',
        'string_false': 'string',
        'string_test': 'string',
        'string_new': 'string',
        'bool_true': 'bool',
        'bool_false': 'bool',
        'bool_new': 'bool',
        'number_test': 'number',
        'number_zero': 'number',
        'number_one': 'number',
        'number_negative': 'number',
        'number_decimal': 'number',
        'number_new': 'number',
        'function': 'function',
        'array_braces': 'array',
        'array_new': 'array',
        'object_braces': 'object',
        'object_new': 'object',
        'object_arguments': 'object',
        'regexp': 'regexp'
    }

    for (var i in types) {
        for (var j in functions) {
            test(
                out,
                functions[j](types[i]) == (answers[i] == j),
                'Is ' + i + ' a ' + j + '?'
            );
        }
    }

    out.log('----------------------END-');
}

var test = function(logger, t, m) {
    logger.log(t ? 'Success - ' + m : 'Failure - ' + m);
}
