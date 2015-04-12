/*********************************************************/
/************Configure/Add/View Data**********************/
/*********************************************************/
exports.Screen0 = Container.template(function($) 
	{ 
		return{ 
			left: 0, right: 0, top: 0, bottom: 80, skin: blueSkin, 
			contents: 
			[
				new Label({string:"Welcome Danny!", style:buttonStyle}),
				new CONFIGURE_EXISTING_DEVICE.ConExiDev(),
				new ADD_NEW_DEVICE.AddNewDev(),				
				new VIEWDATA.VieDat(),			
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
