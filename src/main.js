var KEYBOARD = require('mobile/keyboard');
var CONTROL = require('mobile/control');
var TRANSITIONS = require('transitions');
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");

var FIELDS = require('textFieldsAll.js')
var LOGIN = require('buttonLogin.js')
var SIGNUP = require('buttonSignUp.js')
var NEXT = require('buttonNext.js')
var BACK = require('buttonBack.js')
var SCREENS = require('screens.js')


var blackSkin = new Skin({ fill: 'black',});
var blueSkin = new Skin({ fill: "#003262",});
var yellowSkin = new Skin({ fill: "#fdb515",});
var whiteSkin = new Skin({ fill: 'white',});
var greenSkin = new Skin( { fill:"#76b321" } );
var greenSkin = new Skin( { fill:"#fdb515" } );
var hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle', });
var buttonStyle = new Style({ color: 'black', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });
var titleStyle = new Style({ color: 'white', font: 'bold 26px', horizontal: 'center', vertical: 'middle', });

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
		trace('going to home screen\n');
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