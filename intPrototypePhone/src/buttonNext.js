// KPR Script file
exports.NextToHome = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:0, skin: blueSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"next.png"}),
	],
	behavior: Object.create((MainScreen.behaviors[4]).prototype),
}});


