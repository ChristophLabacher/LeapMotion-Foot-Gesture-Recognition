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
    //besteht aus einem selectionWrapper und darin verschiedene generierte divs
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div id='wordwrapper'>" + 
            "<div class='word' id='introduction'><div class='wordText'>Erlebe verschiedene Auswahlmöglichkeiten</div></div>" + 
                "<div class='word' id='simpleHover'><div class='selection'>1</div><div class='selection'>2</div><div class='selection'>3</div><div class='selection'>4</div></div>" + 
                "<div class='word' id='highHover'><div class='selectionWrapper switchTrigger multiSelect'><div class='selection switchTrigger'>3</div><div class='selection switchTrigger'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection switchTrigger'>2</div><div class='selection switchTrigger'>4</div></div><div class='bottomIntroduction'>mehrere auswählbar</div></div>" +
                "<div class='word' id='highHoverHide'><div class='selectionWrapper switchTrigger'><div class='selection switchTrigger'>3</div><div class='selection switchTrigger'>1</div><div class='selection spacer'>&nbsp;</div><div class='selection switchTrigger'>2</div><div class='selection switchTrigger'>4</div></div><div class='bottomIntroduction'>nur eins auswählbar</div></div>" + 
            "<div class='word' id='ende'><div class='selectionWrapper switchTrigger'><div class='selection switchTrigger' id='nextLevel'>ja.</div></div><div class='wordText'>weiter zum nächsten?</div></div></div>" + 
        "</div>"
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




        // basic-mapping for better usability
        newPositionX = map(dataset.position.x, 475, 925, 0, width);
        newPositionY = map(dataset.position.y, 200, 600, 0, height);


        $("#indicator").css({
            "-webkit-transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)",
            "transform" : "translate(" + newPositionX + "px, " + newPositionY + "px)"
        });



        // controls on the right and the left
        // nur um nach links und rechts zu steuern
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




        // hiermit wird ausgesucht welches wort gerade aktiv ist. ebenfalls unwichtig.
        $(".word").each(function(){
            if(newPositionX < $(this).offset().left+$(this).outerWidth() && newPositionX > $(this).offset().left){
                var newActiveWord = $(this).attr("id");
                if(activeWord != newActiveWord){
                    $(".active").removeClass("active");
                }
                $(this).addClass("active");
                activeWord = newActiveWord;
                if(activeWord == "ende"){
                    activeWord = "highHoverHide";
                }
            }
        });
        
        


        var ballsizeX = ballsizeDefault;
        var ballsizeY = ballsizeDefault;
        
        
        
    
        
        switch(activeWord){
            
            case "highHoverHide":
                //das ist das einzige mal ein dropdown
                //hier werde ich noch einen timeout einbauen, dass er nicht sofort, wenn man unter dem wert ist wieder hochgeht
                //sollte als autoHideTimeout übertragen werden
                if(!$(".active .selectionWrapper").hasClass("dropDown") && newPositionY < 330){
                    $(".active .selectionWrapper").addClass("dropDown");
                }else if($(".active .selectionWrapper").hasClass("dropDown") && newPositionY > 450){
                    $(".active .selectionWrapper").removeClass("dropDown");
                }
                

                break;

        }
        
        // nur die darstellung des balles für das letzte bild
        if(activeWord == "highHoverHide"){
            $("#ball").addClass("white");
        }else{
            $("#ball").removeClass("white");
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
        // jetzt wirds interessant
        
            var borders = $(this).offset();
            var thisWidth = $(this).outerWidth();
            var thisHeight = $(this).outerHeight();

            if(newPositionX > borders.left && newPositionX < borders.left+thisWidth && newPositionY > borders.top && newPositionY < borders.top+thisHeight){
                // this checks if the leapCoordinates are inside the selection


                // wenn schonmal mouseOver getriggert wird, wird es gelöscht und dann neu hinzugefügt
                
                if(!$(this).hasClass("mouseOver")){
                    $(".active .mouseOver").removeClass("mouseOver");
                    $(this).addClass("mouseOver");
                }

                //dann ist es auch schon irgendwo drauf
                //falls dieser code halt nie ausgeführt wird, werden unten alle hover classes gelöscht
                anywhere = true;

                
                
                //distanceFromBottom gibt mir nur Werte wenn es innerhalb der breite des elementes ist.                
                var distanceFromBottom = getDistanceFromBottom($(this));
                
                if($(this).hasClass("switchTrigger") && distanceFromBottom != false){
                    //switchTrigger are the classes that have the possibility to be pulled down and toggled
                    //sollten in der zukunft dann alle haben. ist hier so, weil es am anfang auch nicht triggerbare elemente gibt
                    
                    
                    //über 30px ist enteredCorrectly, damit man das nicht direkt runterzieht, wenn man von unten reinfährt
                    if(distanceFromBottom > 30){
                        $(this).addClass("enteredCorrectly");
                    }
                    
                    // nur wenn die distance kleiner gleich 30 ist, wird das ganze nach unten verschoben
                    if(distanceFromBottom <= 30 && $(this).hasClass("enteredCorrectly")){
                        $(this).addClass("activatedHold");


                        //addingValue is to create a mapping that it feels dragged down
                        //damit es eben irgendwann auch stoppt
                        var addingValue = Math.min(Math.max(map(translateCount, 0, 30, 1, 0), 0), 1)
                        translateCount += addingValue;
                        
                        
                        $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });

                    }else if(distanceFromBottom > 30 && $(this).hasClass("enteredCorrectly")){
                        //damit es auch wieder hochgeht, wenn ich zurückziehe
                        
                        
                        //verschiedene zurückzieh möglichkeiten
                        if(translateCount > 0 && distanceFromBottom > 40){

                            var subtractValue;
                            
                            //damit es schneller ist wenn es weiter enternt ist.
                            if(distanceFromBottom > 70){
                                subtractValue = Math.min(Math.max(map(translateCount, 0, 30, 0, 2), 0), 1);
                            }else{
                                subtractValue = Math.min(Math.max(map(translateCount, 0, 30, 0, 1), 0), 1);
                            }

                            translateCount -= subtractValue;
                            
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

                    // hier abhängig vom translate Count evtl noch zuvor eine animation nach unten schalten
                    // die animation nach unten muss abhängig von der geschwindigkeit in dem moment sein.
                    // 
                    
                    
                    //abfrage für die animation
                    if(translateCount < 10){
                        
                        // pulledDown wird später noch abhängig von der geschwindigkeit zu diesem zeitpunkt ausgerechnet
                        // es soll darstellen wie weit die elemente noch heruntergezogen werden, wenn man sie praktisch einfach nach unten geschmissen hat
                        var pulledDown = Math.min(Math.max(map(Math.round(dataset.velocityXY), 1, 20, 5, 80), 5), 80);
                        
                        
                        var transformString = 'translate(0px, ' + pulledDown + 'px)';
                        
                        
                        $(this).css({"transform" : transformString, "-webkit-transform" : transformString });
                        $(this).animate({transform: 'translate(0px, 0px)' }, 500, 'easeOutElastic');
                        
                        
/*
                        $(this).animate({transform: transformString }, 500, 'easeInQuint', function(){
                            
                        });
*/
                        
                    
                    
                    }else{
                        $(this).animate({transform: 'translate(0px, 0px)' }, 500, 'easeOutElastic');                        
                    }



                    translateCount=0;
//                    $(this).css({"transform" : "translate(0px, " + translateCount + "px)", "-webkit-transform" : "translate(0px, " + translateCount + "px)", });                            
                    
                        
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










