// KPR Script file

var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');


var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteSkin = new Skin({fill:"white"});

exports.idField = Container.template(function($) { return { 
  width: 250, height: 40, top: 170, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
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
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});


exports.usernameField = Container.template(function($) { return { 
  width: 250, height: 40, top: 230, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
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
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});

exports.passwordField = Container.template(function($) { return { 
  width: 250, height: 40, top: 290, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
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
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});

exports.confirmPasswordField = Container.template(function($) { return { 
  width: 250, height: 40, top: 350, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
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
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to type here...", name:"hint"
         })
      ]
    })
  ]
}});