// KPR Script file
var TRANSITIONS = require('transitions');

exports.btn = Container.template(function($){ return{
	top: 5, bottom: 5, left: 5, right: 5, skin: $.skin, active: true,
	contents: [
		new Column({top: 5, bottom: 5, right: 5, left: 5,
			contents:[
				new Picture({top: 0, bottom: 0, left: 0, right: 0, url: $.iconForLabel}),
				new Label({top: 0, bottom: 0, left: 0, right: 0, string: $.textForLabel, style: buttonSmallStyle}),
						]}),
	],	
	behavior: Behavior({
		onCreate: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		},
		onTouchEnded: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
		},
		onComplete: function(content, message, json){
		},
	})
}});
