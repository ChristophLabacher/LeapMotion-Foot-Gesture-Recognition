$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	$("img").width(width).height(height);
	
	var count = 0;
	
	$(".img-container img").each(function()	{
		count++;
	})
	
	$(".img-container").width(width*count);
	
	$("#demo").on("gesture", function (e, gesture)	{
		var w = $(window).width();
		var l = $(".img-container").offset().left;
		
		if (l != (count - 2) * w)	{
			if (gesture == "swipe right" && leapHandIsSet)	{
				l -= w;
				$(".img-container").offset({left: l});			
			}
		}
		if (l > 0)	{
			if (gesture == "swipe left" && leapHandIsSet)	{
				l += w;
				$(".img-container").offset({left: l});			
			}
		}
	})
});