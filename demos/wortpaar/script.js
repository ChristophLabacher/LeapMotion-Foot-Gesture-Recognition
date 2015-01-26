$(document).ready(function()	{
	width = $(window).width();
	height = $(window).height();
	
	var ballsizeDefault = 50;
	var ballsizeX, ballsizeY;
	
	showGestureVis = false;
	showText = false;
    
    var activeWord;
    
    
    var marginOffset = 0;
    
    var startEndTime = 0;


    // Initializing the HTML-Structure
    //<div class='thin'>hier lernst du ein bisschen die steuerung und die feedbackmöglichkeiten kennen</div>
    $("body").append(  
        "<div id='ball'></div>" + 
        "<div id='indicator'></div>" +
        "<div id='wordwrapper'>" + 
            "<div class='word' id='introduction'><div class='wordText'>Neige deinen Fuß zum rechten Rand um zu starten.</div></div>" + 
            "<div class='word' id='normal'><div class='wordText'>normal</div></div>" + 
            "<div class='word' id='langsam'><div class='wordText'>langsam</div></div>" +
            "<div class='word' id='hektisch'><div class='wordText'>hektisch</div></div>" +
            "<div class='word' id='ruhig'><div class='wordText'>ruhig</div></div>" +
            "<div class='word' id='laut'><div class='wordText'>laut</div></div>" +
            "<div class='word' id='leise'><div class='wordText'>leise</div></div>" +
            "<div class='word' id='ende'><div class='wordText'>Ende des ersten Teils</div></div>" + 
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
        var newPositionX = map(dataset.position.x, 400, 1000, 0, width);
        var newPositionY = map(dataset.position.y, 200, 600, 0, height);


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

        }else if(newPositionX < $("#hektisch").offset().left+$("#hektisch").outerWidth()){
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
                startEndTime = Date.now();
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
                muteEverything();
                break;
            
            case 1:
                $("#ball").removeClass();
                muteEverything();
                break;
            
            case 2:    
                if(!$("#ball").hasClass("slow")){
                    $("#ball").removeClass();
                }
                muteEverything();
                $("#ball").addClass("slow");
                // funktioniert im prinzip, ist jedoch noch ungenau, da css-easings immer neustarten
                
                break;

            case 3:
                $("#ball").removeClass();

                ballsizeX = 800;
                ballsizeY = 800;

                newPositionX = map(dataset.position.x, 300, 1100, -600, width+600);
                newPositionY = map(dataset.position.y, 200, 600, 0, height);
                
                muteEverything();

                break;


            case 4:
                $("#ball").removeClass();
                $("#ball").addClass("back");
                ballsizeX = 15; //fern funktioniert irgendwie nicht so gut.
                ballsizeY = 15;

                newPositionX = map(dataset.position.x, 300, 1100, 0+300, width-300);
                newPositionY = map(dataset.position.y, 200, 600, 400, 500);
                
                muteEverything();

                break;



            case 5:
                $("#ball").removeClass();


                var posAdd = Math.random()*14+1;
                
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;                    
                newPositionX += posAdd*plusOrMinus;
                
                plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                newPositionY += posAdd*plusOrMinus;
                

                if (!hecticSound.playState) {
                    muteEverything();
                    hecticSound.play();
                }
                
                
                    
                break;

            
            case 6:
                $("#ball").removeClass();
                muteEverything();
                //bei ruhig noch einen damper einbauen
                //dadurch auch z.B. langsam abdecken
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
                

                if (!loudSound.playState) {
                    muteEverything();
                    loudSound.play();
                }
                

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


                if (!quietSound.playState) {
                    muteEverything();
                    quietSound.play();
                }
                
                $("#ende .wordText").html("Ende des ersten Teils");

                break;
                
                
            case 9:
                $("#ball").removeClass();
                
                muteEverything();
                var dateNow = Date.now();


                if(dateNow - startEndTime > 3000){
                    ballsizeX = 30;
                    ballsizeY = 30;                    
                    $("#ende .wordText").html("Jetzt.")
                }else if(dateNow - startEndTime > 2000){
                    ballsizeX = 15;
                    ballsizeY = 15;
                    $("#ende .wordText").html("Ende des ersten Teils in 3, 2, 1")
                }else if(dateNow - startEndTime > 1000){
                    ballsizeX = 25;
                    ballsizeY = 25;
                    
                    $("#ende .wordText").html("Ende des ersten Teils in 3, 2,");
                    
                }else{
                    ballsizeX = ballsizeDefault;
                    ballsizeY = ballsizeDefault;
                    
                    $("#ende .wordText").html("Ende des ersten Teils in 3,");
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
	
   
    soundManager.onready(function() {
        soundManagerReady = true;
        initializeHecticSound();
        initializeLoudSound();
        initializeQuietSound();
        
    });

	
});

var soundManagerReady;

var hecticSound;
var loudSound;
var quietSound;

function muteEverything(){

    if(soundManagerReady){
        soundManager.stopAll();
/*
        quietSound.pause();
        hecticSound.pause();
        loudSound.pause();
*/
    }
    
}

// ### SoundManager


function initializeHecticSound(){

        
    var newSoundID = "hectic";
    var newSoundURL = "/demos/wortpaar/experiencesounds/hectic.mp3";

    hecticSound = soundManager.createSound({
        id: newSoundID,
        url: newSoundURL,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
            console.log('The sound '+ newSoundID +' loaded!');
        },
        volume: 100
    });
        
    
}

function initializeLoudSound(newID){

        
    var newSoundID = "loud";
    var newSoundURL = "/demos/wortpaar/experiencesounds/loud.mp3";
    
    loudSound = soundManager.createSound({
        id: newSoundID,
        url: newSoundURL,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
            console.log('The sound '+ newSoundID +' loaded!');
        },
        volume: 100
    });
        
    
}

function initializeQuietSound(newID){

        
    var newSoundID = "quiet";
    var newSoundURL = "/demos/wortpaar/experiencesounds/quiet.mp3";

    quietSound = soundManager.createSound({
        id: newSoundID,
        url: newSoundURL,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
            console.log('The sound '+ newSoundID +' loaded!');
        },
        volume: 100
    });
        
    
}




