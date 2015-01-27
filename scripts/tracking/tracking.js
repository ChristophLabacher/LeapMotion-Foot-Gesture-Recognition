////////////////////////////////////////////////////////////////////
// readData
// Read the data from the Hand object and put it into a Moment
////////////////////////////////////////////////////////////////////

// Leap vars
var leapHand;
var leapHandIsSet = false;

// Canvas vars
var visualisation;
var visualisationCtx;

// Debugging vars
var showText = false;

var showFrames = false;
var showCurrent = true;
var showMoments = true;
var showCurrentMovementX = true;
var showLastMovementX = true;
var showCurrentMovementY = false;
var showLastMovementY = false;
var showGesture = true;

var showGestureVis = false;

// General vars
var width;
var height;

// Moments
var moment;
var momentPrev;
var momentHistory = [];
var momentCounter = 0;

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
	
	// Read the data from the Hand object and put it into a Moment
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
	//printText();
	
	
	if (leapHandIsSet)	{
		$("#demo").trigger("handIsSet");
	}
	
	// Replace the previous moment with this frames moment for the next frame
	momentPrev = moment;
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
