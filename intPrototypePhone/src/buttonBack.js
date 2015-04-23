// KPR Script file

exports.BackToHome = BUTTONS.Button.template(function($){ return{
	top:10, bottom:10, left: 10, right:10, skin: blueSkin,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:"< Back", style: titleStyle}),
	],
	behavior: Object.create((MainScreen.behaviors[3]).prototype),
}});
