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
var showLastMovementX = true;
var showCurrentMovementY = false;
var showLastMovementY = false;
var showGesture = true;

var showGestureVis = true;

// General vars
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

// Gesture Recognition
var swipeXVelocityBreakpoint = 1.5;
var swipeXDistanceBreakpoint = 100;


function setupTracking() {
	// Setup the canvas
	setupCanvas();
	
	// Connect to the leap motion
	setupLeap();
};

function tracking()	{
	// Clear the canvas
	clear();
	
	// Get the Hand object from the leap motion
	getLeapData();
	
	// Read the data from the Hand object and put it into a Dataset
	getMoment();
	
	// Get the current movement in both dimensions
	getMovementX();
	getMovementY();
	
	if (getGestures)	{
		// Find gestures in the movements
		getGesture();
	}
	
	// Display the collected information	
	//printVisualisation();
	printText();
	
	
	if (leapHandIsSet)	{
		$("#demo").trigger("handIsSet");
	}
	
	// Replace the previous dataset with this frames dataset for the next frame
	datasetPrev = dataset;
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
