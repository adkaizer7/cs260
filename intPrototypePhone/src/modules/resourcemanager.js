//@module

var Inheritance = require("modules/meta/inheritance");
var SpriteSheet = require("modules/kpr/spritesheet");

var staticResourceManager = null;
exports.get = function() {
    if (staticResourceManager === null) {
        trace('Making ResourceManager\n');
        staticResourceManager = new ResourceManager();
    }
    return staticResourceManager;
}

var ResourceManager = function() {
    this.__textures = {};
    this.__spritesheets = {};
}
ResourceManager.prototype = {
    __textures: null,
    __spritesheets: null,
    loadTexture: function(path) {
        if (!(path in this.__textures)) {
            var uri = mergeURI(application.url, '/src/' + path);
            this.__textures[path] = new Texture(uri);
        }
        return this.__textures[path];
    },
    loadSpriteSheet: function(path) {
        if (!(path in this.__spritesheets)) {
            this.__spritesheets[path] = SpriteSheet.loadFromFile(path);
            // To avoid circular dependency, manually load texture.
            this.__spritesheets[path].__texture = this.loadTexture(
                this.__spritesheets[path].__texture
            );
        }
        return this.__spritesheets[path];
    },
}
Inheritance.setExtends(ResourceManager, 'ResourceManager', Object);
