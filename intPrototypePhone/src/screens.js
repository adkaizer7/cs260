var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var FIELDS = require('textFieldsAll.js');
/*********************************************************/
/************First Screen/Login/SignUp**********************/
/*********************************************************/
exports.Screen0 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: blueSkin, 
			contents: 
			[
				new Label({string:"Welcome Danny!", style:titleStyle}),
				new LOGIN.LoginScreen(),
				new SIGNUP.SignUpScreen(),
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 1 Login Screen**********************/
/*********************************************************/	
exports.Screen1 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: yellowSkin, 
			contents: 
			[
				new BACK.BackToHome(),
				new Label({string:"Login", top: 100, style:titleStyle, id : 'A'}),
				new FIELDS.usernameField({name: "Username", style:titleStyle, id : 'C'}),
				new FIELDS.passwordField({name: "Password", style:titleStyle, id : 'D'}),
				new NEXT.NextToHome(),			
			], 
		}
	});

/*********************************************************/
/************SCREEN 2 Sign Up Screen**********************/
/*********************************************************/

exports.Screen2 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: yellowSkin, 
			contents: 
			[
				new BACK.BackToHome(),
				new Label({string:"Sign Up", top: 100, style:titleStyle, id : 'A'}),
				new FIELDS.idField({name: "Patient ID", style:titleStyle, id : 'B'}),
				new FIELDS.usernameField({name: "Username", style:titleStyle, id : 'C'}),
				new FIELDS.passwordField({name: "Password", style:titleStyle, id : 'D'}),
				new FIELDS.confirmPasswordField({name: "Confirm Password", style:titleStyle, id : 'E'}),
				new NEXT.NextToHome(),		
			], 
		}
	});

/*********************************************************/
/************SCREEN 4 HOME SCREEN WITH ICONS**********************/
/*********************************************************/

exports.Screen4 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new BACK.BackToHome(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Home", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"sun.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new CONFIGURESCREENBUTTON.ConfigureScreenButton(),
				new VIEWDATASCREENBUTTON.ViewDataScreenButton(),
				new MEDICATIONREMINDERSCREENBUTTON.MedicationReminderScreenButton(),
				new APPOINTMENTREMINDERSCREENBUTTON.AppointmentReminderScreenButton(),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Copyright Axis of Altruism 2015", style:footerStyle}),
			]}), 	
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 5 APPOINTMENTS SCREEN**********************/
/*********************************************************/

exports.Screen5 = Container.template(function($) 
	{ 
		return{ 
		left:20, right:20, top:40, bottom:40,
		contents:[
		 new Container({
			left:0, right:0, top:0, bottom:360,
			skin:topSkin,
			contents:[
					new Line({left:0, right:0, bottom: 90, top: 0,
						contents:[
							new APPOINTMENTSSCREENBACKBUTTON.AppointmentsScreenBackButton(),
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
								checkbox[0] = new APPTDAYCHECKBOXTEMPLATE.ApptDayCheckBoxTemplate({name:"Dr. Andy Kinoma"}),
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
								checkbox[1] = new APPTNIGHTCHECKBOXTEMPLATE.ApptNightCheckBoxTemplate({name:"Dr. Mary Berry"}),
							]}),
					new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 1", style: subType}),
								new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Syphilis Shot", style: subType}),
							]}),
					new Picture({left: 0, right: 250, bottom: 60, height: 40, url: "woman-doctor.png"}),
			]}),
			], 
		}
	});

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

var ApptAlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"no alerts for now", style: alertType});

/*********************************************************/
/************SCREEN 6 VIEW DATA SCREEN**********************/
/*********************************************************/


exports.Screen6 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new VIEWDATASCREENBACKBUTTON.ViewDataScreenBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "View Data", style: titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new TEMPERATURESCREENBUTTON.TemperatureScreenButton(),
				new Label({top: 140, height : 40, left : 15, width : 150, string : "Body Temperature", style : labelStyle}),
				new BLOODPRESSURESCREENBUTTON.BloodPressureScreenButton(),
				new Label({top: 140, height : 40, left : 165, width : 150, string : "Blood Pressure", style : labelStyle}),
				new CALORICEXPENDITURESCREENBUTTON.CaloricExpenditureScreenButton(),
				new Label({top: 320, height : 40, left : 12, width : 180, string : "Energy Expenditure", style : labelStyle}),
				new HEARTRATESCREENBUTTON.HeartRateScreenButton(),
				new Label({top: 320, height : 40, left : 165, width : 150, string : "Heart Rate", style : labelStyle}),
			]}),
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 7 MEDICATION REMINDER SCREEN**********************/
/*********************************************************/


exports.Screen7 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
	skin:topSkin,
	contents:[
		 new Container({
			left:0, right:0, top:0, bottom:360,
			skin:topSkin,
			contents:[
					new Line({left:0, right:0, bottom: 90, top: 0,
						contents:[
							new MEDICATIONREMINDERBACKBUTTON.MedicationReminderBackButton(),
							new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Medication", style: titleStyle}),
							//new Picture({right: 0, height: 50, url: "medicineBottle.png"}),
							//new ADDMEDICATIONBUTTON.addMedicationButton(),
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
							checkbox[0] = new MEDICINEDAYCHECKBOXTEMPLATE.MedicineDayCheckBoxTemplate({name:"Enoxaparin"}),
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
							checkbox[1] = new MEDICINENIGHTCHECKBOXTEMPLATE.MedicineNightCheckBoxTemplate({name:"Anagrelide"}),
						]}),
				new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
						contents:[
							new Label({top: 0, bottom: 0, left: 0, right: 0, string:"1 capsule 300 mg", style: subType}),
							new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"anti-inflammatory", style: subType}),
						]}),
				new Picture({left: 0, right: 250, bottom: 60, height: 40, url: "pill2.png"}),
		]}),
		]
			
		}
	});

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

/*********************************************************/
/************SCREEN 8 ADD MEDICATION**********************/
/*********************************************************/


exports.Screen8 = Container.template(function($) 
	{ 
		return{ 
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
				new ADDMEDICATIONSCREENBACKBUTTON.AddMedicationScreenBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Add Medication", style: titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:80, bottom:0,
			skin:middleSkin,	
			contents:[
				//new Label({left: 0, right : 0, top : 20, string : "Enter the name of the medicine", style : labelStyle}),
				new FIELDS.MyField({name : "medication", top : 20,string : "Enter name of medicine"}),
				//new UPBUTTON.upButton({top : 80, left : 50, hour : true}),
				//new UPBUTTON.upButton({top : 80, right : 50, hour : false }),
				remHrLabel,
				remMinLabel,
				//new DOWNBUTTON.downButton({top : 180, left : 50 , hour : true}),
				//new DOWNBUTTON.downButton({top : 180, right : 50, hour : false }),
				new CONFIRMREMINDERBUTTON.confirmReminderButton(),			
				
		]}),
]
		}
	});

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
//var whiteSkin = new Skin({fill:"white"});


var remHr = 0;
var remMin = 0;

var remHrLabel = new Label({left: -180, right : 0, top : 120, height : 40, width : 40,anchor : "temp", string : remHr, style : labelStyle});
var remMinLabel = new Label({left: 180, right : 20, top : 120, height : 40, string : remMin, style : labelStyle});

/*********************************************************/
/************SCREEN 9 VIEW TEMPERATURE**********************/
/*********************************************************/


exports.Screen9 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new TEMPERATUREBACKBUTTON.TemperatureBackButton(),
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
				new TEMPERATUREREFRESHBUTTON.TemperatureRefreshButton(),
			]}),
			], 
		}
	});

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
			var read = parseInt(reading);
         	content.string = read;
         	if (read < 20)
         	{
         		application.behavior.openDialogBox(AlertCeTooLowDiaBox);
         	}                   	
		}
	},
})

var TemperatureGraphCanvas = PLOTTER.Plotter.template(function($) { return { 
left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((TemperatureGraphCanvas.behaviors[0]).prototype), }});
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
	
var TemperatureGraphContainer = Container.template(function($) { 
return { left: 0, right: 0, top: 0, bottom: 0,
		contents: [
			new TemperatureGraphCanvas(TemperaturePlotterParams),
			new TemperatureGraphLabel(TemperaturePlotterParams),
		],
 }});

/*********************************************************/
/************SCREEN 10 VIEW BLOOD PRESSURE**********************/
/*********************************************************/


exports.Screen10 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new BLOODPRESSUREBACKBUTTON.BloodPressureBackButton(),
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
				new BLOODPRESSUREREFRESHBUTTON.BloodPressureRefreshButton(),
			]}),
			], 
		}
	});

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
                     	var read = parseInt(reading);
                     	content.string = read;
                     	if (read < 20)
                     	{
                     		application.behavior.openDialogBox(AlertBpTooLowDiaBox);
                     	}
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
	
var BloodPressureGraphContainer = Container.template(function($) { 
return { left: 0, right: 0, top: 0, bottom: 0,
		contents: [
			new BloodPressureGraphCanvas(BloodPressurePlotterParams),
			new BloodPressureGraphLabel(BloodPressurePlotterParams),
		],
 }});
 
 
/*********************************************************/
/************SCREEN 11 VIEW CALORIC EXPENDITURE***********/
/*********************************************************/
exports.Screen11 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new CALORICEXPENDITUREBACKBUTTON.CaloricExpenditureBackButton(),
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
				new CALORICEXPENDITUREREFRESHBUTTON.CaloricExpenditureRefreshButton(),
			]}),
			], 
		}
	});
	
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
						var read = parseInt(reading);
                     	content.string = read;
                     	if (read < 20)
                     	{
                     		application.behavior.openDialogBox(AlertCeTooLowDiaBox);
                     	}
 					}
	},
})

var CaloricExpenditureGraphCanvas = PLOTTER.Plotter.template(function($) { 
return { left: 0, right: 0, top: 50, bottom: 100, behavior: Object.create((CaloricExpenditureGraphCanvas.behaviors[0]).prototype), }});
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
	
var CaloricExpenditureGraphContainer = Container.template(function($) { 
return { left: 0, right: 0, top: 0, bottom: 0,
		contents: [
			new CaloricExpenditureGraphCanvas(CaloricExpenditurePlotterParams),
			new CaloricExpenditureGraphLabel(CaloricExpenditurePlotterParams),
		],
 }});
		
/*********************************************************/
/************SCREEN 12 VIEW HEART RATE********************/
/*********************************************************/


exports.Screen12 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new HEARTRATEBACKBUTTON.HeartRateBackButton(),
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
				new HEARTRATEREFRESHBUTTON.HeartRateRefreshButton(),
			]}),
			], 
		}
	});
	
	
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
                     	var read = parseInt(reading);
                     	content.string = read;
                     	if (read < 20)
                     	{
                     		application.behavior.openDialogBox(AlertHrTooLowDiaBox);
                     	}                    		
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
	
var HeartRateGraphContainer = Container.template(function($) { return { 
left: 0, right: 0, top: 0, bottom: 0,
		contents: [
			new HeartRateGraphCanvas(HeartRatePlotterParams),
			new HeartRateGraphLabel(HeartRatePlotterParams),
		],
 }});

