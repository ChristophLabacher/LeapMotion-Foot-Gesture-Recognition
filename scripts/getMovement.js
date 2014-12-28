function getMovementX()	{
	var historyLength = movementXHistory.length;
			
	if (historyLength < 1 || dataset.movementXDirection == null)	{
		movementX = new Movement(movementXCounter, dataset.movementXDirection, dataset.position.x);
		movementXHistory.push(movementX);
	} else	{
		if (dataset.movementXDirection != "none" || movementXNoneCounter >= 20)	{

			if (movementXHistory[historyLength - 1].direction != dataset.movementXDirection)	{
				movementXHistory[historyLength - 1].setEnd(dataset.position.x);

				movementX = new Movement(movementXCounter, dataset.movementXDirection, dataset.position.x);
				movementXHistory.push(movementX);
				movementXCounter++;
			} else	{
				movementXHistory[historyLength - 1].setEnd(dataset.position.x);
			}
			
			movementXNoneCounter = 0;
		}
		
		if (dataset.movementXDirection == "none")	{
			movementXNoneCounter++;
		}
	}
}

function getMovementY()	{
	var historyLength = movementYHistory.length;
			
	if (historyLength < 1 || dataset.movementYDirection == null)	{
		movementY = new Movement(movementYCounter, dataset.movementYDirection, dataset.position.y);
		movementYHistory.push(movementY);
	} else	{
		if (dataset.movementYDirection != "none" || movementYNoneCounter >= 20)	{

			if (movementYHistory[historyLength - 1].direction != dataset.movementYDirection)	{
				movementYHistory[historyLength - 1].setEnd(dataset.position.y);

				movementY = new Movement(movementYCounter, dataset.movementYDirection, dataset.position.y);
				movementYHistory.push(movementY);
				movementYCounter++;
			} else	{
				movementYHistory[historyLength - 1].setEnd(dataset.position.y);
			}
			
			movementYNoneCounter = 0;
		}
		
		if (dataset.movementYDirection == "none")	{
			movementYNoneCounter++;
		}
	}
}