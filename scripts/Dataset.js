function Dataset(_tracked, _id, _time, _posX, _posY, _posZ)	{
	this.tracked = _tracked;
	this.id = _id;
	this.time = _time;
	
	this.position = new Vector(_posX, _posY, _posZ);
	
	this.distanceXY;
	this.velocityXY;
	
	this.movementX;
	this.movementY;
	
	if (datasetHistory.length > 1)	{
		this.distanceXY = dist(this.position.x, this.position.y, datasetPrev.position.x, datasetPrev.position.y);
		
		var timeDifference = this.time - datasetPrev.time;
		this.velocityXY = this.distanceXY / timeDifference;
	}
}