// KPR Script file
exports.MedicationReminderScreenButton = BUTTONS.Button.template(function($){ return{
	top:125, bottom:275, left: 50, right:50, skin: silverSkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Medication/Reminders', }),
	],
	behavior: Object.create((MainScreen.behaviors[7]).prototype),
}});