// KPR Script file
exports.ApptNightCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	AppttakenNightMedicine = true;
        	AlertLabel.string = "nothing for now";        	
        	application.behavior.openDialogBox(AlertGreyDiaBox);
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");  
			trace("Checkbox with name " + checkBox.buttonLabel.string + ".\n");                      
        }},
        onUnselected: { value:  function(checkBox){
        	AppttakenNightMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});