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
						valueLabel : "Blood Pressure, Systolic",
						valueID : "bp",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Blood Pressure, Diastolic",
						valueID : "bp_dia",
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
						valueLabel : "Medication - Tablet 1",
						valueID : "tablet1",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Medication - Tablet2",
						valueID : "tablet2",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 1.0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Time",
						valueID : "time",
						defaultControl : PinsSimulators.SLIDER,
						speed : 0.25,
						value : 0.0
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
			bp_dia: {type: "A2D" },
			hr:{ type: "A2D" },
			ce:{ type:"A2D"},
			tablet1:{ type:"A2D"},
			tablet2:{ type:"A2D"}, 
			time:{ type:"A2D"}, 
		};