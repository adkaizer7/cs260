// KPR Script file
exports.ApptDayCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	AppttakenDayMedicine = true;
        	ApptAlertLabel.string = "nothing for now";
        	application.behavior.openDialogBox(AlertGreyDiaBox);
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
            
        }},
        onUnselected: { value:  function(checkBox){
        	AppttakenDayMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});