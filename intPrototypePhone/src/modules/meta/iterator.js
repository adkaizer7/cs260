//@module

var Inheritance = require("modules/meta/inheritance");

exports.klass = Iterator/*<T>*/ = Inheritance.createInterface([
    /*T*/ 'get', /*()*/
    /*T*/ 'next', /*()*/
    /*T*/ 'prev', /*()*/
    /*int*/ 'index', /*()*/
    /*void*/ 'goTo', /*(T item)*/
    /*void*/ 'goToFirst', /*()*/
    /*void*/ 'goToLast', /*()*/
    /*void*/ 'goToIndex', /*(int index)*/
    /*void*/ 'notifyRemoved', /*(int index, bool goToPrev=false)*/
]);
