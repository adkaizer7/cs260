// KPR Script file
var hr = 120;
exports.HeartRateScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, right: 10, left: 10, bottom: 10,  skin: greenSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: hr + 'bpm', }),
	],
	behavior: Object.create((MainScreen.behaviors[12]).prototype),
}});