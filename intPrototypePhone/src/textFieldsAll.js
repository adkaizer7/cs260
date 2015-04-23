// KPR Script file

var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');


exports.idField = Container.template(function($) { return { 
  left: 10, right: 10, top: 10, bottom: 10, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 20, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: headerStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	
         	onEdited: { value: function(label){
         			//KEYBOARD.show();
         			var data = this.data;
         			trace(label.string);
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}},
         	
         	onKeyDown: { value:  function(label, key, repeat, ticks) {
                    if (key) {
                        var code = key.charCodeAt(0);
                        if (code == 3 /* enter */ || code == 13 /* return */) {
                        	var string = label.string;
                            KEYBOARD.hide();
                        } else {
                            CONTROL.FieldLabelBehavior.prototype.onKeyDown.call(this, label, key, repeat, ticks);
                        }
                    }
                }   
            },
            
           onTouchEnded: { value: function(content){
		      trace("got here");
		      KEYBOARD.show();
		      content.focus();
		    }},
         	
         	})
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:headerStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});


exports.usernameField = Container.template(function($) { return { 
  left: 10, right: 10, top: 10, bottom: 10, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 0, right: 0, top: 0, bottom: 0, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 20, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: headerStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	
         	onEdited: { value: function(label){
         			//KEYBOARD.show();
         			var data = this.data;
         			trace(label.string);
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}},
         	
         	onKeyDown: { value:  function(label, key, repeat, ticks) {
                    if (key) {
                        var code = key.charCodeAt(0);
                        if (code == 3 /* enter */ || code == 13 /* return */) {
                        	var string = label.string;
                            KEYBOARD.hide();
                        } else {
                            CONTROL.FieldLabelBehavior.prototype.onKeyDown.call(this, label, key, repeat, ticks);
                        }
                    }
                }   
            },
            
           onTouchEnded: { value: function(content){
		      trace("got here");
		      KEYBOARD.show();
		      content.focus();
		    }},
         	
         	})
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:headerStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});

exports.passwordField = Container.template(function($) { return { 
 	left: 10, right: 10, top: 10, bottom: 10, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 0, right: 0, top: 0, bottom: 0, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 20, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: headerStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	
         	onEdited: { value: function(label){
         			//KEYBOARD.show();
         			var data = this.data;
         			trace(label.string);
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}},
         	
         	onKeyDown: { value:  function(label, key, repeat, ticks) {
                    if (key) {
                        var code = key.charCodeAt(0);
                        if (code == 3 /* enter */ || code == 13 /* return */) {
                        	var string = label.string;
                            KEYBOARD.hide();
                        } else {
                            CONTROL.FieldLabelBehavior.prototype.onKeyDown.call(this, label, key, repeat, ticks);
                        }
                    }
                }   
            },
            
           onTouchEnded: { value: function(content){
		      trace("got here");
		      KEYBOARD.show();
		      content.focus();
		    }},
         	
         	})
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:headerStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});

exports.confirmPasswordField = Container.template(function($) { return { 
  left: 10, right: 10, top: 10, bottom: 10, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 18, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: headerStyle, anchor: 'NAME',
          editable: true, string: $.name,
         	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         	
         	onEdited: { value: function(label){
         			//KEYBOARD.show();
         			var data = this.data;
         			trace(label.string);
              		data.name = label.string;
              		label.container.hint.visible = ( data.name.length == 0 );	
         		}},
         	
         	onKeyDown: { value:  function(label, key, repeat, ticks) {
                    if (key) {
                        var code = key.charCodeAt(0);
                        if (code == 3 /* enter */ || code == 13 /* return */) {
                        	var string = label.string;
                            KEYBOARD.hide();
                        } else {
                            CONTROL.FieldLabelBehavior.prototype.onKeyDown.call(this, label, key, repeat, ticks);
                        }
                    }
                }   
            },
            
           onTouchEnded: { value: function(content){
		      KEYBOARD.show();
		      content.focus();
		    }},
         	
         	})
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:headerStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});


exports.MyField = Container.template(function($) { return { 
  	left: 10, right: 10, top: 10, bottom: 10, skin: fieldInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 20, top: 0, bottom: 0, style: headerStyle, anchor: 'NAME',
          editable: true, string: "",
          behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         		var data = this.data;
              	data.name = label.string;
              	trace("field " + label.string + '\n');
              	label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:headerStyle, string:$.string, name:"hint"
         })
      ]
    })
  ]
}});