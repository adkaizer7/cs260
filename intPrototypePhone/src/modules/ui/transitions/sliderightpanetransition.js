//@module

var PaneTransition = require("modules/ui/transitions/panetransition");
var Inheritance = require("modules/meta/inheritance");

exports.klass = SlideRightPaneTransition /* : PaneTransition */= function() {
    this.__maxTime = 15;
}
SlideRightPaneTransition.prototype = {

/* Private members */

    __maxTime: null,

/* Public members */

    transition: function() {
        var target = this.window().width();
        var time = Math.min(this.time(), this.__maxTime);
        var offset = target * (time / this.__maxTime);
        this.oldPane().setTranslate(offset, 0);
        this.newPane().setTranslate(offset - target, 0);
        if (time >= this.__maxTime) {
            return false;
        }
        return true;
    }

}
Inheritance.setExtends(
    SlideRightPaneTransition, 'SlideRightPaneTransition', PaneTransition.klass
);
