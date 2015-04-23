// KPR Script file
exports.LoginScreen = BUTTONS.Button.template(function($){ 
	return{
		left: 40, 
		right: 40, 
		height:40,
		bottom:120,
		opacity : 0,
		skin : greenSkin,
		contents: [
					Container($, 
						{ 
							   left: 0, right: 0, height: 40, bottom: 0, active: true, 
							   skin: whiteSkin, 
							   behavior: Object.create((MainScreen.behaviors[1]).prototype), 
							   contents: 
							   [
									Label($, 
									{ 
										left: 0, right: 0, top: 0, bottom: 0, style: textStyle, skin:greenSkin, 
									    string: 'Returning User? Login', id : 1, 
									}),									
								], 
						}),
					
				 ],			
		}
	}
);
  