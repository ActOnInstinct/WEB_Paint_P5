function cropTool(){
    this.icon =  "assets/select.jpg";
    this.name = "Crop"

    //variables to store initial coordinates and drawing state
    var startMouseX = -1;
    var startMouseY = -1;
    var rectWidth = 0;
    var rectHeight = 0;
    var drawing = false;

    //variables that store the current selection parameters
    var currentDrawX = 0;
    var currentDrawY = 0;
    var currentDrawWidth = 0;
    var currentDrawHeight = 0;

    //pixel cache of the crop selection is saved here
    var pictureCache = [];
    
    
    this.draw = function(){
        //checks if the mouse is pressed outside the mode selection area (button area)
        //without this check, clicking the crop button ends up clearing the screen
        if(mouseIsPressed && 
        mouseX > (c.position().x) && 
        mouseY > c.position().y && 
        mouseY < height){
            //initialize starting coordinates of the selection as the current mouse coordinates
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            }
            //in case starting coordinates have been initialized,
            //draw the selection with the width and height based on current mouse coordinates
            //will continuously update width and height of selection until mouse is released
            else{
                updatePixels();
                rectWidth = mouseX - startMouseX;
                rectHeight = mouseY - startMouseY;
                //push and pop so other functions are not affected by fill, stroke and linedash
                push();
                this.setLineDash([5, 5]);
                noFill();
                stroke(0, 0, 0);
                strokeWeight(strokeWState);
                rect(startMouseX, startMouseY, rectWidth, rectHeight);
                pop();
            }
        }
        //reset the starting coordinates when the mouse button is released
        else if(drawing){
            //variables to store the current selection parameters, used by copySelected and cropSelected functions
            currentDrawX = startMouseX;
            currentDrawY = startMouseY;
            currentDrawWidth = rectWidth;
            currentDrawHeight = rectHeight;
            //reset mouse and rectangle coordinates
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
            rectWidth = 0;
            rectHeight = 0;
            //copy the pixel selection to a temporary array
            this.copySelected();
            //crop the pixel selection
            this.cropSelected();
        }
    }

    this.copySelected = function(){
        loadPixels();
        //stores the current screen pixel density
        var density = pixelDensity();
        // i and j for loops go through all horizontal and vertical pixels based on pixel density
        for (var i = 0; i < density; i++){
            for (var j = 0; j < density; j++){
                //goes through the current selection height pixels
                for (var l = 1; l < currentDrawHeight; l++){
                    //goes through current selection width pixels
                    for (var k = 1; k < currentDrawWidth; k++){
                        //calculates the pixel index number (eg. the number of the current pixel)
                        var index = 4 * (((currentDrawY + l) * density + j) * width * density + ((currentDrawX + k) * density + i));
                        //stores the selection into the pixel cache array (only selected area is copied)
                        pictureCache.push(pixels[index]);
                        pictureCache.push(pixels[index + 1]);
                        pictureCache.push(pixels[index + 2]);
                        pictureCache.push(pixels[index + 3]);
                    }
                }
            }
        }
        updatePixels();
    }

    this.cropSelected = function(){
        //reset background to white
        background(255, 255, 255);
        loadPixels();
        var sourcePix = 0; //stores current iteration count for pictureCache
        var density = pixelDensity();
        //for loops below are the same as the ones in this.copySelected
        for (var i = 0; i < density; i++){
            for (var j = 0; j < density; j++){
                for (var l = 1; l < currentDrawHeight; l++){
                    for (var k = 1; k < currentDrawWidth; k++){
                        var index = 4 * (((currentDrawY + l) * density + j) * width * density + ((currentDrawX + k) * density + i));
                        //copies the selection in pictureCache to the appropriate position in pixels array
                        //note that the target destination in pixels array is based on the position of the selection on the screen
                        //while the target source in pictureCache always starts from 0
                        pixels[index] = pictureCache[sourcePix];
                        pixels[index + 1] = pictureCache[sourcePix + 1];
                        pixels[index + 2] = pictureCache[sourcePix + 2];
                        pixels[index + 3] = pictureCache[sourcePix + 3];

                        sourcePix+= 4;
                    }
                }
            }
        }
        updatePixels();
        //clears the cache
        pictureCache = [];               
    }

    this.setLineDash = function(list){
        drawingContext.setLineDash(list); //draw a dashed line
    }
}