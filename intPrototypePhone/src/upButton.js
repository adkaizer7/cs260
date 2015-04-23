// KPR Script file
exports.upButton = BUTTONS.Button.template(function($){ return{
	height:30, width: 50, skin: whiteSkin, 
	left:$.left, right : $.right, top : $.top,
	contents: [
		new Picture({left:0, right:0, top:0, bottom:0, url:"addButton.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content){
			trace("upButton was tapped.\n");
			if ($.hour == true)
			{
				remHr = remHr + 1;
				remHr = remHr % 12;
				remHrLabel.string = remHr;
				trace("remHr =" + remHr + " \n");
			}
			else
			{
				remMin = remMin + 1;
				remMin = remMin % 60;
				remMinLabel.string = remMin;
				trace("remMin =" + remMin + " \n");
			}
			
		}},
	})
}});