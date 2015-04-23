// KPR Script file
exports.ViewDataScreenButton = BUTTONS.Button.template(function($){ return{
	top:75, bottom:325, left: 50, right:50, skin: silverSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'View Data', }),
	],
	behavior: Object.create((MainScreen.behaviors[6]).prototype),
}});