function EllipseTool (){
    this.icon =  "assets/ellipse.jpg";
    this.name = "Ellipse"

    var startMouseX = -1;
    var startMouseY = -1;
    var ellipseWidth = 0;
    var ellipseHeight = 0;
    var drawing = false;
    var optionsDiv = select(".options");
    var thicknessSlider = createSlider(1, 20, 1, 1);
    var fillT = new FillTool();

    var self = this;

    this.draw = function(){
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

        fillT.fillCheck();

	};  
}