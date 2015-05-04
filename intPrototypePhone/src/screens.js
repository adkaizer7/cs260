var KEYBOARD = require('mobile/keyboard');
var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var FIELDS = require('textFieldsAll.js');
var Chart = require('modules/chart.js');
var BTN = require('btn.js');
var BTN3 = require('btn_dataprev');
var BTNPIC = require('btnPic.js');
var BTNTOAST = require('btnToast.js');
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
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),
				new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 80, url: "LogoNoWords.png"}),
						new Label({left: 110, string:"Log In", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Patient ID", style:titleStyle, id : 'C'}),
				new FIELDS.myField({name: "Password", style:titleStyle, id : 'D'}),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "> Next", nextScreen : screen4}),			
			], 
			behavior: Object.create(Container.prototype, {
			onTouchEnded: { 
				value: function(content){
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
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),				
				new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 80, url: "LogoNoWords.png"}),
						new Label({left: 90, string:"Sign Up", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Patient ID"}),
				new FIELDS.myField({name: "Password"}),
				new FIELDS.myField({name: "Confirm Password"}),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "> Next", nextScreen : screen13}),				
			], 
		behavior: Object.create(Container.prototype, {
			onTouchEnded: { 
				value: function(content){
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
					new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),
					new Column({top: 5, bottom: 5, right: 5, left: 5, skin: whiteSkin,
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 30, url: "house.png"}),
						new Label({horizontal: 'center', string:"Home", style:titleStyle}),
					]}),
					new Line({top: 0, bottom: 0, left: 0, right: 0, contents:[
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Configure Devices", nextScreen : screen14}),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "View Data", nextScreen : screen6}),
					]}),
					new Line({top: 0, bottom: 0, left: 0, right: 0, contents:[
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Medication", nextScreen : screen7}),
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Appointments", nextScreen : screen5}),
					]}),
			], 
			behavior: Object.create(Behavior.prototype, {
				onCreate: { value: function(content) {
					content.invoke( new Message(deviceURL + "getbloodSugar"), Message.JSON );
					content.invoke( new Message(deviceURL + "getCe"), Message.JSON );		
					content.invoke( new Message(deviceURL + "getBp"), Message.JSON );		
					content.invoke( new Message(deviceURL + "getHR"), Message.JSON );													
				}},
				onComplete: { value: function(content, message, json){
					if (message.name == "getbloodSugar") {
						currentBloodSugar = json.bloodSugar_app*100;
					}
					else if (message.name == "getCe") {
						currentCaloricExpenditure = json.ce_app*100;
					}
					else if (message.name == "getBp") {
						currentBP = json.bp_app*100;
					}
					else if (message.name == "getHR") {
						currentHeartRate = json.hr_app*100;
					}															
				}}
				}),
		}
	});
	
/*********************************************************/
/************SCREEN 5 APPOINTMENTS SCREEN**********************/
/*********************************************************/

var screen5 = exports.Screen5 = Column.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
			skin: silverSkin,		
			contents:[
				//new APPOINTMENTSSCREENBACKBUTTON.AppointmentsScreenBackButton(),
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
				new Column({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin, 
					contents:[
						new Label({left:0, right:0, top: 0, bottom:0, string: "Appointments", style: titleStyle}),
						]}),
			new Column({
			left:10, right:10, top:5, bottom:5,
				skin:whiteSkin,
				contents:[
				new Label({top: 0, bottom: 0, left: 0, right: 0, string:"UPCOMING", style: headerStyle}),
					new Line ({top: 0, bottom: 0, left: 0, right: 0, horizontal: 'center', contents:[
								new Picture({top: 0, left: 0, right: 0, bottom: 0, height: 80, url: "AndyCarle.png"}),
								checkbox[0] = new APPTDAYCHECKBOXTEMPLATE.ApptDayCheckBoxTemplate({name:"Dr. Andy Kinoma"}),
							]}),
					new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 16 at 11 AM", style: textStyle}),
					]}),
			new Column({
			left:10, right:10, top:5, bottom:10,
				skin:whiteSkin,
				contents:[
				new Label({top: 0, bottom: 0, left: 0, right: 0, string:"PAST", style: headerStyle}),
				new Line ({top: 0, bottom: 0, left: 40, right: 0, horizontal: 'center', contents:[
								new Picture({top: 0, left: 0, right: 0, bottom: 0, height: 130, url: "woman-doctor.png"}),
								checkbox[1] = new APPTNIGHTCHECKBOXTEMPLATE.ApptNightCheckBoxTemplate({name:"Dr. Mary Berry"}),
							]}),
				new Label({top: 0, bottom: 0, left: 0, right: 0, string:"April 1 at 5 PM", style: textStyle}),
			]}),
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Doctor Info", nextScreen : screen4}),				
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
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
				new Column({top: 0, bottom: 0, right: 10, left: 10, skin: whiteSkin, 
					contents:[
						new Picture({right: 0, left: 0, top: 5, bottom: 5, height: 80, url: "LogoNoWords.png"}),
						new Label({left:5, right:10, top: 5, bottom:10, string: "View Data", style: headerStyle}),
						]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0,
					contents:[
						new BTN3.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: currentBloodSugar + " mmol/L", nextScreen : screen9}),
						new BTN3.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: currentBP + "/90 mmHg", nextScreen : screen10}),
					]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0,
					contents:[
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "    Blood Sugar", style : textStyle}),
						new Label({top: 5, left : 10, right: 10, bottom: 5, string : "    Blood Pressure", style : textStyle}),
					]}),
				new Line({top: 0, bottom: 0, right: 0, left: 0, 
					contents:[
						new BTN3.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: currentCaloricExpenditure + " KCal", nextScreen : screen11}),
						new BTN3.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: currentHeartRate + " BPM", nextScreen : screen12}),
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
/************SCREEN 7 MEDICATION REMINDER SCREEN**********/
/*********************************************************/

Handler.bind("/sendAlertMedChanged", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that Med changed. Get Med\n");
		handler.invoke(new Message(deviceURL + "getMed"), Message.JSON);
	},
	onComplete: function(handler, message, json){
			med_app = parseInt(json.med_app * 100);			
			if (med_app < 50)
			{
				var oldScreen = currentScreen;	
				currentScreen = new screen7;			
				application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			}
			else
			{
				var oldScreen = currentScreen;	
				currentScreen = new screen7;			
				application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			}
			trace("Medication = " + med_app + "\n" );		
	}
}));

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
						new Picture({left: 0, right: 0, bottom: 0, top: 0, url: "pill.png"}),
						new Label({left:0, right:0, top: 0, bottom:0, string: "Medication", style: titleStyle}),
					]}),
				new Column({
					left:10, right:10, top:5, bottom:5,
					skin:whiteSkin, active: true,
					contents:[
						new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Spironolactone", style: headerStyle}),
						new Line ({top: 0, bottom: 0, left: 0, right: 0, style: headerStyle, 
							contents:[
								checkboxTab1[0] = new MEDICINECHECKBOXTEMPLATE.MedicineCheckBoxTemplate({name:"9:00 a.m.", tablet : "Tablet1"}),
								checkboxTab1[1] = new MEDICINECHECKBOXTEMPLATE.MedicineCheckBoxTemplate({name:"1:00 p.m.", tablet : "Tablet1"}),
								checkboxTab1[2] = new MEDICINECHECKBOXTEMPLATE.MedicineCheckBoxTemplate({name:"8:00 p.m.", tablet : "Tablet1"}),					
							],				
						}),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "More Information", nextScreen : screen16}),
						new Label({style : textStyle, string : "Number of tablets left : " + parseInt(tablet1)}),
						new BTNTOAST.btnToast({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Buy Pill 1", nextScreen : screen7, visibility : (tablet1 < 30)}),											
					],
					behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value: function(content){		
							trace('More information for tablet1 was requested.\n');
							var oldScreen = currentScreen;
							currentScreen = new screen16;
							application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});			
						}},
					})
				}),
				new Column({
					left:10, right:10, top:5, bottom:10,
					skin:whiteSkin, active : true,
					contents:[
						new Label({top: 0, bottom: 0, left: 0, right: 0, string:"Tablet 2", style: headerStyle}),
						new Line ({top: 0, bottom: 0, left: 0, right: 0, style: titleStyle, 
							contents:[
								checkboxTab2[0] = new MEDICINECHECKBOXTEMPLATE.MedicineCheckBoxTemplate({name:"9:00 a.m.", tablet : "Tablet2"}),						
								checkboxTab2[1] = new MEDICINECHECKBOXTEMPLATE.MedicineCheckBoxTemplate({name:"8:00 p.m.", tablet : "Tablet2"}),
						]}),
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "More Information", nextScreen : screen17}),
						new Label({style : textStyle, string : "Number of tablets left : " + parseInt(tablet2)}),	
						new BTNTOAST.btnToast({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Buy Pill2", nextScreen : 7, visibility : (tablet2 < 30)}),						
					],					
					behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
						onTap: { value: function(content){		
							trace('More information for tablet2 was requested.\n');
							var oldScreen = currentScreen;
							currentScreen = new screen17;
							application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});			
						}},
					})
				}),				
			]
		}
	});
var checkbox = [];
var checkboxTab1 = [];
var checkboxTab2 = [];

//MEDtimeR
var takenDayMedicine = false;
var takenNightMedicine = false;
var reminderDayHours = 9; //check take medicine at 9 AM
var reminderNightHours = 18; //check take medicine at 6 PM

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
				remHrLabel,
				remMinLabel,
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
/************SCREEN 9 Blood Sugar**********************/
/*********************************************************/

var BloodSugarRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: whiteSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getbloodSugar"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.bloodSugar_app*100;
			var oldBloodSugar = currentBloodSugar;
			currentBloodSugar = parseInt(temp);
			currentScreen.first.next.next.first.next.string = "Last Reading: "+currentBloodSugar + " mmol/L";
			var d = new Date();
			var month = d.getMonth() + 1;
			var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
			BloodSugarChart.addData([currentBloodSugar], s);
			if (BloodSugarChart.datasets[0].points.length >  5) { 
				BloodSugarChart.removeData(); 
			}
			var ctx = BloodSugarGraph.getContext("2d");
			var tail = BloodSugarChart.datasets[0].points.length - 1;
			ctx.beginPath();
	        ctx.moveTo(tail, oldBloodSugar);
	        ctx.lineTo(BloodSugarChart.datasets[0].points.length, currentBloodSugar);
	       	ctx.closePath();
	        ctx.strokeStyle = BloodSugardata.datasets[0].strokeColor;
	        ctx.lineWidth = 1;
	        ctx.stroke();
			
		}}
	})
}});

var btn_dataviz_bloodsugar = BUTTONS.Button.template(function($){ return{
	top: 5, bottom: 481, left: 5, right: 5, skin: $.skin, 
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			//new Picture({top: 0, bottom: 0, left: 0, right: 0, url: $.iconForLabel}),
			new Label({top: 0, bottom: 0, left: 5, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			oldScreen.first.next.next.first.remove(BloodSugarGraph);
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});


var BloodSugardata = {
    labels: ["mmol/L"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "black",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
    ]
};

var BloodSugarGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});

var BloodSugarChart = null;

var currentBloodSugar = null;

var BloodSugarGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
							if (BloodSugarAdd == 0){
								BloodSugarChart = new Chart.klass(BloodSugarGraph).Line(BloodSugardata);
								BloodSugarChart.draw();
								BloodSugarAdd = 1;
							}
							else {
								BloodSugarChart.draw();
							}
						}},
						
					})
});

var BloodSugar = 0;

var BloodSugarAdd = 0;


var screen9= exports.Screen9 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
			skin: silverSkin,
				contents:[
				new btn_dataviz_bloodsugar({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Container({top: 60, bottom: 440, right: 10, left: 10, skin: whiteSkin, 
					contents:[
							new Label({left:0, right:0, top: 0, bottom:0, string: "Blood Sugar", style: titleStyle}),
					]}),
				new Container({
					left:10, right:10, top:100, bottom:60,
					skin:whiteSkin, active: true,
					contents:[
							new BloodSugarGraphContainer(),
							new Label({left:0, right:0, top:340, bottom:0, height:0, string: "Last Reading: "+currentBloodSugar+" mmol/L", style:headerStyle}),
						]}),
				new Container({
					left:10, right:10, top:480, bottom:10,
					skin:whiteSkin, active : true,
					contents:[
							new BloodSugarRefreshButton(),
						]}),
					], 
					behavior: Object.create(Behavior.prototype, {
									onDisplayed: { value: function(content) {
										content.invoke( new Message(deviceURL + "getbloodSugar"), Message.JSON );		
									}},
									onCreate: { value: function(content) {
										content.first.next.next.first.add(BloodSugarGraph);
										if (BloodSugarAdd == 1) {
											BloodSugarChart.draw();
										}
									}},
									onComplete: { value: function(content, message, json){
										var temp = json.bloodSugar_app*100;
										var oldBloodSugar = currentBloodSugar;
										currentBloodSugar = parseInt(temp);
										currentScreen.first.next.next.first.next.string = "Last Reading: "+currentBloodSugar + " mmol/L";
										var d = new Date();
										var month = d.getMonth() + 1;
										var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
										BloodSugarChart.addData([currentBloodSugar], s);
										if (BloodSugarChart.datasets[0].points.length >  5) { 
											BloodSugarChart.removeData(); 
										}
										var ctx = BloodSugarGraph.getContext("2d");
										var tail = BloodSugarChart.datasets[0].points.length - 1;
										ctx.beginPath();
								        ctx.moveTo(tail, oldBloodSugar);
								        ctx.lineTo(BloodSugarChart.datasets[0].points.length, currentBloodSugar);
								       	ctx.closePath();
								        ctx.strokeStyle = BloodSugardata.datasets[0].strokeColor;
								        ctx.lineWidth = 1;
								        ctx.stroke();
									
									}}
								})}; 
							})

/*********************************************************/
/************SCREEN 10 VIEW BLOOD PRESSURE**********************/
/*********************************************************/


var BloodPressureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: whiteSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getBp"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.bp_app*100;
			var oldBP = currentBP;
			currentBP = parseInt(temp);
			currentScreen.first.next.next.first.next.string = "Last Reading: "+currentBP + " mmHg";
			var d = new Date();
			var month = d.getMonth() + 1;
			var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
			bpChart.addData([currentBP], s);
			if (bpChart.datasets[0].points.length >  5) { 
				bpChart.removeData(); 
			}
			var ctx = bpGraph.getContext("2d");
			var tail = bpChart.datasets[0].points.length - 1;
			ctx.beginPath();
	        ctx.moveTo(tail, oldBP);
	        ctx.lineTo(bpChart.datasets[0].points.length, currentBP);
	       	ctx.closePath();
	        ctx.strokeStyle = bpdata.datasets[0].strokeColor;
	        ctx.lineWidth = 1;
	        ctx.stroke();
			
		}}
	})
}});

var btn_dataviz_bloodpressure = BUTTONS.Button.template(function($){ return{
	top: 5, bottom: 481, left: 5, right: 5, skin: $.skin, 
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			//new Picture({top: 0, bottom: 0, left: 0, right: 0, url: $.iconForLabel}),
			new Label({top: 0, bottom: 0, left: 5, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			oldScreen.first.next.next.first.remove(bpGraph);
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});

var bpdata = {
    labels: ["mmHg"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "black",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
    ]
};

var BloodPressureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});

var bpChart = null;

var currentBP = null;

var bpGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
							if (bpAdd == 0){
								bpChart = new Chart.klass(bpGraph).Line(bpdata);
								bpChart.draw();
								bpAdd = 1;
							}
							else {
								bpChart.draw();
							}
						}},
						
					})
});

var bp = 0;

var bpAdd = 0;


var screen10 = exports.Screen10 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
			skin: silverSkin,
				contents:[
				new btn_dataviz_bloodpressure({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Container({top: 60, bottom: 440, right: 10, left: 10, skin: whiteSkin, 
					contents:[
							new Label({left:0, right:0, top: 0, bottom:0, string: "Blood Pressure", style: titleStyle}),
					]}),
				new Container({
					left:10, right:10, top:100, bottom:60,
					skin:whiteSkin, active: true,
					contents:[
							new BloodPressureGraphContainer(),
							new Label({left:0, right:0, top:340, bottom:0, height:0, string: "Last Reading: "+currentBP+"/90 mmHg", style:headerStyle}),
						]}),
				new Container({
					left:10, right:10, top:480, bottom:10,
					skin:whiteSkin, active : true,
					contents:[
							new BloodPressureRefreshButton(),
						]}),
					], 
					behavior: Object.create(Behavior.prototype, {
									onDisplayed: { value: function(content) {
										content.invoke( new Message(deviceURL + "getBp"), Message.JSON );		
									}},
									onCreate: { value: function(content) {
										content.first.next.next.first.add(bpGraph);
									}},
									onComplete: { value: function(content, message, json){
										var temp = json.bp_app*100;
										var oldBP = currentBP;
										currentBP = parseInt(temp);
										currentScreen.first.next.next.first.next.string = "Last Reading: "+currentBP + "/90 mmHg";
										var d = new Date();
										var month = d.getMonth() + 1;
										var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
										bpChart.addData([currentBP], s);
										if (bpChart.datasets[0].points.length >  5) { 
											bpChart.removeData(); 
										}
										var ctx = bpGraph.getContext("2d");
										var tail = bpChart.datasets[0].points.length - 1;
										ctx.beginPath();
								        ctx.moveTo(tail, oldBP);
								        ctx.lineTo(bpChart.datasets[0].points.length, currentBP);
								       	ctx.closePath();
								        ctx.strokeStyle = bpdata.datasets[0].strokeColor;
								        ctx.lineWidth = 1;
								        ctx.stroke();
									}}
								})}; 
							})
 
/*********************************************************/
/************SCREEN 11 VIEW CALORIC EXPENDITURE***********/
/*********************************************************/
var CaloricExpenditureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: whiteSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getCe"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.ce_app*100;
			var oldCaloricExpenditure = currentCaloricExpenditure;
			currentCaloricExpenditure = parseInt(temp);
			currentScreen.first.next.next.first.next.string = "Last Reading: "+currentCaloricExpenditure + " KCal";
			var d = new Date();
			var month = d.getMonth() + 1;
			var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
			ceChart.addData([currentCaloricExpenditure], s);
			if (ceChart.datasets[0].points.length >  5) { 
				ceChart.removeData(); 
			}
			var ctx = ceGraph.getContext("2d");
			var tail = ceChart.datasets[0].points.length - 1;
			ctx.beginPath();
	        ctx.moveTo(tail, oldCaloricExpenditure);
	        ctx.lineTo(ceChart.datasets[0].points.length, currentCaloricExpenditure);
	       	ctx.closePath();
	        ctx.strokeStyle = cedata.datasets[0].strokeColor;
	        ctx.lineWidth = 1;
	        ctx.stroke();
			
		}}
	})
}});

var btn_dataviz_caloricexpenditure = BUTTONS.Button.template(function($){ return{
	top: 5, bottom: 481, left: 5, right: 5, skin: $.skin, 
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			//new Picture({top: 0, bottom: 0, left: 0, right: 0, url: $.iconForLabel}),
			new Label({top: 0, bottom: 0, left: 5, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			oldScreen.first.next.next.first.remove(ceGraph);
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});

var cedata = {
    labels: ["KCal"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "black",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
    ]
};

var CaloricExpenditureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});

var ceChart = null;

var currentCaloricExpenditure = null;

var ceGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
						if (ceAdd == 0){
							ceChart = new Chart.klass(ceGraph).Line(cedata);
							ceChart.draw();
							ceAdd = 1;
						}
						else {
							ceChart.draw();
						}
						}},
						
					})
});

var ce = 0;

var ceAdd = 0;


var screen11 = exports.Screen11 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
			skin: silverSkin,
				contents:[
				new btn_dataviz_caloricexpenditure({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Container({top: 60, bottom: 440, right: 10, left: 10, skin: whiteSkin, 
					contents:[
							new Label({left:0, right:0, top: 0, bottom:0, string: "Caloric Expenditure", style: titleStyle}),
					]}),
				new Container({
					left:10, right:10, top:100, bottom:60,
					skin:whiteSkin, active: true,
					contents:[
							new CaloricExpenditureGraphContainer(),
							new Label({left:0, right:0, top:340, bottom:0, height:0, string: "Last Reading: "+currentCaloricExpenditure+" KCal", style:headerStyle}),
						]}),
				new Container({
					left:10, right:10, top:480, bottom:10,
					skin:whiteSkin, active : true,
					contents:[
							new CaloricExpenditureRefreshButton(),
						]}),
					], 
					behavior: Object.create(Behavior.prototype, {
									onDisplayed: { value: function(content) {
										content.invoke( new Message(deviceURL + "getCe"), Message.JSON );		
									}},
									onCreate: { value: function(content) {
										content.first.next.next.first.add(ceGraph);
									}},
									onComplete: { value: function(content, message, json){
										var temp = json.ce_app*100;
										var oldCaloricExpenditure = currentCaloricExpenditure;
										currentCaloricExpenditure = parseInt(temp);
										currentScreen.first.next.next.first.next.string = "Last Reading: "+currentCaloricExpenditure + " KCal";
										var d = new Date();
										var month = d.getMonth() + 1;
										var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
										ceChart.addData([currentCaloricExpenditure], s);
										if (ceChart.datasets[0].points.length >  5) { 
											ceChart.removeData(); 
										}
										var ctx = ceGraph.getContext("2d");
										var tail = ceChart.datasets[0].points.length - 1;
										ctx.beginPath();
								        ctx.moveTo(tail, oldCaloricExpenditure);
								        ctx.lineTo(ceChart.datasets[0].points.length, currentCaloricExpenditure);
								       	ctx.closePath();
								        ctx.strokeStyle = cedata.datasets[0].strokeColor;
								        ctx.lineWidth = 1;
								        ctx.stroke();
									}}
								})}; 
							})
/*********************************************************/
/************SCREEN 12 VIEW HEART RATE********************/
/*********************************************************/

var HeartRateRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: whiteSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getHR"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.hr_app*100;
			var oldHeartRate = currentHeartRate;
			currentHeartRate = parseInt(temp);
			currentScreen.first.next.next.first.next.string = "Last Reading: "+currentHeartRate + " BPM";
			var d = new Date();
			var month = d.getMonth() + 1;
			var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
			HRChart.addData([currentHeartRate], s);
			if (HRChart.datasets[0].points.length >  5) { 
				HRChart.removeData(); 
			}
			var ctx = HRGraph.getContext("2d");
			var tail = HRChart.datasets[0].points.length - 1;
			ctx.beginPath();
	        ctx.moveTo(tail, oldHeartRate);
	        ctx.lineTo(HRChart.datasets[0].points.length, currentHeartRate);
	       	ctx.closePath();
	        ctx.strokeStyle = HRdata.datasets[0].strokeColor;
	        ctx.lineWidth = 1;
	        ctx.stroke();
			
		}}
	})
}});

var btn_dataviz_heartrate = BUTTONS.Button.template(function($){ return{
	top: 5, bottom: 481, left: 5, right: 5, skin: $.skin, 
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
			//new Picture({top: 0, bottom: 0, left: 0, right: 0, url: $.iconForLabel}),
			new Label({top: 0, bottom: 0, left: 5, right: 0, string: $.textForLabel, style: titleStyle}),
		],
		})
	],	
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onCreate: { value: function(content){
			this.upSkin = $.skin;
			this.downSkin = $.darkSkin;
			this.nextScreen = $.nextScreen;
		}},
		onTouchBegan: { value: function(content){
			content.skin = this.downSkin;
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			content.skin = this.upSkin;
			var oldScreen = currentScreen; //store the old screen so we can use it in the transition
			currentScreen = new this.nextScreen; //make the new screen we want to transition to			
			//fire the transition between the oldScreen and the newScreen
			application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
			oldScreen.first.next.next.first.remove(HRGraph);
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});

var HRdata = {
    labels: ["BPM"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "black",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
    ]
};

var HeartRateGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});

var HRChart = null;

var currentHeartRate = null;

var HRGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
							if (HRAdd == 0){
								HRChart = new Chart.klass(HRGraph).Line(HRdata);
								HRChart.draw();
								HRAdd = 1;
							}
							else {
								HRChart.draw();
							}
						}},
						
					})
});

var HR = 0;

var HRAdd = 0;


var screen12= exports.Screen12 = Container.template(function($) 
	{ 
		return{ 
			left:0, right:0, top:0, bottom:0,
			skin: silverSkin,
				contents:[
				new btn_dataviz_heartrate({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen6}),
				new Container({top: 60, bottom: 440, right: 10, left: 10, skin: whiteSkin, 
					contents:[
							new Label({left:0, right:0, top: 0, bottom:0, string: "Heart Rate", style: titleStyle}),
					]}),
				new Container({
					left:10, right:10, top:100, bottom:60,
					skin:whiteSkin, active: true,
					contents:[
							new HeartRateGraphContainer(),
							new Label({left:0, right:0, top:340, bottom:0, height:0, string: "Last Reading: "+currentHeartRate+" BPM", style:headerStyle}),
						]}),
				new Container({
					left:10, right:10, top:480, bottom:10,
					skin:whiteSkin, active : true,
					contents:[
							new HeartRateRefreshButton(),
						]}),
					], 
					behavior: Object.create(Behavior.prototype, {
									onDisplayed: { value: function(content) {
										content.invoke( new Message(deviceURL + "getHR"), Message.JSON );		
									}},
									onCreate: { value: function(content) {
										content.first.next.next.first.add(HRGraph);
									}},
									onComplete: { value: function(content, message, json){
										var temp = json.hr_app*100;
										var oldHeartRate = currentHeartRate;
										currentHeartRate = parseInt(temp);
										currentScreen.first.next.next.first.next.string = "Last Reading: "+currentHeartRate + " BPM";
										var d = new Date();
										var month = d.getMonth() + 1;
										var s = ""+month+"/"+d.getDate()+", "+d.getHours()+":"+d.getMinutes();
										HRChart.addData([currentHeartRate], s);
										if (HRChart.datasets[0].points.length >  5) { 
											HRChart.removeData(); 
										}
										var ctx = HRGraph.getContext("2d");
										var tail = HRChart.datasets[0].points.length - 1;
										ctx.beginPath();
								        ctx.moveTo(tail, oldHeartRate);
								        ctx.lineTo(HRChart.datasets[0].points.length, currentHeartRate);
								       	ctx.closePath();
								        ctx.strokeStyle = HRdata.datasets[0].strokeColor;
								        ctx.lineWidth = 1;
								        ctx.stroke();
									}}
								})}; 
							})
/*********************************************************/
/************SCREEN 13 Second Sign Up Screen**********************/
/*********************************************************/

var screen13 = exports.Screen13 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, 
			contents: 
			[
				new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen0}),
				new Line({top: 5, bottom: 5, right: 10, left: 10, skin: whiteSkin,
					contents:[
						new Label({left: 90, string:"Sign Up", style:titleStyle, id : 'A'}),
					]}),
				new FIELDS.myField({name: "Physician ID"}),
				new FIELDS.myField({name: "Emergency Contact Name"}),
				new FIELDS.myField({name: "Emergency Contact #"}),
					
				new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "> Next", nextScreen : screen4}),	
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 14 CONFIGURE DEVICES Screen***********/
/*********************************************************/	
var screen14 = exports.screen14 = Column.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, active:true,
			contents: 
			[
			new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen4}),
			new Column({ //pill button, name, amount
				left:10, right:10, top:0, bottom:0, active : false,
				skin : whiteSkin,
				contents:[
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Configure", style: titleStyle}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Existing Devices", style: titleStyle}),
				]				
				}),					
			new Column({ //use
				left:10, right:10, top: 10, bottom: 10, active : true,
				skin: greenSkin, downSkin : greenPressSkin, upSkin : greenSkin,
				contents:[
						/*new Label({top: 0, bottom: 0, left: 10, right: 10, string:"A&D Blood", style: headerStyle}),
						new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Pressure Monitor", style: headerStyle}),
						new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Bluetooth Enabled BP monitor", style: textStyle}),
						*/
						new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Fitbit", nextScreen : screen15}),
						],
				}),
						
			new Column({ //frequency
				left:10, right:10, top: 10, bottom: 10,
				skin:greenSkin, active : true,
				contents:[
					/*new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Fitbit Surge", style: headerStyle}),
					new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Activity Tracker", style: textStyle}),
					*/
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Pyle Bluetooth Thermometer", nextScreen : screen15}),
						],						
						}),
						
			new Column({ //side effects
				left:10, right:10, top: 10, bottom: 10,
				skin:greenSkin, active : true,
				contents:[
					/*new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Pyle Thermometer", style: headerStyle}),
					new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Bluetooth Enabled Thermometer", style: textStyle}),
					*/
					new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "A&D Blood Pressure Monitor", nextScreen : screen15}),
						],				
				}),		
			], 
		}
	});
	
/*********************************************************/
/************SCREEN 15 CONFIGURE DEVICES Screen***********/
/*********************************************************/		
var screen15 = exports.screen15 = Column.template(function($) 
	{ 
		return{
		left:0, right:0, top:0, bottom:0, skin: silverSkin,
		active : true,
		behavior: Object.create(Column.prototype, {		
			onTouchEnded: { 
				value: function(content){
				trace("Touched\n");
				KEYBOARD.hide();
				content.focus();
				}
			}}),		
		contents:[
			new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen14}),
			new Column({ //pill button, name, amount
				left:10, right:10, top:0, bottom:0, active : false,
				skin : whiteSkin,
				contents:[
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Configure:", style: titleStyle}),
					new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Fitbit", style: titleStyle}),
				]				
				}),					
			new Column({ //use
				left:10, right:10, top: 10, bottom: 0, active : false,
				skin: greenSkin, 
						contents:[
								new FIELDS.myField({name : "Tap to Enter Frequency"/*, top : 20,string : "Enter the sychronization Frequency"*/}),
						],
				}),
			new Column({ //use
				left:10, right:10, top: 10, bottom: 0, active : false,
				skin: greenSkin, 
						contents:[
								new FIELDS.myField({name : "Tap to Enter Threshold"/*, top : 20,string : "Alert if under"*/}),
						],
				}),			
			]
}});

/*********************************************************/		
/********SCREEN 16 MEDICATION INFORMATION SCREEN*******  */		
/*********************************************************/		
var pillsLabel1 = exports.pillsLabel1 = new Label({top: 0, bottom: 0, left: 75, right: 0, string:"Amount left:" +  tablet1 +"%", style: textStyle, skin:greenSkin}),
//var buyPillButton1 = exports.buyPillButton1 = new BTNTOAST.btnToast({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Buy Pill 1", nextScreen : screen16}),					
var pillsLabel2 = exports.pillsLabel2 = new Label({top: 0, bottom: 0, left: 75, right: 0, string:"Amount left:" +  tablet2 +"%", style: textStyle}),		
//var buyPillButton2 = exports.buyPillButton2 = new BTNTOAST.btnToast({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Buy Pill 2", nextScreen : screen16}),
		
var screen16 = exports.Screen16 = Column.template(function($) 		
	{ 		
		return{ 		
				left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, 		
				contents: 		
				[		
					//SCROLLER.VerticalScroller($, 
					//{
						//contents:[
							new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen7}),
							new Column({ //pill button, name, amount		
								left:10, right:10, top:0, bottom:0,		
								skin:whiteSkin,		
								contents:[		
									new Picture({right: 0, left: 0, top: 0, bottom: 0, height: 20, url: "pill.png"}),		
									new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Spironolactone", style: titleStyle}),
							]}),							
							new Column({ //use		
								left:10, right:10, top: 10, bottom: 0,		
								skin: whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Treatment", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"low blood pressure and swelling", style: textStyle}),		
							]}),		
							new Column({ //frequency		
								left:10, right:10, top: 10, bottom: 0,		
								skin:whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Frequency to Take", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"every morning by mouth with food", style: textStyle}),		
							]}),				
							new Column({ //side effects		
								left:10, right:10, top: 10, bottom: 0,		
								skin:whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Side Effects", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"drowsiness, nausea", style: textStyle}),		
							]}),			
							new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Refill Prescription", nextScreen : screen4}),
							//SCROLLER.VerticalScrollbar($, { }),
						//]}),						
				], 		
			}		
	});
	
/*********************************************************/
/************SCREEN 17 Tablet 1 more info screen *********/
/*********************************************************/

var screen17 = exports.Screen17 = Column.template(function($) 		
	{ 		
		return{ 		
				left: 0, right: 0, top: 0, bottom: 0, skin: silverSkin, 		
				contents: 		
				[		
					//SCROLLER.VerticalScroller($, 
					//{
						//contents:[
							new BTN.btn({skin: blueSkin, darkSkin: bluePressSkin, textForLabel: "< Back", nextScreen : screen7}),
							new Column({ //pill button, name, amount		
								left:10, right:10, top:0, bottom:0,		
								skin:whiteSkin,		
								contents:[		
									new Picture({right: 0, left: 0, top: 0, bottom: 0, height: 20, url: "pill.png"}),		
									new Label({left: 0, right: 0, top: 0, bottom: 0, string:"Spironolactone", style: titleStyle}),
							]}),							
							new Column({ //use		
								left:10, right:10, top: 10, bottom: 0,		
								skin: whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Treatment", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"low blood pressure and swelling", style: textStyle}),		
							]}),		
							new Column({ //frequency		
								left:10, right:10, top: 10, bottom: 0,		
								skin:whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Frequency to Take", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"every morning by mouth with food", style: textStyle}),		
							]}),				
							new Column({ //side effects		
								left:10, right:10, top: 10, bottom: 0,		
								skin:whiteSkin,		
								contents:[		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"Side Effects", style: headerStyle}),		
									new Label({top: 0, bottom: 0, left: 10, right: 10, string:"drowsiness, nausea", style: textStyle}),		
							]}),			
							new BTN.btn({skin: greenSkin, darkSkin: greenPressSkin, textForLabel: "Refill Prescription", nextScreen : screen4}),
							//SCROLLER.VerticalScrollbar($, { }),
						//]}),						
				], 		
			}		
	});
	
	
/*********************************************************/
/************Handlers to get messages from the hw*********/
/*********************************************************/
	
Handler.bind("/sendAlertTablet1Changed", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that tablet1 changed. Get tablet\n");
		var query = parseQuery( message.query );
		tablet1 = query.tablet1 * 100;
		trace("*******got tablet1 = " + tablet1 + "from hardware\n");
		var oldScreen = currentScreen;
		currentScreen = new screen7;		
		application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
		
	}
}));

Handler.bind("/sendAlertTablet2Changed", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that tablet2 changed. Get tablet\n");
		var query = parseQuery( message.query );
		tablet2 = query.tablet2 * 100;		
		var oldScreen = currentScreen;
		currentScreen = new screen7;
		application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 100});
		trace("*******got tablet2 = " + tablet2 + "from hardware\n");
	}
}));


Handler.bind("/sendAlertTimeChanged", Behavior({
	onInvoke: function(handler, message){
		trace("Alert received that tablet2 changed. Get tablet\n");
		var query = parseQuery( message.query );
		var time = query.time
		trace("*******got time = " + time + "from hardware\n");
	}
}));


	
