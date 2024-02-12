function FillTool(){
    //variable containing the fill p5 function (noFill or fill)
    var fillOption = noFill();
    //keeps record of current fill status - filled or not filled
    var isFilled = false;

    //checks if fill button is pressed and changes fill status and button text
    this.fillCheck = function(){
        select("#fillButton").mouseClicked(function() {
            var button = select("#" + this.elt.id);
            if (isFilled == false) {
                fillOption = fill(colourP.selectedColour);
                button.html('No Fill');
                isFilled = true;
            } 
            else {
                fillOption = noFill();
                button.html('Fill');
                isFilled = false;
            }
        }); 
    }
    //checks if fill is enabled and reapplies current color
    //this is needed because the fillCheck only applies color when pressing the button
    //and has no way to know that colourPalette.js has changed the colour in real time
    this.colorCheck = function(){
        console.log("isFilled is: " + isFilled);
        if(isFilled == true){
            fillOption = fill(colourP.selectedColour);     
        }
        else{
            fillOption = noFill();
        }      
    }
}