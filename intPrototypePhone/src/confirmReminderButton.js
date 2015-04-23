// KPR Script file
exports.confirmReminderButton = BUTTONS.Button.template(function($){ return{
	top:250, height:50, left: 100, right:100, skin: silverSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Set Alarm', }),
	],
	behavior: Object.create((MainScreen.behaviors[8]).prototype),
}});