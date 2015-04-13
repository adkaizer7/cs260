//@module
//@line 17 "/Users/adarshmani/berkeley/CS260A/workspace/Analog Drawing Toy/src/tempAccel.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Accelerometer", 
				name : "3 Analog Inputs", 
				iconVariant : PinsSimulators.SENSOR_MODULE 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "X",
						valueID : "x",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Y",
						valueID : "y",
						speed : 0.05
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Z",
						valueID : "z",
						speed : 0.05
					}
				),
			]
		});
}
//@line 54
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 58
var read = exports.read = function() {
	return this.pinsSimulator.delegate("getValue");
}
//@line 63
exports.pins = {
			x: { type: "A2D" },
			y: { type: "A2D" },
			z: { type: "A2D" }
		};