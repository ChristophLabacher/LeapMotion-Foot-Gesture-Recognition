////////////////////////////////////////////////////////////////////
// SELECTIONFIELD
// One selectable slice of a selection
////////////////////////////////////////////////////////////////////

function SelectionField(_id, _parentId, _target, _active, _selectionFieldCount, _iAmSpacer, _multipleSelect, _stackable)	{
	this.id = _id;
	this.parentId = _parentId;
	this.target = _target;
	this.self;
	
	this.active = _active;
	
	this.selected = false;
	this.mouseOver = true;
	this.underneith = false;
	
	this.selectable = false;
	
	this.threshold = 40;
	
	this.selectionFieldCount = _selectionFieldCount;
	this.iAmSpacer = _iAmSpacer;
	this.multipleSelect = _multipleSelect;
	this.stackable = _stackable;
	
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
	var distanceFromBottom = dataset.position.y - this.borderBottom - this.translateCount;

	// If the cursor is within the selection-field
	if (leapHandIsSet && this.active && dataset.position.x > this.borderLeft && dataset.position.x < this.borderRight
	&& dataset.position.y > this.borderTop && dataset.position.y < this.borderBottom + this.translateCount)	{
		this.underneith = false;
		this.mouseOver = true;
		this.self.addClass("mouseOver");
	// If the cursor is underneith the selection field
	} else if (leapHandIsSet && this.active && dataset.position.x > this.borderLeft && dataset.position.x < this.borderRight)	{
		this.underneith = true;
		this.mouseOver = false;
		this.self.removeClass("mouseOver");	
	} else {
		this.underneith = false;
		this.selectable = false;
		this.mouseOver = false;
		this.self.removeClass("mouseOver");			
	}
	
	// If the curor was once high enough after it entered the field it is selectable
	if (this.mouseOver && distanceFromBottom < -20)	{
		this.selectable = true;
	}
	
	// The field is selectable, and the cursor is close to the bottom push it down until the threshold is reached
	if (this.selectable && distanceFromBottom > -this.threshold && distanceFromBottom < 0)	{
		this.self.addClass("selecting");
		
		var addValue = map(this.translateCount, 0, this.threshold*2, 1, 0);
		addValue = constrain(addValue, 0, 1);
		this.translateCount += addValue;

		this.self.css({"transform" : "translateY(" + this.translateCount + "px)", "-webkit-transform" : "translateY(" + this.translateCount + "px)", });
	// If the cursor is too far away from the bottom pull it up
	} else if (distanceFromBottom - this.translateCount < -this.threshold)	{

		this.self.removeClass("selecting");
		//this.selectable = false;
		//dadurch, dass selectable hier auf false gesetzt wird, ist es später nicht mehr möglich über ein schnelles runterdrücken des fußes zu selektieren, da er nicht mehr in die Abfage this.selectable && this.underneith rein geht.
		var subtractValue = 0;
		
		if (distanceFromBottom < -this.threshold * 2)	{
			subtractValue = map(this.translateCount, 0, this.threshold*2, 0, 8);
			subtractValue = constrain(subtractValue, 0, 4);

		} else {
			subtractValue = map(this.translateCount, 0, this.threshold*2, 0, 4);
			subtractValue = constrain(subtractValue, 0, 2);
		}
		
		this.translateCount -= subtractValue;

		this.self.css({"transform" : "translateY(" + this.translateCount + "px)", "-webkit-transform" : "translateY(" + this.translateCount + "px)", });
	// If the field is selectable and the cursor is underneith it select/unselect it.
	} else if (this.selectable && this.underneith)	{
		if (!this.selected)	{
			this.select();
		} else {
			this.unselect();
		}
	}
}

SelectionField.prototype.select = function()	{
	this.action();
	
	this.selected = true;
	this.selectable = false;
		
	if (this.stackable)	{		
		$(".selection-" + this.parentId + " .selection-field").removeClass("selected");
		//dadurch, dass du hier nur die class selected entfernst, setzt du ja nicht auch den wert this.selected wieder auf false, der in zeile 119 überprüft wird.
		//das problem ist dadurch, dass er nicht richtig rausspringt.
		//ich bin mir nicht sicher, wie ich von den anderen objekten die attribute selected auf false setze
		//das muss hier bei stackable, aber auch beim rest geschehen, wo du über parentID bei anderen elementen die class löschst.
		//das löschen der class reicht nicht, du musst auch den attribut selected des objektes ändern.
		
		for (var i = 0; i <= this.id; i++)	{
			if (!$(".selection-" + this.parentId + " .selection-field-" + i).hasClass("spacer"))	{
				$(".selection-" + this.parentId + " .selection-field-" + i).addClass("selected");	
			}
		}
	} else if (this.multiselect)	{
		this.self.removeClass("selecting");
		this.self.addClass("selected");		
	} else{
		$(".selection-" + this.parentId + " .selection-field").removeClass("selected");
		this.self.addClass("selected");		
	}
	
	this.resetTranslate();
}

SelectionField.prototype.unselect = function()	{	
	
	this.selected = false;
	this.selectable = false;
	
	this.self.removeClass("selecting");
	
	if (this.stackable)	{
		
		$(".selection-" + this.parentId + " .selection-field").removeClass("selected");
		
		for (var i = 0; i < this.id; i++)	{
			if (!$(".selection-" + this.parentId + " .selection-field-" + i).hasClass("spacer"))	{
				$(".selection-" + this.parentId + " .selection-field-" + i).addClass("selected");	
			}
		}
	} else {
		this.self.removeClass("selected");
	}	
	
	this.resetTranslate();
}

SelectionField.prototype.resetTranslate = function()	{	


	if (this.translateCount < this.threshold )	{
		var pulledDown = constrain(map(Math.round(dataset.velocityXY), 1, 20, 5, this.threshold*2), 5, this.threshold*2);
		this.self.css({"transform" : "translateY(" + pulledDown+ "px)", "-webkit-transform" : "translateY(" + pulledDown + "px)", });
	}
	
	this.translateCount = 0;
	this.self.animate({transform: 'translate(0px, 0px)' }, 800, 'easeOutElastic');
}
