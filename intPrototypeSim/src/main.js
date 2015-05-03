//@program
deviceURL = "";

var titleStyle = new Style({font:"50px Avenir Heavy", color:"black", horizontal: 'center'});
var headerStyle = new Style({font:"25px Avenir", color:"black", horizontal: 'center'});

var whiteSkin = new Skin( { fill:"white" } );


/**************************************************************************/
/**********Handlers********************************************************/
/**************************************************************************/

/*****Initiate Messages*****/
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		trace("Found App " + deviceURL + "\n");
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

/*******************************************/
/************On receive data***************/
/*******************************************/

Handler.bind("/refillbloodSugar", Behavior({
	onInvoke: function(handler, message){
		trace("Received command to fill bloodSugar\n");
		bloodSugar = 100;	
	}
}));

Handler.bind("/refillBp", Behavior({
	onInvoke: function(handler, message){
		trace("Received command to fill bp\n");
		bp = 100;
	}
}));





/*******************************************/
/************Sending Data To Server*********/
/*******************************************/
Handler.bind("/getbloodSugar", Behavior({
	onInvoke: function(handler, message){	
		trace("bloodSugar sim = " + bloodSugar + "\n");
		message.responseText = JSON.stringify({bloodSugar_app:bloodSugar});
		message.status = 200;
	}
}));

Handler.bind("/getBp", Behavior({
	onInvoke: function(handler, message){	
		trace("bp sim = " + bp + "\n");
		message.responseText = JSON.stringify( {bp_app:bp});
		message.status = 200;
	}
}));

Handler.bind("/getHR", Behavior({
	onInvoke: function(handler, message){	
		message.responseText = JSON.stringify( {hr_app:hr});
		message.status = 200;
	}
}));


Handler.bind("/getCe", Behavior({
	onInvoke: function(handler, message){	
		message.responseText = JSON.stringify( {ce_app:ce});
		message.status = 200;
	}
}));

Handler.bind("/getMed", Behavior({
	onInvoke: function(handler, message){	
		message.responseText = JSON.stringify( {med_app:med});
		message.status = 200;
	}
}));


Handler.bind("/getCount", Behavior({
	onInvoke: function(handler, message){
		count++;
		//message.responseText = JSON.stringify( { count: count } );
		message.responseText = JSON.stringify( { bloodSugar_app:bloodSugar,
												 bp_app:bp,
												 hr_app: hr});
		message.status = 200;
	}
}));

Handler.bind("/getParameters", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( { bloodSugar_app:bloodSugar,
												 bp_app:bp,
												 hr_app: hr});
		message.status = 200;
	}
}));

/*******************************************/
/***Communication With Hardware****/
/*******************************************/
Handler.bind("/potResult", Object.create(Behavior.prototype, {
//@line 27
	onInvoke: { value: function( handler, message ){
				application.distribute( "receiveReading", message.requestObject );
			}}
}));


/**************************************************************************/
/**********Layout**********************************************************/
/**************************************************************************/
var MainContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, }});

var MainCanvas = Canvas.template(function($) { 
	return { 
		left: 10, 
		right: 10, 
		top: 10, 
		bottom: 10, 
		behavior: Object.create((MainCanvas.behaviors[0]).prototype),
		visible : false, 
		}
	});
	
bloodSugar = 1;
oldbloodSugar = 1;
bp = 1;
oldBp = 1;
hr = 1;
oldHr = 1;
count = 0;
ce = 1;
oldCe = 1;
med = 1;
oldMed = 1;	

MainCanvas.behaviors = new Array(1);
MainCanvas.behaviors[0] = Behavior.template({
//@line 50
	onDisplaying: function(content) {
		this.canvas = content;
            	this.newPoint = true;
            	this.lastX = false;
            	//start asking for readings once the canvas is loaded 
				application.invoke( new MessageWithObject( "pins:/potentiometers/read?repeat=on&callback=/potResult&interval=2000" ) );
                
	},
//@line 69
	receiveReading: function(params, data) {
		bloodSugar = data.bloodSugar;
		bp = data.bp;
		hr = data.hr;
		ce = data.ce;
		med = data.med;
		//trace("bloodSugar : " + bloodSugar + " bp " + bp + "\n");
		heartRateLabel.string = "Heart Rate = " + parseInt(hr*200) + " bpm";		
		bloodSugarLabel.string = "Blood Sugar = " + parseInt(bloodSugar*100) + " mmol/L";
		bpLabel.string = "Blood Pressure = " + parseInt(bp*100) + " Hg";
		ceLabel.string = "Caloric Expenditure = " + parseInt(ce*100) + " kcal";
		medLabel.string = "Medication Left = " + parseInt(med*100) + "%";        
        if(Math.abs(bloodSugar - oldbloodSugar) > .1){
        	oldbloodSugar = bloodSugar;
        	if (deviceURL != "") {
				trace("bloodSugar was taken\n");
				application.invoke(new Message(deviceURL + "sendAlertTempChanged"), Message.JSON);
				
			}				       	
        }
        if(Math.abs(bp - oldBp) > .1){
        	oldBp = bp;
        	if (deviceURL != ""){
				trace("bp was drunk\n");        	        	 
				application.invoke(new Message(deviceURL + "sendAlertBpChanged"), Message.JSON);
			}       	
        }
	    if(Math.abs(ce - oldCe) > .1){
	    	oldCe = ce;
	    	if (deviceURL != ""){
				trace("ce was changed\n");        	        	 
				application.invoke(new Message(deviceURL + "sendAlertCeChanged"), Message.JSON);
			}       	
        }
      	if(Math.abs(med - oldMed) > .1){
	    	oldMed = med;	    	
	    	if (deviceURL != ""){
				trace("med was changed\n");        	        	 
				application.invoke(new Message(deviceURL + "sendAlertMedChanged"), Message.JSON);
			}       	
        }
        //if((hr < .25) &&( hr != oldHr)){
        if(( hr != oldHr)){
        	oldHr = hr;
        	if (deviceURL != ""){        	 
				application.invoke(new Message(deviceURL + "sendAlertHR"), Message.JSON);
			}       	
        }        
                
	},
})
//@line 124
var mainCanvas = new MainCanvas();

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {		
		application.shared = true;
		application.discover("intprototypephone");
		application.discover("medinfo");
	},
	onQuit: function(application) {
		application.shared = false;
		application.forget("intprototypephone");
		application.forget("medinfo");
	},	
	onDisplayed: function(application) {
		//application.discover("temp");
		
	},
	
})

var bloodSugarLabel  = new Label({left:0, right:0, height:40, style: headerStyle,skin: whiteSkin,
                            string : "bloodSugar = " + parseInt(bloodSugar*100) + "F"});
var bpLabel = new Label({left:0, right:0, height:40, style: headerStyle,skin: whiteSkin,
 							string : "Blood Pressure = " + parseInt(bp*100) + "Hg"});

var heartRateLabel = new Label({left:0, right:0, height:40, style: headerStyle,skin: whiteSkin,
 							string : "Heart Rate = " + parseInt(hr*200) + "bpm"});

var ceLabel = new Label({left:0, right:0, height:40, style: headerStyle,skin: whiteSkin,
 							string : "Caloric Exp = " + parseInt(ce*200) + "kcal"});

var medLabel = new Label({left:0, right:0, height:40, style: headerStyle,skin: whiteSkin,
 							string : "Medication = " + parseInt(med*200) + "%"});
							  




var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	contents: [
		new Picture({url: "SanitasLogo.png", height: 80}),
		bloodSugarLabel,
		bpLabel,
		heartRateLabel,
		ceLabel,
		medLabel			
	],
	behavior: Behavior({
		onTouchEnded: function(content){
			if (deviceURL != "") 
				content.invoke(new Message(deviceURL + "getParameters"), Message.JSON);
				//content.invoke(new Message(deviceURL + "getCount"), Message.JSON);
		},
		onComplete: function(content, message, json){
			bloodSugarLabel.string = "bloodSugar = " + json.bloodSugar_app + "Blood Pressure = " + json.bp_app + "Pulse = " + json.hr_app;			
			//bloodSugarLabel.string = json.count;
		}	
	})
});


application.behavior = new ApplicationBehavior();
application.add( mainColumn );
application.add( mainCanvas );

application.invoke( new MessageWithObject( "pins:configure",{
    	potentiometers: {
        	require: "potentiometers",
        	pins: {
				bloodSugar: { pin: 61 },
				bp: { pin: 53 },
				hr : {pin: 44},
				ce : {pin: 33},
				med : {pin : 23},
        	}
    	}     
    }
   ));
   
  

   
   