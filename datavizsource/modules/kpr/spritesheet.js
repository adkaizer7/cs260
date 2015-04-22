//@module

var Inheritance = require("modules/meta/inheritance");
var List = require("modules/meta/list");
var Rect = require("modules/meta/rect");

exports.klass = SpriteSheet = function(texture, frames) {
    this.__texture = texture;
    this.__frames = new List.klass(frames);
}
SpriteSheet.prototype = {
    __texture: null,
    __frames: null,
    texture: function() { return this.__texture; },
    frame: function(i) { return this.__frames.item(i); },
}
Inheritance.setExtends(SpriteSheet, 'SpriteSheet', Object);

/**
 * DO NOT USE. Load using a ResourceManager.
 */
exports.loadFromFile = function(path) {
    var uri = mergeURI(application.url, path);
    var text = Files.readText(uri);
    var file = DOM.parse(text);
    var texture = file.getElementsByTagName('file').item(0).firstChild.value;
    var flist = file.getElementsByTagName('frame');
    var frames = new List.klass();
    for (var i = 0; i < flist.length; i++) {
        frames.appendChild(new Rect.klass(
            flist.item(i).getAttribute('x'),
            flist.item(i).getAttribute('y'),
            flist.item(i).getAttribute('width'),
            flist.item(i).getAttribute('height'),
        ));
    }
    return new SpriteSheet(texture, frames);
};