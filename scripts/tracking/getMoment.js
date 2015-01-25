////////////////////////////////////////////////////////////////////
// GETMOMENT
// Read the data from the Hand object and put it into a Dataset
////////////////////////////////////////////////////////////////////

function getMoment()	{
	var posX = 0, posY = 0, posZ = 0;

	// Get data and reverse it
	if (leapHandIsSet)	{
		posX = Math.round(	map(leapHand.palmPosition[0], -100, 100, width, 0)	);
		posY = Math.round(	map(leapHand.palmPosition[1], 100, 250, 0, height)	);
		posZ = Math.round(	leapHand.palmPosition[2]	);
	}
	
	// Create a new Dataset from the current data
	dataset = new Moment(leapHandIsSet, datasetCounter, time, posX, posY, posZ);
	datasetCounter++;
	
	datasetHistory.push(dataset);

	// Delete old Datasets
	if (datasetHistory.length > 250) { datasetHistory.splice(0,1) };
}