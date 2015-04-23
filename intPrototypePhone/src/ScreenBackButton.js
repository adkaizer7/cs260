// KPR Script file
exports.ScreenBackButton = BUTTONS.Button.template(function($){ return{
	top: 10, bottom: 10, left: 10, right: 10, skin: $.skin,
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			new Label({top: 0, bottom: 0, left: 0, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});