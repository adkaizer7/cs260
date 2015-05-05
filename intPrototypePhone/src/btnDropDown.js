// KPR Script file
var TRANSITIONS = require('transitions');

exports.btnDropDown = Container.template(function($){ return{
	top: 0, bottom: 0, left: 0, right: 0, skin: dropDownBoxOptionsSkin, active: true,
	width : 50,
	contents: [
		new Column({top: 5, bottom: 5, right: 5, width : 100,
			contents:[
				new Label({top: 0, bottom: 0, left: 0, right: 0, string: $.textForLabel, style: textStyle}),
			]
		}),
	],	
	behavior: Behavior({
		onTouchEnded: function(content){
			application.remove($.close);			
			AAAdropDownMenuPressed.first.string = $.textForLabel;
			if ($.object == "Units")
			{
				dropDownUnits = $.textForLabel;
			}
		},
		onCreate : function(content){
			this.close = $.close;
			this.object = $.object;
			this.textForLabel = $.textForLabel;
		}
	})
}});
