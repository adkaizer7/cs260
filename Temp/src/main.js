// KPR Script file
//@program

var PLOTTER = require('plotter');
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var currentScreen;
var needed;
var deviceURL = "";
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var whiteSkin = new Skin({fill:"white"});
var graySkin = new Skin({fill: "#d3d3d3"});
var labelStyle = new Style({ color: '#47476B', font: '20px', horizontal: 'null', vertical: 'null', });
var titleStyle = new Style({ color: '#47476B', font: '25px bold', horizontal: 'null', vertical: 'null', });
var alertTextStyle = new Style({ color: '#47476B', font: '20px bold'});
var footerStyle = new Style({ color: '#47476B', font: '10px bold', horizontal: 'null', vertical: 'null', });
var titleType = new Style({font:"35px", color:"black"});
var smallType = new Style({font:"24px", color:"black"});
var alertType = new Style({font:"24px", color:"white"});
var subType = new Style({font: "15px", color: "gray"});
var buttonStyle = new Style({ color: 'black', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });

// Handlers

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		trace("Found Sim\n");
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

// LOGIN SCREENS //





// LOGIN SCREEN //


// HOME SCREEN //

var HomeScreenLogoutButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(LogInScreen);
		}},
	})
}});

var ConfigureScreenButton = BUTTONS.Button.template(function($){ return{
	top:25, bottom:375, left: 50, right: 50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Configure Devices', }),
		],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ConfigureScreen);
		}},
	})
}});

var ViewDataScreenButton = BUTTONS.Button.template(function($){ return{
	top:75, bottom:325, left: 50, right:50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'View Data', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var MedicationReminderScreenButton = BUTTONS.Button.template(function($){ return{
	top:125, bottom:275, left: 50, right:50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Medication/Reminders', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(MedicationReminderScreen);
		}},
	})
}});

var AppointmentReminderScreenButton = BUTTONS.Button.template(function($){ return{
	top:175, bottom:225, left: 50, right:50, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Appointments', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(AppointmentsScreen);
		}},
	})
}});

var HomeScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new HomeScreenLogoutButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Home", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"sun.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new ConfigureScreenButton(),
				new ViewDataScreenButton(),
				new MedicationReminderScreenButton(),
				new AppointmentReminderScreenButton(),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Copyright Axis of Altruism 2015", style:footerStyle}),
			]}),
]});

// HOME SCREEN //

// APPOINTMENTS SCREEN //
//BUTTONS
var AppointmentsScreenBackButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: topSkin,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("backButton was tapped.\n");
			application.behavior.switchScreen(HomeScreen);
		}},
	})
}});

var ApptDayCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	AppttakenDayMedicine = true;
        	ApptAlertLabel.string = "nothing for now";
        	application.behavior.openDialogBox(AlertGreyDiaBox);
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
            
        }},
        onUnselected: { value:  function(checkBox){
        	AppttakenDayMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});

var ApptNightCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	AppttakenNightMedicine = true;
        	AlertLabel.string = "nothing for now";        	
        	application.behavior.openDialogBox(AlertGreyDiaBox);
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");  
			trace("Checkbox with name " + checkBox.buttonLabel.string + ".\n");                      
        }},
        onUnselected: { value:  function(checkBox){
        	AppttakenNightMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});

var checkbox = [];

//TIMER
var AppttakenDayMedicine = false;
var AppttakenNightMedicine = false;
var ApptreminderDayHours = 9; //check take medicine at 9 AM
var ApptreminderNightHours = 18; //check take medicine at 6 PM

Handler.bind("/Appttime", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			application.distribute( "ApptonTimeUpdated" );
				handler.invoke( new Message( "/Apptdelay?duration=60000" ) ); //will check time again after 1 minute
		},
	},
}));
Handler.bind("/Apptdelay", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			var query = parseQuery( message.query );
				var duration = query.duration;
				handler.wait( duration )
		},
	},
	onComplete: { value: 
		function(handler, message) {
			handler.invoke( new Message( "/Appttime" ) );
		},
	},
}));

var ApptAlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"no alerts for now", style: alertType}),

//CONTAINERS
var AppointmentsScreen = new Container({
		left:20, right:20, top:40, bottom:40,
		contents:[
		 new Container({
			left:0, right:0, top:0, bottom:360,
			skin:topSkin,
			contents:[
					new Line({left:0, right:0, bottom: 90, top: 0,
						contents:[
							new AppointmentsScreenBackButton(),
							new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Appointments", style: titleStyle}),
							new Picture({right: 0, height: 50, url: "appointments.png"}),
								]})
			]}),
			new Container({
				left:0, right:0, top:120, bottom:60,
				skin:middleSkin,
				contents:[
					new Line({left:0, right:0, height: 25, bottom: 320, top: 0, skin: graySkin,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 90, string:"UPCOMING", style: smallType, fill: "yellow"}),
							]}),
					new Picture({left: 0, right: 250, bottom: 260, height: 40, url: "AndyCarle.png"}),
					new Line({left:100, right:0, height: 30, bottom: 220, top: 0,
							contents:[
								checkbox[0] = new ApptDayCheckBoxTemplate({name:"Dr. Andy Kinoma"}),
							]}),
					new Line({left:30, right:0, height: 30, bottom: 160, top: 0,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 16 @ 11 AM", style: subType}),
								new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Heart Transplant", style: subType}),
							]}),
					new Line({left:0, right:0, height: 25, bottom: 120, top: 200, skin: graySkin,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 90, string:"PAST", style: smallType}),
							]}),
					new Line({left:100, right:0, height: 30, bottom: 0, top: 170,
							contents:[
								checkbox[1] = new ApptNightCheckBoxTemplate({name:"Dr. Mary Berry"}),
							]}),
					new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 1", style: subType}),
								new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Syphilis Shot", style: subType}),
							]}),
					new Picture({left: 0, right: 250, bottom: 60, height: 40, url: "woman-doctor.png"}),
			]}),
		new Container({
			left:0, right:0, top:450, bottom:0,
			skin:bottomSkin,
			contents:[
				AlertLabel
			]}),
]});
	
// APPOINTSMENTS SCREEN //

/***********************************************************/
/***********************************************************/
// VIEW DATA SCREEN //
/***********************************************************/
/***********************************************************/

var ViewDataScreenBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(HomeScreen);
		}},
	})
}});

var temp = 98;
var TemperatureScreenButton = BUTTONS.Button.template(function($){ return{
	top:30, height : 100, left: 50, width : 100, skin: graySkin,
	contents:[
			new Label({left: 0, right: 0, top: 0, bottom: 0, string: temp + 'F', }),
		],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(TemperatureScreen);
		}},
	})
}});

var bp = 80;
var BloodPressureScreenButton = BUTTONS.Button.template(function($){ return{
	top:30, height : 100, right: 30, width : 100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: bp + 'Hg mm', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(BloodPressureScreen);
		}},
	})
}});

var ce = 350;
var CaloricExpenditureScreenButton = BUTTONS.Button.template(function($){ return{
	top:200, height : 100, left: 50, width : 100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: ce + 'cal', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(CaloricExpenditureScreen);
		}},
	})
}});

var hr = 120;
var HeartRateScreenButton = BUTTONS.Button.template(function($){ return{
	top:200, height : 100, right: 30, width : 100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: hr + 'bpm', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(HeartRateScreen);
		}},
	})
}});


var ViewDataScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new ViewDataScreenBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "View Data", style: titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new TemperatureScreenButton(),
				new Label({top: 140, height : 40, left : 15, width : 150, string : "Body Temperature", style : labelStyle}),
				new BloodPressureScreenButton(),
				new Label({top: 140, height : 40, left : 165, width : 150, string : "Blood Pressure", style : labelStyle}),
				new CaloricExpenditureScreenButton(),
				new Label({top: 320, height : 40, left : 12, width : 180, string : "Energy Expenditure", style : labelStyle}),
				new HeartRateScreenButton(),
				new Label({top: 320, height : 40, left : 165, width : 150, string : "Heart Rate", style : labelStyle}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
			]}),
]});

// VIEW DATA SCREEN //

/***********************************************************/
/***********************************************************/
// MEDICATION REMINDER //
/***********************************************************/
/***********************************************************/

var backButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: topSkin,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("backButton was tapped.\n");
			application.behavior.switchScreen(HomeScreen);
		}},
	})
}});

var addButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: topSkin,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"addButton.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("addButton was tapped.\n");
			application.behavior.switchScreen(addMedicationScreen);
		}},
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

//MEDtimeR
var takenDayMedicine = false;
var takenNightMedicine = false;
var reminderDayHours = 9; //check take medicine at 9 AM
var reminderNightHours = 18; //check take medicine at 6 PM
var AlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Reminders: none for now", style: alertType});

Handler.bind("/MEDtime", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			application.distribute( "onTimeUpdated" );
				handler.invoke( new Message( "/MEDdelay?duration=60000" ) ); //will check time again after 1 minute
		},
	},
}));
Handler.bind("/MEDdelay", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			var query = parseQuery( message.query );
				var duration = query.duration;
				handler.wait( duration )
		},
	},
	onComplete: { value: 
		function(handler, message) {
			handler.invoke( new Message( "/MEDtime" ) );
		},
	},
}));

var MedicationReminderScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	skin:topSkin,
	contents:[
		 new Container({
			left:0, right:0, top:0, bottom:360,
			skin:topSkin,
			contents:[
					new Line({left:0, right:0, bottom: 90, top: 0,
						contents:[
							new backButton(),
							new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Medication", style: titleStyle}),
							//new Picture({right: 0, height: 50, url: "medicineBottle.png"}),
							new addButton(),
								]})
								
			]}),
		new Container({
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
		]}),
		//new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Reminders: none for now", style: alertType}),
		/*new Container({
			left:0, right:0, top:450, bottom:0,
			skin:bottomSkin,
			contents:[
				AlertLabel
			]}),*/
]});

// MEDICATION REMINDER //

/***********************************************************/
/***********************************************************/
//addMedicationScreen//
/***********************************************************/
/***********************************************************/

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
//var whiteSkin = new Skin({fill:"white"});

var MyField = Container.template(function($) { return { 
  	top : $.top, width: 250, height: 40, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, style: fieldStyle, anchor: 'NAME',
          editable: true, string: "",
          behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
         		onEdited: { value: function(label){
         		var data = this.data;
              	data.name = label.string;
              	trace("field " + label.string + '\n');
              	label.container.hint.visible = ( data.name.length == 0 );	
         		}}
         	}),
         }),
         Label($, {
   			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:$.string, name:"hint"
         })
      ]
    })
  ]
}});

var AddMedicationScreenBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(MedicationReminderScreen);
		}},
	})
}});

var confirmReminderButton = BUTTONS.Button.template(function($){ return{
	top:250, height:50, left: 100, right:100, skin: graySkin,
	contents:[
		new Label({left: 0, right: 0, top: 0, bottom: 0, string: 'Set Alarm', }),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(MedicationReminderScreen);
		}},
	})
}});


var upButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: middleSkin, 
	left:$.left, right : $.right, top : $.top,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"addButton.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("upButton was tapped.\n");
			if ($.hour == true)
			{
				remHr = remHr + 1;
				remHr = remHr % 12;
				remHrLabel.string = remHr;
				trace("remHr =" + remHr + " \n");
			}
			else
			{
				remMin = remMin + 1;
				remMin = remMin % 60;
				remMinLabel.string = remMin;
				trace("remMin =" + remMin + " \n");
			}
			
		}},
	})
}});



var downButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: middleSkin,
	left:$.left, right : $.right, top : $.top,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"addButton.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("downButton was tapped.\n");			
			if ($.hour == true)
			{
				remHr = remHr - 1;
				remHr = remHr % 12;
				if (remHr < 0)
				{
					remHr = 11;
				} 
				remHrLabel.string = remHr;
				trace("remHr =" + remHr + " \n");
			}
			else
			{
				remMin = remMin - 1;
				remMin = remMin % 60;
				if (remMin < 0)
				{
					remMin = 59;
				}
				remMinLabel.string = remMin;
				trace("remMin =" + remMin + " \n");
			}
		}},
	})
}});


var remHr = 0;
var remMin = 0;

var remHrLabel = new Label({left: -180, right : 0, top : 120, height : 40, width : 40,anchor : "temp", string : remHr, style : labelStyle}),
var remMinLabel = new Label({left: 180, right : 20, top : 120, height : 40, string : remMin, style : labelStyle}),

var addMedicationScreen = new Container({
	left:0, right:0, top:0, bottom:0, active : true,
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { 
				value: function(content){
				trace("Touched\n");
				KEYBOARD.hide();
				content.focus();
				}}
		
	}),		
	contents:[
		new Container({
			left:0, right:0, top:0, height : 80,
			skin:topSkin,
			contents:[
				new AddMedicationScreenBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Add Medication", style: titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:80, bottom:0,
			skin:middleSkin,	
			contents:[
				//new Label({left: 0, right : 0, top : 20, string : "Enter the name of the medicine", style : labelStyle}),
				new MyField({name : "medication", top : 20,string : "Enter name of medicine"}),
				new upButton({top : 80, left : 50, hour : true}),
				new upButton({top : 80, right : 50, hour : false }),
				remHrLabel,
				remMinLabel,
				new downButton({top : 180, left : 50 , hour : true}),
				new downButton({top : 180, right : 50, hour : false }),
				new confirmReminderButton(),			
				
		]}),		
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
			]}),
]});



// Add Medication Screen//
/***********************************************************/
/***********************************************************/
// Temperature Screen and dependancies.///////////
/***********************************************************/
/***********************************************************/
var TemperatureBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var TemperatureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				TemperatureScreen.first.next.first.first.behavior.refresh(needed);
			}		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});

var TemperaturePlotterParams = {
        		name: "Temperature",	
     			interval: 5000,	
				buckets:15,
        		background: "white",
        		strokeStyle: "green",
				lineWidth: 4,
				string: "Temperature (degrees Celsius)",
				complement: false,
};

var TemperatureGraphLabel = Line.template(function($) { return { left: 10, bottom: 5, skin: new Skin({ fill: '#B3FFFFFF',}), 
	contents: [
		Label($, { style: labelStyle, behavior: Object.create((TemperatureGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: labelStyle, behavior: Object.create((TemperatureGraphLabel.behaviors[1]).prototype), string: '--', }),
		], 
	}});
	
TemperatureGraphLabel.behaviors = new Array(2);
TemperatureGraphLabel.behaviors[0] = Behavior.template({
	onCreate: function(content, data) {
		//display the label 
		content.string = data.string + ":";
	},
})
TemperatureGraphLabel.behaviors[1] = Behavior.template({
	onCreate: function(content, data) {
		this.name = data.name;
	},
	onReceiveReading: function(content, reading, name) {
		//update the value string
					if ( this.name == name ) {
                     	content.string = parseInt(reading);
 					}
	},
})

var TemperatureGraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((TemperatureGraphCanvas.behaviors[0]).prototype), }});
	TemperatureGraphCanvas.behaviors = new Array(1);
	TemperatureGraphCanvas.behaviors[0] = PLOTTER.PlotterBehavior.template({
		onTimeChanged: function(content) {
			needed = content;
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );
		},
		refresh: function(content) {
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );
		},
})
	
var TemperatureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
															new TemperatureGraphCanvas(TemperaturePlotterParams),
															new TemperatureGraphLabel(TemperaturePlotterParams),
														],
												 }});


var TemperatureScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new TemperatureBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Temperature", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new TemperatureGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(TemperaturePlotterParams.interval/1000)+" s", style:labelStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:labelStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new TemperatureRefreshButton(),
			]}),
]});

// Temperature Screen and dependancies.//////////////////////////////////////////////////////

// BloodPressure Screen and dependancies.//////////////////////////////////////////////////////

var BloodPressurePlotterParams = {
        		name: "BloodPressure",	
     			interval: 5000,	
				buckets:15,
        		background: "white",
        		strokeStyle: "green",
				lineWidth: 4,
				string: "BloodPressure (mmHg)",
				complement: false,
};

var BloodPressureGraphLabel = Line.template(function($) { return { left: 10, bottom: 5, skin: new Skin({ fill: '#B3FFFFFF',}), 
	contents: [
		Label($, { style: labelStyle, behavior: Object.create((BloodPressureGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: labelStyle, behavior: Object.create((BloodPressureGraphLabel.behaviors[1]).prototype), string: '--', }),
		], 
	}});
	
BloodPressureGraphLabel.behaviors = new Array(2);
BloodPressureGraphLabel.behaviors[0] = Behavior.template({
	onCreate: function(content, data) {
		//display the label 
		content.string = data.string + ":";
	},
})
BloodPressureGraphLabel.behaviors[1] = Behavior.template({
	onCreate: function(content, data) {
		this.name = data.name;
	},
	onReceiveReading: function(content, reading, name) {
		//update the value string
					if ( this.name == name ) {
                     	content.string = parseInt(reading);
 					}
	},
})

var BloodPressureGraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((BloodPressureGraphCanvas.behaviors[0]).prototype), }});
	BloodPressureGraphCanvas.behaviors = new Array(1);
	BloodPressureGraphCanvas.behaviors[0] = PLOTTER.PlotterBehavior.template({
		onTimeChanged: function(content) {
			needed = content;
			content.invoke( new Message(deviceURL + "getBp"), Message.JSON );
		},
		refresh: function(content) {
			content.invoke( new Message(deviceURL + "getBp"), Message.JSON );
		},
})
	
var BloodPressureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
															new BloodPressureGraphCanvas(BloodPressurePlotterParams),
															new BloodPressureGraphLabel(BloodPressurePlotterParams),
														],
												 }});


var BloodPressureBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var BloodPressureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				BloodPressureScreen.first.next.first.first.behavior.refresh(needed);
			}
		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});

var BloodPressureScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new BloodPressureBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "BloodPressure", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new BloodPressureGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(BloodPressurePlotterParams.interval/1000)+" s", style:labelStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:labelStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new BloodPressureRefreshButton(),
			]}),
]});

// Blood Pressure Screen //

// HeartRate Screen and dependancies.//////////////////////////////////////////////////////

var HeartRatePlotterParams = {
        		name: "Heart Rate",	
     			interval: 5000,	
				buckets:15,
        		background: "white",
        		strokeStyle: "green",
				lineWidth: 4,
				string: "Heart Rate (BPM)",
				complement: false,
};

var HeartRateGraphLabel = Line.template(function($) { return { left: 10, bottom: 5, skin: new Skin({ fill: '#B3FFFFFF',}), 
	contents: [
		Label($, { style: labelStyle, behavior: Object.create((HeartRateGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: labelStyle, behavior: Object.create((HeartRateGraphLabel.behaviors[1]).prototype), string: '--', }),
		], 
	}});
	
HeartRateGraphLabel.behaviors = new Array(2);
HeartRateGraphLabel.behaviors[0] = Behavior.template({
	onCreate: function(content, data) {
		//display the label 
		content.string = data.string + ":";
	},
})
HeartRateGraphLabel.behaviors[1] = Behavior.template({
	onCreate: function(content, data) {
		this.name = data.name;
	},
	onReceiveReading: function(content, reading, name) {
		//update the value string
					if ( this.name == name ) {
                     	content.string = parseInt(reading);
 					}
	},
})

var HeartRateGraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((HeartRateGraphCanvas.behaviors[0]).prototype), }});
	HeartRateGraphCanvas.behaviors = new Array(1);
	HeartRateGraphCanvas.behaviors[0] = PLOTTER.PlotterBehavior.template({
		onTimeChanged: function(content) {
			needed = content;
			content.invoke( new Message(deviceURL + "getHR"), Message.JSON );
		},
		refresh: function(content) {
			content.invoke( new Message(deviceURL + "getHR"), Message.JSON );
		},
})
	
var HeartRateGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
															new HeartRateGraphCanvas(HeartRatePlotterParams),
															new HeartRateGraphLabel(HeartRatePlotterParams),
														],
												 }});


var HeartRateBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var HeartRateRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				HeartRateScreen.first.next.first.first.behavior.refresh(needed);
			}
		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});

var HeartRateScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new HeartRateBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "HeartRate", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new HeartRateGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(HeartRatePlotterParams.interval/1000)+" s", style:labelStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:labelStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new HeartRateRefreshButton(),
			]}),
]});

// Heart Rate // 

// CaloricExpenditure Screen and dependancies.//////////////////////////////////////////////////////

var CaloricExpenditurePlotterParams = {
        		name: "Caloric Expenditure",	
     			interval: 5000,	
				buckets:15,
        		background: "white",
        		strokeStyle: "green",
				lineWidth: 4,
				string: "Caloric Expenditure (KCal)",
				complement: false,
};

var CaloricExpenditureGraphLabel = Line.template(function($) { return { left: 10, bottom: 5, skin: new Skin({ fill: '#B3FFFFFF',}), 
	contents: [
		Label($, { style: labelStyle, behavior: Object.create((CaloricExpenditureGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: labelStyle, behavior: Object.create((CaloricExpenditureGraphLabel.behaviors[1]).prototype), string: '--', }),
		], 
	}});
	
CaloricExpenditureGraphLabel.behaviors = new Array(2);
CaloricExpenditureGraphLabel.behaviors[0] = Behavior.template({
	onCreate: function(content, data) {
		//display the label 
		content.string = data.string + ":";
	},
})
CaloricExpenditureGraphLabel.behaviors[1] = Behavior.template({
	onCreate: function(content, data) {
		this.name = data.name;
	},
	onReceiveReading: function(content, reading, name) {
		//update the value string
					if ( this.name == name ) {
                     	content.string = parseInt(reading);
 					}
	},
})

var CaloricExpenditureGraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((CaloricExpenditureGraphCanvas.behaviors[0]).prototype), }});
	CaloricExpenditureGraphCanvas.behaviors = new Array(1);
	CaloricExpenditureGraphCanvas.behaviors[0] = PLOTTER.PlotterBehavior.template({
		onTimeChanged: function(content) {
			needed = content;
			content.invoke( new Message(deviceURL + "getCe"), Message.JSON );
		},
		refresh: function(content) {
			content.invoke( new Message(deviceURL + "getCe"), Message.JSON );
		},
})
	
var CaloricExpenditureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
															new CaloricExpenditureGraphCanvas(CaloricExpenditurePlotterParams),
															new CaloricExpenditureGraphLabel(CaloricExpenditurePlotterParams),
														],
												 }});


var CaloricExpenditureBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var CaloricExpenditureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				CaloricExpenditureScreen.first.next.first.first.behavior.refresh(needed);
			}
		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});

var CaloricExpenditureScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new CaloricExpenditureBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "CaloricExpenditure", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new CaloricExpenditureGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(CaloricExpenditurePlotterParams.interval/1000)+" s", style:labelStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:labelStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new CaloricExpenditureRefreshButton(),
			]}),
]});

//  Caloric Expenditure Screen //

// Alert Dialog Box and Okay Buttons //////////////////////////////////////////////////////
var AlertGreyDiaOKBox = BUTTONS.Button.template(function($){ return{
	top:120, height:50, left: 100, right:100, skin: middleSkin,	
	contents:[
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "OK", style:titleStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.closeDialogBox(AlertGreyDiaBox);
		}},
	})
}});
var AlertGreyDiaBox = new Container({
	left:20, right:20, top:150, height:200, skin: topSkin,
	contents:[
				  
				//new CaloricExpenditureBackButton(),
				new AlertGreyDiaOKBox(),
				new Label({left:0, right:0, top: 20, height: 40, string: "You have an appointment", style : alertTextStyle}),
				new Label({left:0, right:0, top: 60, height: 40, string: "with Dr. Grey at 14:00", style : alertTextStyle}),				
												
			]	
});



var AlertKinomaDiaOKBox = BUTTONS.Button.template(function($){ return{
	top:120, height:50, left: 100, right:100, skin: middleSkin,	
	contents:[
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "OK", style:titleStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.closeDialogBox(AlertKinomaDiaBox);
		}},
	})
}});
var AlertKinomaDiaBox = new Container({
	left:20, right:20, top:150, height:200, skin: topSkin,
	contents:[
				  
				//new CaloricExpenditureBackButton(),
				new AlertKinomaDiaOKBox(),
				new Label({left:0, right:0, top: 20, height: 40, string: "You have an appointment", style : alertTextStyle}),
				new Label({left:0, right:0, top: 60, height: 40, string: "with Dr. Kinoma at 14:00", style : alertTextStyle}),				
												
			]	
});


var AlertTakeEnoxaparinDiaOKBox = BUTTONS.Button.template(function($){ return{
	top:120, height:50, left: 100, right:100, skin: middleSkin,	
	contents:[
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "OK", style:titleStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.closeDialogBox(AlertTakeEnoxaparinDiaBox);
		}},
	})
}});
var AlertTakeEnoxaparinDiaBox = new Container({
	left:20, right:20, top:150, height:200, skin: topSkin,
	contents:[
				  
				//new CaloricExpenditureBackButton(),
				new AlertTakeEnoxaparinDiaOKBox(),
				new Label({left:0, right:0, top: 20, height: 40, string: "You have an take", style : alertTextStyle}),
				new Label({left:0, right:0, top: 60, height: 40, string: "one Enoxaparin tablet", style : alertTextStyle}),				
												
			]	
}); 


var AlertTakeAnagrelideDiaOKBox = BUTTONS.Button.template(function($){ return{
	top:120, height:50, left: 100, right:100, skin: middleSkin,	
	contents:[
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "OK", style:titleStyle}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.closeDialogBox(AlertTakeAnagrelideDiaBox);
		}},
	})
}});
var AlertTakeAnagrelideDiaBox = new Container({
	left:20, right:20, top:150, height:200, skin: topSkin,
	contents:[
				  
				//new CaloricExpenditureBackButton(),
				new AlertTakeAnagrelideDiaOKBox(),
				new Label({left:0, right:0, top: 20, height: 40, string: "You have an take", style : alertTextStyle}),
				new Label({left:0, right:0, top: 60, height: 40, string: "one Anagrelide tablet", style : alertTextStyle}),				
												
			]	
});  


// Alert Screens //

// Application launch behavior

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		trace("onDisplayed called\n");
		application.invoke(new Message("/Appttime"));
		application.invoke(new Message("/MEDtime"));
		application.discover("intprototypesim");
		},
	onQuit: function(application) {
		application.forget("intprototypesim");
		application.shared = false;
		},	
	onLaunch: function(application, data){
		trace("onLaunch called\n");
		currentScreen = addMedicationScreen;
		application.shared = true;
		application.add(currentScreen);
		},
	switchScreen: function(screen){
		application.remove(currentScreen);
		application.add(screen);
		currentScreen = screen;
		},
	openDialogBox: function(screen){
		application.add(screen);		
		},
	closeDialogBox: function(screen){
		application.remove(screen);		
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
			{
				//AlertLabel.string = "Reminder: take Enoxaparin";
				application.behavior.openDialogBox(AlertTakeEnoxaparinDiaBox);
			}
			if (hours >= reminderNightHours && takenNightMedicine == false)
			{
				//AlertLabel.string = "Reminder: take Anagrelide";
				trace("hours =" + hours + "reminderNightHours = " + reminderNightHours + "\n");
				application.behavior.openDialogBox(AlertTakeAnagrelideDiaBox);
			}
			if (hours == 11 && minutes == 59)
				//RESET EVERYTHING AT MIDNIGHT
				takenDayMedicine = false;
				takenNightMedicine = false;
				//for (i = 0; i <= checkbox.length; i++) 
			//		checkbox[i].behavior.setSelected(false);
		},
		ApptonTimeUpdated: function(container) {
			var date = new Date();
			var hours = String( date.getHours() );
			var minutes = String( date.getMinutes() );
				if ( 1 == minutes.length )
					minutes = '0' + minutes;
			trace ("time is currently: " + hours + ":" + minutes + "\n");
			trace ("takenDayMedicine: " + AppttakenDayMedicine + "\n");
			trace ("takenNightMedicine: " + AppttakenNightMedicine + "\n");
				if (hours >= ApptreminderDayHours && hours < ApptreminderNightHours && AppttakenDayMedicine == false)
				{
					//ApptAlertLabel.string = "Reminder: visit Dr. Grey";
					application.behavior.openDialogBox(AlertGreyDiaBox);
				}
				if (hours >= ApptreminderNightHours && AppttakenNightMedicine == false)
				{
					//ApptAlertLabel.string = "Reminder: visit Dr. Kinoma";
					application.behavior.openDialogBox(AlertKinomaDiaBox);
				}
				if (hours == 11 && minutes == 59)
					//RESET EVERYTHING AT MIDNIGHT
					AppttakenDayMedicine = false;
					AppttakenNightMedicine = false;
					//for (i = 0; i <= checkbox.length; i++) 
				//		checkbox[i].behavior.setSelected(false);
			},
})

application.behavior = new ApplicationBehavior();