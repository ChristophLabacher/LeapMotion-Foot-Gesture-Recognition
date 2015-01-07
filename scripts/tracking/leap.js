////////////////////////////////////////////////////////////////////
// LEAP
// Leap motion stuff
////////////////////////////////////////////////////////////////////

// Connect to the leap motion
function setupLeap()	{
	leapController = new Leap.Controller({
		host: '127.0.0.1',
		port: 6437,
		enableGestures: false,
		frameEventName: 'deviceFrame',
		useAllPlugins: false
	});
	
	leapController.connect();
}

// Get the Hand object from the leap motion
function getLeapData()	{
	leapHand = null;
	leapHandIsSet = false;
	
	var frame = leapController.frame();
	
	frame.hands.forEach(function(hand) {
		leapHand = hand;
		leapHandIsSet = true;
	})
}