// KPR Script file
var temp = 98;
exports.TemperatureScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, right: 10, left: 10, bottom: 10,  height: 60, skin: greenSkin,
	contents:[
			new Label({left: 5, right: 0, top: 0, bottom: 0, string: temp + 'F', style: titleStyle}),
		],
	behavior: Object.create((MainScreen.behaviors[9]).prototype),
}});