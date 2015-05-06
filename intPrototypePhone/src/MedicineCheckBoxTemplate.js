// KPR Script file
exports.MedicineCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0, style: textStyle,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	takenTablet1 = true;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        	//trace("Got tablet1 here\n");
        	if ($.tablet == "Tablet1")
        	{
        		application.behavior.openDialogBox(ToastTablet1);
        	}else if ($.tablet == "Tablet2")
        	{
        		application.behavior.openDialogBox(ToastTablet2);
        	}
        	application.invoke(new Message("/ToastTime?tablet=" + $.tablet));
            
        }},
        onUnselected: { value:  function(checkBox){
        	takenTablet1 = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});
