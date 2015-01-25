////////////////////////////////////////////////////////////////////
// SELECTION
// A selection with multiple selectable fields.
////////////////////////////////////////////////////////////////////

function Selection(_id, _target, _autoHide, _autoHideTimeout, _multiSelect, _stackable, _selectionFieldCount, _spacer)	{
	this.id = _id;
	this.target = _target;
	this.self;
	
	this.active = true;
	this.visible = true;
	this.autoHide = _autoHide;
	this.autoHideTimeout = _autoHideTimeout;

	this.multiSelect = _multiSelect;
	this.stackable = _stackable;
	
	this.selectionFieldCount = _selectionFieldCount;
	this.spacer = _spacer;
	
	this.selectionFields = [];
	
	this.setup();
}

// Setup the selection
Selection.prototype.setup = function()	{
	
	if (this.spacer)	{
		this.selectionFieldCount++;
	}
	
	// Append it to its target and make it get itself
	var container = "<div class=\"selection selection-" + this.id + " inactive \"></div>"
	this.target.prepend(container);	
	this.self = $(".selection-" + this.id);
	
	// Add the fields (maybe plus one spacer)
	for (var i = 0; i < this.selectionFieldCount; i++)	{
		var target = $(".selection-" + this.id);
		
		if (i == ((this.selectionFieldCount - 1)/2) && this.spacer)	{
			var selectionField = new SelectionField(i, this.id, target, false, this.selectionFieldCount, true, this.multiSelect, this.stackable);
			this.selectionFields.push(selectionField);
		} else	{
			var selectionField = new SelectionField(i, this.id, target, true, this.selectionFieldCount, false, this.multiSelect, this.stackable);
			this.selectionFields.push(selectionField);
		}
	}
}

Selection.prototype.update = function()	{
	if (this.active)	{
		
		if (dataset.position.y > height*0.7)	{
			this.hide();
		} else	{
			this.show();
		}
		
		// Check if a selection is being made on any of the fields
		for (var i = 0; i < this.selectionFields.length; i++)	{
			this.selectionFields[i].update();
		}		
	}
}

Selection.prototype.show = function()	{
	// Check if a selection is being made on any of the fields
	for (var i = 0; i < this.selectionFields.length; i++)	{
		this.selectionFields[i].getDimensions();
	}		

	this.self.removeClass("inactive");
}

Selection.prototype.hide = function()	{
	this.self.addClass("inactive");
}