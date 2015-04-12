// KPR Script file
//STUFF
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

//SKINS
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var graySkin = new Skin({fill: "#d3d3d3"});

//TYPOGRAPHY
var titleType = new Style({font:"40px", color:"black"});
var smallType = new Style({font:"24px", color:"black"});
var alertType = new Style({font:"24px", color:"white"});
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
			//application.remove(oldContainer);
			//application.add(newContainer);
		}}
	})
}});

var DayCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	takenDayMedicine = true;
        	this.selectedName = buttonName;
        	AlertLabel.string = "nothing for now"
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
        	this.selectedName = buttonName;
        	takenDayMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});

var NightCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	takenNightMedicine = true;
        	this.selectedName = buttonName;
        	AlertLabel.string = "nothing for now"
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
        	takenNightMedicine = false;
        	this.selectedName = buttonName;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});

var checkbox = [];

//TIMER
var takenDayMedicine = false;
var takenNightMedicine = false;
var reminderDayHours = 9; //check take medicine at 9 AM
var reminderNightHours = 18; //check take medicine at 6 PM

Handler.bind("/time", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			application.distribute( "onTimeUpdated" );
				handler.invoke( new Message( "/delay?duration=60000" ) ); //will check time again after 1 minute
		},
	},
}));
Handler.bind("/delay", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			var query = parseQuery( message.query );
				var duration = query.duration;
				handler.wait( duration )
		},
	},
	onComplete: { value: 
		function(handler, message) {
			handler.invoke( new Message( "/time" ) );
		},
	},
}));

//CONTAINERS
var topSection = new Container({
	left:0, right:0, top:0, bottom:287,
	skin:topSkin,
	contents:[
			new Line({left:10, right:0, height: 30, bottom: 190, top: 0,
				contents:[
						new backButton(),
				]}),
			new Line({left:0, right:0, height: 50, bottom: 90, top: 0,
				contents:[
					new Picture({height: 60, url: "appointments.png"}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Calendar", style: titleType}),
						]})
	]});
	
var middleSection = new Container({
	left:0, right:0, top:120, bottom:60,
	skin:middleSkin,
	contents:[
		new Line({left:0, right:0, height: 25, bottom: 320, top: 0, skin: graySkin,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "appointments.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"UPCOMING", style: smallType, fill: "yellow"}),
				]}),
		new Picture({left: 0, right: 250, bottom: 260, height: 40, url: "AndyCarle.png"}),
		new Line({left:100, right:0, height: 30, bottom: 220, top: 0,
				contents:[
					checkbox[0] = new DayCheckBoxTemplate({name:"Dr. Andy Kinoma"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 160, top: 0,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 16 @ 11 AM", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Heart Transplant", style: subType}),
				]}),
		new Line({left:0, right:0, height: 25, bottom: 120, top: 200, skin: graySkin,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "appointments.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"PAST", style: smallType}),
				]}),
		new Line({left:100, right:0, height: 30, bottom: 0, top: 170,
				contents:[
					checkbox[1] = new NightCheckBoxTemplate({name:"Dr. Mary Berry"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 1", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Syphilis Shot", style: subType}),
				]}),
		new Picture({left: 0, right: 250, bottom: 60, height: 40, url: "woman-doctor.png"}),
]});

var AlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"no alerts for now", style: alertType}),

var bottomSection = new Container({
	left:0, right:0, top:450, bottom:0,
	skin:bottomSkin,
	contents:[
		AlertLabel
	]});
	
//ADDING	
var ApplicationBehavior = Behavior.template({
	onLaunch: function(application, data){
		application.add(topSection);
		application.add(bottomSection);
		application.add(middleSection);
		application.invoke(new Message("/time"));
		},
	onTimeUpdated: function(container) {
		var date = new Date();
		var hours = String( date.getHours() );
		var minutes = String( date.getMinutes() );
			if ( 1 == minutes.length )
				minutes = '0' + minutes;
		trace ("time is currently: " + hours + ":" + minutes + "\n");
		trace ("takenDayMedicine: " + takenDayMedicine + "\n");
		trace ("takenNightMedicine: " + takenNightMedicine + "\n");
			if (hours >= reminderDayHours && hours < reminderNightHours && takenDayMedicine == false)
				AlertLabel.string = "Reminder: visit Dr. Grey";
			if (hours >= reminderNightHours && takenNightMedicine == false)
				AlertLabel.string = "Reminder: visit Dr. Kinoma";
			if (hours == 11 && minutes == 59)
				//RESET EVERYTHING AT MIDNIGHT
				takenDayMedicine = false;
				takenNightMedicine = false;
				//for (i = 0; i <= checkbox.length; i++) 
			//		checkbox[i].behavior.setSelected(false);
		},
})

application.behavior = new ApplicationBehavior();
/*// KPR Script file
//TEMPLATE - Sanitas

var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var titleStyle = new Style({font:"bold 70px", color:"black"});
var labelStyle = new Style( { font: "bold 26px", color:"white" } );
var apptStyle = new Style( { font: "bold 12px", color:"blue" } );
var msgStyle = new Style( { font: "bold 18px", color:"yellow" } );
var greenS = new Skin({fill:"green"});
var redS = new Skin({fill:"red"});
var blueS = new Skin({fill:"blue"});
var whiteS = new Skin({
	fill:"white", 
	borders:{left:5, right:5, top:5, bottom:5}, 
	stroke:"black"
});

//all the buttons
var backButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 170, top: 0, height:30,
	contents: [
		new Label({left:0, right:0, height: 30, string:"Back", style: labelStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});

//var doneButton = new backButton ({Label.string = "Done"});
var doneButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 0, top: 40, height:40,
	contents: [
		new Label({left:0, right:0, height: 30, string:"Done", style: labelStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});


var apptButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 0, top: 40, height:40,
	contents: [
		new Label({left:0, right:0, height: 30, string:"Doctor's Appointment", style: apptStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});

var msgButton = BUTTONS.Button.template(function($){ return{
	left: 0, right: 0, top: 40, height:40,
	contents: [
		new Label({left:0, right:0, height: 30, string:"Message", style: apptStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
		}},
		onComplete: { value: function(content, message, json){
		}}
	})
}});

var topSection = new Container({
	left:0, right:0, top:0, bottom:0, skin: topSkin,
	contents: [
		new backButton(),
		new Label({ left: 0, right: 0, top: 0, bottom: 0, height: 0, 
		string: "Calendar", style: titleStyle, name: "title"})
			]
		});
	
var middleSection = new Container({
	left:0, right:0, top:50, bottom:50,
	skin:middleSkin,
	contents:[
			
]});

var bottomSection = new Container({
	left:0, right:0, top:0, bottom:0,
	skin:bottomSkin,
	contents:[
	]});

var main = new Column({
	left:0, right:0, top:0, bottom:0,
	skin: greenS,
	contents:[
		topSection,
		new Line({left:0, right:0, top:0, bottom:0, skin: whiteS,
			contents:[
				new Column({ 
					left:0, right:0, top:0, bottom:0,
					skin: whiteS,
					contents:[
					new doneButton(),
					new doneButton(),
					new doneButton()
					]
				}),
				new Column({ 
					left:0, right:0, top:0, bottom:0,
					skin: whiteS,
					contents:[
					new apptButton(),
					new apptButton(),
					new apptButton()
					]
				}),
				new Column({ 
					left:0, right:0, top:0, bottom:0,
					skin: whiteS,
					contents:[
					new msgButton(),
					new msgButton(),
					new msgButton()
					]
				})
			]
		}),
		bottomSection
	]
});

application.add(main);


/*application.behavior = Object.create(Behavior.prototype, {
	onLaunch: { value: function(application, data){
		application.add(topSection);
		application.add(middleSection);
		application.add(bottomSection);
		}}
});*/
