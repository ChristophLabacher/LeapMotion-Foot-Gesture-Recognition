var newPositionX, newPositionY; //they are globally declared, each frame set to the x and y pos of the leapMotion and then maybe manipulated to create the effects (dont know if I will use them in the selection-banner script. 


$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsizeDefault = 10;
	var ballsizeX, ballsizeY;
	
	showGestureVis = false;
	showText = false;
    
    var swipeState = 0;
    var trackingPause = false;
    
    //um zu zählen wie viele pixel das schon runtergeschoben wurde


    // Initializing the HTML-Structure
    //<div class='thin'>hier lernst du ein bisschen die steuerung und die feedbackmöglichkeiten kennen</div>
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div id='borderwrapper' class='tracking'>" + 
            "<div class='border' id='borderLeft'><div class='borderTop'></div><div class='borderBottom'></div></div>" + 
            "<div class='border' id='borderRight'><div class='borderTop'></div><div class='borderBottom'></div></div>" +
        "</div>" +
        "<div class='text'>brich aus!</div>"
    );
    
    //variables needed for the visualisations

    
    $("#demo").on("frame", function (e){

        
        // ### start of basic stuff, to do the left|right check
        // used it again on my own, but without the tracking-visualisation
    	if (!leapHandIsSet)	{
    		$("#not-tracking").addClass("active");
    	} else	{
    		$("#not-tracking").removeClass("active");
    	}

        // das swipeState hier ist um das mapping anzupassen
        switch (swipeState){
            case 1:
                newPositionX = map(dataset.position.x, 400, 975, 0, width);
                break;

            case 2:
                newPositionX = map(dataset.position.x, 375, 1025, 0, width);
                break;

            case 3:
                newPositionX = map(dataset.position.x, 300, 1050, 0, width);
                break;

                
            default:
                // basic-mapping for better usability
                newPositionX = map(dataset.position.x, 475, 925, 0, width);
    	}

        // in this case only the x-position needs to be changed
        newPositionY = map(dataset.position.y, 350, 550, 0, height);






        $("#indicator").css({
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)"
        });

        var borderOffset = $("#borderwrapper").offset();
        var borderWidth = $("#borderwrapper").outerWidth();

        // begrenzungen folgen des fußes
        
        if($("#borderRight").hasClass("open") && newPositionX < borderOffset.left + borderWidth){
            if(!trackingPause){
                $("#borderwrapper").addClass("tracking");
                $(".open").removeClass("open");
            }
        }else if($("#borderLeft").hasClass("open") && newPositionX > borderOffset.left){
            if(!trackingPause){
                $("#borderwrapper").addClass("tracking");
                $(".open").removeClass("open");
            }
        }
        
        
        if($("#borderwrapper").hasClass("tracking")){
            var newBorderPosition = newPositionX-borderWidth/2;
            $("#borderwrapper").css({
                "-webkit-transform" : "translate(" + newBorderPosition + "px, 0px)",
                "transform" : "translate(" + newBorderPosition + "px, 0px)"
            });
            
            var yPercentage = (newPositionY / height) * 100;
            var yBottom = 100 - yPercentage;
            $(".borderTop").css({"height" : yPercentage + "%"});
            $(".borderBottom").css({"height" : yBottom + "%"});
            
        }
        
        
    	$("#gesture").on("gesture", function (e, gestureString)	{
            if(!trackingPause){
                if(gestureString == "swipe right" || gestureString == "swipe left"){
                    
                    swipeState++;
                    if(swipeState > 4){
                        swipeState = 0;
                    }
                    
                    
                    $("#borderwrapper").removeClass("tracking");
                    trackingPause = true;
                    setTimeout(function(){trackingPause = false;}, 300);
                    
                    
                    
                    //clear all transforms                    
                    $(".borderTop, .borderBottom").css({"transform" : "rotate(0deg)", "-webkit-transform" : "rotate(0deg)"});
                    
                    
                    //berechne den grad der aufbiegung anhand der geschwindigkeit zum zeitpunkt des ausbruchs
                    var changeToDegree = Math.min(Math.max(map(gesture.velocity, 0, 15, 5, 40), 5), 40);
                    var rotateStringPos = "rotate(" + changeToDegree + "deg)";
                    var rotateStringNeg = "rotate(-" + changeToDegree + "deg)";
                    
                    switch (gestureString){
                        case "swipe right":
                                $("#borderRight").addClass("open");

                                $("#borderRight .borderBottom").animate({transform: rotateStringPos }, 500, 'easeOutElastic');
                                $("#borderRight .borderTop").animate({transform: rotateStringNeg }, 500, 'easeOutElastic');
                                
                                
                            break;
                            
                        case "swipe left":
                                $("#borderLeft").addClass("open");

                                $("#borderLeft .borderTop").animate({transform: rotateStringPos }, 500, 'easeOutElastic');
                                $("#borderLeft .borderBottom").animate({transform: rotateStringNeg }, 500, 'easeOutElastic');
                                

                            break;
                    }
                       
                }                
            }
    	});
    	
    	switch (swipeState){
        	case 0:
                swipeXVelocityBreakpoint = 1.5;
                swipeXDistanceBreakpoint = 100;
                if($("#borderwrapper").hasClass("tracking")){
                    $(".text").html("breche aus.");
                    $(".border").css({"width" : "4px"});
                }
                    
                break;
            
            case 1:
                swipeXVelocityBreakpoint = 3;
                if($("#borderwrapper").hasClass("tracking")){
                    $(".text").html("jetzt musst du etwas schneller sein");
                    $(".border").css({"width" : "5px"});
                }
                break;

            case 2:
                swipeXVelocityBreakpoint = 5;
                if($("#borderwrapper").hasClass("tracking")){
                    $(".text").html("sogar noch schneller …");
                    $(".border").css({"width" : "8px"});
                }
                break;

            case 3:
                swipeXVelocityBreakpoint = 7;
                if($("#borderwrapper").hasClass("tracking")){
                    $(".text").html("jetzt aber richtig, richtig schnell!");
                    $(".border").css({"width" : "10px"});
                }
                    
                break;

            case 4:
                swipeXVelocityBreakpoint = .8;
                swipeXDistanceBreakpoint = 75;
                if($("#borderwrapper").hasClass("tracking")){
                    $(".text").html("jetzt sollte es sehr einfach gehen.");
                    $(".border").css({"width" : "2px"});
                }
                break;
    	}

        
        
/*
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
*/



        
        
        


        //these values can be modified in the switchcase activeWord script



        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        
        

        
        // here the different pairs start
        // ## todo:
        // - how to change between the pairs
        // eventuell muss man auch die anzeige der ball position da noch reinbringen, damit das dann noch dazu anpassen kann
    
        
/*
        switch(activeWord){
            
            case "highHoverHide":

                if(!$(".active .selectionWrapper").hasClass("dropDown") && newPositionY < 330){
                    $(".active .selectionWrapper").addClass("dropDown");
                }else if($(".active .selectionWrapper").hasClass("dropDown") && newPositionY > 450){
                    $(".active .selectionWrapper").removeClass("dropDown");
                }
                

                break;

        }
        
        if(activeWord == "highHoverHide"){
            $("#ball").addClass("white");
        }else{
            $("#ball").removeClass("white");
        }
*/
        

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

        
/*
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
                    
                    if(distanceFromBottom > 30){
                        $(this).addClass("enteredCorrectly");
                    }
                    
                    if(distanceFromBottom <= 30 && $(this).hasClass("enteredCorrectly")){
                        $(this).addClass("activatedHold");


                        //addingValue is to create a mapping that it feels dragged down

                        var addingValue = Math.min(Math.max(map(translateCount, 0, 30, 1, 0), 0), 1)
                        translateCount += addingValue;
                        
                        
                        //create over jquery.animate different custom easing functions
                        $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });

                    }else if(distanceFromBottom > 30 && $(this).hasClass("enteredCorrectly")){
                        
                        if(translateCount > 0 && distanceFromBottom > 40){

                            var subtractValue;

                            if(distanceFromBottom > 70){
                                subtractValue = Math.min(Math.max(map(translateCount, 0, 30, 0, 2), 0), 1);
                            }else{
                                subtractValue = Math.min(Math.max(map(translateCount, 0, 30, 0, 1), 0), 1);
                            }

                            translateCount -= subtractValue;
                            
                            //create over jquery.animate different custom easing functions                            
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

                    // hier abhängig vom translate Count evtl noch zuvor eine animation nach unten schalten
                    // die animation nach unten muss abhängig von der geschwindigkeit in dem moment sein.
                    // - how to get velocity
                    // 
                    
                    if(translateCount < 10){
                        
                        // pulledDown wird später noch abhängig von der geschwindigkeit zu diesem zeitpunkt ausgerechnet
                        // es soll darstellen wie weit die elemente noch heruntergezogen werden, wenn man sie praktisch einfach nach unten geschmissen hat
                        var pulledDown = Math.min(Math.max(map(Math.round(dataset.velocityXY), 1, 20, 5, 80), 5), 80);
                        
                        console.log(Math.round(dataset.velocityXY) + " // " + pulledDown);
                        
                        var transformString = 'translate(0px, ' + pulledDown + 'px)';
                        
                        
                        $(this).css({"transform" : transformString, "-webkit-transform" : transformString });
                        $(this).animate({transform: 'translate(0px, 0px)' }, 500, 'easeOutElastic');
                        
                        

                        $(this).animate({transform: transformString }, 500, 'easeInQuint', function(){
                            
                        });

                        
                    
                    
                    }else{
                        $(this).animate({transform: 'translate(0px, 0px)' }, 500, 'easeOutElastic');                        
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
*/
 
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










