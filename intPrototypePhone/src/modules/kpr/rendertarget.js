//@module

var KPRObject = require("modules/kpr/kprobject");

var Callback = require("modules/meta/callback");
var Inheritance = require("modules/meta/inheritance");
var Test = require("modules/meta/test");
var Util = require("modules/meta/util");

/**
 * This class implements a canvas that can be drawn to.
 */
exports.klass = RenderTarget = function() {
    this.__width = null;
    this.__height = null;

    this.__input = null;
    this._cbMove = [];
    this._cbOut = [];

    this.__input = KPRObject.make(false);
    this.__input.setCoordinates({
        left: 0, top: 0, width: 1, height: 1,
    });
    this.__target = new Canvas({
        left: 0, top: 0, width: 1, height: 1,
    });
    this.__input.kprObj().add(this.__target);
};
RenderTarget.prototype = {

/* Protected members */

    _cbMove: null,
    _cbOut: null,

/* Public members */

    /*void*/ addToKPRObject: function(kpro) {
        kpro.kprObj().add(this.__input.kprObj());
    },

    /*2DContext*/ ctx: function() {
        return this.__target.getContext('2d');
    },

    attachDOMCallback: function(eventType, cb) {
        this.__input.kprObj().active = true;
        switch (eventType) {
            case 'mousemove':
                this._cbMove.push(cb);
                break;
            case 'touchstart':
                this.__input.registerCallback('onTouchBegan', cb);
                break;
            case 'touchmove':
                this.__input.registerCallback('onTouchMoved', cb);
                break;
            case 'mouseout':
                this.__input.registerCallback('onTouchEnded', cb);
                break;
        }
    },

    removeDOMCallback: function(eventType, cb) {
        switch (eventType) {
            case 'mousemove':
                this._cbMove.splice(this._cbMove.indexOf(cb), 1);
                break;
            case 'touchstart':
                this.__input.unregisterCallback('onTouchBegan', cb);
                break;
            case 'touchmove':
                this.__input.unregisterCallback('onTouchMoved', cb);
                break;
            case 'mouseout':
                this.__input.unregisterCallback('onTouchEnded', cb);
                break;
        }
    },

    /*int*/ width: function() { return this.__width; },
    /*int*/ height: function() { return this.__height; },

    /*void*/ setDimensions: function(/*int*/ width, /*int*/ height) {
        if (this.__width !== width || this.__height !== height) {
            this.__width = width;
            this.__height = height;
            this.__input.setCoordinates({
                left: 0, top: 0,
                width: width,
                height: height,
            });
            newCanvas = new Canvas({
                left: 0, top: 0,
                width: width,
                height: height,
            });
            if (this.__target.container !== null) {
                this.__target.container.replace(this.__target, newCanvas);
            }
            this.__target = newCanvas;

            // Initialize some values.
            if (width != 0 && height != 0) {
                this.ctx().textBaseline = 'top';
            }
        }
    },

    /*void*/ clear: function() {
        this.__assertCanDraw();
        this.ctx().clearRect(0, 0, this.__width, this.__height);
    },

    /*void*/ fillRectangle: function(/*String*/ color, /*int*/ x, /*int*/ y,
        /*int*/ width, /*int*/ height) {
        this.__assertCanDraw();
        this.ctx().fillStyle = color;
        this.ctx().fillRect(x - 0.5, y - 0.5, width + 1, height + 1);
    },

    /*void*/ strokeRectangle: function(/*String*/ color, /*int*/ x, /*int*/ y,
        /*int*/ width, /*int*/ height, /*int*/ lineWidth) {
        lineWidth = Util.deflt(lineWidth, 1);
        this.__assertCanDraw();
        this.ctx().strokeStyle = color;
        this.ctx().lineWidth = lineWidth;
        this.ctx().strokeRect(x, y, width - 0.5, height - 0.5);
    },

    /*void*/ fillRoundedRect: function(/*String*/ color, /*int*/ x, /*int*/ y,
        /*int*/ width, /*int*/ height, /*int*/ radius) {
        this.__assertCanDraw();
        this.__pathRoundedRect(x, y, width - 0.5, height - 0.5, radius);
        this.ctx().fillStyle = color;
        this.ctx().fill();
    },

    /*void*/ strokeRoundedRect: function(/*String*/ color, /*int*/ x, /*int*/ y,
        /*int*/ width, /*int*/ height, /*int*/ radius, /*int*/ lineWidth) {
        lineWidth = Util.deflt(lineWidth, 1);
        this.__assertCanDraw();
        this.__pathRoundedRect(x, y, width - 1, height - 1, radius);
        this.ctx().strokeStyle = color;
        this.ctx().lineWidth = lineWidth;
        this.ctx().stroke();
    },

    /*void*/ setFont: function(/*String*/ font) {
        this.ctx().font = font;
    },

    /*int*/ textWidth: function(/*String*/ text) {
        if (text.length === 0) {
            return 0;
        }
        return this.ctx().measureText(text).width;
    },

    /*void*/ fillText: function(/*String*/ text, /*int*/ x, /*int*/ y,
        /*String*/ color) {
        this.__assertCanDraw();
        this.ctx().fillStyle = color;
        this.ctx().fillText(text, x, y);
    },

    /*void*/ strokeText: function(/*String*/ text, /*int*/ x, /*int*/ y,
        /*String*/ color, /*int*/ lineWidth) {
        lineWidth = Util.deflt(lineWidth, 1);
        this.__assertCanDraw();
        this.ctx().strokeStyle = color;
        this.ctx().lineWidth = lineWidth;
        this.ctx().strokeText(text, x, y);
    },

    /*void*/ drawRenderTarget: function(/*RenderTarget*/ renderTarget,
        /*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height) {
        this.__assertCanDraw();
        this.ctx().drawImage(renderTarget.__target, x, y, width, height);
    },

    /*void*/ drawTexture: function(/*Texture*/ texture,
        /*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height) {
        this.__assertCanDraw();
        this.ctx().drawImage(texture, x, y, width, height);
    },

    /*void*/ drawTextureExt: function(/*Texture*/ texture,
        /*int*/ sX, /*int*/ sY, /*int*/ sWidth, /*int*/ sHeight,
        /*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height) {
        this.__assertCanDraw();
        this.ctx().drawImage(
            texture, sX, sY, sWidth, sHeight, x, y, width, height
        );
    },

    /*void*/ drawLine: function(/*String*/ color, /*int*/ x1, /*int*/ y1,
        /*int*/ x2, /*int*/ y2, /*int*/ lineWidth) {
        lineWidth = Util.deflt(lineWidth, 1);
        this.__assertCanDraw();
        this.ctx().beginPath();
        this.ctx().moveTo(x1, y1);
        this.ctx().lineTo(x2, y2);
        this.ctx().closePath();
        this.ctx().strokeStyle = color;
        this.ctx().lineWidth = lineWidth;
        this.ctx().stroke();
    },

/* Private members */

    /*void*/ __assertCanDraw: function() {
        Test.invariant(
            this.__width !== null,
            'Dimensions have not been set yet.'
        );
    },

    /*void*/ __pathRoundedRect: function(/*int*/ x, /*int*/ y, /*int*/ width,
        /*int*/ height, /*int*/ radius) {
        this.ctx().beginPath();
        this.ctx().moveTo(x + radius, y);
        this.ctx().lineTo(x + width - radius, y);
        this.ctx().quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx().lineTo(x + width, y + height - radius);
        this.ctx().quadraticCurveTo(x + width, y + height, x + width - radius,
            y + height);
        this.ctx().lineTo(x + radius, y + height);
        this.ctx().quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx().lineTo(x, y + radius);
        this.ctx().quadraticCurveTo(x, y, x + radius, y);
        this.ctx().closePath();
    },

    __input: null,
    __target: null,
    __width: null,
    __height: null,

};
Inheritance.setExtends(RenderTarget, 'RenderTarget', Object);
