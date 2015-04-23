//@module
/**
 * Contains code related to general exceptions and testing what should be but
 * may actually not.
 */

/**
 * General Exception class. Nothing special, though it overrides the toString
 * function. Takes one argument: the MESSAGE that the exception was trigger
 * with.
 */
var Exception = function(message) {
    this._message = message;
};
Exception.prototype = {
    /* Private members */

    /**
     * The name of the type of the exception.
     */
    _name: 'Exception',

    /**
     * The message for the instance of the exception.
     */
    _message: null,
};
/**
 * @Override
 * Converts the object into a readable string representation.
 */
Exception.prototype.toString = function() {
    return this._name + ': ' + this._message;
};
exports.Exception = Exception;

/**
 * Exceptions for when things happen that logically shouldn't or go against the
 * instructions of using piece of code. Takes one argument: the MESSAGE that the
 * exception was triggered with.
 */
var InvariantException = function(message) {
    Exception.call(this, message);
}
InvariantException.prototype = Object.create(Exception.prototype, {
    /* Private members */

    /**
     * The name of the type of the exception.
     */
    _name: { value: 'InvariantException' },
});

/**
 * If the testing expression, TEST, is false, then an InvariantException is
 * thrown with the given MESSAGE. Otherwise there is no effect.
 */
exports.invariant = function(test, message) {
    if (!test) {
        throw new InvariantException(message);
    }
}

/**
 * An InvariantException is thrown with the given MESSAGE.
 */
exports.invariant_violation = function(message) {
    throw new InvariantException(message);
}

/**
 * Exception for when a function has not been implemented.
 */
var UnimplementedException = function(message) {
    Exception.call(this, message);
}
UnimplementedException.prototype = Object.create(Exception.prototype, {
    /* Private members */

    /**
     * The name of the type of the exception.
     */
    _name: { value: 'UnimplementedException' },
});
exports.UnimplementedException = UnimplementedException;
