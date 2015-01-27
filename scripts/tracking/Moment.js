////////////////////////////////////////////////////////////////////
// Moment
// Information of the current movement within one frame
////////////////////////////////////////////////////////////////////

function Moment(_tracked, _id, _time, _posX, _posY, _posZ)	{
	this.tracked = _tracked;
	this.id = _id;
	this.time = _time;
	
	this.position = new Vector(_posX, _posY, _posZ);
	
	this.distanceXY;
	this.velocityXY;
	
	this.movementXDirection;
	this.movementYDirection;
	
	if (momentHistory.length > 1)	{
		this.getDistanceXY();		
		this.getVelocityXY();
		this.getMovementXYDirection();
	}
}

Moment.prototype.getDistanceXY = function()	{
	this.distanceXY = dist(this.position.x, this.position.y, momentPrev.position.x, momentPrev.position.y);
}

Moment.prototype.getVelocityXY = function()	{
	var timeDifference = this.time - momentPrev.time;
	this.velocityXY = this.distanceXY / timeDifference;}

Moment.prototype.getMovementXYDirection = function()	{
	var differenceX = momentPrev.position.x - this.position.x;
	var differenceY = momentPrev.position.y - this.position.y;
	
	var sensitvity = 4;
	
	if (differenceX > sensitvity) {
		this.movementXDirection = "left";
	} else if (differenceX < -sensitvity) {
		this.movementXDirection = "right";
	} else	{
		this.movementXDirection = "none";
	}
  
	if (differenceY > sensitvity) {
		this.movementYDirection = "up";
	} else if (differenceY < -sensitvity) {
		this.movementYDirection = "down";
	} else	{
		this.movementYDirection = "none";
	}
}