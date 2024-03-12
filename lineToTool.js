//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//set up the options panel and create a slider object to control line thickness
	var optionsDiv = select(".options");
    var thicknessSlider = createSlider(1, 20, 1, 1);

	//draws the line to the screen 
	this.draw = function(){
		//update the stroke state from thickness slider value
		strokeWState = thicknessSlider.value();
		strokeWeight(strokeWState);
		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = function() {
		//clear options
		select(".options").html("");
        strokeWState = 1;
	};

	this.populateOptions = function() {
        //create a slider for thickness of line and a button to fill the shape
        //and assign slider and button to options bar div

        select(".options").html("<br/>", true);
        select(".options").html("<br/>", true);
        select(".options").html("<small>Thickness</small>", true);
        select(".options").html("<br/>", true);
        thicknessSlider.parent(optionsDiv);
	};
}
