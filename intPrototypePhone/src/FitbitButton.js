// KPR Script file
exports.FitbitButton = BUTTONS.Button.template(function($){ return{
				left:0, right:0, top: 0, bottom: 0, active : true,
				skin: greenSkin, downSkin : greenPressSkin, upSkin : greenSkin,
						contents:[
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"A&D Blood", style: headerStyle}),
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"Pressure Monitor", style: headerStyle}),
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"Bluetooth Enabled BP monitor", style: textStyle}),
								new Label({top: 10, bottom: 10, left: 10, right: 10, string:"", style: textStyle}),
						],
				behavior: 
				
				//Object.create((MainScreen.behaviors[3]).prototype),

				Object.create(BUTTONS.ButtonBehavior.prototype, {
					onCreate: { value: function(content, name){
						content.first.string = name;
					}},
					onTouchBegan: { value: function(content){
						content.skin = this.downSkin;
						trace("backButton was tapped.\n");
					}},
					onTouchEnded: { value: function(content){
						content.skin = this.upSkin;
						var oldScreen = currentScreen; //store the old screen so we can use it in the transition
						currentScreen = new SCREENS.screen15; //make the new screen we want to transition to
						
						//fire the transition between the oldScreen and the newScreen
						application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
					}},
					onComplete: { value: function(content, message, json){
					}}
				})
}});

	