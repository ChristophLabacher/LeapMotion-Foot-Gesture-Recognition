
function createSelection(_size, _selectionHeight)	{
	selectionSize = _size;
	selectionHeight = _selectionHeight;
	
	if (selectionSize % 2 != 0)	{
		selectionSize++;
	}
}

function checkSelection()	{
	if (selectionSize)	{
		
		var container = width / (selectionSize + 3);
		
		// If it's within the margin
		if (dataset.position.x > container && dataset.position.x < width - container && dataset.position.y < selectionHeight)	
		
			// For each slice
			for (var i = 0; i < selectionSize + 1; i++)	{
				// If it's within this slice
				if (dataset.position.x > container + (i * container) && dataset.position.x < container + ((i + 1) * container))	{
					
					// And the slice is not the center
					if (i != (selectionSize/2))	{
						$("#demo").trigger("selectionHover", [i]);
						console.log("Hover: " + i);
					}
					
				}
			}
	}
}