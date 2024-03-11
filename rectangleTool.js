function rectangleTool (){
    this.icon =  "assets/rectangle.jpg";
    this.name = "Rectangle"

    //initial mouse coordinates are stored here (coordinates of the rectangle)
    var startMouseX = -1;
    var startMouseY = -1;
    //variables to store rectangle width/height
    var rectWidth = 0;
    var rectHeight = 0;
    var drawing = false;
    //set up the options panel and create a slider object to control line thickness
    var optionsDiv = select(".options");
    var thicknessSlider = createSlider(1, 20, 1, 1);
    //create a fill tool object to control fill state
    var fillT = new FillTool();


    this.draw = function(){
        //update the stroke state from thickness slider value
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
                //set the fill state before drawing
                fillT.colorCheck();
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
        strokeWState = 1;
	};

    this.populateOptions = function() {
        //create a slider for thickness of line and a button to fill the shape
        //and assign slider and button to options bar div
		select(".options").html(
			"<button id='fillButton'>Fill</button>");
        select(".options").html("<br/>", true);
        select(".options").html("<br/>", true);
        select(".options").html("<small>Thickness</small>", true);
        select(".options").html("<br/>", true);
        thicknessSlider.parent(optionsDiv);
        //check fill button status (fill or no fill) and update fill function
        fillT.fillCheck();
	};
}