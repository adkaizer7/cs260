var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var TRANSITIONS = require('transitions');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var PLOTTER = require('plotter');
var FIELDS = require('textFieldsAll.js')
var SCREENS = require('screens.js')
var SCROLLER = require('mobile/scroller')
var TRANSITIONS = require('transitions');


var DIALOGBOX = require('DialogBoxTemplate.js');
var DIALOGBOXOK = require('DialogBoxOKTemplate.js');
var TOASTBOX = require('Toast.js');


var REFILLBUTTON = require('refillButton.js')
var APPTNIGHTCHECKBOXTEMPLATE = require('ApptNightCheckBoxTemplate.js')
var APPTDAYCHECKBOXTEMPLATE = require('ApptDayCheckBoxTemplate.js')
var MEDICINEDAYCHECKBOXTEMPLATE = require('MedicineDayCheckBoxTemplate.js')
var MEDICINENIGHTCHECKBOXTEMPLATE = require('MedicineNightCheckBoxTemplate.js')
var MEDICINECHECKBOXTEMPLATE = require('MedicineCheckBoxTemplate.js')
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
var greenSkin = new Skin({fill: "#66b57a", borders:{left:3, right:3, top:3, bottom:3}, stroke: "#90b5ba"});
var greenPressSkin = new Skin({fill: "#64bc88", borders:{left:3, right:3, top:3, bottom:3}, stroke: "#90b5ba"});


//Back Button
var blueSkin = new Skin({fill: "#61b6c1", borders:{left:3, right:3, top:3, bottom:3}, stroke: "#90b5ba"});
var bluePressSkin = new Skin({fill: "#5794b5", borders:{left:3, right:3, top:3, bottom:3}, stroke: "#90b5ba"});

//Background
var whiteTexture = new Texture("whiteblurbkgrnd.jpg");
var silverSkin = new Skin({width: 400, height: 700, texture: whiteTexture, fill: "white"});

//DropDownBox
var dropDownBoxSkin = new Skin({fill : "white", borders:{left:3, right:3, top:3, bottom:3}, stroke: "#90b5ba" })
var dropDownBoxOptionsSkin = new Skin({fill : "white", borders:{left:1, right:1, top:1, bottom:1}, stroke: "#90b5ba" })

//Cards
var whiteSkin = new Skin({fill:"#ecf0f1"});
var graySkin = new Skin({fill : 'gray', opacity : 0.6});

var titleStyle = new Style({font:"40px Avenir Light", color:"black", horizontal: 'center'});
var buttonStyle = new Style({font:"40px Avenir Light", color:"white", horizontal: 'center'});
var buttonSmallStyle = new Style({font:"25px Avenir Light", color:"white", horizontal: 'center'});
var previewStyle = new Style({font:"25px Avenir Light", color:"black", horizontal: 'center'});
var headerStyle = new Style({font:"30px Avenir", color:"black", horizontal: 'center'});
var textfieldStyle = new Style({font:"30px Avenir", color:"gray", horizontal: 'center'});
var textStyle = new Style({font:"22px Avenir", color:"black", horizontal: 'center'});
var alertSkin = new Skin({fill:"#dd3146"});
var alphaBlueSkin = new Skin("#7f0000FF");


var fieldInputSkin = new Skin({ fill: "#ecf0f1", borders: { left:2, right:2, top:2, bottom:2 }, stroke: '#a4aaae'});
var alertTextStyle = new Style({ color: '#47476B', font: '20px bold'});

/**************************************************************************/
/**********Globals********************************************/
/**************************************************************************/

var screenIndex = 0;
var count = 0;
var takenTablet1 = false;
var takenTablet2 = false;
var Appt1Attended = false;
var Appt2Attended = false;
var reminderTablet1 = 6; //check take medicine at 9 AM
var reminderTablet2 = 12; //check take medicine at 6 PM
var reminderAppt1 = 16; //check take medicine at 9 AM
var reminderAppt2 = 20; //check take medicine at 6 PM

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

Handler.bind("/ToastTime", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			//application.distribute( "onTimeUpdated" );
			var query = parseQuery(message.query);
			var tablet = query.tablet;	
			//trace("This better work "+ tablet + "\n");		
			handler.invoke( new Message( "/ToastDelay?duration=3000&tablet=" + tablet ) ); //will check time again after 1 minute
		},
	},
}));
Handler.bind("/ToastDelay", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			var query = parseQuery( message.query );
			var duration = query.duration;
			var tablet = query.tablet
			this.tablet = tablet;
			//trace("is this right " + tablet +"\n");
			handler.wait( duration )
		},
	},
	onComplete: { value: 
		function(handler, message) {
			if(this.tablet == "Tablet1")
			{
				application.behavior.closeDialogBox(ToastTablet1);
			}
			else if (this.tablet == "Tablet2")
			{
				application.behavior.closeDialogBox(ToastTablet2);
			}		
		},
	},
}));

Handler.bind("/sendAlertTimeChanged", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that time changed.\n");
		var query = parseQuery( message.query );
		time = parseInt(query.time);
		trace("*******got time = " + time + " from hardware\n");
		application.distribute( "onTimeUpdated" );
	}
}));




/**************************************************************************/
/**********Alerts*********************************************************/
/**************************************************************************/


var AlertGreyDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have an appointment", line2: "with Dr. Grey at 14:00", skin : alertSkin});
var AlertKinomaDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have an appointment", line2: "with Dr.Kinoma at 14:00", skin : alertSkin});
var AlertTakeEnoxaparinDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have to take", line2: "Enoxaparin", skin : alertSkin});
var AlertTakeAnagrelideDiaBox = new DIALOGBOX.DialogBoxTemplate({line1 : "You have to take", line2: "Anagrelide", skin : alertSkin});
var DeviceConfirmationDiaBox = new DIALOGBOX.DialogBoxTemplate({line1: "You have successfully", line2: "configured this device", skin: greenSkin});


/**************************************************************************/
/**********Toasts*********************************************************/
/**************************************************************************/

var ToastTablet1 = new TOASTBOX.ToastBoxTemplate({line1: "Thank you for taking", line2 : "Enoxaparin"});
var ToastTablet2 = new TOASTBOX.ToastBoxTemplate({line1: "Thank you for taking", line2 : "Spironolactone"});
//TIMER


/**************************************************************************/
/**********Application Behavior*********************************************/
/**************************************************************************/

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
		//trace ("time is currently: " + hours + ":" + minutes + "\n");
		//trace ("takenTablet1: " + takenTablet1 + "\n");
		//trace ("takenTablet2: " + takenTablet2 + "\n");
		trace("Time = " +  time + " distributed to application\n");
			if ((time >= reminderTablet1 - 2) && (time <= reminderTablet1) && takenTablet1 == false)
			{
				//AlertLabel.string = "Reminder: take Enoxaparin";
				trace("Reminder: take Enoxaparin\n");
				application.behavior.openDialogBox(AlertTakeEnoxaparinDiaBox);
			}
			if ((time >= reminderTablet2 - 2) && (time <= reminderTablet2) && takenTablet2 == false)
			{
				trace("Reminder: take Anagrelide\n");				
				application.behavior.openDialogBox(AlertTakeAnagrelideDiaBox);
			}
			if ((time >= reminderAppt1 - 2) && (time <= reminderAppt1) && Appt1Attended == false)
			{
				trace("Reminder: visit Dr. Grey\n");
				application.behavior.openDialogBox(AlertGreyDiaBox);
			}
			if ((time >= reminderAppt2 - 2) && (time <= reminderAppt2) && Appt2Attended == false)
			{
				trace("Reminder: visit Dr. Kinoma\n");
				application.behavior.openDialogBox(AlertKinomaDiaBox);
			}
		},
		/*ApptonTimeUpdated: function(container) {
			var date = new Date();
			var hours = String( date.getHours() );
			var minutes = String( date.getMinutes() );
				if ( 1 == minutes.length )
					minutes = '0' + minutes;
			trace ("time is currently: " + hours + ":" + minutes + "\n");
			trace ("takenTablet1: " + Appt1Attended + "\n");
			trace ("takenTablet2: " + Appt2Attended + "\n");
			if (hours >= reminderAppt1 && hours < reminderAppt2 && Appt1Attended == false)
			{
				trace("Reminder: visit Dr. Grey\n");
				application.behavior.openDialogBox(AlertGreyDiaBox);
			}
			if (hours >= reminderAppt2 && Appt2Attended == false)
			{
				trace("Reminder: visit Dr. Kinoma\n");
				application.behavior.openDialogBox(AlertKinomaDiaBox);
			}
			if (hours == 11 && minutes == 59)
			{
				//RESET EVERYTHING AT MIDNIGHT
				Appt1Attended = false;
				Appt2Attended = false;			
			}
		},*/
			
})

application.behavior = new ApplicationBehavior();
var AAAdropDownMenuPressed;

//var data = {}
//var mainScreen = new MainScreen( data );
var temp = 98;
var bp  = 80;
var bp_dia = 70;
var ce = 350;
var hr = 120;
var tablet1 = 100;
var tablet2 = 100;
var med_app = 100;
var time = 0;


var dropDownHoursOptions = [1,2,4,6,8,16,24];
var dropDownMinutesOptions = [1,2,5,10,20,30,60];
var dropDownUnitsOptions = ["Minutes","Hours"];
var dropDownUnits  = dropDownUnitsOptions[0];
var btnToHide;
var tabletAmountString;


var screen4 = new SCREENS.Screen4();
application.add( screen4 )
currentScreen = screen4;


// KPR Script file

// KPR Script file
// KPR Script file

