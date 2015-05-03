// KPR Script file
exports.ToastBoxTemplate = Container.template(function($) 
	{ 
		return{ 
				left:20, right:20, top:400, height:90, skin: alphaBlueSkin, style : labelStyle,
				opacity : .6,
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
					new Label({left:0, right:0, top: 10, height: 40, string: $.line1, style : headerStyle, horizontal : 'center'}),
					new Label({left:0, right:0, top: 40, height: 40, string: $.line2, style : headerStyle, horizontal : 'center'}),					
				],		
		}
	});
