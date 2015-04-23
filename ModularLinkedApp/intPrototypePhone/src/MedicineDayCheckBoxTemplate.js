// KPR Script file
exports.MedicineDayCheckBoxTemplate = BUTTONS.LabeledCheckbox.template(function($){ return{
    top:0, bottom:0, left:0, right:0,
    behavior: Object.create(BUTTONS.LabeledCheckboxBehavior.prototype, {
        onSelected: { value:  function(checkBox){
        	takenDayMedicine = true;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was selected.\n");
        }},
        onUnselected: { value:  function(checkBox){
        	takenDayMedicine = false;
            trace("Checkbox with name " + checkBox.buttonLabel.string + " was unselected.\n");
        }}
    })
}});