// KPR Script file

var DIALOGOKBOX = require('DialogBoxOKTemplate.js');

exports.DialogBoxTemplate = Container.template(function($) 
	{ 
		return{ 
				left:20, right:20, top:150, height:200, skin: $.skin, style : headerStyle,
				behavior: Object.create(Container.prototype,{
						onCreate: { 
							value: function(content){
								trace("Touched\n");
								KEYBOARD.hide();
								content.focus();
							}
						}
					}
				),
				contents:[
					new DIALOGOKBOX.DialogBoxOKTemplate({dialogBox: this}),
					new Label({left:0, right:0, top: 20, height: 40, string: $.line1, style : headerStyle, horizontal : 'center'}),
					new Label({left:0, right:0, top: 60, height: 40, string: $.line2, style : headerStyle, horizontal : 'center'}),
				],		
		}
	});
