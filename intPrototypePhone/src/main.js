var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var TRANSITIONS = require('transitions');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var PLOTTER = require('plotter');
var FIELDS = require('textFieldsAll.js')
var LOGIN = require('buttonLogin.js')
var SIGNUP = require('buttonSignUp.js')
var NEXT = require('buttonNext.js')
var BACK = require('buttonBack.js')
var SCREENS = require('screens.js')

var DIALOGBOX = require('DialogBoxTemplate.js');
var DIALOGBOXOK = require('DialogBoxOKTemplate.js');


var FITBITBUTTON = require('FitbitButton.js')
var REFILLBUTTON = require('refillButton.js')
var SCREENBACKBUTTON = require('ScreenBackButton.js')
//after linking
var HOMESCREENLOGOUTBUTTON = require('HomeScreenLogoutButton.js')
var CONFIGURESCREENBUTTON = require('ConfigureScreenButton.js')
var VIEWDATASCREENBUTTON = require('ViewDataScreenButton.js')
var MEDICATIONREMINDERSCREENBUTTON = require('MedicationReminderScreenButton.js')
var APPOINTMENTREMINDERSCREENBUTTON = require('AppointmentReminderScreenButton.js')
var APPOINTMENTSSCREENBACKBUTTON = require('AppointmentsScreenBackButton.js')


var VIEWDATASCREENBACKBUTTON = require('ViewDataScreenBackButton.js')
var TEMPERATURESCREENBUTTON = require('TemperatureScreenButton.js')
var BLOODPRESSURESCREENBUTTON = require('BloodPressureScreenButton.js')
var CALORICEXPENDITURESCREENBUTTON = require('CaloricExpenditureScreenButton.js')
var HEARTRATESCREENBUTTON = require('HeartRateScreenButton.js')

var APPTNIGHTCHECKBOXTEMPLATE = require('ApptNightCheckBoxTemplate.js')
var APPTDAYCHECKBOXTEMPLATE = require('ApptDayCheckBoxTemplate.js')
var MEDICATIONREMINDERBACKBUTTON = require('MedicationReminderBackButton.js')
var ADDMEDICATIONBUTTON = require('addMedicationButton.js')
var ADDMEDICATIONSCREENBACKBUTTON = require('AddMedicationScreenBackButton.js')

var CONFIRMREMINDERBUTTON = require('confirmReminderButton.js')
var UPBUTTON = require('upButton.js')
var DOWNBUTTON = require('downButton.js')
var MEDICINEDAYCHECKBOXTEMPLATE = require('MedicineDayCheckBoxTemplate.js')
var MEDICINENIGHTCHECKBOXTEMPLATE = require('MedicineNightCheckBoxTemplate.js')

var TEMPERATUREBACKBUTTON = require('TemperatureBackButton.js')
var TEMPERATUREREFRESHBUTTON = require('TemperatureRefreshButton.js')
var BLOODPRESSUREBACKBUTTON = require('BloodPressureBackButton.js')
var BLOODPRESSUREREFRESHBUTTON = require('BloodPressureRefreshButton.js')
var CALORICEXPENDITUREBACKBUTTON = require('CaloricExpenditureBackButton.js')
var CALORICEXPENDITUREREFRESHBUTTON = require('CaloricExpenditureRefreshButton.js')


var HEARTRATEBACKBUTTON = require('HeartRateBackButton.js')
var HEARTRATEREFRESHBUTTON = require('HeartRateRefreshButton.js')
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
var greenSkin = new Skin({fill: "#27ae60"});
var greenPressSkin = new Skin({fill: "#64bc88"});

//Back Button
var blueSkin = new Skin({fill: "#2980b9"});
var bluePressSkin = new Skin({fill: "#5794b5"});

//Background
var silverSkin = new Skin({fill:"#bdc3c7"});

//Cards
var whiteSkin = new Skin({fill:"#ecf0f1"});

var titleStyle = new Style({font:"40px Avenir Heavy", color:"black"});
var headerStyle = new Style({font:"30px Avenir Heavy", color:"black"});
var textStyle = new Style({font:"22px Avenir", color:"black"});

var fieldInputSkin = new Skin({ fill: "#ecf0f1", borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray'});
var alertTextStyle = new Style({ color: '#47476B', font: '20px bold'});
/**************************************************************************/
/**********Temp Skins********************************************/
/**************************************************************************/

var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var whiteSkin = new Skin({fill:"white"});
var graySkin = new Skin({fill: "#d3d3d3"});

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
		application.discover("intprototypesim");
		application.invoke(new Message("/Appttime"));
		application.invoke(new Message("/MEDtime"));
		
		},
	onQuit: function(application) {
		application.forget("intprototypesim");
		application.shared = false;
		},	
	onLaunch: function(application) {
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
