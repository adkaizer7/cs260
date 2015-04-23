//@module

var Inheritance = require("modules/meta/inheritance");
var List = require("modules/meta/list");
var Test = require("modules/meta/test");

exports.klass = XNode = function() {
    this.__screen = null;
    this.__focus = false;
    this.__attached = false;

    this.__parentNode = null;
    this.__nextSibling = null;
    this.__prevSibling = null;
    this.__children = new List.klass();
}
XNode.prototype = {

/* Public members */

    /**
     * Should be overridden. Clean up KPR content.
     */
    removeSelf: function() {},

    /**
     * Should be overridden. Resize KPR content. Returns the size of the area
     * children should take up.
     */
    resizeSelf: function(dim) { return dim; },

    /**
     * Should be overridden. Initialize and add KPR content to the parent.
     */
    addSelfToParent: function() {},

    /**
     * Should be overridden. Returns what KPR node the item should add itself
     * to.
     */
    childKPRContainer: function() {},

    /**
     * Should be overridden. Called when the focus has changed.
     */
    focusChanged: function() {},

    /**
     * Should be overridden. Called when there is a touch. Should not be used as
     * an interaction. Instead use it only to notify deactivation of children.
     */
    containerTouchEvent: function(x, y) {
        var i = this.__children.iterator();
        for (var n = i.get(); n; n = i.next()) {
            n.containerTouchEvent(x, y);
        }
    },

    screen: function() { return this.__screen; },
    setScreen: function(screen) { this.__screen = screen; },

    director: function() { return this.screen().director(); },
    application: function() { return this.screen().director().application(); },
    appstyle: function() { return this.screen().appstyle(); },

    focus: function() { return this.__focus; },
    setFocus: function(focus) {
        var i = this.__children.iterator();
        for (var n = i.get(); n; n = i.next()) {
            n.setFocus(focus);
        }
        this.__focus = focus;
        this.focusChanged();
    },

    parent: function() { return this.__parentNode; },
    nextSibling: function() { return this.__nextSibling; },
    prevSibling: function() { return this.__prevSibling; },

    canHaveChildren: function() { return false; },
    canContainNode: function(node) { return true; },
    children: function() { return this.__children.copy(); },
    hasChildren: function() { return !this.__children.isEmpty() },

    setParent: function(parent) { this.__parentNode = parent; },
    setNextSibling: function(next) { this.__nextSibling = next; },
    setPrevSibling: function(prev) { this.__prevSibling = prev; },

    /**
     * Clean up this has been removed.
     */
    remove: function() {
        if (this.parent() !== null) {
            this.parent().__children.removeChild(this);
        }
        var i = this.__children.iterator();
        for (var n = i.get(); n; n = i.next()) {
            n.remove();
        }
        this.removeSelf();
    },

    /**
     * Alert that the document has been resized.
     */
    resized: function(dim) {
        var size = this.resizeSelf(dim);
        var i = this.__children.iterator();
        for (var n = i.get(); n; n = i.next()) {
            n.resized(size);
        }
    },

    /**
     * Add an object to the node.
     */
    add: function(xnode) {
        Test.invariant(
            this.canHaveChildren() && this.canContainNode(xnode),
            'Tried to add a node to a node that may not have children.'
        );
        if (this.hasChildren()) {
            this.__children.last().setNextSibling(xnode);
        }
        xnode.setPrevSibling(this.__children.last());
        this.__children.appendChild(xnode);
        xnode.setParent(this);
        if (this.__attached) {
            xnode.attach();
        }
        return this;
    },

    /**
     * Attach the KPR content.
     */
    attach: function() {
        this._internalAdd();
        var i = this.__children.iterator();
        for (var n = i.get(); n; n = i.next()) {
            n.attach();
        }
        this.__attached = true;
    },

    attached: function() { return this.__attached; },

/* Protected members */

    /**
     * Attach the KPR content.
     */
    _internalAdd: function() {
        this.setFocus(this.parent().focus());
        this.setScreen(this.parent().screen());
        this.addSelfToParent();
    },

/* Private members */

    __screen: null,
    __focus: null,
    __attached: null,

    __parentNode: null,
    __nextSibling: null,
    __prevSibling: null,
    __children: null,

}
Inheritance.setExtends(XNode, 'XNode', Object);
