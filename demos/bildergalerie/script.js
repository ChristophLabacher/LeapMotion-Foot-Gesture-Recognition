$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	bildergalerieSetup();
	
	$("#demo").on("gesture", function (e, gesture)	{
		var w = $(window).width();
		var l = $(".img-container").offset().left;
		
		var count = 0;
		$(".img-container img").each(function()	{
			count++;
		})
		
		if (l != (count - 3) * w)	{
			if (gesture == "swipe right" && leapHandIsSet)	{
				l -= w;
				$(".img-container").offset({left: l});			
			}
		}
		if (l != 0)	{
			if (gesture == "swipe left" && leapHandIsSet)	{
				l += w;
				$(".img-container").offset({left: l});			
			}
		}
	})
});

function bildergalerieSetup()	{
	$("#demo").append("<div class=\"img-container\"></div>");
	
	for (var i = 0; i < 12; i++)	{
		$("#demo .img-container").append("<img>");
	}
	$("#demo .img-container img").width(width).height(height);
	
	var count = 0;
	$(".img-container img").each(function()	{
		count++;
	})
	
	$(".img-container").width(width*count);	
}