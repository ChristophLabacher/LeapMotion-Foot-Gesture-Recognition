var frameCount = 0;
var time = 0;
var lastFrameTime = 0;

var selection;
var selections = [];

var getGestures = true;


// Start the rundown
$(document).ready( function()	{
	setup();
	loop();
});

function loop()	{
	tracking();
	
	selections[0].update();
	
	$("#demo").trigger("frame");
	
	// When the browser is ready start the new run
	queue();
	drawBall();
	lastFrameTime = time;

	if (!leapHandIsSet)	{
		$("#not-tracking").addClass("active");
	} else	{
		$("#not-tracking").removeClass("active");
	}
	
}

function setup()	{
	setupTracking();
}

// Initialize the sound players


soundManager.setup({
    debugMode : false
})


soundManager.onready(function() {
	var newSoundID = "hover";
	var newSoundURL = "/data/sounds/hover.mp3";
	
	hoverSound = soundManager.createSound({
		id: newSoundID,
		url: newSoundURL,
		autoLoad: true,
		autoPlay: false,
		volume: 100
	});
	
	var newSoundIDSelect = "select";
	var newSoundURLSelect = "/data/sounds/select.mp3";
	
	selectSound = soundManager.createSound({
		id: newSoundURLSelect,
		url: newSoundURLSelect,
		autoLoad: true,
		autoPlay: false,
		volume: 100
	});
	
	var newSoundIDUnselect = "Unselect";
	var newSoundURLUnselect = "/data/sounds/unselect.mp3";
	
	unselectSound = soundManager.createSound({
		id: newSoundURLUnselect,
		url: newSoundURLUnselect,
		autoLoad: true,
		autoPlay: false,
		volume: 100
	});
});

// When the browser is ready start the new run
function queue()	{
	frameCount++;
	window.requestAnimationFrame(loop);
}

// Setup the timer
setInterval(function () {	time += 5	}, 5);