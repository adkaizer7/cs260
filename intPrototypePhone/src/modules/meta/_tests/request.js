//@module

var Callback = require("modules/meta/callback");
var Request = require("modules/meta/request");

/**
 * Tests for the callback module. Takes a Logger for OUT.
 */
exports.run = function(out) {
    out.log('-REQUEST TESTS--------');

    context = { out: out, }
    Request.call('http://www.google.com').then(
        Callback.make(
            function(message, payload) {
                this.out.log(payload.substring(0, 75) + '...');
                this.out.log('------------------END-');
            },
            context
        )
    );
}
