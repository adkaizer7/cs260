// KPR Script file
var temp = 98;
exports.TemperatureScreenButton = BUTTONS.Button.template(function($){ return{
	top:30, height : 100, left: 50, width : 100, skin: silverSkin,
	contents:[
			new Label({left: 0, right: 0, top: 0, bottom: 0, string: temp + 'F', }),
		],
	behavior: Object.create((MainScreen.behaviors[9]).prototype),
}});