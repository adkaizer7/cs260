var Chart = require('modules/chart.js');

var tempChart = null;

var currentTemp = null;

var tempGraph = new Canvas({left:0,right:0,bottom:50,top:0,
					behavior: Object.create(Behavior.prototype, {
						onDisplaying: { value: function(canvas) {
							tempChart = new Chart.klass(tempGraph).Line(data);
							tempChart.draw();
						}},
				
					})
});

var sw = 0;

var TemperatureBackButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left: 0, right:290, skin: topSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"back.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			application.behavior.switchScreen(ViewDataScreen);
		}},
	})
}});

var TemperatureRefreshButton = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:135, right:136, skin: bottomSkin,
	contents:[
		new Picture({left:0, right:0, top:0, bottom:0, url:"refresh.png"}),
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(content){
			content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );		
			}},
		onComplete: { value: function(content, message, json){
			var temp = json.temperature_app*100;
			currentTemp = parseInt(temp);
			TemperatureScreen.first.next.first.next.string = currentTemp + " degrees Celsius";
			if (sw == 1) {
				data.datasets[0].data[0] = data.datasets[0].data[sw]
				data.datasets[0].data[sw] = temp;
				sw = 0;
			}
			else {
				data.datasets[0].data[1] = temp;
				sw = 1;
			}
			tempChart = new Chart.klass(tempGraph).Line(data);
			tempChart.draw();
		}}
	})
}});

var data = {
    labels: ["degrees C"],
    datasets: [
        {
            label: "1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, 0]
        },
    ]
};

var TemperatureGraphContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0,
														contents: [
														],
												 }});


var TemperatureScreen = new Container({
	left:0, right:0, top:0, bottom:0,
	contents:[
		new Container({
			left:0, right:0, top:0, bottom:487,
			skin:topSkin,
			contents:[
				new TemperatureBackButton(),
				new Label({left:0, right:0, top: 0, bottom:0, height:0, string: "Temperature", style:titleStyle}),
				new Picture({left:270, right:0, top:0, bottom:0, url:"dataviz.png"}),
			]}),	
		new Container({
			left:0, right:0, top:50, bottom:50,
			skin:middleSkin,
			contents:[
				new TemperatureGraphContainer(),
				new Label({left:0, right:170, top:400, bottom:0, height:0, string: "Last Reading: "+currentTemp, style:labelStyle}),
			]}),
		new Container({
			left:0, right:0, top:487, bottom:0,
			skin:bottomSkin,
			contents:[
				new TemperatureRefreshButton(),
			]}),
], behavior: Object.create(Behavior.prototype, {
						onDisplayed: { value: function(content) {
							content.invoke( new Message(deviceURL + "getTemperature"), Message.JSON );		
						}},
						onComplete: { value: function(content, message, json){
							var temp = json.temperature_app*100;
							currentTemp = parseInt(temp);
							TemperatureScreen.first.next.first.next.string = currentTemp + " degrees Celsius";
							if (sw == 1) {
								data.datasets[0].data[0] = data.datasets[0].data[sw]
								data.datasets[0].data[sw] = temp;
								sw = 0;
							}
							else {
								data.datasets[0].data[1] = temp;
								sw = 1;
							}
							tempChart = new Chart.klass(tempGraph).Line(data);
							tempChart.draw();
						}}
				
					})});// KPR Script file
