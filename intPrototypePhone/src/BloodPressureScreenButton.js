// KPR Script file
var bp = 80;
exports.BloodPressureScreenButton = BUTTONS.Button.template(function($){ return{
	top:30, height : 100, right: 30, width : 100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: bp + 'Hg mm', }),
	],
	behavior: Object.create((MainScreen.behaviors[10]).prototype),
}});