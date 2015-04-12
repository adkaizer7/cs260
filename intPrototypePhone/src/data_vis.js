//@program

var PLOTTER = require('plotter');
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var needed;
var deviceURL = "";
var bottomSkin = new Skin({fill:"#003262"});
var topSkin = new Skin({fill:"#fdb515"});
var middleSkin = new Skin({fill:"white"});
var labelStyle = new Style({ color: '#47476B', font: '20px Helvetica bold', horizontal: 'null', vertical: 'null', });

// Buttons


var BackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			trace("Should go back here");
		}},
	})
}});

var RefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				middleSection.first.first.behavior.refresh(needed);
			}
		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});

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

// Graph and Plotting vars

// ADJUST TEH HEALTH-DATA-NAME FIELDS ACCORDING TO WHAT THE CURRENT HEALTH MEASUREMENT ON THIS SCREEN IS.
var plotterParams = {
        		name: "Health-Data-Name",	
     			interval: 5000,	
				buckets:15,
        		background: "white",
        		strokeStyle: "green",
				lineWidth: 4,
				string: "Health-Data-Name (unit)",
				complement: false,
};

var GraphLabel = Line.template(function($) { return { left: 10, bottom: 5, skin: new Skin({ fill: '#B3FFFFFF',}), 
	contents: [
		Label($, { style: labelStyle, behavior: Object.create((GraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: labelStyle, behavior: Object.create((GraphLabel.behaviors[1]).prototype), string: '--', }),
		], 
	}});
	
GraphLabel.behaviors = new Array(2);
GraphLabel.behaviors[0] = Behavior.template({
	onCreate: function(content, data) {
		//display the label 
		content.string = data.string + ":";
	},
})
GraphLabel.behaviors[1] = Behavior.template({
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
	
var GraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
															new GraphCanvas(plotterParams),
															new GraphLabel(plotterParams),
														],
												 }});

// ADJUST THIS SECTION, AT CONTENT.INVOKE, TO THE APPROPRIATE HEALTH DATA NAME, I.E. TEMP, BLOOD PRESSURE, HEART RATE, ETC.
// USE ADARSH'S PIN SIMULATOR TO FIGURE OUT WHAT THE FUNCTION NAMES ARE
var GraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((GraphCanvas.behaviors[0]).prototype), }});
	GraphCanvas.behaviors = new Array(1);
	GraphCanvas.behaviors[0] = PLOTTER.PlotterBehavior.template({
		onTimeChanged: function(content) {
			needed = content;
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );
		},
		refresh: function(content) {
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );
		},
})

// Main Containers

// ADJUST HEALTH-DATA-NAME TO THE CURRENT HEALTH MEASUREMENT BEING DISPLAYED.
var topSection = new Container({
	left:0, right:0, top:0, bottom:487,
	skin:topSkin,
	contents:[
		new BackButton(),
		new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Health-Data-Name", style:labelStyle}),
		new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
	]});
	
var middleSection = new Container({
	left:0, right:0, top:50, bottom:50,
	skin:middleSkin,
	contents:[
		new GraphContainer(),
		new Label({left:0, right:120, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(plotterParams.interval/1000)+" s", style:labelStyle}),
		new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:labelStyle}),
		new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
	]});

var bottomSection = new Container({
	left:0, right:0, top:487, bottom:0,
	skin:bottomSkin,
	contents:[
		new RefreshButton(),
	]});


// Application launch behavior

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
	onLaunch: function(application, data){
		application.add(topSection);
		application.add(middleSection);
		application.add(bottomSection);
		},
})

application.behavior = new ApplicationBehavior();