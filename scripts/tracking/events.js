$(document).ready(function()	{
	$("#gesture").addClass("fadeOut");

	$("#gesture").on("gesture", function (e, gesture)	{
		$(this).removeClass("fadeOut").text(gesture);
		setTimeout(function()	{
			$("#gesture").addClass("fadeOut");
		}, 500);
	});
})
