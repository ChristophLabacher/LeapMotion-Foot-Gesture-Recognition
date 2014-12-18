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
	
	text.append("<h2>Frames</2>");
	text.append("<p>frameCount: " + frameCount + "</p>");
	text.append("<p>frameRate: " + Math.round(1000 / (time - lastFrameTime)) + "</p>");
	text.append("<p>time: " + Math.round(time * 100) / 100000 + "</p>");
	
	text.append("<h2>Current</2>");
	text.append("<p>x: " + dataset.position.x + "</p>");
	text.append("<p>y: " + dataset.position.y + "</p>");
	text.append("<p>distance: " + Math.round(dataset.distanceXY) + "</p>");
	text.append("<p>velocity: " + Math.round(dataset.velocityXY) + "</p>");
	text.append("<p>movementX: " + dataset.movementXDirection + "</p>");
	text.append("<p>movementY: " + dataset.movementYDirection + "</p>");
		
	text.append("<h2>Datasets</2>");
	text.append("<p>length: " + datasetHistory.length + "</p>");
	text.append("<p>first.time: " + datasetHistory[0].time + "</p>");
	text.append("<p>last.time: " + datasetHistory[datasetHistory.length - 1].time + "</p>");
	text.append("<p>difference.time: " + (datasetHistory[datasetHistory.length - 1].time - datasetHistory[0].time)  + "</p>");
	
	text.append("<h2>Current Movement</2>");
	text.append("<p>id: " + movementX.id + "</p>");
	text.append("<p>direction: " + movementX.direction + "</p>");
	text.append("<p>distance: " + movementX.distance + "</p>");
	text.append("<p>duration: " + movementX.duration + "</p>");
	text.append("<p>velocity: " + movementX.velocity + "</p>");

	var historyLength = movementXHistory.length;

	if (historyLength > 1)	{
		text.append("<h2>Last Movement</2>");
		text.append("<p>id: " + movementXHistory[historyLength - 2].id + "</p>");
		text.append("<p>direction: " + movementXHistory[historyLength - 2].direction + "</p>");
		text.append("<p>distance: " + movementXHistory[historyLength - 2].distance + "</p>");
		text.append("<p>duration: " + movementXHistory[historyLength - 2].duration + "</p>");
		text.append("<p>velocity: " + movementXHistory[historyLength - 2].velocity + "</p>");	
	}
}