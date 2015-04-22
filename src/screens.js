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
/************Login Screen**********************/
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
/************Sign Up Screen**********************/
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


