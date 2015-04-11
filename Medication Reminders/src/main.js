// KPR Script file
//TEMPLATE - Sanitas

//STUFF
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
//var Otherfile = require("filename.js") //with file in /src //Otherfile.function

//SKINS
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var testSkin = new Skin({fill: "green"});

//TYPOGRAPHY
var titleType = new Style({font:"40px", color:"black"});
var smallType = new Style({font:"24px", color:"black"});
var subType = new Style({font: "15px", color: "gray"});

//BUTTONS
var backButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 80, skin: middleSkin,
	contents: [
		new Label({left:0, right:0, height:30, string:"< Back", font: "bold 20px", color: "gray"})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("backButton was tapped.\n");
			//content.invoke(new Message(deviceURL + "loseWeight"), Message.JSON);
		}},
		onComplete: { value: function(content, message, json){
			//WeightLabel.string = "Weight (lbs): " + json.weight.toFixed(2);
		}}
	})
}});

var MyCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});

var checkbox = [];

//CONTAINERS
var topSection = new Container({
	left:0, right:0, top:0, bottom:287,
	skin:topSkin,
	contents:[
			new Line({left:10, right:0, height: 30, bottom: 120, top: 0,
				contents:[
						new backButton(),
				]}),
			new Line({left:0, right:0, height: 50, bottom: 10, top: 0,
				contents:[
					new Picture({height: 60, url: "medicineBottle.png"}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Medication", style: titleType}),
						]})
	]});
	
var middleSection = new Container({
	left:0, right:0, top:120, bottom:60,
	skin:middleSkin,
	contents:[
		new Line({left:0, right:0, height: 30, bottom: 220, top: 0,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "sun.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"MORNING", style: smallType, fill: "yellow"}),
				]}),
		new Picture({left: 0, right: 240, bottom: 190, height: 40, url: "pill.png"}),
		new Line({left:100, right:0, height: 30, bottom: 170, top: 0,
				contents:[
					checkbox[0] = new MyCheckBoxTemplate({name:"Enoxaparin"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 120, top: 0,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"1 capule 500 mg", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"blood clot prevention", style: subType}),
				]}),
		new Line({left:0, right:0, height: 30, bottom: 0, top: 80,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "night.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"NIGHT", style: smallType}),
				]}),
		new Line({left:100, right:0, height: 30, bottom: 0, top: 140,
				contents:[
					checkbox[1] = new MyCheckBoxTemplate({name:"Anagrelide"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 0, top: 190,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"1 capsule 300 mg", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"anti-inflammatory", style: subType}),
				]}),
		new Picture({left: 0, right: 240, bottom: 35, height: 40, url: "pill2.png"}),
]});

var bottomSection = new Container({
	left:0, right:0, top:400, bottom:0,
	skin:bottomSkin,
	contents:[
	]});
	
//ADDING	
var ApplicationBehavior = Behavior.template({
	onLaunch: function(application, data){
		application.add(topSection);
		application.add(bottomSection);
		application.add(middleSection);
		},
})

application.behavior = new ApplicationBehavior();