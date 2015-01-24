////////////////////////////////////////////////////////////////////
// SELECTIONFIELD
// One selectable slice of a selection
////////////////////////////////////////////////////////////////////

function SelectionField(_id, _parentId, _target, _active, _selectionFieldCount, _iAmSpacer)	{
	this.id = _id;
	this.parentId = _parentId;
	this.target = _target;
	this.self;
	
	this.active = _active;
	
	this.selected = false;
	this.mouseOver = true;
	
	this.underneith = false;
	
	this.selectable = false;
	this.selecting = false;
	
	
	this.selectionFieldCount = _selectionFieldCount;
	this.iAmSpacer = _iAmSpacer;
	
	this.action = function()	{};
	
	this.setup();
	this.getDimensions();
	
	this.translateCount = 0;
}

// Setup the selection field
SelectionField.prototype.setup = function()	{
	var width = 100 / this.selectionFieldCount;
	var container = $("<div class=\"selection-field selection-field-" + this.id + "\" style=\"width: " + width + "%\"></div>")
	
	if (this.iAmSpacer)	{
		container = $("<div class=\"selection-field spacer selection-field-" + this.id + "\" style=\"width: " + width + "%\"></div>")
	}
	
	container.appendTo(this.target);
	this.self = $(".selection-" + this.parentId + " .selection-field-" + this.id);
}

// Get the dimensions of the field
SelectionField.prototype.getDimensions = function()	{
	var border = $(this.self).offset();
	var width = $(this.self).outerWidth();
	var height = $(this.self).outerHeight();
	
	this.borderLeft = border.left;
	this.borderRight = border.left + width;
	this.borderTop = border.top;
	this.borderBottom = border.top + height;
}

// Check if a selection is being made
SelectionField.prototype.update = function()	{
	// Get the distance between the cursor and the bottom of the field
	var distanceFromBottom = dataset.position.y - this.borderBottom;

	// If the cursor is within the selection-field
	if (leapHandIsSet && this.active && dataset.position.x > this.borderLeft && dataset.position.x < this.borderRight
	&& dataset.position.y > this.borderTop && dataset.position.y < this.borderBottom)	{
		this.mouseOver = true;
		this.self.addClass("mouseOver");
	// If the cursor is underneith the selection field
	} else if (leapHandIsSet && this.active && dataset.position.x > this.borderLeft && dataset.position.x < this.borderRight)	{
		this.underneith = true;
		this.mouseOver = false;
		this.self.removeClass("mouseOver");	
	} else {
		this.selectable = false;
		this.mouseOver = false;
		this.self.removeClass("mouseOver");			
	}
	
	// If the curor was once high enough after it entered the field it is selectable
	if (this.mouseOver && distanceFromBottom < -30 )	{
		this.selectable = true;
	}
	
	// If the cursor is within die bottom 30px of the field move it down
	if (this.selectable && distanceFromBottom > -30 && distanceFromBottom < 0 && movementY.direction == "down")	{
		this.self.addClass("selecting");
		this.selecting = true;
		
		var addValue = map(this.translateCount, 0, 30, 2, 0);
		addValue = constrain(addValue, 0, 2);
		this.translateCount += addValue;

		this.self.css({"transform" : "translateY(" + this.translateCount + "px)", "-webkit-transform" : "translateY(" + this.translateCount + "px)", });
	// If the cursor it of the bottom 30px of the field move it up		
	} else if (distanceFromBottom < -30 && movementY.direction == "up")	{
		this.self.removeClass("selecting");
		
		var subtractValue = 0;
		
		if (distanceFromBottom < - 70)	{
			subtractValue = map(this.translateCount, 0, 30, 0, 4);
			subtractValue = constrain(subtractValue, 0, 4);

		} else {
			subtractValue = map(this.translateCount, 0, 30, 0, 2);
			subtractValue = constrain(subtractValue, 0, 2);
		}
		
		this.translateCount -= subtractValue;

		this.self.css({"transform" : "translateY(" + this.translateCount + "px)", "-webkit-transform" : "translateY(" + this.translateCount + "px)", });
	// If the field is selectable and the cursor is underneith it select/unselect it.
	} else if (this.selectable && distanceFromBottom - this.translateCount > 0)	{
		if (!this.selected)	{
			this.select();
		} else {
			this.unselect();
		}
	}
}

// Select has been triggered
SelectionField.prototype.select = function()	{
	this.action();
	
	this.selected = true;
	this.selectable = false;
	
	this.self.removeClass("selecting");
	this.self.addClass("selected");
	
	this.translateCount = 0;
	this.self.css({"transform" : "translateY(0px)", "-webkit-transform" : "translateY(0px)", });
	
	console.log(this.id + " selected");
}

// Unselect has been triggered
SelectionField.prototype.unselect = function()	{	
	
	this.selected = false;
	this.selectable = false;
	
	this.self.removeClass("selecting");
	this.self.removeClass("selected");
	
	this.translateCount = 0;
	this.self.css({"transform" : "translateY(0px)", "-webkit-transform" : "translateY(0px)", });
	
	console.log(this.id + " selected");
}