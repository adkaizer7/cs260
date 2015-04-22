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
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
		new Picture({left:0, right:0, top:0, bottom:0, height: 1, url:"back.png"}),
		new Label({top: 0, bottom: 0, left: 0, right: 100, string: "Back", style: titleStyle}),
		],
		})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("backButton was tapped.\n");
			//application.behavior.switchScreen(HomeScreen);
		}},
	})
}});

var callButton = BUTTONS.Button.template(function($){ return{
	height: 10, top: 10, bottom: 10, left: 10, right: 10, skin: darkGreenSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"> Call Doctor's Office", style: titleStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("callButton was tapped.\n");
		}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});

var ApptmtsInfoScreen = new Column({
		left:0, right:0, top:0, bottom:0, skin: silverSkin,
		contents:[
			new ScreenBackButton(),
			
			new Column({ //pill button, name, amount
				left:10, right:10, top:0, bottom:0,
				skin:whiteSkin,
				contents:[
					new Picture({height: 90, url: "AndyCarle.png"}), 
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Dr. Andy Kinoma", style: titleStyle}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Heart specialist", style: textStyle}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"San Gabriel Valley Medical Center", style: textStyle}),
			]}),					
			new Column({ //use
				left:10, right:10, top: 10, bottom: 0,
				skin: whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Address", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"2160 UX Way Berkeley, CA 94704", style: textStyle}),
						]}),
						
			new Column({ //frequency
				left:10, right:10, top: 10, bottom: 0,
				skin:whiteSkin,
						contents:[
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Notes", style: headerStyle}),
								new Label({top: 0, bottom: 0, left: 10, right: 10, string:"He's really nice", style: textStyle}),
						]}),
			new callButton(),
]});

application.add(ApptmtsInfoScreen);