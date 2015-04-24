// KPR Script file

exports.DialogBoxOKTemplate = BUTTONS.Button.template(function($){ return{
	top:120, height:50, left: 100, right:100, skin: whiteSkin,	
	contents:[
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "OK", style : headerStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.closeDialogBox($.dialogBox);
		}},
	})
}});
