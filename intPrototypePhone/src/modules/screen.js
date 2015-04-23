//@module

var XDocument = require("modules/ui/xdocument");
var Inheritance = require("modules/meta/inheritance");

exports.klass = Screen = function() {
    this.__director = null;
    this.__hasFocus = false;
}
Screen.prototype = {
    __director: null,
    __hasFocus: false,
    __document: null,

    /**
     * Set the director of the screens to DIRECTOR. Called automatically when
     * adding the screen to the director. Initializes the screen.
     */
    init: function(director) {
        this.__director = director;
        this.__document = new XDocument.klass(this)
        this.__document.setScreen(this);
        this.initKPR();
        this.__document.attach();
    },

    /**
     * Attach kpr content. Should be overridden.
     */
    initKPR: function() { },

    /**
     * Clean up because the screen has been removed.
     */
    remove: function() {
        this.__document.remove();
    },

    /**
     * Set whether the screen has focus to FOCUS and therefore can receive
     * input.
     */
    setFocus: function(focus) {
        if (this.__hasFocus != focus) {
            this.__hasFocus = focus;
            this.__document.setFocus(this.__hasFocus);
        }
    },

    /**
     * Alert that the document has been resized.
     */
    resized: function(dim) {
        this.__document.resized(dim);
    },

    /**
     * Add an object to the document.
     */
    add: function(xnode) {
        this.__document.add(xnode);
    },

    /**
     * Returns the director this screen belongs to.
     */
    director: function() { return this.__director; },

    /**
     * Returns the appstyle for the director.
     */
    appstyle: function() { return this.director().appStyle(); },

    /**
     * Set the color of the background of the screen.
     */
    setBackgroundColor: function(color) { this.__document.setColor(color); },

}
Inheritance.setExtends(Screen, 'Screen', Object);
