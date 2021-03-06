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
	
	lastFrameTime = time;
}

function setup()	{
	setupTracking();
	
	var target = $("#demo");
	selection = new Selection(0, target, false, 30, false, false, 4, true);
	selections.push(selection);
	
	for (var i = 0; i < selections[0].selectionFields.length; i++)	{
		selections[0].selectionFields[i].setUnselectedContent("Unselected");
		selections[0].selectionFields[i].setSelectedContent("Selected");
	}
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