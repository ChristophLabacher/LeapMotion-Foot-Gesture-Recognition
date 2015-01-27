////////////////////////////////////////////////////////////////////
// GETMOVEMENT
// Find continous movment withing varius moments
////////////////////////////////////////////////////////////////////

function getMovementX()	{
	var historyLength = movementXHistory.length;
			
	// If this is the first movemvent ever just create it
	if (historyLength < 1 || moment.movementXDirection == null)	{
		movementX = new Movement(movementXCounter, moment.movementXDirection, moment.position.x);
		movementXHistory.push(movementX);
	} else	{
		// If the direction is not none, or it has been none for quite some time
		if (moment.movementXDirection != "none" || movementXNoneCounter >= 20)	{

			// If the last movement hasn't had the same direction
			if (movementXHistory[historyLength - 1].direction != moment.movementXDirection)	{
				// End the last movement
				movementXHistory[historyLength - 1].setEnd(moment.position.x);

				// Create a new movement
				movementX = new Movement(movementXCounter, moment.movementXDirection, moment.position.x);
				movementXHistory.push(movementX);
				movementXCounter++;
			// If the last movement had the same direction update it's end
			} else	{
				movementX.setEnd(moment.position.x);
				movementXHistory[historyLength - 1].setEnd(moment.position.x);
			}
			
			// Reset the none counter
			movementXNoneCounter = 0;
		}
		
		// If the direction is none count up
		if (moment.movementXDirection == "none")	{
			movementXNoneCounter++;
		}
		
		// If the direction of the last movement was none update it's end, too.
		if (moment.movementXDirection == "none")	{
			movementX.setEnd(moment.position.x);
			movementXHistory[historyLength - 1].setEnd(moment.position.x);
		}
	}
}

function getMovementY()	{
	var historyLength = movementYHistory.length;
			
	// If this is the first movemvent ever just create it
	if (historyLength < 1 || moment.movementYDirection == null)	{
		movementY = new Movement(movementYCounter, moment.movementYDirection, moment.position.y);
		movementYHistory.push(movementY);
	} else	{
		// If the direction is not none, or it has been none for quite some time
		if (moment.movementYDirection != "none" || movementYNoneCounter >= 20)	{

			// If the last movement hasn't had the same direction
			if (movementYHistory[historyLength - 1].direction != moment.movementYDirection)	{
				// End the last movement
				movementYHistory[historyLength - 1].setEnd(moment.position.y);

				// Create a new movement
				movementY = new Movement(movementYCounter, moment.movementYDirection, moment.position.y);
				movementYHistory.push(movementY);
				movementYCounter++;
			// If the last movment had the same direction update it's end
			} else	{
				movementY
				movementYHistory[historyLength - 1].setEnd(moment.position.y);
			}
			
			// Reset the none counter
			movementYNoneCounter = 0;
		}
		// If the direction is none count up
		if (moment.movementYDirection == "none")	{
			movementYNoneCounter++;
		}
		
		// If the direction of the last movement was none update it's end, too.
		if (moment.movementYDirection == "none")	{
			movementY.setEnd(moment.position.y);
			movementYHistory[historyLength - 1].setEnd(moment.position.y);
		}
	}
}