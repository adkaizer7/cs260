//@program
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var titleStyle = new Style({font:"40px Avenir Heavy", color:"black"});
var headerStyle = new Style({font:"30px Avenir Heavy", color:"black"});
var textStyle = new Style({font:"22px Avenir", color:"black"});
var whiteSkin = new Skin({fill:"#ecf0f1"});
var silverSkin = new Skin({fill:"#bdc3c7"});
var lightGreenSkin = new Skin({fill: "#83c88b"});
var darkGreenSkin = new Skin({fill: "#27ae60"});

var ScreenBackButton = BUTTONS.Button.template(function($){ return{
	top: 10, bottom: 10, left: 10, right: 10, 
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("backButton was tapped.\n");
			//application.behavior.switchScreen(HomeScreen);
		}},
	})
}});

var pillsLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Amount left: 100%", style: textStyle}),

var refillButton = BUTTONS.Button.template(function($){ return{
	height: 10, top: 10, bottom: 10, left: 10, right: 10, skin: darkGreenSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"> Refill Prescription", style: headerStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("refillButton was tapped.\n");
			content.invoke(new Message(deviceURL + "refillMed"), Message.JSON); //NEED TO IMPLEMENT move back to 100%
		}},
		onComplete: { value: function(content, message, json){
			pillsLabel.string = "Pill Amount: " + json.food.toFixed(2) + "%";
		}}
	})
}});

var MedInfoScreen = new Column({
		left:0, right:0, top:0, bottom:0, skin: silverSkin,
		contents:[
			new ScreenBackButton(),
			
			new Column({ //pill button, name, amount
				left:10, right:10, top:0, bottom:0,
				skin:whiteSkin,
				contents:[
					new Line({ left: 10, right: 10, top: 10, bottom: 0, skin: whiteSkin,
						contents:[
							new Picture({right: 0, height: 40, url: "pill.png"}),
							new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Spironolactone", style: titleStyle}),
						]}),
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
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"every morning by mouth with milk", style: textStyle}),
						]}),
						
			new Column({ //side effects
				left:10, right:10, top: 10, bottom: 0,
				skin:whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Side Effects", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"drowsiness, nausea", style: textStyle}),
						]}),
			new refillButton(),
]});

application.add(MedInfoScreen);