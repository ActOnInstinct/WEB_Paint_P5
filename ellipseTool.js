function EllipseTool (){
    this.icon =  "assets/ellipse.jpg";
    this.name = "Ellipse"

    //initial mouse coordinates are stored here (coordinates of the rectangle)
    var startMouseX = -1;
    var startMouseY = -1;
    //variables to store ellipse width/height
    var ellipseWidth = 0;
    var ellipseHeight = 0;
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
        //draw a ellipse while the mouse button is being held
        if(mouseIsPressed){
            //initialize starting coordinates of the ellipse as the current mouse coordinates
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            //in case starting coordinates have been initialized,
            //draw the ellipse with the width and height based on current mouse coordinates
            else{
                updatePixels();
                ellipseWidth = (mouseX - startMouseX);
                ellipseHeight = (mouseY - startMouseY);
                //set the fill state before drawing
                fillT.colorCheck();
                ellipse(startMouseX + (ellipseWidth/2), startMouseY + (ellipseHeight/2), ellipseWidth, ellipseHeight);
            }
        }
        //reset the starting coordinates when the mouse button is released
        else if(drawing){
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
            ellipseWidth = 0;
            ellipseHeight = 0;
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
        var isFilled = false;
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