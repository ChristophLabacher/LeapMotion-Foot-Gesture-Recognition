////////////////////////////////////////////////////////////////////
// readData
// Read the data from the Hand object and put it into a Dataset
////////////////////////////////////////////////////////////////////

function readData()	{
	var posX = 0, posY = 0, posZ = 0;

	if (leapHandIsSet)	{
		posX = Math.round(	map(leapHand.palmPosition[0], -250, 250, width, 0)	);
		posY = Math.round(	map(leapHand.palmPosition[1], 0, 320, 0, height)	);
		posZ = Math.round(	leapHand.palmPosition[2]	);
	}

	dataset = new Dataset(leapHandIsSet, datasetCounter, time, posX, posY, posZ);
	datasetCounter++;

	datasetHistory.push(dataset);

	if (datasetHistory.length > 250) { datasetHistory.splice(0,1) };
}