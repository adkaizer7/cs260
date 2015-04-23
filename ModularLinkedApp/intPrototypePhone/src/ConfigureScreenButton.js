// KPR Script file
exports.ConfigureScreenButton = BUTTONS.Button.template(function($){ return{
	top:25, bottom:375, left: 50, right: 50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Configure Devices', }),
		],
	behavior: Object.create((MainScreen.behaviors[4]).prototype),
}});