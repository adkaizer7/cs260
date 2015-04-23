// KPR Script file
var ce = 350;
exports.CaloricExpenditureScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, right: 10, left: 10, bottom: 10,  height: 60, skin: greenSkin,
	contents:[
		new Label({left: 5, right: 0, top: 0, bottom: 0, string: ce + 'cal', style: titleStyle}),
	],
	behavior: Object.create((MainScreen.behaviors[11]).prototype),
}});