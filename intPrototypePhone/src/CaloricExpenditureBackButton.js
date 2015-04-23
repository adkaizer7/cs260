// KPR Script file
exports.CaloricExpenditureBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: blueSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create((MainScreen.behaviors[6]).prototype),
}});