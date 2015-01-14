$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsizeDefault = 50;
	var ballsizeX, ballsizeY;
    
    var activeSide;
    // wortpaare:
    // großKlein — 0
    // schnellLangsam — 1
    // hektischRuhig — 2
    // lautLeise — 3
    // fernNah — 4
    // weichHart — 5
    // sandEis — 6
    
    
    var wortpaar = 0;
    var wortpaarMax = 6;


    // Initializing the HTML-Structure
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div class='word left'></div><div class='word right'></div>"
    );
    
    $(document).keyup(function(e) {
        if ( event.which == 37 ){ //left

            if(wortpaar==0){
                wortpaar = wortpaarMax;
            }else{
                wortpaar--;
            }

        }else if (event.which == 39){ //right

            if(wortpaar == wortpaarMax){
                wortpaar = 0;
            }else{
                wortpaar++;
            }

        }
    });
    
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
            $(".word.left").addClass("active");
        }else{
            $(".word.left").removeClass("active");
            activeSide = "right";
            $(".word.right").addClass("active");
        }
        
        
        
        //these values can be modified in the switchcase wortpaar script
        var newPositionX = dataset.position.x;
        var newPositionY = dataset.position.y;        

        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        $("#indicator").css({
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)"
        });
        

        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        // eventuell muss man auch die anzeige der ball position da noch reinbringen, damit das dann noch dazu anpassen kann
    
        
        switch(wortpaar){
            
            case 0:
                $("#ball").removeClass();

                $(".word.left").html("groß");
                $(".word.right").html("klein");
                
                if(activeSide == "right"){
                    ballsizeX = 20;
                    ballsizeY = 20;
                }
                
                break;


            case 1:    
                $("#ball").removeClass();            
            
                $(".word.left").html("schnell");
                $(".word.right").html("langsam");
                
                if(activeSide == "right"){
                    $("#ball").addClass("slow");
                }
                
                break;

            
            case 2:
                $("#ball").removeClass();

                $(".word.left").html("hektisch");
                $(".word.right").html("ruhig");
                if(activeSide == "left"){
                    
                }else if(activeSide == "right"){

                }
                break;

            
            case 3:
                $("#ball").removeClass();

                $(".word.left").html("laut");
                $(".word.right").html("leise");
                if(activeSide == "left"){
                    $("#ball").removeClass("laut");
                }else if(activeSide == "right"){
                    $("#ball").addClass("laut");
                }
                break;

            
            case 4:
                $("#ball").removeClass();

                $(".word.left").html("fern");
                $(".word.right").html("nah");
                if(activeSide == "left"){

                }else if(activeSide == "right"){

                }
                break;

            
            case 5:
                $("#ball").removeClass();

                $(".word.left").html("weich");
                $(".word.right").html("hart");
                if(activeSide == "left"){

                }else if(activeSide == "right"){

                }
                break;

            
            case 6:
                $("#ball").removeClass();

                $(".word.left").html("Sand");
                $(".word.right").html("Eis");
                if(activeSide == "left"){

                }else if(activeSide == "right"){

                }
                break;
        }





        //showing the ball - veränderung muss über transform geschehn - prefixed!
        $("#ball").css({
            "left" : -ballsizeY/2 + "px",
            "top" : -ballsizeX/2 + "px",
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "width" : ballsizeX + "px",
            "height" : ballsizeY + "px",
        });
    

        
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