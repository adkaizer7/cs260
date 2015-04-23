//@module

var ResourceManager = require("modules/resourcemanager");

var KPRObject = require("modules/kpr/kprobject");
var RenderTarget = require("modules/kpr/rendertarget");

var Callback = require("modules/meta/callback");
var Enum = require("modules/meta/enum");
var Inheritance = require("modules/meta/inheritance");
var List = require("modules/meta/list");
var Types = require("modules/meta/types");
var Util = require("modules/meta/util");

var XBlock = require("modules/ui/xblock");
var XButton = require("modules/ui/xbutton");
var XLabel = require("modules/ui/xlabel");
var XNode = require("modules/ui/xnode");

exports.klass = XList /* : XNode */ = function() {
    XNode.klass.apply(this);
    this.__kpr = null;

    this.__x = 0;
    this.__y = 0;
    this.__width = 292;

    this.__headerPadLeft = 4;
    this.__headerPadRight = 4;
    this.__headerPadTop = 4;
    this.__headerPadBottom = 4;

    this.__itemPadLeft = 8;
    this.__itemPadRight = 8;
    this.__itemPadTop = 8;
    this.__itemPadBottom = 8;

    this.__listKeys = {};
    this.__lists = new List.klass();

    this.__callbacks = [];
}
XList.prototype = {

/* Private members */

    __kpr: null,

    __x: null,
    __y: null,
    __width: null,

    __headerPadLeft: null,
    __headerPadRight: null,
    __headerPadTop: null,
    __headerPadBottom: null,

    __itemPadLeft: null,
    __itemPadRight: null,
    __itemPadTop: null,
    __itemPadBottom: null,

    // Mapping from key to list index in __lists
    __listKeys: null,
    // List of objects with keys for the name, showing the header, colors, and
    // the list. The list is an object with the keys:
    //      item: the xnode item,
    //      height: the height of the item,
    //      button: whether to have an arrow button,
    //      buttonLabel: the label or null to label the button with,
    __lists: null,

    __callbacks: null,

/* Public members */

    /* START OF CONFIG FUNCTIONS */

    x: function() { return this.__x; },
    setX: function(x) { this.__x = x; return this; },

    y: function() { return this.__y; },
    setY: function(y) { this.__y = y; return this; },

    width: function() { return this.__width; },
    setWidth: function(w) { this.__width = w; return this; },

    headerPadLeft: function() { return this.__headerPadLeft; },
    setHeaderPadLeft: function(l) { this.__headerPadLeft = l; return this; },

    headerPadRight: function() { return this.__headerPadRight; },
    setHeaderPadRight: function(l) { this.__headerPadRight = l; return this; },

    headerPadTop: function() { return this.__headerPadTop; },
    setHeaderPadTop: function(l) { this.__headerPadTop = l; return this; },

    headerPadBottom: function() { return this.__headerPadBottom; },
    setHeaderPadBottom: function(l) { this.__headerPadBottom = l; return this; },

    itemPadLeft: function() { return this.__itemPadLeft; },
    setItemPadLeft: function(l) { this.__itemPadLeft = l; return this; },

    itemPadRight: function() { return this.__itemPadRight; },
    setItemPadRight: function(l) { this.__itemPadRight = l; return this; },

    itemPadTop: function() { return this.__itemPadTop; },
    setItemPadTop: function(l) { this.__itemPadTop = l; return this; },

    itemPadBottom: function() { return this.__itemPadBottom; },
    setItemPadBottom: function(l) { this.__itemPadBottom = l; return this; },

    addCallback: function(c) { this.__callbacks.push(c); return this; },

    /* END OF CONFIG FUNCTIONS */

    getHeight: function() {
        var cur_y = 0;
        var lIter = this.__lists.iterator();
        for (var list = lIter.get(); list; list = lIter.next()) {
            var list_cur_y = 0;
            // Header
            if (list.showHeader) {
                list_cur_y += this.headerPadTop()
                    + 21 // TODO Make dynamic
                    + this.headerPadBottom();
            }
            // Items
            var index = 0;
            var iter = list.items.iterator();
            for (var n = iter.get(); n; n = iter.next()) {
                list_cur_y += n.height + this.itemPadTop()
                    + this.itemPadBottom();
            }
            cur_y += list_cur_y;
        }
        return cur_y;
    },

    childKPRContainer: function() {
        return this.__kpr;
    },

    removeSelf: function() {
        this.__kpr.removeSelf();
    },

    addSelfToParent: function() {
        this.__kpr = KPRObject.make(true);
        this.__kpr.addToKPRObject(this.parent().childKPRContainer());

        var cur_y = 0;
        var lIter = this.__lists.iterator();
        for (var list = lIter.get(); list; list = lIter.next()) {
            var xlist = (new XBlock.klass())
                .setX(0).setY(cur_y).setWidth(this.width())
                .setColor(this.appstyle().subActiveColor())
                .setStyle(XBlock.Styles.FILL_RECT);

            var list_cur_y = 0;

            // Header
            if (list.showHeader) {
                if (list.name !== null) {
                    xlist.add((new XLabel.klass())
                        .setX(this.headerPadLeft()).setY(this.headerPadTop())
                        .setText(list.name).setWidth(this.width()
                            - this.headerPadLeft() - this.headerPadRight())
                        .setColor(this.appstyle().nullColor())
                    );
                }
                list_cur_y += this.headerPadTop()
                    + this.appstyle().defaultFontSize() // TODO Make dynamic
                    + this.headerPadBottom();
            }

            // Items
            var iter = list.items.iterator();
            for (var n = iter.get(); n; n = iter.next()) {
                var h = n.height + this.itemPadTop() + this.itemPadBottom();
                var cols = list.colors;
                if (cols === null) {
                    cols = [
                        this.appstyle().subSubInactiveColor(),
                        this.appstyle().subInactiveColor(),
                    ];
                }
                var wrapper1 = (new XBlock.klass())
                    .setX(0).setY(list_cur_y).setWidth(this.width())
                    .setHeight(h)
                    .setColor(cols[iter.index() % cols.length])
                    .setStyle(XBlock.Styles.FILL_RECT);
                xlist.add(wrapper1);
                list_cur_y += h;

                var wrapper2 = (new XBlock.klass())
                    .setX(this.itemPadLeft()).setY(this.itemPadTop())
                    .setWidth(this.width() - this.itemPadLeft()
                        - this.itemPadRight())
                    .setHeight(n.height)
                wrapper1.add(wrapper2);

                wrapper2.add(n.item);

                // button: whether to have an arrow button,
                // buttonLabel: the label or null to label the button with,
                if (n.button) {
                    var dim = 21; // TODO: make dynamic
                    wrapper2.add(
                        (new XButton.klass())
                            .setX(this.width() - dim - this.itemPadLeft()
                                - this.itemPadRight())
                            .setY((n.height - dim) / 2)
                            .setWidth(dim).setHeight(dim)
                            .setStyle(XButton.Styles.TEXTURE)
                            .setTextures(ResourceManager.get().loadSpriteSheet(
                                'modules/ui/assets/rightarrow.xml'
                            )).addCallback(Callback.make(function(data) {
                                for (i in this.__callbacks) {
                                    this.__callbacks[i].call(data.k, data.i);
                                }
                            }, this)).setCallbackData({
                                k: list.key,
                                i: iter.index(),
                            })
                    );
                    if (n.buttonLabel !== null) {
                        wrapper2.add(
                            (new XLabel.klass())
                                .setX(0)
                                .setY((n.height - 21) / 2) // TODO: make dynamic
                                .setWidth(this.width() - dim
                                    - this.itemPadLeft() - this.itemPadRight())
                                .setText(n.buttonLabel)
                                .setHAlign(XLabel.HAlign.RIGHT)
                        );
                    }
                }
            }

            xlist.setHeight(list_cur_y);
            this.__addListXNode(xlist);
            cur_y += list_cur_y;
        }
        this.__kpr.setCoordinates({
            left: this.__x, width: this.__width,
            top: this.__y, height: cur_y,
        });
    },

    addList: function(listName, colors) {
        colors = Util.deflt(colors, null);
        var newKey = this.__getNewKey();
        this.__lists.appendChild({
            name: listName,
            showHeader: listName !== undefined,
            items: new List.klass(),
            colors: colors,
            key: newKey,
        });
        this.__listKeys[newKey] = this.__lists.length() - 1;
        return newKey;
    },

    __getNewKey: function() {
        var i = 0;
        while (i in this.__listKeys) {
            i++;
        }
        return i;
    },

    removeList: function(listId) {
        var index = this.__listKeys[listId];
        delete this.__listKeys[listId];
        for (var key in this.__listKeys) { 
            if (this.__listKeys[key] > index) {
                this.__list.item(this.__listKeys[key]).key--;
                this.__listKeys[key]--; 
            }
        }
        this.__lists.removeChild(this.__lists.item(index));
    },

    addListItem: function(item, height, listId, button, buttonLabel) {
        button = Util.deflt(button, false);
        buttonLabel = Util.deflt(buttonLabel, null);
        if (Types.isString(item)) {
            item = (new XLabel.klass())
                .setX(0).setY(0).setText(item).setWidth(this.width()
                    - this.itemPadLeft() - this.itemPadRight());
            height = 21; // TODO fix this to be a variable. Refactor appstyle?
        }
        var index = this.__listKeys[listId];
        this.__lists.item(index).items.appendChild({
            item: item,
            height: height,
            button: button,
            buttonLabel: buttonLabel,
        });
    },

    removeListItem: function(index, listId) {
        var index = this.__listKeys[listId];
        var list = this.__lists.item(index).items;
        list.removeChild(list.item(index));
    },

    __addListXNode: function(xnode) {
        if (this.hasChildren()) {
            this.__children.last().setNextSibling(xnode);
        }
        xnode.setPrevSibling(this.__children.last());
        this.__children.appendChild(xnode);
        xnode.setParent(this);
        if (this.attached()) {
            xnode.attach();
        }
    },
}
Inheritance.setExtends(XList, 'XList', XNode.klass);
