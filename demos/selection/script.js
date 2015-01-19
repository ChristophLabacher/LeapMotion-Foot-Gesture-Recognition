var newPositionX, newPositionY; //they are globally declared, each frame set to the x and y pos of the leapMotion and then maybe manipulated to create the effects (dont know if I will use them in the selection-banner script. 


$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsizeDefault = 10;
	var ballsizeX, ballsizeY;
	
	showGestureVis = false;
	showText = false;
    
    var activeWord;
    
    
    var marginOffset = 0;


    var translateCount = 0;
    //um zu zählen wie viele pixel das schon runtergeschoben wurde


    // Initializing the HTML-Structure
    //<div class='thin'>hier lernst du ein bisschen die steuerung und die feedbackmöglichkeiten kennen</div>
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div id='wordwrapper'>" + 
            "<div class='word' id='introduction'><div class='wordText'>Erlebe verschiedene Auswahlmöglichkeiten</div></div>" + 
                "<div class='word' id='simpleHover'><div class='selection'>1</div><div class='selection'>2</div><div class='selection'>3</div><div class='selection'>4</div></div>" + 
                "<div class='word' id='highHover'><div class='selectionWrapper switchTrigger multiSelect'><div class='selection switchTrigger'>3</div><div class='selection switchTrigger'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection switchTrigger'>2</div><div class='selection switchTrigger'>4</div></div></div>" +                 "<div class='word' id='highHoverHide'><div class='selectionWrapper switchTrigger'><div class='selection switchTrigger'>3</div><div class='selection switchTrigger'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection switchTrigger'>2</div><div class='selection switchTrigger'>4</div></div></div>" + 
            "<div class='word' id='ende'><div class='wordText'>ende</div></div></div>" + 
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
        
        
        
        


        //these values can be modified in the switchcase activeWord script



        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        
        

        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        // eventuell muss man auch die anzeige der ball position da noch reinbringen, damit das dann noch dazu anpassen kann
    
        
        switch(activeWord){
            
            case "highHoverHide":

                if(!$(".active .selectionWrapper").hasClass("dropDown") && newPositionY < 330){
                    $(".active .selectionWrapper").addClass("dropDown");
                }else if($(".active .selectionWrapper").hasClass("dropDown") && newPositionY > 450){
                    $(".active .selectionWrapper").removeClass("dropDown");
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

        var correctEnter = false;
        //correctEnter ist dazu da, um zu checken, dass man von oben ziehen will und nicht das man von unten gerade reingeht

        
        $(".active .selection").each(function( index ) {

        
            var borders = $(this).offset();
            var thisWidth = $(this).outerWidth();
            var thisHeight = $(this).outerHeight();

            if(newPositionX > borders.left && newPositionX < borders.left+thisWidth && newPositionY > borders.top && newPositionY < borders.top+thisHeight){
                // this checks if the leapCoordinates are inside the selection

                if(!$(this).hasClass("mouseOver")){
                    $(".active .mouseOver").removeClass("mouseOver");
                    $(this).addClass("mouseOver");
                }
                anywhere = true;
                
                
                
                // somehow I have to create a function that checks it in the correct order
                // I somewhere need to start a function that triggers the "now it is able to enter correctly"
                // it has to come down from the top
                // enter the second stage
                
                var distanceFromBottom = getDistanceFromBottom($(this));
                
                if($(this).hasClass("switchTrigger") && distanceFromBottom != false){
                    //switchTrigger are the classes that have the possibility to be pulled down and toggled
                    
                    if(distanceFromBottom > 10){
                        $(this).addClass("enteredCorrectly");
                    }
                    
                    if(distanceFromBottom <= 30){
                        $(this).addClass("activatedHold");

                        translateCount++;
                        $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });

                    }else if(distanceFromBottom > 30){
                        
                        if(translateCount > 0 && distanceFromBottom > 40){
                            translateCount--;
                            $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });
                        }else {
                            $(this).removeClass("activatedHold");
                        }                            
                        
                    }
                    
                }
                
                

/*
                if(activeWord == "highHover" || activeWord == "highHoverHide" && !$(this).hasClass("spacer")){

                    if(newPositionY - ballsizeDefault+10 < borders.top+thisHeight){
                        correctEnter = true;
                        $(this).addClass("activatedHold");
                        $(this).removeClass("activated");
                    }

                    if(newPositionY + ballsizeDefault+10 > borders.top+thisHeight && correctEnter && translateCount < 30){
                        console.log(translateCount);
                        translateCount++;
                        $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });
                    }
                    
                    if(translateCount>=30){
                        $(this).toggleClass("activated");
                        //sinnvolle animationen!! #todo
                    }

                }
*/

                
            }else{
                // check if there is an element with entercorrectly and then if getDistance to that has a negativeValue (that means under the border)
                // then fire the fast animation
                
                if($(this).hasClass("enteredCorrectly") && getDistanceFromBottom($(this)) < 0){
                    $(this).removeClass("enteredCorrectly");
                    $(this).removeClass("activatedHold");
    
                    
                    //removes if the parent-element (the selectionwrapper) does not hav multiselect as a class
                    if(!$(this).parent().hasClass("multiSelect")){

                        // the next one checks if the element is already activated and then (because of the !multiselect) clears all and sets the right, if it wasnt selected already
                        if($(this).hasClass("activated")){
                            $(this).parent().children(".activated").removeClass("activated");
                        }else{
                            $(this).parent().children(".activated").removeClass("activated");
                            $(this).addClass("activated");
                        }
                    }else{
                        $(this).toggleClass("activated");                        
                    }

                    translateCount=0;
                    $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });                            
                    
                        
                }else{
                    if($(this).hasClass("enteredCorrectly")){
                        $(this).removeClass("enteredCorrectly");
                        $(this).removeClass("activatedHold");

                        translateCount=0;
                        $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });                            
                    }                    
                }


                
            }
            
        });
        
        
        
        if(!anywhere){ // that removes the mouseOver if it is over nowhere
            $(".mouseOver").removeClass("mouseOver");
        }
 
    });

	
});



function getDistanceFromBottom(borderElement){
    // this one checks the distance from a specific element
    // it uses the global variables newPositionX and -Y   
    // returns false if the element is not inbetween the x-borders
    //                  x returns 10
    //  x false         x returns 5
    //           ________________________________ # element
    //
    //                  x returns -10
    //
    //                  …
    //
    
    var checkBorder = borderElement.offset();
    var checkWidth = borderElement.outerWidth();
    var checkHeight = borderElement.outerHeight();

    if(newPositionX > checkBorder.left && newPositionY < checkBorder.left+checkWidth){
        
        var returnDistance = checkBorder.top + checkHeight - newPositionY;
        return returnDistance;

    }else{
        return false;
    }
}










