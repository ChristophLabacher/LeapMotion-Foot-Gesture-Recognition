function Movement(_id, _direction, _startPosition)	{
	this.id = _id;
	this.direction = _direction;
	
	this.startTime = time;
	this.endTime;
	this.duration;
	
	this.startPosition = _startPosition;
	this.endPosition;
	this.distance;
	
	this.velocity;
}

Movement.prototype.setEnd = function(_endPosition)	{
	this.endTime = time;
	this.endPositon = _endPosition;
			
	this.setDuration();
	this.setDistance();
	this.setVelocity();
}

Movement.prototype.setDuration = function()	{
	this.duration = this.endTime - this.startTime;
}

Movement.prototype.setDistance = function()	{
	this.distance = Math.abs(this.endPositon - this.startPosition);
}

Movement.prototype.setVelocity= function()	{
	this.velocity = this.distance / this.duration;
	this.velocity = Math.round(this.velocity * 100) / 100;
}