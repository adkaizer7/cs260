// KPR Script file
exports.SignUpScreen = BUTTONS.Button.template(function($){ 
	return{
		left: 10, 
		right: 10, 
		bottom:10,
		top: 10, 
		opacity : 0,
		skin : greenSkin,
		contents: [
					Container($, 
						{ 
							   left: 0, right: 0, bottom: 0, top: 0, active: true, 
							   skin: whiteSkin, 
							   behavior: Object.create((MainScreen.behaviors[2]).prototype), 
							   contents: 
							   [
									Label($, 
									{ 
										left: 0, right: 0, top: 0, bottom: 0, style: titleStyle, skin:greenSkin, 
									    string: 'New? Sign Up', 
									}),									
								], 
						}),
					
				 ],			
		}
	}
);
  