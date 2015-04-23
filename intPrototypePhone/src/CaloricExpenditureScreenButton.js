// KPR Script file
var ce = 350;
exports.CaloricExpenditureScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, right: 10, left: 10, bottom: 10,  skin: greenSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: ce + 'cal', }),
	],
	behavior: Object.create((MainScreen.behaviors[11]).prototype),
}});