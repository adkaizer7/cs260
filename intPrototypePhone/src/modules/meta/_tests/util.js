//@module

var Util = require("modules/meta/util");
var Types = require("modules/meta/types");

/**
 * Tests for the inheritance module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-UTIL TESTS--------');

    var testFunc1 = function() {
        return arguments;
    }
    var testFunc2 = function() {
        var args = Util.argsAsArray(arguments);
        return args;
    }
    test(
        out,
        !Types.isArray(testFunc1(1, 2)),
        'Arguments should not be an array'
    );
    test(
        out,
        Types.isArray(testFunc2(1, 2)),
        'Function argsAsArray does not actually convert.'
    );

    var testObj = {
        a: true,
    }
    test(out, Util.idx(testObj, 'a', false), 'idx test 1');
    test(out, Util.idx(testObj, 'b', true), 'idx test 2');

    var counter = 0;
    var testMemo = function() {
        counter += 1;
        return counter;
    }
    test(out, testMemo() == 1, 'memo test 1');
    test(out, testMemo() == 2, 'memo test 2');
    testMemo = Util.memoize(testMemo);
    test(out, testMemo() == 3, 'memo test 3');
    test(out, testMemo() == 3, 'memo test 4');

    var testClone = {
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
    };
    for (var i in testClone) {
        test(out, Util.clone(testClone[i]) == testClone[i], 'Cloning ' + i);
    }
    test(
        out,
        Util.arraysEqual(Util.clone([]), []),
        'Cloning array_braces'
    );
    test(
        out,
        Util.arraysEqual(Util.clone(new Array()), new Array()),
        'Cloning array_new'
    );

    out.log('--------------UTIL-');
}

var test = function(logger, t, m) {
    logger.log(t ? 'Success - ' + m : 'Failure - ' + m);
}
