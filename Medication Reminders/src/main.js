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
        	AlertLabel.string = "Reminders: nothing for now"
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
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
        	AlertLabel.string = "nothing for now"
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
        	takenNightMedicine = false;
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
					new Picture({height: 60, url: "medicineBottle.png"}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Medication", style: titleType}),
						]})
	]});
	
var middleSection = new Container({
	left:0, right:0, top:120, bottom:60,
	skin:middleSkin,
	contents:[
		new Line({left:0, right:0, height: 25, bottom: 320, top: 0, skin: graySkin,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "sun.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"MORNING", style: smallType, fill: "yellow"}),
				]}),
		new Picture({left: 0, right: 250, bottom: 260, height: 40, url: "pill.png"}),
		new Line({left:100, right:0, height: 30, bottom: 220, top: 0,
				contents:[
					checkbox[0] = new DayCheckBoxTemplate({name:"Enoxaparin"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 170, top: 0,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"1 capsule 500 mg", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"blood clot prevention", style: subType}),
				]}),
		new Line({left:0, right:0, height: 25, bottom: 120, top: 200, skin: graySkin,
				contents:[
					new Picture({left: 0, right: 0, height: 30, url: "night.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"NIGHT", style: smallType}),
				]}),
		new Line({left:100, right:0, height: 30, bottom: 0, top: 170,
				contents:[
					checkbox[1] = new NightCheckBoxTemplate({name:"Anagrelide"}),
				]}),
		new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
				contents:[
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"1 capsule 300 mg", style: subType}),
					new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"anti-inflammatory", style: subType}),
				]}),
		new Picture({left: 0, right: 250, bottom: 60, height: 40, url: "pill2.png"}),
]});

var AlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Reminders: none for now", style: alertType}),

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
				AlertLabel.string = "Reminder: take Enoxaparin";
			if (hours >= reminderNightHours && takenNightMedicine == false)
				AlertLabel.string = "Reminder: take Anagrelide";
			if (hours == 11 && minutes == 59)
				//RESET EVERYTHING AT MIDNIGHT
				takenDayMedicine = false;
				takenNightMedicine = false;
				//for (i = 0; i <= checkbox.length; i++) 
			//		checkbox[i].behavior.setSelected(false);
		},
})

application.behavior = new ApplicationBehavior();
