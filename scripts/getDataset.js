////////////////////////////////////////////////////////////////////
// GETDATASET
// Read the data from the Hand object and put it into a Dataset
////////////////////////////////////////////////////////////////////

function getDataset()	{
	var posX = 0, posY = 0, posZ = 0;

	// Get data and reverse it
	if (leapHandIsSet)	{
		posX = Math.round(	map(leapHand.palmPosition[0], -250, 250, width, 0)	);
		posY = Math.round(	map(leapHand.palmPosition[1], 0, 320, 0, height)	);
		posZ = Math.round(	leapHand.palmPosition[2]	);
	}
	
	// Get data and reverse it
	if (leapHandIsSet)	{
		posX = Math.round(	map(leapHand.palmPosition[0], -250, 250, 0, width)	);
		posY = Math.round(	map(leapHand.palmPosition[1], 0, 320, height, 0)	);
		posZ = Math.round(	leapHand.palmPosition[2]	);
	}

	// Create a new Dataset from the current data
	dataset = new Dataset(leapHandIsSet, datasetCounter, time, posX, posY, posZ);
	datasetCounter++;

	datasetHistory.push(dataset);

	// Delete old Datasets
	if (datasetHistory.length > 250) { datasetHistory.splice(0,1) };
}