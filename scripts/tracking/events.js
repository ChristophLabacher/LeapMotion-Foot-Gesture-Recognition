$(document).ready(function()	{
	
	if (showGestureVis)	{
		$("#gesture").addClass("fadeOut");
		$("#gesture").on("gesture", function (e, gesture)	{
			$(this).removeClass("fadeOut").text(gesture);
			setTimeout(function()	{
				$("#gesture").addClass("fadeOut");
			}, 500);
		});
	}
	

/*
 // disabled the code because of the swipe-before-hover bug
	$("#gesture").on("gesture", function (e, gesture)	{
		if (hover == true && gesture == "tap")	{
			$("#demo").trigger("selectionTap", hoverId);
		}
	});
*/

})
