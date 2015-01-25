var frameCount = 0;
var time = 0;
var lastFrameTime = 0;

var selection;

// Start the rundown
$(document).ready( function()	{
	setup();
	loop();
});

function loop()	{
	tracking();
	selection.update();
	
	$("#demo").trigger("frame");
	
	// When the browser is ready start the new run
	queue();
	
	lastFrameTime = time;
}

function setup()	{
	setupTracking();
	
	var target = $("#demo");
	selection = new Selection(0, target, false, 5, false, false, 2, true);
		
}

// Initialize the sound players
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
	
	var newSoundID = "select";
	var newSoundURL = "/data/sounds/select.mp3";
	
	selectSound = soundManager.createSound({
		id: newSoundID,
		url: newSoundURL,
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