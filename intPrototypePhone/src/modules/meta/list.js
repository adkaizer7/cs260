//@module

var Inheritance = require("modules/meta/inheritance");
var Iterator = require("modules/meta/iterator");
var Test = require("modules/meta/test");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

/**
 * Implements a list.
 */
exports.klass = List/*<T>*/ = function(/*List<T>|Array<T>*/ list) {
    if (Types.isObject(list) && Types.instanceOf(list, List)) {
        this.__list = [];
        for (var i = list.first(); i; i = list.after(i)) {
            this.appendChild(i);
        }
    } else if (Types.isArray(list)) {
        this.__list = list.slice();
    } else {
        this.__list = [];
    }
    this.__immutable = false;
};
List.prototype = {

/* Public members */

    /*List<T>*/ copy: function() { return new List(this); },

    /*int*/ length: function() { return this.__list.length; },
    /*bool*/ isEmpty: function() { return (this.length() === 0); },
    /*T*/ item: function(/*int*/ i) {
        if (i < 0 || i >= this.length()) {
            return null;
        }
        return this.__list[i];
    },

    /*T*/ first: function() {
        if (this.length() == 0) {
            return null;
        }
        return this.item(0);
    },
    /*T*/ last: function() {
        if (this.length() == 0) {
            return null;
        }
        return this.item(this.length() - 1);
    },

    /*int*/ indexOf: function(/*T*/ n) {
        return this.__list.indexOf(n);
    },

    /*bool*/ contains: function(/*T*/ n) {
        return this.indexOf(n) !== -1;
    },

    /*T*/ before: function(/*T*/ n) {
        /*int*/ nIndex = this.indexOf(n);
        if (nIndex === -1) {
            return null;
        }
        return this.item(nIndex - 1);
    },
    /*T*/ after: function(/*T*/ n) {
        /*int*/ nIndex = this.indexOf(n);
        if (nIndex == -1) {
            return null;
        }
        return this.item(nIndex + 1);
    },

    /*T*/ insertBefore: function(/*T*/ newChild, /*T*/ refChild) {
        if (this.__immutable) {
            return null;
        }
        /*int*/ i = this.__list.indexOf(refChild);
        if (i === -1) {
            return null;
        }
        this.__list.splice(i, 0, newChild);
        return newChild;
    },
    /*T*/ replaceChild: function(/*T*/ newChild, /*T*/ oldChild) {
        if (this.__immutable) {
            return null;
        }
        /*int*/ i = this.__list.indexOf(oldChild);
        if (i === -1) {
            return null;
        }
        this.__list[i] = newChild;
        return oldChild;
    },
    /*T*/ removeChild: function(/*T*/ child) {
        if (this.__immutable) {
            return null;
        }
        /*int*/ i = this.__list.indexOf(child);
        if (i === -1) {
            return null;
        }
        this.__list.splice(i, 1);
        return child;
    },
    /*T*/ appendChild: function(/*T*/ newChild) {
        if (this.__immutable) {
            return null;
        }
        this.__list.push(newChild);
        return newChild; 
    },
    /*T*/ prependChild: function(/*T*/ newChild) {
        if (this.__immutable) {
            return null;
        }
        this.__list.splice(0, 0, newChild);
        return newChild;
    },

    /*List<T>*/ filter: function(/*Callback*/ test) {
        return new List(
            this.__list.filter(function(element, index, array) {
                return !!(test.call(element));
            })
        );
    },

    /*void*/ makeImmutable: function() {
        this.__immutable = true;
    },

    /*ListIterator<T>*/ iterator: function() {
        return new ListIterator(this);
    },

    /*var*/ reduce: function(fn, start) {
        if (this.isEmpty()) {
            return null;
        }
        /*var*/ i = null;
        if (start === undefined) {
            if (this.length() === 1) {
                return this.item(0);
            }
            i = fn(this.item(0), this.item(1));
        } else {
            if (this.length() === 1) {
                return fn(start, this.item(0));
            }
            i = fn(start, this.item(0));
            i = fn(i, this.item(1));
        }
        for (/*int*/ index = 2; this.length() < index; index++) {
            i = fn(i, this.item(index));
        }
        return i;
    },

/* Private members */

    /*Array<T>*/ __list: null,
    /*bool*/ __immutable: null,

};
Inheritance.setExtends(List, 'List', Object);

/**
 * Implements a list.
 */
exports.ListIterator = ListIterator/*<T> implements ListIterator*/
    = function(/*List*/ list) {
    Test.invariant(
        Types.instanceOf(list, List),
        'ListIterator should be given a list.'
    );
    this.__list = new List(list);
    this.__index = 0;
};
ListIterator.prototype = {

/* Public members */

    /*T*/ get: function() {
        return this.__list.item(this.__index);
    },
    /*T*/ next: function() {
        this.__index += 1;
        return this.get();
    },
    /*T*/ prev: function() {
        this.__index -= 1;
        return this.get();
    },
    /*int*/ index: function() {
        return this.__index;
    },
    /*void*/ goTo: function(/*T*/ item) {
        /*int*/ index = this.__list.indexOf(item);
        if (index !== -1) {
            this.__index = index;
        }
    },
    /*void*/ goToFirst: function() {
        this.__index = 0;
    },
    /*void*/ goToLast: function() {
        /*int*/ len = this.__list.length();
        if (len !== 0) {
            this.__index = len - 1;
        }
    },
    /*void*/ goToIndex: function(/*int*/ index) {
        if (index >= 0 && index < this.__list.length()) {
            this.__index = index;
        }
    },
    /*void*/ notifyRemoved: function(/*int*/ index,
        /*bool*/ goToPrev/*=false*/) {
        goToPrev = Util.deflt(goToPrev, false);
        if (index < this.__index || (goToPrev && index == this.__index)) {
            this.__index -= 1;
        }
    },

/* Private members */

    /*var*/ __list: null,
    /*int*/ __index: null,

};
Inheritance.setExtends(ListIterator, 'ListIterator', Object);
Iterator.klass.enforce(ListIterator);
