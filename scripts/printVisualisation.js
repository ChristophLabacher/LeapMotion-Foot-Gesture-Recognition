function printVisualisation()	{
	
	if (!leapHandIsSet)	{
		$("#not-tracking").addClass("active");
	} else	{
		$("#not-tracking").removeClass("active");
	}
	

	// Draw the position of last 90% of the datasetHistory
	if (datasetHistory.length > 1)	{
		for (var i = Math.floor(datasetHistory.length*0.9); i < datasetHistory.length; i++) {
			if (datasetHistory[i].tracked && datasetHistory[i-1].position.x && datasetHistory[i-1].position.y)	{
				var alpha = map(i, Math.floor(datasetHistory.length*0.9), datasetHistory.length, 200, 50);
				alpha = alpha + "," + alpha + "," + alpha;
				ctx.strokeStyle = "rgb(" + alpha + ")";
				ctx.beginPath();
				ctx.moveTo(datasetHistory[i].position.x, datasetHistory[i].position.y);
				ctx.lineTo(datasetHistory[i-1].position.x, datasetHistory[i-1].position.y);
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		}
	}

	// Draw the current position
	if (leapHandIsSet)	{
		ctx.fillStyle = 'rgb(255, 0, 0)';
		ctx.beginPath();
		ctx.arc(dataset.position.x, dataset.position.y, 4, 0, Math.PI*2, false);
		ctx.fill();
	}
}