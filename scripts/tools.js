////////////////////////////////////////////////////////////////////
// TOOLS
// Small tools and helper functions
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//	Vector object

// Allow usage of vectors
function Vector(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

// Add two vectors
Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
	this.z += vector.z;
}

// Get the lenght of a vector
Vector.prototype.lenghtXY = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};


////////////////////////////////////////////////////////////////////
// Mathematical helper functions

// Get a random number between f and t
function random(f, t)	{
	this.f = f || 0;
	this.t = t || 1;
	var r = Math.random()*(t-f) + f;
	return r;
}

// Calculate the distance between two points
function dist(x1, y1, x2, y2) {
	var xs = 0;
	var ys = 0;

	xs = x2 - x1;
	xs *= xs;
	ys = y2 - y1;
	ys *= ys;

	return Math.sqrt(xs + ys);
};

// Map a number
function map(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Constrain a number
function constrain(value, f, t)	{
	if (value < f)	{
		return f;
	}
	if (value > t)	{
		return t;
	}
	else	{
		return value;
	}
}
