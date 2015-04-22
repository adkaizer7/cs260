//@program
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var titleStyle = new Style({font:"40px Avenir Heavy", color:"black"});
var headerStyle = new Style({font:"30px Avenir Heavy", color:"black"});
var textStyle = new Style({font:"22px Avenir", color:"black"});
var whiteSkin = new Skin({fill:"#ecf0f1"});
var silverSkin = new Skin({fill:"#bdc3c7"});
var greenSkin = new Skin({fill: "#27ae60"});
var greenPressSkin = new Skin({fill: "#64bc88"});
var blueSkin = new Skin({fill: "#2980b9"});
var bluePressSkin = new Skin({fill: "#5794b5"});

var ScreenBackButton = BUTTONS.Button.template(function($){ return{
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

var pillsLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Amount left: 100%", style: textStyle}),

var refillButton = BUTTONS.Button.template(function($){ return{
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
		}},
		onComplete: { value: function(content, message, json){
			pillsLabel.string = "Pill Amount: " + json.food.toFixed(2) + "%";
		}},
	})
}});

var MedInfoScreen = new Column({
		left:0, right:0, top:0, bottom:0, skin: silverSkin,
		contents:[
			new ScreenBackButton({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back"}),
			
			new Column({ //pill button, name, amount
				left:10, right:10, top:0, bottom:0,
				skin:whiteSkin,
				contents:[
					new Picture({right: 0, left: 0, top: 0, bottom: 0, height: 20, url: "pill.png"}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Spironolactone", style: titleStyle}),
					pillsLabel,
			]}),					
			new Column({ //use
				left:10, right:10, top: 10, bottom: 0,
				skin: whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Treatment", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"low blood pressure and swelling", style: textStyle}),
						]}),
						
			new Column({ //frequency
				left:10, right:10, top: 10, bottom: 0,
				skin:whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Frequency to Take", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"every morning by mouth with food", style: textStyle}),
						]}),
						
			new Column({ //side effects
				left:10, right:10, top: 10, bottom: 0,
				skin:whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Side Effects", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"drowsiness, nausea", style: textStyle}),
						]}),
			new refillButton({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Refill Prescription"}),
]});

application.add(MedInfoScreen);