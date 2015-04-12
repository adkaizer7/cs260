var TRANSITIONS = require('transitions');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");

var VIEWDATA = require('buttonViewData.js')
var ADD_NEW_DEVICE = require('buttonAddNewDevice.js')
var CONFIGURE_EXISTING_DEVICE = require('buttonConfigureExistingDevice.js')
var BLUETOOTH_TEMP_DEVICE = require('buttonTemperatureDevice.js')
var BLUETOOTH_BP_DEVICE = require('buttonBloodPressureDevice.js')
var COMPLETE_CONFIG = require('buttonCompleteConfiguration.js')
var SCREENS = require('screens.js')

var blackSkin = new Skin({ fill: 'black',});
var blueSkin = new Skin({ fill: 'blue',});
var yellowSkin = new Skin({ fill: 'yellow',});
var whiteSkin = new Skin({ fill: 'white',});
var greenSkin = new Skin( { fill:"#76b321" } );
var hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle', });
var buttonStyle = new Style({ color: 'black', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });

/**************************************************************************/
/**********Button Behaviors************************************************/
/**************************************************************************/

var ConExiDev = BUTTONS.Button.template(function($){ 
	return{
		left: 40, 
		right: 40, 
		height:40,
		bottom:40,
		opacity : 0,
		skin : greenSkin,
		contents: [
					new Label({left:0, right:0, height:40, string:"Configure Existing Device", style: buttonStyle, skin: greenSkin, opacity: 0})
				 ],		
		}
	}
);

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
		}
		
		container.run( new TRANSITIONS.CrossFade(), container.last, toScreen, { duration : 900 } );		
	
	},
})


MainScreen.behaviors[1] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Configuring existing device\n');
		screenIndex = 1;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[2] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Setting up bluetooth thermometer\n');
		screenIndex = 2;
		container.bubble( "onTriggerTransition" );
	},
})

MainScreen.behaviors[3] = Behavior.template({
	onTouchBegan: function(container, id, x, y, ticks) 
	{
		trace('Completing Configuration\n');
		screenIndex = 0;
		container.bubble( "onTriggerTransition" );
	},
})



var data = {}
var mainScreen = new MainScreen( data );

var screen0 = new SCREENS.Screen0();
var screen1 = new SCREENS.Screen1();

application.add( mainScreen )
mainScreen.add( screen0 )