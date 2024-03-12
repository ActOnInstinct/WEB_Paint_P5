function bucketFillTool(){
    this.icon =  "assets/bucketfill.jpg";
    this.name = "BucketFill"

    //variables to store the initial coordinates when the mouse is clicked
    var coordX = 0;
    var coordY = 0;
    //set to true when the inside color is initialized, set to false at the end of each floodfill
    var initialized = false;
    //the inside color/the initial color at the point of the initial mouse click
    //used as reference to determing "inside"ness
    var colorPre = [];

    var self = this;

    //sets initial color to black (if the app is freshly opened and the color pallette is not clicked on)
    this.bucketColour = [0, 0, 0, 255];

    this.draw = function(){
        //continuously updates the color from colourPalette.js 
        //(default value before clicking on the color bar seems to be [0,0,0,1] 
        //this checks to avoid setting to [0,0,0,1] by default since default should be "black"
        if (colourP.convertedC != [0,0,0,1]){
            this.bucketColour = colourP.convertedC;
        }
    }

    //activates the floodfill function when the mouse is clicked inside the canvas
    this.onMouseClick = function(){
        if (mouseX > c.position().x && 
        mouseY > c.position().y && 
        mouseY < height){
            coordX = mouseX;
            coordY = mouseY;
            self.floodFill(coordX, coordY);
        }
    }

    //main flood fill function, the algorithm is a pixel recursive implementation of flood fill using a data structure (queue)
    this.floodFill = function(x, y){
        loadPixels();
        var q = new Queue();
        var xycoords = [x, y];
        q.enqueue(xycoords); //enqueue the starting coordinates
        //while the queue is not empty, dequeue and if pixel is inside set its color and enqueue neighboring pixels
        while (!q.empty()){
            var n = q.dequeue();
            if (this.inside(n)){
                this.set(n);
                q.enqueue([(n[0] - 1), n[1]]);
                q.enqueue([(n[0] + 1), n[1]]);
                q.enqueue([n[0], (n[1] - 1)]);
                q.enqueue([n[0], (n[1] + 1)]);
            }
        }
        //initialization reset is needed for the inside function, so it knows to load a new color for a second fill
        initialized = false;
        colorPre = [];
        updatePixels();
        return;
    }

    //checks if the pixel at given coordinates(x, y) is inside
    //(if the preloaded color at the point of the initial click is the same as the checked color)
    this.inside = function(coords){
        var indexCur = 0;
        var indexPre = 0;
        var colorCur = [];
        var density = pixelDensity();
        for (var i = 0; i < density; i++){
            for (var j = 0; j < density; j++){
                indexCur = 4 * ((coords[1] * density + j) * width * density + (coords[0] * density + i));
                colorCur.push(pixels[indexCur]);
                colorCur.push(pixels[indexCur + 1]);
                colorCur.push(pixels[indexCur + 2]);
                colorCur.push(pixels[indexCur + 3]);
            }
        }
        //sets up the initial color that will determine if the other pixels are "inside"
        if (!initialized){
            for (var i = 0; i < density; i++){
                for (var j = 0; j < density; j++){
                    indexPre = 4 * ((coordY * density + j) * width * density + (coordX * density + i));
                    colorPre.push(pixels[indexPre]);
                    colorPre.push(pixels[indexPre + 1]);
                    colorPre.push(pixels[indexPre + 2]);
                    colorPre.push(pixels[indexPre + 3]);
                    initialized = true;
                }
            }
        }
        //returns true if the color is "inside" 
        //(if the preloaded color is the same as the checked pixel color)
        if (colorCur[0] == colorPre[0] && 
            colorCur[1] == colorPre[1] && 
            colorCur[2] == colorPre[2] && 
            colorCur[3] == colorPre[3]){
            colorCur = [];
            return true;
        }
        else {
            colorCur = [];
            return false;
        }
    }
    //colors the pixels with the selected color from colourPalette.js
    this.set = function(coords){
        var colorSelected = [];
        for (var i = 0; i < this.bucketColour.length; i++){
            colorSelected.push(this.bucketColour[i]);
        }
        var density = pixelDensity();
        for (var i = 0; i < density; i++){
            for (var j = 0; j < density; j++){
                var index = 4 * ((coords[1] * density + j) * width * density + (coords[0] * density + i));
                pixels[index] = colorSelected[0];
                pixels[index + 1] = colorSelected[1];
                pixels[index + 2] = colorSelected[2];
                pixels[index + 3] = colorSelected[3];
            }
        }
        //resets the selected color array to prepare it for the next bucket fill
        colorSelected = [];
    }
}
