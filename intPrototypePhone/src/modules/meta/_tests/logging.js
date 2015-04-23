//@module

var Logging = require("modules/meta/logging");

/**
 * Tests for the inheritance module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-LOGGING TESTS--------');

    out.log('Hello World!');

    var test = Logging.makeLogger('HELLO');
    test.log('WORLD!');

    out.log('------------------END-');
}
