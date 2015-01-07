////////////////////////////////////////////////////////////////////
// GESTURE
// Information about a predefined Gesture
////////////////////////////////////////////////////////////////////

function Gesture(_id, _gesture, _startTime, _endTime, _startPosition, _endPosition, _movementIds)	{
	this.id = _id;
	this.gesture = _gesture;
	this.movementIds = _movementIds;
	
	this.startTime = _startTime;
	this.endTime = _endTime;
	this.duration;
	
	this.startPosition = _startPosition;
	this.endPosition = _endPosition;
	this.distance;
	
	this.setDuration();
	this.setDistance();
}

Gesture.prototype.setDuration = function()	{
	this.duration = this.endTime - this.startTime;
}

Gesture.prototype.setDistance = function()	{
	this.distance = Math.abs(this.endPositon - this.startPosition);
}