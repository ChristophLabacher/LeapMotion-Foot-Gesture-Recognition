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
	text.append("<p>time: " + time / 100 + "</p>");
	
	text.append("<h2>Current</2>");
	text.append("<p>x: " + dataset.position.x + "</p>");
	text.append("<p>y: " + dataset.position.y + "</p>");
	text.append("<p>distance: " + Math.round(dataset.distanceXY) + "</p>");
	text.append("<p>velocity: " + Math.round(dataset.velocityXY) + "</p>");
		
	text.append("<h2>Datasets</2>");
	text.append("<p>length: " + datasetHistory.length + "</p>");
}