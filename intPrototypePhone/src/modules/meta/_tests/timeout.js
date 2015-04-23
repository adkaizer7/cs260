//@module

var Callback = require("modules/meta/callback");
var Timeout = require("modules/meta/timeout");

/**
 * Tests for the callback module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-TIMEOUT TESTS--------');

    var a = Callback.make(
        function() {
            this.out.log(this.test, '...wait for it...');
            var a = Callback.make(
                function() {
                    this.out.log('...World!');
                    this.out.log('------------------END-');
                }, {
                    out: out,
                }
            );
            Timeout.set(a, 1000);
        }, {
            out: out,
            test: 'Hello'
        }
    );
    Timeout.set(a, 1);
}
