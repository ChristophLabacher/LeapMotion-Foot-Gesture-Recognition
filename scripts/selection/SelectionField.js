function SelectionField(_id, _target, _active, _selectionFieldCount, _iAmSpacer)	{
	this.id = _id;
	this.target = _target;
	
	this.active = _active;
	
	this.selected = false;
	this.mouseOver = true;
	
	this.selectable = false;
	this.selecting = false;
	
	this.selectionFieldCount = _selectionFieldCount;
	this.iAmSpacer = _iAmSpacer;
	
	this.action;
	
	this.setup();
}

SelectionField.prototype.setup = function()	{
	
	var container = "<div class=\"selection-field\"></div>"
	
	if (this.iAmSpacer)	{
		container = "<div class=\"selection-field spacer\"></div>"
	}
	
	this.me = this.target.append(container);
	
}

SelectionField.prototype.update = function()	{
}

SelectionField.prototype.select = function()	{
}

SelectionField.prototype.unselect = function()	{
}