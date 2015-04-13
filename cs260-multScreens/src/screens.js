/*********************************************************/
/************Configure/Add/View Data**********************/
/*********************************************************/
exports.Screen0 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 0, skin: blackSkin, 
			contents: 
			[
				new Line({top: 0, bottom: 415, right: 0, left: 0, skin: yellowSkin,
				contents:[
					new BackButton(),
					new Picture({left:20, right:0, top:0, bottom:0, url:"dataviz.png"}),
					new Label({top: 0, bottom: 0, left: 0, right: 90, string:"Welcome!", style: buttonStyle}),
				]}),

				new Column({left:0, right:0, bottom: 60, top: 120, skin: whiteSkin,
				contents:[
					new CONFIGURE_EXISTING_DEVICE.ConExiDev(),
					new ADD_NEW_DEVICE.AddNewDev(),				
					new VIEWDATA.VieDat(),
					new MEDICATION.MedRemind(),				
				]}),

				new Line({left:0, right:0, bottom: 0, top: 450, skin: blueSkin,
				contents:[
							new Label({top: 0, bottom: 0, left: 0, right: 90, string:"Hi!", style: buttonStyle}),
				]}),
			], 
		}
	});
			

	
/*********************************************************/
/************Discovering Devices**********************/
/*********************************************************/

exports.Screen1 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: yellowSkin, 
			contents: 
			[
				new Label({string:"Discovering devices", style:buttonStyle, id : 'A'}),
				new Label({String:"Back",texture:"back.png", skin:greenSkin, id: 'B'}),				
				new BLUETOOTH_TEMP_DEVICE.BluTemDev(),				
				new BLUETOOTH_BP_DEVICE.BluBPDev(),			
			], 
		}
	});

/*********************************************************/
/************Setting up temperature**********************/
/*********************************************************/	
exports.Screen2 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: yellowSkin, 
			contents: 
			[
				new Label({string:"Choose Frequency", style:buttonStyle}),
				new Label({String:"Alert if over", skin:greenSkin}),				
				new COMPLETE_CONFIG.CompConfig(),				
				new BLUETOOTH_BP_DEVICE.BluBPDev(),			
			], 
		}
	});

/*********************************************************/
/************Medication Reminders*************************/
/*********************************************************/
exports.Screen3 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: yellowSkin, 
			contents: 
			[
				new Label({string:"Choose Frequency", style:buttonStyle}),
				new Label({String:"Alert if over", skin:greenSkin}),				
				new COMPLETE_CONFIG.CompConfig(),				
				new BLUETOOTH_BP_DEVICE.BluBPDev(),			
			], 
		}
	});