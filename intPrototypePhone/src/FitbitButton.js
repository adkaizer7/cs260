// KPR Script file
exports.FitbitButton = BUTTONS.Button.template(function($){ return{
				left:0, right:0, top: 0, bottom: 0, active : true,
				skin: greenSkin, downSkin : greenPressSkin, upSkin : greenSkin,
						contents:[
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"A&D Blood", style: headerStyle}),
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"Pressure Monitor", style: headerStyle}),
								//new Label({top: 10, bottom: 10, left: 10, right: 10, string:"Bluetooth Enabled BP monitor", style: textStyle}),
								new Label({top: 10, bottom: 10, left: 10, right: 10, string:"Fitbit Button", style: textStyle}),
						],
				behavior: 
				
				//Object.create((MainScreen.behaviors[3]).prototype),

				Object.create(BUTTONS.ButtonBehavior.prototype, {
					onCreate : { value: function(content){
						this.downSkin = greenPressSkin;
						this.upSkin = greenSkin;
					}},				
					onTouchBegan: { value: function(content){
							content.skin = this.downSkin;
							trace("Fitbit was tapped.\n");
							}},
					onTouchEnded: { value: function(content){
						content.skin = this.upSkin;
						
						}},
					onComplete: { value: function(content, message, json){
							}},
					})
					}
				});

	