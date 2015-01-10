$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsize = 50;
    
    var activeSide;
    //wortpaar: schnellLangsam
    var wortpaar = "großklein";


    // Initializing the HTML-Structure
    $("body").append(  
        "<div class='ball'></div>" + 
        "<div class='word left'></div><div class='word right'></div>" +
        "<div class='indicator'></div>"
    );
    
    
    
	//frame should be "hover" — something like "lift your foot to do something"
    $("#demo").on("frame", function (e){

        
        // ### start of basic stuff, to do the left|right check
        // used it again on my own, but without the tracking-visualisation
    	if (!leapHandIsSet)	{
    		$("#not-tracking").addClass("active");
    	} else	{
    		$("#not-tracking").removeClass("active");
    	}


        if(dataset.position.x < width/2){
            $(".word.right").removeClass("active");
            activeSide = "left";
            $(".indicator").css({"left": "0px"});
            $(".word.left").addClass("active");
        }else{
            $(".word.left").removeClass("active");
            activeSide = "right";
            $(".indicator").css({"left": width/2 + "px"});
            $(".word.right").addClass("active");
        }
        
        $(".ball").css({"top":dataset.position.y-ballsize/2 + "px", "left":dataset.position.x-ballsize/2 + "px"});
        
        
        
        
        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        
        switch(wortpaar){
            case "schnellLangsam":
                $(".word.left").html("schnell");
                $(".word.right").html("langsam");
                if(activeSide == "left"){
                    $(".ball").removeClass("slow");
                }else if(activeSide == "right"){
                    $(".ball").addClass("slow");
                }
                break;
            
            case "großklein":
                $(".ball").removeClass("slow");

                $(".word.left").html("groß");
                $(".word.right").html("klein");
                if(activeSide == "left"){
                    $(".ball").removeClass("klein");
                }else if(activeSide == "right"){
                    $(".ball").addClass("klein");
                }
                break;
        }


        
        
    });


	
/*
	$("#demo").on("gesture", function (e, gesture)	{
		var w = $(window).width();
		var l = $(".img-container").offset().left;
		
		if (l != (count - 2) * w)	{
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
*/
});