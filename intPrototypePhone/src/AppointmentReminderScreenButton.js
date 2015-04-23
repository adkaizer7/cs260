// KPR Script file
exports.AppointmentReminderScreenButton = BUTTONS.Button.template(function($){ return{
	top:10, bottom:10, left: 10, right:10, skin: greenSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, style: headerStyle, string: 'Appointments', }),
	],
	behavior: Object.create((MainScreen.behaviors[5]).prototype),
}});
