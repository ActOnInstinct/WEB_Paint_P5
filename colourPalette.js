//Displays and handles the colour palette.
function ColourPalette() {
	//a list of web colour strings
	this.colours = ["black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	];
	//make the start colour be black
	this.selectedColour = "black";

	//output RGBA version of the selected color
	this.convertedC = [0,0,0,255];

	var self = this;

	var colourClick = function() {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		//set the selected colour and fill and stroke
		self.selectedColour = c;

		//generate the RGBA colour values
		self.convertColours();

		// fill(c)
		stroke(c);

		//add a new border to the selected colour
		this.style("border", "2px solid blue");

		return self.convertedC;
	}

	//load in the colours
	this.loadColours = function() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			//using JQuery add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}

		select(".colourSwatches").style("border", "2px solid blue");
	};
	//call the loadColours function now it is declared
	this.loadColours();

	//convert color name to RGBA values (needed for bucketFillTool)
	this.convertColours = function(){
		//table of colors
        var coloursTable = [{color: "black", RGBA: [0,0,0,255]}, {color: "silver", RGBA: [192,192,192,255]},
        {color: "gray", RGBA: [128,128,128,255]},{color: "white", RGBA: [255,255,255,255]}, 
        {color: "maroon", RGBA: [128,0,0,255]}, {color: "red", RGBA: [255,0,0,255]}, 
        {color: "purple", RGBA: [128,0,128,255]},{color: "orange", RGBA: [255,165,0,255]}, 
        {color: "pink", RGBA: [255,192,203,255]}, {color: "fuchsia", RGBA: [255,0,255,255]}, 
        {color: "green", RGBA: [0,128,0,255]}, {color: "lime", RGBA: [0,255,0,255]},
        {color: "olive", RGBA: [128,128,0,255]}, {color: "yellow", RGBA: [255,255,0,255]}, 
        {color: "navy", RGBA: [0,0,128,255]}, {color: "blue", RGBA: [0,0,255,255]},
        {color: "teal", RGBA: [0,128,128,255]}, {color: "aqua", RGBA: [0,255,255,255]}
        ];
		
		//convert the selectedColour and store it into convertedC
		//if there's a color stored in convertedC already, it will first empty the array
		if (this.convertedC){
			this.convertedC = [];
			for (var i = 0; i < coloursTable.length; i++){
				if (this.selectedColour == coloursTable[i].color){
					for (var j = 0; j < coloursTable[i].RGBA.length; j++){
						 this.convertedC.push(coloursTable[i].RGBA[j]);}
				}
			}
		}
		else{
			for (var i = 0; i < coloursTable.length; i++){
				if (this.selectedColour == coloursTable[i].color){
					for (var j = 0; j < coloursTable[i].RGBA.length; j++){
						this.convertedC.push(coloursTable[i].RGBA[j]);}
				}
			}	
		}
    }
}