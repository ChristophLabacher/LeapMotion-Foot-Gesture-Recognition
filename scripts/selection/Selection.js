function Selection(_id, _target, _autoHide, _autoHideTimeout, _multiSelect, _stackable, _selectionFieldCount, _spacer)	{
	this.id = _id;
	this.target = _target;
	
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

Selection.prototype.setup = function()	{
	
	var container = "<div class=\"selection\"></div>"
	this.target.append(container);
	
	for (var i = 0; i < this.selectionFieldCount; i++)	{
		console.log("test");
		var target = this.target.find(".selection");
		
		if (i == (this.selectionFieldCount/2) && this.spacer)	{
			var selectionField = new SelectionField(i, target, false, this.selectionFieldCount, true);
			this.selectionFields.push(selectionField);
			
			this.selectionFieldCount++;
			i++;
		}
		
		var selectionField = new SelectionField(i, target, true, this.selectionFieldCount, false);
		this.selectionFields.push(selectionField);
	}
		
}

Selection.prototype.update = function()	{
}

Selection.prototype.show = function()	{
}

Selection.prototype.hide = function()	{
}