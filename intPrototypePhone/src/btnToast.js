exports.btnToast = BUTTONS.Button.template(function($){ return{
	top: 10, bottom: 10, left: 10, right: 10, skin: greenSkin,
	downSkin : greenPressSkin, visible : $.visibility,
	contents: [
		new Line({top: 0, left: 0, right: 0, bottom: 0, contents: [
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
			trace("backButton was tapped.\n");
		}},
		onTouchEnded: { value: function(content){
			application.behavior.openDialogBox(new DIALOGBOX.DialogBoxTemplate({line1 : "Tablet1 Ordered", line2: "Will be shipped in 2 days", skin: greenSkin}));
		}},
		onComplete: { value: function(content, message, json){
		}},
	})
}});


// KPR Script file
// KPR Script file
