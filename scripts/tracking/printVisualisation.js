////////////////////////////////////////////////////////////////////
// PRINT VISUALISATION
// Display the collected information as a visualisation
////////////////////////////////////////////////////////////////////

function printVisualisation()	{
	
	if (!leapHandIsSet)	{
		$("#not-tracking").addClass("active");
	} else	{
		$("#not-tracking").removeClass("active");
	}
	

	// Draw the position of last 90% of the momentHistory
	if (momentHistory.length > 1)	{
		for (var i = Math.floor(momentHistory.length*0.9); i < momentHistory.length; i++) {
			if (momentHistory[i].tracked && momentHistory[i-1].position.x && momentHistory[i-1].position.y)	{
				var alpha = map(i, Math.floor(momentHistory.length*0.9), momentHistory.length, 200, 50);
				alpha = alpha + "," + alpha + "," + alpha;
				ctx.strokeStyle = "rgb(" + alpha + ")";
				ctx.beginPath();
				ctx.moveTo(momentHistory[i].position.x, momentHistory[i].position.y);
				ctx.lineTo(momentHistory[i-1].position.x, momentHistory[i-1].position.y);
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		}
	}

	// Draw the current position
	if (leapHandIsSet)	{
		ctx.fillStyle = '#ED5565';
		ctx.beginPath();
		ctx.arc(moment.position.x, moment.position.y, 4, 0, Math.PI*2, false);
		ctx.fill();
	}
}