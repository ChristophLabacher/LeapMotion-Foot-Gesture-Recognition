var newPositionX, newPositionY;

$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsizeDefault = 50;
	var ballsizeX, ballsizeY;
	
	showGestureVis = false;
	showText = false;
    
    var activeWord;
    
    
    var marginOffset = 0;


    // Initializing the HTML-Structure
    //<div class='thin'>hier lernst du ein bisschen die steuerung und die feedbackmöglichkeiten kennen</div>
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div id='wordwrapper'>" + 
            "<div class='word' id='introduction'><div class='wordText'>Erlebe verschiedene Auswahlmöglichkeiten</div></div>" + 
                "<div class='word' id='simpleHover'><div class='selection'>1</div><div class='selection'>2</div><div class='selection'>3</div><div class='selection'>4</div></div>" + 
                "<div class='word' id='highHover'><div class='selection'>3</div><div class='selection'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection'>2</div><div class='selection'>4</div></div>" + 
                "<div class='word' id='highHoverHide'><div class='selection'>3</div><div class='selection'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection'>2</div><div class='selection'>4</div></div>" + 
            "<div class='word' id='ende'><div class='wordText'>ende</div></div>" + 
        "</div>"
    );
    
    //variables needed for the visualisations

    
	//frame should be "hover" — something like "lift your foot to do something"
    $("#demo").on("frame", function (e){

        
        // ### start of basic stuff, to do the left|right check
        // used it again on my own, but without the tracking-visualisation
    	if (!leapHandIsSet)	{
    		$("#not-tracking").addClass("active");
    	} else	{
    		$("#not-tracking").removeClass("active");
    	}




        // basic-mapping for better usability
        newPositionX = map(dataset.position.x, 475, 925, 0, width);
        newPositionY = map(dataset.position.y, 200, 600, 0, height);


        $("#indicator").css({
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)"
        });



        //controls on the right and the left
        
        if(newPositionX > width-width/4 && leapHandIsSet){
            
            if($("#ende").offset().left+$("#ende").outerWidth()-20 > width){

                if(newPositionX > width-width/15){
                    marginOffset += 25;
                }else{
                    marginOffset += map(newPositionX, width-width/4, width, 1, 25);
                }
            
            }

            
        }else if(newPositionX < width/4  && leapHandIsSet){
            
            if(newPositionX < width/15){
                marginOffset -= 25;
            }else{
                marginOffset -= map(newPositionX, width/4, 0, 1, 30);
            }
            
            if(marginOffset<=0){
                marginOffset = 0;
            }
        }

        $("#wordwrapper").css({            
            "-webkit-transform" : "translate(" + -marginOffset + "px, 0px)",
            "transform" : "translate(" + -marginOffset + "px, 0px)"
        });



        //later choose here which modification should happen with the values
        //needs to be a very long offset-checking stuff


        //TODO: have to do something to make that less code!
        
        $(".word").each(function(){
            if(newPositionX < $(this).offset().left+$(this).outerWidth() && newPositionX > $(this).offset().left){
                var newActiveWord = $(this).attr("id");
                if(activeWord != newActiveWord){
                    $(".active").removeClass("active");
                }
                $(this).addClass("active");
                activeWord = newActiveWord;
            }
        });
        
        
        
        


        //these values can be modified in the switchcase wortpaar script



        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        
        

        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        // eventuell muss man auch die anzeige der ball position da noch reinbringen, damit das dann noch dazu anpassen kann
    
        
        switch(activeWord){


            
            case "highHoverHide":

                if(!$(".active .selection").hasClass("dropDown") && newPositionY < 330){
                    $(".active .selection").addClass("dropDown");
                }else if($(".active .selection").hasClass("dropDown") && newPositionY > 450){
                    $(".active .selection").removeClass("dropDown");
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
    


        var anywhere = false;
        //anywhere trackt ob es noch irgendwo draufliegt
        //müsste ein exit feuern und dann überprüfen ob es von oben nach unten durchging, und nicht irgendwo an der seite raus.
        // >> wenn es dann unten raus ist muss dieses dann aktiviert werden.
        //dazu muss dann aber auch die animationen passen.
        
        $(".active .selection").each(function( index ) {

        
            var borders = $(this).offset();
            var thisWidth = $(this).outerWidth();
            var thisHeight = $(this).outerHeight();

            if(newPositionX > borders.left && newPositionX < borders.left+thisWidth && newPositionY > borders.top && newPositionY < borders.top+thisHeight){
                if(!$(this).hasClass("mouseOver")){
                    $(".active .mouseOver").removeClass("mouseOver");
                    $(this).addClass("mouseOver");
                }
                
                anywhere = true;                
            }
            
            
        });
        
        if(!anywhere){
            //$(".mouseOver").removeClass("mouseOver");            
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
















