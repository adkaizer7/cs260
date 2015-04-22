//@module

exports.refs = 0;
exports.setOpen = function(open) {
    exports.refs = Math.max(exports.refs + (open ? 1 : -1), 0);
    if (exports.refs == 0 && system.keyboard.visible) {
        system.keyboard.visible = false;
    } else if (exports.refs > 0 && !system.keyboard.visible) {
        system.keyboard.visible = true;
    }
}
