var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var TRANSITIONS = require('transitions');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var PLOTTER = require('plotter');
var FIELDS = require('textFieldsAll.js')
var SCREENS = require('screens.js')

var DIALOGBOX = require('DialogBoxTemplate.js');
var DIALOGBOXOK = require('DialogBoxOKTemplate.js');


var REFILLBUTTON = require('refillButton.js')
var APPTNIGHTCHECKBOXTEMPLATE = require('ApptNightCheckBoxTemplate.js')
var APPTDAYCHECKBOXTEMPLATE = require('ApptDayCheckBoxTemplate.js')
var MEDICINEDAYCHECKBOXTEMPLATE = require('MedicineDayCheckBoxTemplate.js')
var MEDICINENIGHTCHECKBOXTEMPLATE = require('MedicineNightCheckBoxTemplate.js')
var NEXTTOSECONDSIGNUP = require('NextToSecondSignUp.js')

/// HANDLERS 
var deviceURL = null;

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


/*************************************************************************/
/*Design specs*/
/*************************************************************************/

//Action Button
var greenSkin = new Skin({fill: "#27ae60"}, shadowEffect);
var greenPressSkin = new Skin({fill: "#64bc88"}, shadowEffect);

//Back Button
var blueSkin = new Skin({fill: "#2980b9"}, shadowEffect);
var bluePressSkin = new Skin({fill: "#5794b5"}, shadowEffect);

//Background
var silverSkin = new Skin({fill:"#bdc3c7"});

//Cards
var whiteSkin = new Skin({fill:"#ecf0f1"}, shadowEffect);

var titleStyle = new Style({font:"40px Avenir Light", color:"black", horizontal: 'center'});
var headerStyle = new Style({font:"30px Avenir", color:"black", horizontal: 'center'});
var textStyle = new Style({font:"22px Avenir", color:"black", horizontal: 'center'});
var alertSkin = new Skin({fill:"#dd3146"});

var fieldInputSkin = new Skin({ fill: "#ecf0f1", borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray'});
var alertTextStyle = new Style({ color: '#47476B', font: '20px bold'});


// Effects [right now this does absolutely nothing....]
var shadowEffect = new Effect();
shadowEffect.colorize("gray");
shadowEffect.outerShadow(null, 1, 2, 0, 2);

/**************************************************************************/
/**********Globals********************************************/
/**************************************************************************/

var screenIndex = 0;
var count = 0;
var takenDayMedicine = false;
var takenNightMedicine = false;
var reminderDayHours = 9; //check take medicine at 9 AM
var reminderNightHours = 18; //check take medicine at 6 PM
var AppttakenDayMedicine = false;
var AppttakenNightMedicine = false;
var ApptreminderDayHours = 9; //check take medicine at 9 AM
var ApptreminderNightHours = 18; //check take medicine at 6 PM

var med_app = 0;


/**************************************************************************/
/**********Application Handlers********************************************/
/**************************************************************************/

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

Handler.bind("/sendAlertMedChanged", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that Med changed. Get Med\n");
		handler.invoke(new Message(deviceURL + "getMed"), Message.JSON);
	},
	onComplete: function(handler, message, json){
			med_app = parseInt(json.med_app * 100);
			SCREENS.pillsLabel.string = "Amount left:" + med_app + "%";
			trace("Medication = " + med_app + "\n" );		
	}
}));


/**************************************************************************/
/**********Alerts*********************************************************/
/**************************************************************************/


var AlertGreyDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have an appointment", line2: "with Dr. Grey at 14:00"});
var AlertKinomaDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have an appointment", line2: "with Dr.Kinoma at 14:00"});
var AlertTakeEnoxaparinDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have to take", line2: "Enoxaparin"});
var AlertTakeAnagrelideDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have to take", line2: "Anagrelide"});



//TIMER

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		trace('here\n');		
		application.discover("intprototypesim");	
		//application.invoke(new Message("/Appttime"));
		//application.invoke(new Message("/MEDtime"));
		
		},
	onQuit: function(application) {
		application.forget("intprototypesim");
		application.shared = false;
		},	
	onLaunch: function(application) {
		trace("onLaunch called\n");
		application.shared = true;
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
				trace("Reminder: take Enoxaparin\n");
				application.behavior.openDialogBox(AlertTakeEnoxaparinDiaBox);
			}
			if (hours >= reminderNightHours && takenNightMedicine == false)
			{
				trace("Reminder: take Anagrelide\n");				
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
					trace("Reminder: visit Dr. Grey\n");
					application.behavior.openDialogBox(AlertGreyDiaBox);
				}
				if (hours >= ApptreminderNightHours && AppttakenNightMedicine == false)
				{
					trace("Reminder: visit Dr. Kinoma\n");
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


//var data = {}
//var mainScreen = new MainScreen( data );
var temp = 98;
var bp  = 80;
var ce = 350;
var hr = 120;
var screen0 = new SCREENS.Screen0();
application.add( screen0 )
currentScreen = screen0;
