////////////////////////////////////////////////////////////////////
// GETMOMENT
// Read the data from the Hand object and put it into a Moment
////////////////////////////////////////////////////////////////////

function getMoment()	{
	var posX = 0, posY = 0, posZ = 0;

	// Get data and reverse it
	if (leapHandIsSet)	{
		posX = Math.round(	map(leapHand.palmPosition[0], -100, 100, width, 0)	);
		posY = Math.round(	map(leapHand.palmPosition[1], 100, 250, 0, height)	);
		posZ = Math.round(	leapHand.palmPosition[2]	);
	}
	
	// Create a new Moment from the current data
	moment = new Moment(leapHandIsSet, momentCounter, time, posX, posY, posZ);
	momentCounter++;
	
	momentHistory.push(moment);

	// Delete old Moments
	if (momentHistory.length > 250) { momentHistory.splice(0,1) };
}