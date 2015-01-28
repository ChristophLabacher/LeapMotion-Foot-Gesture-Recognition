////////////////////////////////////////////////////////////////////
// GETGESTURES
// Find predefined gestures in varius movements
////////////////////////////////////////////////////////////////////
function getGesture()	{
	//getSwipeX();
	if (gesture)	{
		if (time - gesture.endTime > 300)	{
			getSwipeVel();
		}
	} else	{
		getSwipeVel();
	}
}

function triggerEvent(_gesture)	{
	$("#gesture").trigger("gesture", [_gesture]);
	$("#demo").trigger("gesture", [_gesture]);
}

function getSwipeVel()	{
	var historyLength = gestureHistory.length;
	var movementXHistoryLength = movementXHistory.length;
	
	// If there have been at least 3 different movements
	if (movementXHistoryLength > 2)	{
		
		// SWIPE LEFT (DIRTY)
		// If the last four movements were left, right, left, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "left" && movementXHistory[movementXHistoryLength - 1].velocity > swipeXVelocityBreakpoint && movementXHistory[movementXHistoryLength - 1].distance > swipeXDistanceBreakpoint
		
			&& movementXHistory[movementXHistoryLength - 1].startPosition < (width/2) + 220 && movementXHistory[movementXHistoryLength - 1].endPosition < width/2
		)	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 1].velocity];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[0] != gesture.movementIds[0]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe left", movementXHistory[movementXHistoryLength - 1].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 1].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe left");
			}
		
		// SWIPE RIGHT
		// If the last three movements were right, left, none.
		} else if (movementXHistory[movementXHistoryLength - 1].direction == "right" && movementXHistory[movementXHistoryLength - 1].velocity > swipeXVelocityBreakpoint && movementXHistory[movementXHistoryLength - 1].distance > swipeXDistanceBreakpoint
		
		&& movementXHistory[movementXHistoryLength - 1].startPosition > (width/2) - 220 && movementXHistory[movementXHistoryLength - 1].endPosition > width/2
		
		)	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 1].velocity];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[0] != gesture.movementIds[0]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe right", movementXHistory[movementXHistoryLength - 1].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 1].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe right");
			}
		}
	}
}	