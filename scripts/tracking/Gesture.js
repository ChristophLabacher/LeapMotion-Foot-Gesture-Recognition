////////////////////////////////////////////////////////////////////
// GESTURE
// Information about a predefined Gesture
////////////////////////////////////////////////////////////////////

function Gesture(_id, _gesture, _startTime, _endTime, _startPosition, _endPosition, _movementIds, _movementVelocities)	{
	this.id = _id;
	this.gesture = _gesture;
	this.movementIds = _movementIds;
	this.movementVelocities = _movementVelocities;
	
	this.startTime = _startTime;
	this.endTime = _endTime;
	this.duration;
	
	this.startPosition = _startPosition;
	this.endPosition = _endPosition;

	this.distance;
	this.velocity;
	
	this.setDuration();
	this.setDistance();
	this.setVelocity();
}

Gesture.prototype.setDuration = function()	{
	this.duration = this.endTime - this.startTime;
}

Gesture.prototype.setDistance = function()	{
	this.distance = Math.abs(this.endPosition - this.startPosition);
}

Gesture.prototype.setVelocity = function()	{
	
	var allVelocities = 0;

	for (var i = 0; i < this.movementVelocities.length; i++)	{
		allVelocities += this.movementVelocities[i];
	}
	
	this.velocity = allVelocities / this.movementVelocities.length;
}