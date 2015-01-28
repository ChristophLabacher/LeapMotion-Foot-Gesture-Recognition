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
		
		if(l == 0 && gesture == "swipe right"){
            
            $(".img-container").animate({
                transform: 'translateX(50px)'
            }, 100, function(){
                $(".img-container").animate({
                    transform: 'translateX(0px)'
                }, 200);
            });
            
		}else if(l <= - (count-1) * w  && gesture == "swipe left"){
            
            $(".img-container").animate({
                transform: 'translateX(-50px)'
            }, 100, function(){
                $(".img-container").animate({
                    transform: 'translateX(0px)'
                }, 200);
            });            
            
		}
		
		if (l > - (count-1) * w)	{
			if (gesture == "swipe left" && leapHandIsSet)	{
				pos++;
				l -= w;
				$(".img-container").offset({left: l});	
				$(".img-container img.visible").removeClass("active");
				$(".img-container img.visible:nth-child(" + pos + ")").addClass("active");		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select(false);
				} else	{
					selections[0].selectionFields[0].unselect(false);
				}
			}
		}
		if (l != 0)	{
			if (gesture == "swipe right" && leapHandIsSet)	{
				pos--;
				l += w;
				$(".img-container").offset({left: l});		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select(false);
				} else	{
					selections[0].selectionFields[0].unselect(false);
				}	
			}
		}
	})
});

function bildergalerieSetup()	{
	$("#demo").append("<div class=\"img-container\"></div>");
	
	for (var i = 0; i < 6; i++)	{
		$("#demo .img-container").append("<img class=\"visible\" src=\"demos/bildergalerie/imgs/img" + (i+1) + ".jpg\">");
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
	
	selections[0].selectionFields[0].setUnselectedContent("<div class='icon fav'></div>");
	selections[0].selectionFields[0].setSelectedContent("<div class='icon fav hearted'></div>");
	selections[0].selectionFields[0].selectAction = function()	{ $(".img-container img.visible:nth-child(" + pos + ")").addClass("favorite"); }
	selections[0].selectionFields[0].unselectAction = function()	{ $(".img-container img.visible:nth-child(" + pos + ")").removeClass("favorite"); }
		
	selections[0].selectionFields[2].setUnselectedContent("<div class='icon delete'></div>");
	selections[0].selectionFields[2].setSelectedContent("<div class='icon delete'></div>");
	selections[0].selectionFields[2].selectAction = function()	{
		
		var count = 0;
		$(".img-container img.visible").each(function()	{
			count++;
		})
		
		if (pos != count)	{
			$(".img-container img.visible:nth-child(" + pos + ")").addClass("delete");	
			setTimeout(function()	{ $(".img-container img.visible:nth-child(" + pos + ")").remove()}, 500);		
			selections[0].selectionFields[0].unselect(false);	
			//	pos++;
				$(".img-container img.visible").removeClass("active");
				$(".img-container img.visible:nth-child(" + pos + ")").addClass("active");		
				
				if ($(".img-container img.visible:nth-child(" + pos + ")").hasClass("favorite"))	{
					selections[0].selectionFields[0].select(false);
				} else	{
					selections[0].selectionFields[0].unselect(false);
				}
				
		}
				selections[0].selectionFields[2].unselect(false);
	}
	
}