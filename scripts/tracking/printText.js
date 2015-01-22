////////////////////////////////////////////////////////////////////
// PRINT TEXT
// Display the collected information as text
////////////////////////////////////////////////////////////////////

function printText()	{
	if (showText)	{
		$("#text").addClass("active");
	} else	{
		$("#text").removeClass("active");
	}
	
	var text = $("#text");
	text.empty();
	
	if (showFrames)	{
		text.append("<h2>Frames</2>");
		text.append("<p>frameCount: " + frameCount + "</p>");
		text.append("<p>frameRate: " + Math.round(1000 / (time - lastFrameTime)) + "</p>");
		text.append("<p>time: " + Math.round(time * 100) / 100000 + "</p>");
	}
	
	if (showCurrent)	{
		text.append("<h2>Current</2>");
		text.append("<p>x: " + dataset.position.x + "</p>");
		text.append("<p>y: " + dataset.position.y + "</p>");
		text.append("<p>distance: " + Math.round(dataset.distanceXY) + "</p>");
		text.append("<p>velocity: " + Math.round(dataset.velocityXY) + "</p>");
		text.append("<p>movementX: " + dataset.movementXDirection + "</p>");
		text.append("<p>movementY: " + dataset.movementYDirection + "</p>");
	}
	
	if (showDatasets)	{	
		text.append("<h2>Datasets</2>");
		text.append("<p>length: " + datasetHistory.length + "</p>");
		text.append("<p>first.time: " + datasetHistory[0].time + "</p>");
		text.append("<p>last.time: " + datasetHistory[datasetHistory.length - 1].time + "</p>");
		text.append("<p>time.delta: " + (datasetHistory[datasetHistory.length - 1].time - datasetHistory[0].time)  + "</p>");
	}
	
	if (showCurrentMovementX)	{
		text.append("<h2>Current MovementX</2>");
		text.append("<p>id: " + movementX.id + "</p>");
		text.append("<p>direction: " + movementX.direction + "</p>");
		text.append("<p>distance: " + movementX.distance + "</p>");
		text.append("<p>duration: " + movementX.duration + "</p>");
		text.append("<p>velocity: " + movementX.velocity + "</p>");
	}

	if (showLastMovementX)	{
		var historyXLength = movementXHistory.length;
	
		if (historyXLength > 1)	{
			text.append("<h2>Last MovementX</2>");
			text.append("<p>id: " + movementXHistory[historyXLength - 2].id + "</p>");
			text.append("<p>direction: " + movementXHistory[historyXLength - 2].direction + "</p>");
			text.append("<p>distance: " + movementXHistory[historyXLength - 2].distance + "</p>");
			text.append("<p>duration: " + movementXHistory[historyXLength - 2].duration + "</p>");
			text.append("<p>velocity: " + movementXHistory[historyXLength - 2].velocity + "</p>");	
		}
	}
	
	if (showCurrentMovementY)	{
		text.append("<h2>Current MovementY</2>");
		text.append("<p>id: " + movementY.id + "</p>");
		text.append("<p>direction: " + movementY.direction + "</p>");
		text.append("<p>distance: " + movementY.distance + "</p>");
		text.append("<p>duration: " + movementY.duration + "</p>");
		text.append("<p>velocity: " + movementY.velocity + "</p>");
	}

	if (showLastMovementY)	{
		var historyYLength = movementYHistory.length;
	
		if (historyYLength > 1)	{
			text.append("<h2>Last MovementY</2>");
			text.append("<p>id: " + movementYHistory[historyYLength - 2].id + "</p>");
			text.append("<p>direction: " + movementYHistory[historyYLength - 2].direction + "</p>");
			text.append("<p>distance: " + movementYHistory[historyYLength - 2].distance + "</p>");
			text.append("<p>duration: " + movementYHistory[historyYLength - 2].duration + "</p>");
			text.append("<p>velocity: " + movementYHistory[historyYLength - 2].velocity + "</p>");	
		}
	}
	
	if (showGesture)	{
		if (gesture != null)	{
			text.append("<h2>Current Gesture</2>");
			text.append("<p>id: " + gesture.id + "</p>");
			text.append("<p>direction: " + gesture.gesture + "</p>");
			text.append("<p>distance: " + gesture.distance + "</p>");
			text.append("<p>duration: " + gesture.duration + "</p>");
			text.append("<p>velocity: " + gesture.velocity + "</p>");
			text.append("<p>movementIds: " + gesture.movementIds + "</p>");
		}
	}
}