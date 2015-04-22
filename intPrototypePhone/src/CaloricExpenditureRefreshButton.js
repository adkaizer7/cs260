// KPR Script file
exports.CaloricExpenditureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			if (needed != null) {
				CaloricExpenditureScreen.first.next.first.first.behavior.refresh(needed);
			}
		}},
		onComplete: { value: function(content, message, json){
			trace("wtf");
		}}
	})
}});