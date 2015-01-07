////////////////////////////////////////////////////////////////////
// GETGESTURES
// Find predefined gestures in varius movements
////////////////////////////////////////////////////////////////////
function getGesture()	{
	getSwipeX();
}

function triggerEvent(_gesture)	{
	$("#gesture").trigger("gesture", [_gesture]);
	$("#demo").trigger("gesture", [_gesture]);
}

function getSwipeX()	{
	var historyLength = gestureHistory.length;
	var movementXHistoryLength = movementXHistory.length;
	
	// If there have been at least 3 different movements
	if (movementXHistoryLength > 2)	{
		
		// SWIPE RIGHT
		// If the last three movements were right, left, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "left" && movementXHistory[movementXHistoryLength - 3].direction == "right")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id, movementXHistory[movementXHistoryLength - 1].id];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe right", movementXHistory[movementXHistoryLength - 3].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 3].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe right");
			}
		}
		
		// SWIPE LEFT
		// If the last three movements were left, right, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "right" && movementXHistory[movementXHistoryLength - 3].direction == "left")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id, movementXHistory[movementXHistoryLength - 1].id];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe left", movementXHistory[movementXHistoryLength - 3].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 3].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe left");
			}
		}
		
		// SWIPE RIGHT (DIRTY)
		// If the last three movements were right, left, right, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "right" && movementXHistory[movementXHistoryLength - 3].direction == "left" && movementXHistory[movementXHistoryLength - 4].direction == "right")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 4].id, movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe right", movementXHistory[movementXHistoryLength - 4].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 4].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe right");
			}
		}
		
		// SWIPE LEFT (DIRTY)
		// If the last three movements were right, left, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "left" && movementXHistory[movementXHistoryLength - 3].direction == "right" && movementXHistory[movementXHistoryLength - 4].direction == "left")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 4].id, movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe left", movementXHistory[movementXHistoryLength - 4].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 4].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe left");
			}
		}
	}
}