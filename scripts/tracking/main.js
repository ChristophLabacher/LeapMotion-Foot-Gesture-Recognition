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

var showFrames = false;
var showCurrent = true;
var showDatasets = true;
var showCurrentMovementX = true;
var showLastMovementX = false;
var showCurrentMovementY = true;
var showLastMovementY = false;
var showGesture = true;

var showGestureVis = true;

// General vars
var frameCount = 0;
var time = 0;
var lastFrameTime = 0;
var width;
var height;

// Datasets
var dataset;
var datasetPrev;
var datasetHistory = [];
var datasetCounter = 0;

// MovementsX
var movementX;
var movementXHistory = [];
var movementXCounter = 0;
var movementXNoneCounter = 0;

// MovementsY
var movementY;
var movementYHistory = [];
var movementYCounter = 0;
var movementYNoneCounter = 0;

// Gestures
var gesture;
var gestureHistory = [];
var gestureCounter = 0;

var selectionSize = 0;
createSelection(4, 270);

// Start the rundown
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
	getDataset();
	
	// Get the current movement in both dimensions
	getMovementX();
	getMovementY();
	
	// Find gestures in the movements
	getGesture();
	
	checkSelection();

	// Display the collected information	
	printVisualisation();
	printText();
	
	
	if (leapHandIsSet)	{
		$("#demo").trigger("handIsSet");
	}
	
	$("#demo").trigger("frame");	
	
	// Replace the previous dataset with this frames dataset for the next frame
	datasetPrev = dataset;

	// When the browser is ready start the new run
	queue();
	
	lastFrameTime = time;
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
setInterval(function () {	time += 5	}, 5);
