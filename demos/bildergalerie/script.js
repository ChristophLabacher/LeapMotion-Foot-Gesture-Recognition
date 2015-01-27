	pos = 1;


$(document).ready(function()	{
	selectionSetup();
		
	width = $(window).width();
	height = $(window).height();
	
	
	bildergalerieSetup();
	
	$("#demo").on("gesture", function (e, gesture)	{
		var w = $(window).width();
		var l = $(".img-container").offset().left;
		
		
		var count = 0;
		$(".img-container img.visible").each(function()	{
			count++;
		})
		
		if (l > - (count-1) * w)	{
			if (gesture == "swipe right" && leapHandIsSet)	{
				pos++;
				l -= w;
				$(".img-container").offset({left: l});	
				$(".img-container img.visible").removeClass("active");
				$(".img-container img.visible:nth-child(" + pos + ")").addClass("active");		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select();
				} else	{
					selections[0].selectionFields[0].unselect();
				}
			}
		}
		if (l != 0)	{
			if (gesture == "swipe left" && leapHandIsSet)	{
				pos--;
				l += w;
				$(".img-container").offset({left: l});		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select();
				} else	{
					selections[0].selectionFields[0].unselect();
				}	
			}
		}
	})
});

function bildergalerieSetup()	{
	$("#demo").append("<div class=\"img-container\"></div>");
	
	for (var i = 0; i < 6; i++)	{
		$("#demo .img-container").append("<img class=\"visible\">");
	}
	$("#demo .img-container img:nth-child(1)").addClass("active");
	$("#demo .img-container img").width(width).height(height);
	
	var count = 0;
	$(".img-container img").each(function()	{
		count++;
	})
	
	$(".img-container").width(width*count);	
}

function selectionSetup()	{
	var target = $("#demo");
	selection = new Selection(0, target, false, 30, false, false, 2, true);
	selections.push(selection);
	
	selections[0].selectionFields[0].setUnselectedContent("Favorisieren");
	selections[0].selectionFields[0].setSelectedContent("Favorisiert");
	selections[0].selectionFields[0].selectAction = function()	{ $(".img-container img.visible:nth-child(" + pos + ")").addClass("favorite"); }
	selections[0].selectionFields[0].unselectAction = function()	{ $(".img-container img.visible:nth-child(" + pos + ")").removeClass("favorite"); }
		
	selections[0].selectionFields[2].setUnselectedContent("Löschen");
	selections[0].selectionFields[2].setSelectedContent("Äh, das sollte man gar nicht mehr sehen");
	selections[0].selectionFields[2].selectAction = function()	{
		
		var count = 0;
		$(".img-container img.visible").each(function()	{
			count++;
		})
		
		if (pos != count)	{
		$(".img-container img.visible:nth-child(" + pos + ")").addClass("delete");
				var w = $(window).width();
				var l = $(".img-container").offset().left;
			
				pos++;
				$(".img-container").offset({left: l});	
				$(".img-container img.visible").removeClass("active");
				$(".img-container img.visible:nth-child(" + pos + ")").addClass("active");		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select();
				} else	{
					selections[0].selectionFields[0].unselect();
				}
				
		}
				selections[0].selectionFields[2].unselect();
	}
	
}