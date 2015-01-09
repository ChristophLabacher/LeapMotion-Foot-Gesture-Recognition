////////////////////////////////////////////////////////////////////
// GETMOVEMENT
// Find continous movment withing varius datasets
////////////////////////////////////////////////////////////////////

function getMovementX()	{
	var historyLength = movementXHistory.length;
			
	// If this is the first movemvent ever just create it
	if (historyLength < 1 || dataset.movementXDirection == null)	{
		movementX = new Movement(movementXCounter, dataset.movementXDirection, dataset.position.x);
		movementXHistory.push(movementX);
	} else	{
		// If the direction is not none, or it has been none for quite some time
		if (dataset.movementXDirection != "none" || movementXNoneCounter >= 20)	{

			// If the last movement hasn't had the same direction
			if (movementXHistory[historyLength - 1].direction != dataset.movementXDirection)	{
				// End the last movement
				movementXHistory[historyLength - 1].setEnd(dataset.position.x);

				// Create a new movement
				movementX = new Movement(movementXCounter, dataset.movementXDirection, dataset.position.x);
				movementXHistory.push(movementX);
				movementXCounter++;
			// If the last movement had the same direction update it's end
			} else	{
				movementX.setEnd(dataset.position.x);
				movementXHistory[historyLength - 1].setEnd(dataset.position.x);
			}
			
			// Reset the none counter
			movementXNoneCounter = 0;
		}
		
		// If the direction is none count up
		if (dataset.movementXDirection == "none")	{
			movementXNoneCounter++;
		}
		
		// If the direction of the last movement was none update it's end, too.
		if (movementXHistory[historyLength - 1] == "none")	{
			movementX.setEnd(dataset.position.x);
			movementXHistory[historyLength - 1].setEnd(dataset.position.x);
		}
	}
}

function getMovementY()	{
	var historyLength = movementYHistory.length;
			
	// If this is the first movemvent ever just create it
	if (historyLength < 1 || dataset.movementYDirection == null)	{
		movementY = new Movement(movementYCounter, dataset.movementYDirection, dataset.position.y);
		movementYHistory.push(movementY);
	} else	{
		// If the direction is not none, or it has been none for quite some time
		if (dataset.movementYDirection != "none" || movementYNoneCounter >= 20)	{

			// If the last movement hasn't had the same direction
			if (movementYHistory[historyLength - 1].direction != dataset.movementYDirection)	{
				// End the last movement
				movementYHistory[historyLength - 1].setEnd(dataset.position.y);

				// Create a new movement
				movementY = new Movement(movementYCounter, dataset.movementYDirection, dataset.position.y);
				movementYHistory.push(movementY);
				movementYCounter++;
			// If the last movment had the same direction update it's end
			} else	{
				movementY
				movementYHistory[historyLength - 1].setEnd(dataset.position.y);
			}
			
			// Reset the none counter
			movementYNoneCounter = 0;
		}
		// If the direction is none count up
		if (dataset.movementYDirection == "none")	{
			movementYNoneCounter++;
		}
		
		// If the direction of the last movement was none update it's end, too.
		if (movementYHistory[historyLength - 1] == "none")	{
			movementY.setEnd(dataset.position.y);
			movementYHistory[historyLength - 1].setEnd(dataset.position.y);
		}
	}
}