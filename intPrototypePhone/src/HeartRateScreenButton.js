// KPR Script file
var hr = 120;
exports.HeartRateScreenButton = BUTTONS.Button.template(function($){ return{
	top:200, height : 100, right: 30, width : 100, skin: silverSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: hr + 'bpm', }),
	],
	behavior: Object.create((MainScreen.behaviors[12]).prototype),
}});