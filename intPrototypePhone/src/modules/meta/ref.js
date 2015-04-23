//@module

var Inheritance = require("modules/meta/inheritance");

/**
 * Allows a value to be 'passed by reference' in the sense that the object can
 * be mutated in a function and the value can be retrieved after.
 */
exports.klass = Ref = function(val) {
    this.__value = val;
};
Ref.prototype = {

/* Public members */

    /*var*/ get: function() { return this.__value; },
    /*void*/ set: function(/*var*/ v) { this.__value = v; },

/* Private members */

    /*var*/ __value: null,

};
Inheritance.setExtends(Ref, 'Ref', Object);

exports.create = function(val) {
    return new Ref(val);
}
