////////////////////////////////////////////////////////////////////
// readData
// Read the data from the Hand object and put it into a Dataset
////////////////////////////////////////////////////////////////////

// Leap vars
var leapHand;
var leapHandIsSet = false;

// Canvas vars
var visualisation;
var visualisationCtx;

// Debugging vars
var showText = true;

// General vars
var frameCount = 0;
var time = 0;
var width;
var height;

// Datasets
var dataset;
var datasetPrev;
var datasetHistory = [];
var datasetCounter = 0;

$(document).ready( function()	{
	setup();
	loop();
});


function setup() {
	// Setup the canvas
	setupCanvas();
	
	// Connect to the leap motion
	setupLeap();
};

function loop()	{
	// Clear the canvas
	clear();
	
	// Get the Hand object from the leap motion
	getLeapData();
	
	// Read the data from the Hand object and put it into a Dataset
	readData();

	// Display the collected information	
	printVisualisation();
	printText();
	
	// Replace the previous dataset with this frames dataset for the next frame
	datasetPrev = dataset;
	
	// When the browser is ready start the new run
	queue();
};

// Setup the canvas
function setupCanvas()	{
	width = $(window).width();
	height = $(window).height();
	
	visualisation = document.getElementById('visualisation');
	ctx = visualisation.getContext('2d');
	
	visualisation.width = width;
	visualisation.height = height;
}

// Clear the canvas
function clear()	{
	ctx.clearRect(0, 0, visualisation.width, visualisation.height);
}

// When the browser is ready start the new run
function queue()	{
	frameCount++;
	window.requestAnimationFrame(loop);
}

// Setup the timer
setInterval(function () {time++}, 1);
