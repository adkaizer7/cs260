// KPR Script file
var TRANSITIONS = require('transitions');

exports.btn = BUTTONS.Button.template(function($){ return{
	top: 10, bottom: 10, left: 10, right: 10, skin: $.skin, 
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			new Label({top: 0, bottom: 0, left: 5, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to
			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});


// KPR Script file
