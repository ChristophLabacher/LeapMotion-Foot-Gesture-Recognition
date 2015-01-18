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
                "<div class='word' id='highHover'><div class='selection'>1</div><div class='selection'>2</div><div class='selection spacer'>&nbsp;</div><div class='selection'>3</div><div class='selection'>4</div></div>" + 
                "<div class='word' id='highHoverHide'><div class='selection'>1</div><div class='selection'>2</div><div class='selection spacer'>&nbsp;</div><div class='selection'>3</div><div class='selection'>4</div></div>" + 
            "<div class='word' id='ruhig'><div class='wordText'>ruhig</div></div>" +
            "<div class='word' id='laut'><div class='wordText'>laut</div></div>" +
            "<div class='word' id='leise'><div class='wordText'>leise</div></div>" +
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
                    marginOffset += 40;
                }else{
                    marginOffset += map(newPositionX, width-width/4, width, 1, 25);
                }
            
            }

            
        }else if(newPositionX < width/4  && leapHandIsSet){
            
            if(newPositionX < width/15){
                marginOffset -= 40;
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
        
        if(newPositionX < $("#introduction").offset().left+$("#introduction").outerWidth()){
            if(activeWord != 0){
                $(".active").removeClass("active");
            }
            $("#introduction").addClass("active");
            activeWord = 0;
                        
        }else if(newPositionX < $("#simpleHover").offset().left+$("#simpleHover").outerWidth()){
            if(activeWord != 1){
                $(".active").removeClass("active");
            }
            $("#simpleHover").addClass("active");
            activeWord = 1;

        }else if(newPositionX < $("#highHover").offset().left+$("#highHover").outerWidth()){
            if(activeWord != 5){
                $(".active").removeClass("active");
            }
            $("#highHover").addClass("active");
            activeWord = 5;
            
        }else if(newPositionX < $("#highHoverHide").offset().left+$("#highHoverHide").outerWidth()){
            if(activeWord != 6){
                $(".active").removeClass("active");
            }
            $("#highHoverHide").addClass("active");
            activeWord = 6;
            
        }else if(newPositionX < $("#laut").offset().left+$("#laut").outerWidth()){
            if(activeWord != 7){
                $(".active").removeClass("active");
            }
            $("#laut").addClass("active");
            activeWord = 7;
            
        }else if(newPositionX < $("#leise").offset().left+$("#leise").outerWidth()){
            if(activeWord != 8){
                $(".active").removeClass("active");
            }
            $("#leise").addClass("active");
            activeWord = 8;
            
        }else if(newPositionX < $("#ende").offset().left+$("#ende").outerWidth()){
            if(activeWord != 9){
                $(".active").removeClass("active");
            }
            $("#ende").addClass("active");
            activeWord = 9;
                        
        }
        
        
        


        //these values can be modified in the switchcase wortpaar script



        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        
        

        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        // eventuell muss man auch die anzeige der ball position da noch reinbringen, damit das dann noch dazu anpassen kann
    
        
        switch(activeWord){
            case 0:
                $("#ball").removeClass();
                break;
            
            case 1:
                $("#ball").removeClass();
                break;
            
            case 2:    
                $("#ball").removeClass();
                break;

            case 3:
                $("#ball").removeClass();
                break;


            case 4:
                $("#ball").removeClass();
                break;


            case 5:
                $("#ball").removeClass();
                break;

            
            case 6:

                if(!$(".active .selection").hasClass("dropDown") && newPositionY < 330){
                    $(".active .selection").addClass("dropDown");
                }else if($(".active .selection").hasClass("dropDown") && newPositionY > 450){
                    $(".active .selection").removeClass("dropDown");
                }
                

                break;

            
            case 7:
                $("#ball").removeClass();

                var frameCut = 20; //Math.random()*30+50; //duration
                var addMax = Math.random()*50; //how much to add

                var sizeAdd = frameCount % frameCut;
                if(sizeAdd == 0){
                    console.log("yeah");
                }else if(sizeAdd <= frameCut/2){
                    sizeAdd = map(sizeAdd, 0, frameCut/2, 0, addMax);
                }else{
                    sizeAdd = map(sizeAdd, frameCut/2+1, frameCut-1, addMax, 0);                        
                }

                
                ballsizeX += sizeAdd;
                ballsizeY += sizeAdd;

                break;

            case 8:
                $("#ball").removeClass();

                $("#ball").addClass("hiddenOpacity");                

                ballsizeX = 17;
                ballsizeY = 17;

                var frameCut = 10; //duration
                var addMax = Math.random()*15; //how much to add

                var sizeAdd = frameCount % frameCut;                    
                if(sizeAdd <= frameCut/2){
                    sizeAdd = map(sizeAdd, 0, frameCut/2, 0, addMax);
                }else{
                    sizeAdd = map(sizeAdd, frameCut/2+1, frameCut-1, addMax, 0);                        
                }

                
                ballsizeX += sizeAdd;
                ballsizeY += sizeAdd;

                break;
                
                
            case 9:
                $("#ball").removeClass();
                
                
                
                ballsizeX = map($("#ende").offset().left+$("#ende").outerWidth()-newPositionX, 200, 40, 50, 0);
                ballsizeY = map($("#ende").offset().left+$("#ende").outerWidth()-newPositionX, 200, 40, 50, 0);

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
    


        var anyone = false;
        
        $(".active .selection").each(function( index ) {

        
            var borders = $(this).offset();
            var thisWidth = $(this).outerWidth();
            var thisHeight = $(this).outerHeight();

            if(newPositionX > borders.left && newPositionX < borders.left+thisWidth && newPositionY > borders.top && newPositionY < borders.top+thisHeight){
                if(!$(this).hasClass("mouseOver")){
                    $(".active .mouseOver").removeClass("mouseOver");
                    $(this).addClass("mouseOver");
                }
                
                anyone = true;                
            }
            
            
        });
        
        if(!anyone){
            $(".mouseOver").removeClass("mouseOver");            
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
















