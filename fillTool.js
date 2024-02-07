function FillTool(){
    var isFilled = false;
    this.fillOption = noFill();
        //create a slider for thickness of line and a button to fill the shape
        //and assign slider and button to options bar div
    var self = this;

    this.fillCheck = function(){
        select("#fillButton").mouseClicked(function() {
            var button = select("#" + this.elt.id);
            if (isFilled == false) {
                this.fillOption = fill(colourP.selectedColour);
                button.html('No Fill');
                isFilled = true;
            } 
            else {
                this.fillOption = noFill();
                button.html('Fill');
                isFilled = false;
            }
        }); 
    }
}