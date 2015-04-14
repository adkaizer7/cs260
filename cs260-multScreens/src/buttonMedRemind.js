exports.MedRemind = BUTTONS.Button.template(function($){ 
	return{
		left: 40, 
		right: 40, 
		height:40,
		opacity : 0,
		skin : greenSkin,
		contents: [
					Container($, 
						{ 
							   left: 0, right: 0, height: 40, bottom: 0, active: true, 
							   skin: whiteSkin, 
							   //NOT SURE IF IT SHOULD BE 3
							   behavior: Object.create((MainScreen.behaviors[3]).prototype), 
							   contents: 
							   [
									Label($, 
									{ 
										left: 0, right: 0, top: 0, bottom: 0, style: buttonStyle, 
									    string: 'Medicine Reminders', 
									}),									
								], 
						}),
					
				 ],			
		}
	}
);
  
