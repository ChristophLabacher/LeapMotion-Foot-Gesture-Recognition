////////////////////////////////////////////////////////////////////
// GETGESTURES
// Find predefined gestures in varius movements
////////////////////////////////////////////////////////////////////
function getGesture()	{
	//getSwipeX();
	if (gesture)	{
		if (time - gesture.endTime > 300)	{
			getSwipeVel();
			getTapY();
		}
	} else	{
		getSwipeVel();
		getTapY();
	}
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
		
		// SWIPE LEFT (DIRTY)
		// If the last four movements were left, right, left, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "left" && movementXHistory[movementXHistoryLength - 3].direction == "right" && movementXHistory[movementXHistoryLength - 4].direction == "left")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 4].id, movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 4].velocity, movementXHistory[movementXHistoryLength - 3].velocity];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe left", movementXHistory[movementXHistoryLength - 4].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 4].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe left");
			}
		
		// SWIPE RIGHT
		// If the last three movements were right, left, none.
		} else if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "left" && movementXHistory[movementXHistoryLength - 3].direction == "right")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id, movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 3].velocity, movementXHistory[movementXHistoryLength - 2].velocity];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe right", movementXHistory[movementXHistoryLength - 3].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 3].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe right");
			}
		}
		
		// SWIPE RIGHT (DIRTY)
		// If the last three movements were right, left, right, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "right" && movementXHistory[movementXHistoryLength - 3].direction == "left" && movementXHistory[movementXHistoryLength - 4].direction == "right")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 4].id, movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 4].velocity, movementXHistory[movementXHistoryLength - 3].velocity];

			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe right", movementXHistory[movementXHistoryLength - 4].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 4].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe right");
			}
		// SWIPE LEFT
		// If the last three movements were left, right, none.
		} else if (movementXHistory[movementXHistoryLength - 1].direction == "none" && movementXHistory[movementXHistoryLength - 2].direction == "right" && movementXHistory[movementXHistoryLength - 3].direction == "left")	{
			
			// Get the ids of those movements
			var movementIds = [movementXHistory[movementXHistoryLength - 3].id, movementXHistory[movementXHistoryLength - 2].id, movementXHistory[movementXHistoryLength - 1].id];
			var movementVelocities = [movementXHistory[movementXHistoryLength - 3].velocity, movementXHistory[movementXHistoryLength - 2].velocity];
			
			// If there has been a gesture before make sure it's not made up by the same movements as this one
			if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
				// Create a new gesture, add it to history and count up.
				gesture = new Gesture(gestureCounter, "swipe left", movementXHistory[movementXHistoryLength - 3].startTime, movementXHistory[movementXHistoryLength - 1].endTime, movementXHistory[movementXHistoryLength - 3].startPosition, movementXHistory[movementXHistoryLength - 1].endPosition, movementIds, movementVelocities)
				gestureHistory.push(gesture);			
				gestureCounter++;
				
				triggerEvent("swipe left");
			}
		}
		

	}
}

function getTapY()	{
	var historyLength = gestureHistory.length;
	var movementYHistoryLength = movementYHistory.length;
	
	// If there have been at least 2 different movements
	if (movementYHistoryLength > 1)	{
		// If the last movement were down, none
		if (movementYHistory[movementYHistoryLength - 1].direction == "none" && movementYHistory[movementYHistoryLength - 2].direction == "down")	{
			// if the veloctiy and disctance of the down movement were big enough
			if (movementYHistory[movementYHistoryLength - 2].velocity > 0.3 && movementYHistory[movementYHistoryLength - 2].distance > 200)	{
					var movementIds = [movementYHistory[movementYHistoryLength - 2].id, movementYHistory[movementYHistoryLength - 1].id];
					var movementVelocities = [movementYHistory[movementYHistoryLength - 2].velocity];
					
				// If there has been a gesture before make sure it's not made up by the same movements as this one
				if ((gesture && movementIds[2] != gesture.movementIds[2]) || historyLength == 0)	{	
					// Create a new gesture, add it to history and count up.
					gesture = new Gesture(gestureCounter, "tap", movementYHistory[movementYHistoryLength - 2].startTime, movementYHistory[movementYHistoryLength - 1].endTime, movementYHistory[movementXHistoryLength - 2].startPosition, movementYHistory[movementYHistoryLength - 1].endPosition, movementIds, movementVelocities)
					gestureHistory.push(gesture);			
					gestureCounter++;
				
					triggerEvent("tap");
				}
			}
		}
	}
}

function getSwipeVel()	{
	var historyLength = gestureHistory.length;
	var movementXHistoryLength = movementXHistory.length;
	
	// If there have been at least 3 different movements
	if (movementXHistoryLength > 2)	{
		
		// SWIPE LEFT (DIRTY)
		// If the last four movements were left, right, left, none.
		if (movementXHistory[movementXHistoryLength - 1].direction == "left" && movementXHistory[movementXHistoryLength - 1].velocity > swipeXVelocityBreakpoint && movementXHistory[movementXHistoryLength - 1].distance > swipeXDistanceBreakpoint
		
			&& movementXHistory[movementXHistoryLength - 1].startPosition < (width/2) + 100 && movementXHistory[movementXHistoryLength - 1].endPosition < width/2
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
		
		&& movementXHistory[movementXHistoryLength - 1].startPosition > (width/2) - 100 && movementXHistory[movementXHistoryLength - 1].endPosition > width/2
		
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