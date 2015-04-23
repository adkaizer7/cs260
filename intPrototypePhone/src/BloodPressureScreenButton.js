// KPR Script file
var bp = 80;
exports.BloodPressureScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, right: 10, left: 10, bottom: 10,  height: 60, skin: greenSkin,
	contents:[
		new Label({left: 5, right: 0, top: 0, bottom: 0, string: bp + 'Hg mm', style: titleStyle}),
	],
	behavior: Object.create((MainScreen.behaviors[10]).prototype),
}});