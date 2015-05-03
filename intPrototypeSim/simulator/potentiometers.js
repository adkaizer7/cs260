//@module
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Health Monitoring", 
				name : "Analog Inputs", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Blood Sugar",
						valueID : "bloodSugar",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.3,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Blood Pressure",
						valueID : "bp",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Heart Rate",
						valueID : "hr",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),				
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Caloric Expenditure",
						valueID : "ce",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Medication",
						valueID : "med",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				
			]
		});
}
//@line 49
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 53
var read = exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}
//@line 58
exports.pins = {
			bloodSugar: { type: "A2D" },
			bp: { type: "A2D" },
			hr:{ type: "A2D" },
			ce:{ type:"A2D"},
			med:{ type:"A2D"},
		};