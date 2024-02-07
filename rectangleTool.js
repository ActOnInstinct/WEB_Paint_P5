function RectangleTool (){
    this.icon =  "assets/rectangle.jpg";
    this.name = "Rectangle"

    var startMouseX = -1;
    var startMouseY = -1;
    var rectWidth = 0;
    var rectHeight = 0;
    var drawing = false;
    var optionsDiv = select(".options");
    var fillOption = noFill();
    var thicknessSlider = createSlider(1, 20, 1, 1);
    var isFilled;

    var self = this;

    this.draw = function(){
        strokeWState = thicknessSlider.value();
        strokeWeight(strokeWState);
        //draw a rectangle while the mouse button is being held
        if(mouseIsPressed){
            //initialize starting coordinates of the rectangle as the current mouse coordinates
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            //in case starting coordinates have been initialized,
            //draw the rectangle with the width and height based on current mouse coordinates
            else{
                updatePixels();
                rectWidth = mouseX - startMouseX;
                rectHeight = mouseY - startMouseY;
                //apply fill or no fill
                fillOption;
                rect(startMouseX, startMouseY, rectWidth, rectHeight);
            }
        }
        //reset the starting coordinates when the mouse button is released
        else if(drawing){
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
            rectWidth = 0;
            rectHeight = 0;
        }
    }

    this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
	};

    this.populateOptions = function() {
        //create a slider for thickness of line and a button to fill the shape
        //and assign slider and button to options bar div
        isFilled = false;

		select(".options").html(
			"<button id='fillButton'>Fill</button>");
        select(".options").html("<br/>", true);
        select(".options").html("<br/>", true);
        select(".options").html("<small>Thickness</small>", true);
        select(".options").html("<br/>", true);
        thicknessSlider.parent(optionsDiv);

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

	};
}