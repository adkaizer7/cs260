// KPR Script file
exports.AppointmentsScreenBackButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: blueSkin,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create((MainScreen.behaviors[4]).prototype),
}});