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
            "<div class='word' id='introduction'><div class='wordText'>neige deinen fuß zum rechten rand um zu starten.</div></div>" + 
            "<div class='word' id='normal'><div class='wordText'>normal</div></div>" + 
            "<div class='word' id='langsam'><div class='wordText'>langsam</div></div>" +
            "<div class='word' id='nah'><div class='wordText'>nah</div></div>" +
            "<div class='word' id='fern'><div class='wordText'>fern</div></div>" +
            "<div class='word' id='hektisch'><div class='wordText'>hektisch</div></div>" +
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
        var newPositionX = map(dataset.position.x, 300, 1100, 0, width);
        var newPositionY = map(dataset.position.y, 200, 600, 0, height);


        $("#indicator").css({
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)"
        });



        //controls on the right and the left
        
        if(newPositionX > width-width/5 && leapHandIsSet){
            
            if($("#ende").offset().left+$("#ende").outerWidth()-20 > width){

                if(newPositionX > width-width/15){
                    marginOffset += 40;
                }else{
                    marginOffset += map(newPositionX, width-width/5, width, 1, 25);
                }
            
            }

            
        }else if(newPositionX < width/5  && leapHandIsSet){
            
            if(newPositionX < width/15){
                marginOffset -= 40;
            }else{
                marginOffset -= map(newPositionX, width/5, 0, 1, 30);
            }
            
            if(marginOffset<=0){
                marginOffset = 0;
            }
        }

        $("#introduction").css({"margin-left" : "-" + marginOffset + "px"});



        //later choose here which modification should happen with the values
        //needs to be a very long offset-checking stuff
        
        if(newPositionX < $("#introduction").offset().left+$("#introduction").outerWidth()){
            if(activeWord != 0){
                $(".active").removeClass("active");
            }
            $("#introduction").addClass("active");
            activeWord = 0;
                        
        }else if(newPositionX < $("#normal").offset().left+$("#normal").outerWidth()){
            if(activeWord != 1){
                $(".active").removeClass("active");
            }
            $("#normal").addClass("active");
            activeWord = 1;

        }else if(newPositionX < $("#langsam").offset().left+$("#langsam").outerWidth()){
            if(activeWord != 2){
                $(".active").removeClass("active");
            }
            $("#langsam").addClass("active");
            activeWord = 2;
            
        }else if(newPositionX < $("#nah").offset().left+$("#nah").outerWidth()){
            if(activeWord != 3){
                $(".active").removeClass("active");
            }
            $("#nah").addClass("active");
            activeWord = 3;
            
        }/*
else if(newPositionX < $("#fern").offset().left+$("#fern").outerWidth()){
            if(activeWord != 4){
                $(".active").removeClass("active");
            }
            $("#fern").addClass("active");
            activeWord = 4;
            
        }
*/else if(newPositionX < $("#hektisch").offset().left+$("#hektisch").outerWidth()){
            if(activeWord != 5){
                $(".active").removeClass("active");
            }
            $("#hektisch").addClass("active");
            activeWord = 5;
            
        }else if(newPositionX < $("#ruhig").offset().left+$("#ruhig").outerWidth()){
            if(activeWord != 6){
                $(".active").removeClass("active");
            }
            $("#ruhig").addClass("active");
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
                if(!$("#ball").hasClass("slow")){
                    $("#ball").removeClass();
                }

                $("#ball").addClass("slow");
                // funktioniert im prinzip, ist jedoch noch ungenau, da css-easings immer neustarten
                
                break;

            case 3:
                $("#ball").removeClass();

                ballsizeX = 800;
                ballsizeY = 800;

                newPositionX = map(dataset.position.x, 300, 1100, -600, width+600);
                newPositionY = map(dataset.position.y, 200, 600, 0, height);

                break;


            case 4:
                $("#ball").removeClass();
                $("#ball").addClass("back");
                ballsizeX = 15; //fern funktioniert irgendwie nicht so gut.
                ballsizeY = 15;

                newPositionX = map(dataset.position.x, 300, 1100, 0+300, width-300);
                newPositionY = map(dataset.position.y, 200, 600, 400, 500);

                break;



            case 5:
                $("#ball").removeClass();


                var posAdd = Math.random()*10+1;
                
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;                    
                newPositionX += posAdd*plusOrMinus;
                
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                newPositionY += posAdd*plusOrMinus;
                    
                break;

            
            case 6:
                $("#ball").removeClass();
                //ruhig ist noch unklar
                break;

            
            case 7:
                $("#ball").removeClass();

                var frameCut = Math.random()*30+50; //duration
                var addMax = 50; //how much to add

                var sizeAdd = frameCount % frameCut;                    
                if(sizeAdd <= frameCut/2){
                    sizeAdd = map(sizeAdd, 0, frameCut/2, 0, addMax);
                }else{
                    sizeAdd = map(sizeAdd, frameCut/2+1, frameCut-1, addMax, 0);                        
                }

                
                ballsizeX += sizeAdd;
                ballsizeY += sizeAdd;

                break;

            case 8:
                $("#ball").removeClass();

                ballsizeX = 17;
                ballsizeY = 17;

                var frameCut = Math.random()*100+60; //duration
                var addMax = 5; //how much to add

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