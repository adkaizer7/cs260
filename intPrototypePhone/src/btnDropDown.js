// KPR Script file
var TRANSITIONS = require('transitions');

exports.btnDropDown = Container.template(function($){ return{
top: 5, bottom: 5, left: 5, right: 5, skin: graySkin, active: true,
	contents: [
		new Column({top: 5, bottom: 5, right: 5, left: 5,
			contents:[
				new Label({top: 0, bottom: 0, left: 0, right: 0, string: $.textForLabel, style: buttonSmallStyle}),
			]
		}),
	],	
	behavior: Behavior({
		onTouchEnded: function(content){
			application.remove($.close);
			//currentScreen.first.next.next.first.first.first.string = $.textForLabel;
			//currentScreen.first.next.next.first.first.string = $.textForLabel;
			//dropDownMenuPressed.first.string = $.textForLabel;
			//trace($.textForLabel);
			//application.add(new DropDownMenu({object : "Units", label : "Hours"}));
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
