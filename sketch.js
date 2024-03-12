//global variables that will store the toolbox colour palette
//and the helper functions and global fill/strokeWeight
//and the canvas object
var toolbox = null;
var colourP = null;
var helpers = null;
var strokeWState = null;
var c = null;


function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new rectangleTool());
	toolbox.addTool(new EllipseTool());
	toolbox.addTool(new cropTool());
	toolbox.addTool(new bucketFillTool());

	strokeWeight(strokeWState);
	background(255);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
		//default fps of 60 causes the mousePressed to be activated at least 2 times and crashes the bucket fill
		//this lowers the framerate as a work-around
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

//this function is used by the bucket fill, so that it will activate only once
//(calling mouseIsPressed in draw() causes it to activate more than once and crash)
function mousePressed(){
	if (toolbox.selectedTool.hasOwnProperty("bucketColour")){
		toolbox.selectedTool.onMouseClick();
	}
}
