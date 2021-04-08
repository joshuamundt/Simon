//variables
let buttonColours=["red","green","yellow","blue"];
let gamePattern=[];
let userClickedPattern=[];
let started=false;
let level=0;

//key down
$(document).keydown(()=>{
    if(!started){
        $("#level-title").text(`level ${level}`);
        nextSequence();
        started=true;
    }
});

//next sequence
function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text(`level ${level}`);
    let randomNumber=Math.floor(Math.random()*buttonColours.length);
    let randomColour=buttonColours[randomNumber];
    gamePattern.push(randomColour);
    $(`#${randomColour}`).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomColour);
    level++;
}
//play sound
function playSound(sound){
    new Audio(`sounds/${sound}.mp3`).play();
}
//clicking color buttons && must use function bec we use (this)
$(".btn").click(function(){
    let clickedColour=$(this).attr("id");
    playSound(clickedColour);
    animateButton(clickedColour);
    userClickedPattern.push(clickedColour);
    validateForNext(userClickedPattern.length-1);

});

//animating button
function animateButton(input){
    $(`#${input}`).addClass("pressed");
    setTimeout(()=>{
        $(`#${input}`).removeClass("pressed");
    },200);
}

//validate for next step
function validateForNext(inn){
    if(gamePattern[inn]===userClickedPattern[inn]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("#level-title").text(`game over your level was (${level})    press any key to to restart the game`);
        startOver();
    }
}

//reset game
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}







