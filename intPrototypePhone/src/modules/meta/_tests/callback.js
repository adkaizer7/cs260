//@module

var Callback = require("modules/meta/callback");

/**
 * Tests for the callback module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-CALLBACK TESTS--------');

    var a = Callback.make(
        function(arg) {
            this.out.log(this.test, arg);
        }, {
            out: out,
            test: 'Hello '
        }
    );
    a.call('World!');
 
    out.log('-------------------END-');
}
