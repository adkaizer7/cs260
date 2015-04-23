// KPR Script file
exports.refillButton = BUTTONS.Button.template(function($){ return{
	height: 10, top: 10, bottom: 10, left: 10, right: 10, skin: $.skin, 
	contents: [
		new Label({left:0, right:0, height:40, string: $.textForLabel, style: titleStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("refillButton was tapped.\n");
			//content.invoke(new Message(deviceURL + "refillMed"), Message.JSON); //NEED TO IMPLEMENT move back to 100%
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			med_app = 100;
			pillsLabel.string = "Amount left:" + med_app + "%";
			KEYBOARD.hide();
			content.focus();
		}},
		onComplete: { value: function(content, message, json){
			pillsLabel.string = "Pill Amount: " + json.food.toFixed(2) + "%";
		}},
	})
}});