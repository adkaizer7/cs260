//@program
deviceURL = "";

var labelStyle = new Style( { font: "bold 30px", color:"black" } );
var titleStyle = new Style( { font: "bold 40px", color:"black" } );
var whiteSkin = new Skin( { fill:"white" } );
var temperatureStyle = new Style( { font: "bold 20px", color:"black" } );
var bpStyle = new Style( { font: "bold 20px", color:"black" } );
var ceStyle = new Style( { font: "bold 20px", color:"black" } );


var hungryTexture = new Texture("./hungry.jpg");
var fullTexture = new Texture("./full.jpg");
var hungrySkin = new Skin({ texture: hungryTexture, x:0, y:0, width:200, height:200, states:200 });
var fullSkin = new Skin({ texture: fullTexture, x:0, y:0, width:200, height:200, states:200 });


/**************************************************************************/
/**********Handlers********************************************************/
/**************************************************************************/

/*****Initiate Messages*****/
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		trace("Found App\n");
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

Handler.bind("/refillTemperature", Behavior({
	onInvoke: function(handler, message){
		trace("Received command to fill temperature\n");
		temperature = 100;
		hungryHolder.visible = false,
		fullHolder.visible = true;
		//for (i = 0; i < 10000; i++){
			//Loop
			//for (j = 0; j < 10000; j++){
			//}
		//}
		//fullHolder.visible = false;		
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
Handler.bind("/getTemperature", Behavior({
	onInvoke: function(handler, message){	
		trace("temperature sim = " + temperature + "\n");
		message.responseText = JSON.stringify({temperature_app:temperature});
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


Handler.bind("/getCount", Behavior({
	onInvoke: function(handler, message){
		count++;
		//message.responseText = JSON.stringify( { count: count } );
		message.responseText = JSON.stringify( { temperature_app:temperature,
												 bp_app:bp,
												 hr_app: hr});
		message.status = 200;
	}
}));

Handler.bind("/getParameters", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( { temperature_app:temperature,
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
	
temperature = 1;
oldTemperature = 1;
bp = 1;
oldBp = 1;
hr = 1;
oldHr = 1;
count = 0;
ce = 1;
oldCe = 1;
	

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
		temperature = data.temperature;
		bp = data.bp;
		hr = data.hr;
		ce = data.ce;
		//trace("temperature : " + temperature + " bp " + bp + "\n");
		heartRateLabel.string = "Heart Rate = " + parseInt(hr*200) + "bpm";		
		temperatureLabel.string = "temperature = " + parseInt(temperature*100) + " F";
		bpLabel.string = "Blood Pressure = " + parseInt(bp*100) + " Hg";
		ceLabel.string = "Caloric Expenditure = " + parseInt(ce*100) + " kcal";
        
        if(Math.abs(temperature - oldTemperature) > .1){
        	oldTemperature = temperature;
        	if (deviceURL != "") {
				trace("temperature was taken\n");
				application.invoke(new Message(deviceURL + "sendAlertTempChanged"), Message.JSON);
				if (temperature < .2){
					hungryHolder.visible = true;
				}
				else{
					hungryHolder.visible = false;
				}
				
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
		application.duration
	},
	onQuit: function(application) {
		application.shared = false;
		application.forget("intprototypephone");
	},	
	onDisplayed: function(application) {
		application.discover("intprototypephone");
	},
	
})

var hungryHolder = new Picture({top : 40, bottom : 20, right : 20, left: 20, 
							  url:"./hungry.jpg", visible : false});
							  
var fullHolder = new Picture({top : 40, bottom : 20, right : 20, left: 20, 
							  url:"./full.jpg", visible : false});
							  							  
var temperatureLabel  = new Label({left:0, right:0, height:40, style: temperatureStyle,skin: whiteSkin,
                            string : "temperature = " + parseInt(temperature*100) + "F"});
var bpLabel = new Label({left:0, right:0, height:40, style: bpStyle,skin: whiteSkin,
 							string : "Blood Pressure = " + parseInt(bp*100) + "Hg"});

var heartRateLabel = new Label({left:0, right:0, height:40, style: bpStyle,skin: whiteSkin,
 							string : "Heart Rate = " + parseInt(hr*200) + "bpm"});

var ceLabel = new Label({left:0, right:0, height:40, style: ceStyle,skin: whiteSkin,
 							string : "Caloric Exp = " + parseInt(ce*200) + "kcal"});

							  




var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	contents: [
		new Label({left:0, right:0, height:40, string:"PetCheck!", style: titleStyle}),
		temperatureLabel,
		bpLabel,
		heartRateLabel,
		ceLabel			
	],
	behavior: Behavior({
		onTouchEnded: function(content){
			if (deviceURL != "") 
				content.invoke(new Message(deviceURL + "getParameters"), Message.JSON);
				//content.invoke(new Message(deviceURL + "getCount"), Message.JSON);
		},
		onComplete: function(content, message, json){
			temperatureLabel.string = "temperature = " + json.temperature_app + "Blood Pressure = " + json.bp_app + "Pulse = " + json.hr_app;			
			//temperatureLabel.string = json.count;
		}	
	})
});


application.behavior = new ApplicationBehavior();
application.add( mainColumn );
application.add( mainCanvas );
application.add( hungryHolder );
application.add( fullHolder );

application.invoke( new MessageWithObject( "pins:configure",{
    	potentiometers: {
        	require: "potentiometers",
        	pins: {
				temperature: { pin: 61 },
				bp: { pin: 53 },
				hr : {pin: 44},
				ce : {pin: 33}
        	}
    	}     
    }
   ));
   
  

   
   