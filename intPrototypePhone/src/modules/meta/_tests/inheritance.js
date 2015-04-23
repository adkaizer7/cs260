//@module

var Inheritance = require("modules/meta/inheritance");
var Types = require("modules/meta/types");

/**
 * Tests for the inheritance module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-INHERITANCE TESTS--------');

    var classA = function() {};
    Inheritance.setExtends(classA, 'classA', Object);
    var classB = function() {};
    classB.prototype = { method1: function() {} };
    Inheritance.setExtends(classB, 'classB', classA);
    var interface = Inheritance.createInterface([
        'method1',
    ]);
    interface.enforce(classB);

    out.log('testing setExtends and instanceOf:');

    test(out, Types.instanceOf(new classA(), classA));
    test(out, !Types.instanceOf(new classA(), classB));
    test(out, Types.instanceOf(new classB(), classA));
    test(out, Types.instanceOf(new classB(), classB));

    out.log('testing interface and implementedBy:');

    test(out, !interface.implementedBy(classA));
    test(out, interface.implementedBy(classB));
    test(out, !interface.implementedBy(new classA()));
    test(out, interface.implementedBy(new classB()));

    out.log('----------------------END-');
}

var test = function(logger, t) {
    logger.log(t ? ' Success' : ' Failure');
}
