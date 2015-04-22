// KPR Script file
exports.AppointmentReminderScreenButton = BUTTONS.Button.template(function($){ return{
	top:175, bottom:225, left: 50, right:50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Appointments', }),
	],
	behavior: Object.create((MainScreen.behaviors[5]).prototype),
}});
