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

var blackSkin = new Skin({ fill: 'black',});
var blueSkin = new Skin({ fill: "#003262",});
var yellowSkin = new Skin({ fill: "#fdb515",});
var whiteSkin = new Skin({ fill: 'white',});
var greenSkin = new Skin( { fill:"#76b321" } );
var hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle', });
var buttonStyle = new Style({ color: 'black', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });
var titleStyle = new Style({ color: 'white', font: 'bold 26px', horizontal: 'center', vertical: 'middle', });
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var graySkin = new Skin({fill: "#d3d3d3"});
var labelStyle = new Style({ color: '#47476B', font: '20px', horizontal: 'null', vertical: 'null', });
var alertTextStyle = new Style({ color: '#47476B', font: '20px bold'});
var footerStyle = new Style({ color: '#47476B', font: '10px bold', horizontal: 'null', vertical: 'null', });
var titleType = new Style({font:"35px", color:"black"});
var smallType = new Style({font:"24px", color:"black"});
var alertType = new Style({font:"24px", color:"white"});
var subType = new Style({font: "15px", color: "gray"});
var buttonStyle = new Style({ color: 'black', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });

/**************************************************************************/
/**********Button Behaviors************************************************/
/**************************************************************************/

var screenIndex = 0;
var count = 0;

var MainScreen = Container.template(function($) 
			{ 
				return{ 
				  left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blackSkin, 
				  behavior: Object.create((MainScreen.behaviors[0]).prototype),
				   
				}
			});			
			 
MainScreen.behaviors = new Array(20);
MainScreen.behaviors[0] = Behavior.template({
	onCreate: function(container, data) 
	{
		this.AtoB = true
		this.numTransitions = 11
		this.index = 0
	},
	onTriggerTransition: function(container) 
	{
		var toScreen;
		switch(screenIndex)
		{
			case 0 : toScreen = new SCREENS.Screen0(); break;
			case 1 :{
						 toScreen = new SCREENS.Screen1();						  
						 
					 }break;
			case 2:{
						toScreen = new SCREENS.Screen2();
				   }break;
			case 4:{
						toScreen = new SCREENS.Screen4();
				   }break;
			case 5:{
						toScreen = new SCREENS.Screen5();
				   }break;
			case 6:{
						toScreen = new SCREENS.Screen6();
				   }break;
			case 7:{
						toScreen = new SCREENS.Screen7();
				   }break;
			case 8:{
						toScreen = new SCREENS.Screen8();
				   }break;
			case 9:{
						toScreen = new SCREENS.Screen9();
				   }break;
			case 10:{
						toScreen = new SCREENS.Screen10();
				   }break;
			case 11:{
						toScreen = new SCREENS.Screen11();
				   }break;
			case 12:{
						toScreen = new SCREENS.Screen12();
				   }break;
		}
		
		container.run( new TRANSITIONS.CrossFade(), container.last, toScreen, { duration : 900 } );		
	
	},
})


MainScreen.behaviors[1] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Logging In User\n');
		screenIndex = 1;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[2] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('signing up user\n');
		screenIndex = 2;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[3] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('going back to first screen\n');
		screenIndex = 0;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[4] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('going to home screen with icons\n');
		screenIndex = 4;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[5] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('view appointments\n');
		screenIndex = 5;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[6] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('view data\n');
		screenIndex = 6;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[7] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Medication Reminder Screen\n');
		screenIndex = 7;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[8] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Add Medicine Screen\n');
		screenIndex = 8;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[9] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Temperature\n');
		screenIndex = 9;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[10] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Blood Pressure\n');
		screenIndex = 10;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[11] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Caloric Expenditure\n');
		screenIndex = 11;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[12] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Heart Rate\n');
		screenIndex = 12;
		container.bubble( "onTriggerTransition" );
	},
})



var data = {}
var mainScreen = new MainScreen( data );
var screen0 = new SCREENS.Screen0();

application.add( mainScreen )
mainScreen.add( screen0 )