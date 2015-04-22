// KPR Script file
var ce = 350;
exports.CaloricExpenditureScreenButton = BUTTONS.Button.template(function($){ return{
	top:200, height : 100, left: 50, width : 100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: ce + 'cal', }),
	],
	behavior: Object.create((MainScreen.behaviors[11]).prototype),
}});