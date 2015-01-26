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
<<<<<<< HEAD
	

	$("#gesture").on("gesture", function (e, gesture)	{
		if (hover == true && gesture == "tap")	{
			$("#demo").trigger("selectionTap", hoverId);
		}
	});

=======
>>>>>>> master
})
