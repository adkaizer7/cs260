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

/**************************************************************************/
/**********Button Behaviors************************************************/
/**************************************************************************/

//TEMPORARY NEW BACK BUTTON UNLINKED
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

var screenIndex = 0;
var count = 0;

var ApplicationBehavior = Behavior.template({
	onDisplayed: function(application) {
		application.discover("intprototypesim");
		},
	onQuit: function(application) {
		application.forget("intprototypesim");
		application.shared = false;
		},	
	onLaunch: function(application) {
		application.shared = true;
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
