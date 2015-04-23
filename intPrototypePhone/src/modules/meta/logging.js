//@module
/**
 * Contains code to log information to the console.
 */

var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");

/**
 * The Logger handles logging given a PREFIX. It is not created directly.
 * Instead the 'makeLogger' function is used to instantiate it.
 */
var Logger = function(prefix) {
    this._prefix = '[' + prefix + '] ';
}
Logger.prototype = {
    /* Private members */

    _prefix: null,

    /* Public members */

    /**
     * Log a piece of information. Takes any number of arguments of any type and
     * concatenates them to one line to be logged.
     */
    log: function() {
        var str = '';
        for (var i = 0; i < arguments.length; i++) {
            var content = arguments[i];
            if (content instanceof Test.Exception) {
                str += content.toString();
            } else if (Types.isString(content)) {
                str += content;
            } else {
                str += JSON.stringify(content);
            }
        }
        trace(this._prefix + str + '\n');
    }
}
Inheritance.setExtends(Logger, 'Logger', Object);

/**
 * Creates a Logger and returns it. Takes one argument, PREFIX, that will be
 * prepended to every line that is logged.
 */
exports.makeLogger = function(prefix) {
    Test.invariant(
        Types.isString(prefix),
        'The prefix argument must be a string.'
    );
    return new Logger(prefix);
};
