var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var FIELDS = require('textFieldsAll.js');
var Chart = require('modules/chart.js');
var BTN = require('btn.js');
var BTNPIC = require('btnPic.js');
/*********************************************************/
/************First Screen/Login/SignUp**********************/
/*********************************************************/
var screen0 = exports.Screen0 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
			contents: 
			[
				new Picture({top: 50, height: 240, url: "SanitasLogo.png"}),
				new Line({height: 50, skin: whiteSkin}),
				//new LOGIN.LoginScreen(),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Returning? Login", nextScreen : screen1}),
				//new SIGNUP.SignUpScreen(),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "New? Sign Up", nextScreen : screen2}),
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 1 Login Screen**********************/
/*********************************************************/	
var screen1 = exports.Screen1 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, active:true,
			contents: 
			[
				//new BACK.BackToHome(),
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),
				new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 40, url: "LogoNoWords.png"}),
						new Label({left: 110, string:"Log In", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Patient ID", style:titleStyle, id : 'C'}),
				new FIELDS.myField({name: "Password", style:titleStyle, id : 'D'}),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "> Next", nextScreen : screen4}),			
			], 
			behavior: Object.create(Container.prototype, {
			onTouchEnded: { 
				value: function(content){
				trace("Touched\n");
				KEYBOARD.hide();
				content.focus();
				}}
			}),
		}
	});

/*********************************************************/
/************SCREEN 2 Sign Up Screen**********************/
/*********************************************************/

var screen2 = exports.Screen2 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, 
			contents: 
			[
				//new BACK.BackToHome(),
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),				
				new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 40, url: "LogoNoWords.png"}),
						new Label({left: 90, string:"Sign Up", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Patient ID"}),
				new FIELDS.myField({name: "Password"}),
				new FIELDS.myField({name: "Confirm Password"}),
				new NEXTTOSECONDSIGNUP.NextToSecondSignUp(),		
			], 
		behavior: Object.create(Container.prototype, {
			onTouchEnded: { 
				value: function(content){
				trace("Touched\n");
				KEYBOARD.hide();
				content.focus();
				}}
			}),
		}
	});

/*********************************************************/
/************SCREEN 4 HOME SCREEN WITH ICONS**********************/
/*********************************************************/

var screen4 = exports.Screen4 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin,
			contents: 
			[
					//new BACK.BackToHome(),
					new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),
					new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 20, url: "house.png"}),
						new Label({left: 110, string:"Home", style:titleStyle}),
					]}),
					//new CONFIGURESCREENBUTTON.ConfigureScreenButton(),
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Configure Devices", nextScreen : screen4}),
					//new VIEWDATASCREENBUTTON.ViewDataScreenButton(),
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "View Data", nextScreen : screen6}),
					//new MEDICATIONREMINDERSCREENBUTTON.MedicationReminderScreenButton(),
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Medication Reminders", nextScreen : screen7}),
					//new APPOINTMENTREMINDERSCREENBUTTON.AppointmentReminderScreenButton(),
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Appointments", nextScreen : screen5}),
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 5 APPOINTMENTS SCREEN**********************/
/*********************************************************/

var screen5 = exports.Screen5 = Container.template(function($) 
	{ 
		return{ 
		left:20, right:20, top:40, bottom:40,
		contents:[
		 new Container({
			left:0, right:0, top:0, bottom:360,
			skin:blueSkin,
			contents:[
					new Line({left:0, right:0, bottom: 90, top: 0,
						contents:[
							//new APPOINTMENTSSCREENBACKBUTTON.AppointmentsScreenBackButton(),
							new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
							new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Appointments", style: titleStyle}),
							new Picture({right: 0, height: 50, url: "appointments.png"}),
								]})
			]}),
			new Container({
				left:0, right:0, top:120, bottom:60,
				skin:whiteSkin,
				contents:[
					new Line({left:0, right:0, height: 25, bottom: 320, top: 0, skin: silverSkin,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 90, string:"UPCOMING", style: textStyle, fill: "yellow"}),
							]}),
					new Picture({left: 0, right: 250, bottom: 260, height: 40, url: "AndyCarle.png"}),
					new Line({left:100, right:0, height: 30, bottom: 220, top: 0,
							contents:[
								checkbox[0] = new APPTDAYCHECKBOXTEMPLATE.ApptDayCheckBoxTemplate({name:"Dr. Andy Kinoma"}),
							]}),
					new Line({left:30, right:0, height: 30, bottom: 160, top: 0,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 16 @ 11 AM", style: textStyle}),
								new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Heart Transplant", style: textStyle}),
							]}),
					new Line({left:0, right:0, height: 25, bottom: 120, top: 200, skin: silverSkin,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 90, string:"PAST", style: textStyle}),
							]}),
					new Line({left:100, right:0, height: 30, bottom: 0, top: 170,
							contents:[
								checkbox[1] = new APPTNIGHTCHECKBOXTEMPLATE.ApptNightCheckBoxTemplate({name:"Dr. Mary Berry"}),
							]}),
					new Line({left:30, right:0, height: 30, bottom: 0, top: 220,
							contents:[
								new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 1", style: textStyle}),
								new Label({left: 50, top: 0, bottom: 0, left: 0, right: 0, string:"Syphilis Shot", style: textStyle}),
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

var ApptAlertLabel = new Label({top: 0, bottom: 0, left: 0, right: 0, string:"no alerts for now", style: headerStyle});

/*********************************************************/
/************SCREEN 6 VIEW DATA SCREEN**********************/
/*********************************************************/


var screen6 = exports.Screen6 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin,
			contents: 
			[
		 new Column({
			left:0, right:0, top:0, bottom:0,
			contents:[
				//new VIEWDATASCREENBACKBUTTON.ViewDataScreenBackButton(),
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
				new Column({top: 0, bottom: 0, right: 10, left: 10, skin: whiteSkin, 
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 40, url: "LogoNoWords.png"}),
						new Label({left:90, right:10, top: 5, bottom:10, string: "View Data", style: titleStyle}),
						]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0,
					contents:[
						//new TEMPERATURESCREENBUTTON.TemperatureScreenButton(),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: temp + "F", nextScreen : screen9}),
						//new BLOODPRESSURESCREENBUTTON.BloodPressureScreenButton(),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: bp + "Hg mm", nextScreen : screen10}),
					]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0,
					contents:[
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "    Temperature", style : textStyle}),
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "    Blood Pressure", style : textStyle}),
					]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0, 
					contents:[
						//new CALORICEXPENDITURESCREENBUTTON.CaloricExpenditureScreenButton(),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: ce + "cal", nextScreen : screen11}),
						//new HEARTRATESCREENBUTTON.HeartRateScreenButton(),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: hr + "bpm", nextScreen : screen12}),
					]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0, 
					contents:[
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "      Calories", style : textStyle}),
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "      Heart Rate", style : textStyle}),
					]}),
			]}),
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 7 MEDICATION REMINDER SCREEN**********************/
/*********************************************************/

var screen7 = exports.Screen7 = Column.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
	skin: silverSkin,
	contents:[
			//new MEDICATIONREMINDERBACKBUTTON.MedicationReminderBackButton(),
			new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
			new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin, 
					contents:[
						new Picture({left: 0, right: 0, bottom: 0, top: 0, height: 20, url: "pill.png"}),
						new Label({left:80, right:0, top: 0, bottom:0, string: "Medication", style: titleStyle}),
						]}),
		new Column({
			left:10, right:10, top:5, bottom:5,
			skin:whiteSkin,
			contents:[
				new Label({top: 0, bottom: 0, left: 100, right: 0, string:"MORNING", style: headerStyle}),
				new Line ({top: 0, bottom: 0, left: 100, right: 0, contents:[
					checkbox[0] = new MEDICINEDAYCHECKBOXTEMPLATE.MedicineDayCheckBoxTemplate({name:"Enoxaparin"}),
				]}),
				new Label({top: 0, bottom: 0, left: 90, right: 0, string:"1 capsule 500 mg", style: textStyle}),
			]}),
		new Column({
			left:10, right:10, top:5, bottom:10,
			skin:whiteSkin,
			contents:[
				new Label({top: 0, bottom: 0, left: 110, right: 0, string:"NIGHT", style: headerStyle}),
				new Line ({top: 0, bottom: 0, left: 100, right: 0, contents:[
					checkbox[1] = new MEDICINENIGHTCHECKBOXTEMPLATE.MedicineNightCheckBoxTemplate({name:"Anagrelide"}),
					]}),
				new Label({top: 0, bottom: 0, left: 90, right: 0, string:"1 capsule 300 mg", style: textStyle}),
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


var screen8 = exports.Screen8 = Container.template(function($) 
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
			skin:blueSkin,
			contents:[
				//new ADDMEDICATIONSCREENBACKBUTTON.AddMedicationScreenBackButton(),
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Add Medication", style: titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:80, bottom:0,
			skin:whiteSkin,	
			contents:[
				//new Label({left: 0, right : 0, top : 20, string : "Enter the name of the medicine", style : textStyle}),
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

var remHr = 0;
var remMin = 0;

var remHrLabel = new Label({left: -180, right : 0, top : 120, height : 40, width : 40,anchor : "temp", string : remHr, style : textStyle});
var remMinLabel = new Label({left: 180, right : 20, top : 120, height : 40, string : remMin, style : textStyle});

/*********************************************************/
/************SCREEN 9 VIEW TEMPERATURE**********************/
/*********************************************************/

var TemperatureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: greenSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.temperature_app*100;
			currentTemp = parseInt(temp);
			/*MainScreen.first.next.first.next.string = currentTemp + " degrees Celsius";
			if (sw == 1) {
				data.datasets[0].data[0] = data.datasets[0].data[sw]
				data.datasets[0].data[sw] = temp;
				sw = 0;
			}
			else {
				data.datasets[0].data[1] = temp;
				sw = 1;
			}
			tempChart = new Chart.klass(tempGraph).Line(data);
			tempChart.draw(); */
		}}
	})
}});

var data = {
    labels: ["degrees C"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, 0]
        },
    ]
};

var TemperatureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});

var tempChart = null;

var currentTemp = null;

var tempGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
							tempChart = new Chart.klass(tempGraph).Line(data);
							tempChart.draw();
						}},
				
					})
});

var sw = 0;

var tempAdd = 0;

var screen9 = exports.Screen9 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
				contents:[
					new Container({
						left:0, right:0, top:0, bottom:487,
						skin:blueSkin,
						contents:[
							//new TEMPERATUREBACKBUTTON.TemperatureBackButton(),
							new BTNPIC.btnPic({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
							new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Temperature", style:headerStyle}),
							new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
						]}),	
					new Container({
						left:0, right:0, top:50, bottom:50,
						skin:whiteSkin,
						contents:[
							new TemperatureGraphContainer(),
							new Label({left:0, right:170, top:400, bottom:0, height:0, string: "Last Reading: "+currentTemp, style:textStyle}),
						]}),
					new Container({
						left:0, right:0, top:487, bottom:0,
						skin:greenSkin,
						contents:[
							new TemperatureRefreshButton(),
						]}),
					], 
					behavior: Object.create(Behavior.prototype, {
									onDisplayed: { value: function(content) {
										content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );		
									}},
									onCreate: { value: function(content) {
										if (tempAdd == 0) {
										tempAdd = 1;
										content.first.next.first.add(tempGraph);
										}
										
									}},
									onComplete: { value: function(content, message, json){
										var temp = json.temperature_app*100;
										currentTemp = parseInt(temp);
										content.first.next.first.next.string = currentTemp + " degrees Celsius";
										if (sw == 1) {
											data.datasets[0].data[0] = data.datasets[0].data[sw]
											data.datasets[0].data[sw] = temp;
											sw = 0;
										}
										else {
											data.datasets[0].data[1] = temp;
											sw = 1;
										}
										tempChart = new Chart.klass(tempGraph).Line(data);
										tempChart.draw();
									}}
								})}; })

/*********************************************************/
/************SCREEN 10 VIEW BLOOD PRESSURE**********************/
/*********************************************************/


var screen10 = exports.Screen10 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:blueSkin,
			contents:[
				//new BLOODPRESSUREBACKBUTTON.BloodPressureBackButton(),
				new BTNPIC.btnPic({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "BloodPressure", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:whiteSkin,
			contents:[
				new BloodPressureGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(BloodPressurePlotterParams.interval/1000)+" s", style:textStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:textStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:greenSkin,
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
		Label($, { style: textStyle, behavior: Object.create((BloodPressureGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: textStyle, behavior: Object.create((BloodPressureGraphLabel.behaviors[1]).prototype), string: '--', }),
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

var BloodPressureGraphCanvas = PLOTTER.Plotter.template(function($) { return { left: 0, right: 0, top: 50, bottom: 50, behavior: Object.create((BloodPressureGraphCanvas.behaviors[0]).prototype), }});
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
var screen11 = exports.Screen11 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:blueSkin,
			contents:[
				//new CALORICEXPENDITUREBACKBUTTON.CaloricExpenditureBackButton(),
				new BTNPIC.btnPic({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "CaloricExpenditure", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:whiteSkin,
			contents:[
				new CaloricExpenditureGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(CaloricExpenditurePlotterParams.interval/1000)+" s", style:textStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:textStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:greenSkin,
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
		Label($, { style: textStyle, behavior: Object.create((CaloricExpenditureGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: textStyle, behavior: Object.create((CaloricExpenditureGraphLabel.behaviors[1]).prototype), string: '--', }),
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
return { left: 0, right: 0, top: 50, bottom: 50, behavior: Object.create((CaloricExpenditureGraphCanvas.behaviors[0]).prototype), }});
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


var screen12 = exports.Screen12 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0,
			contents: 
			[
		 new Container({
			left:0, right:0, top:0, bottom:487,
			skin:blueSkin,
			contents:[
				//new HEARTRATEBACKBUTTON.HeartRateBackButton(),
				new BTNPIC.btnPic({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "HeartRate", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:whiteSkin,
			contents:[
				new HeartRateGraphContainer(),
				new Label({left:0, right:0, top:360, bottom:0, height:0, string: "Sampling Rate: Every "+(HeartRatePlotterParams.interval/1000)+" s", style:textStyle}),
				new Label({left:0, right:0, top:280, bottom:0, height:0, string: "Time (seconds)", style:textStyle}),
				new Picture({left:0, right:0, top:0, bottom:0, url:"Axes.png"}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:greenSkin,
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
		Label($, { style: textStyle, behavior: Object.create((HeartRateGraphLabel.behaviors[0]).prototype), string: '--', }),
		Label($, { style: textStyle, behavior: Object.create((HeartRateGraphLabel.behaviors[1]).prototype), string: '--', }),
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

var HeartRateGraphCanvas = PLOTTER.Plotter.template(function($) { return { 
left: 0, right: 0, top: 50, bottom: 50, behavior: Object.create((HeartRateGraphCanvas.behaviors[0]).prototype), }});
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

/*********************************************************/
/************SCREEN 13 Sign Up Screen**********************/
/*********************************************************/

var screen13 = exports.Screen13 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, 
			contents: 
			[
				new BACK.BackToHome(),
				new Line({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Label({left: 90, string:"Sign Up", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Physician ID"}),
				new FIELDS.myField({name: "Emergency Contact Name"}),
				new FIELDS.myField({name: "Emergency Contact Number"}),
					
				new NEXT.NextToHome(),		
			], 
		}
	});
