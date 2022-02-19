let buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let level = 0

var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function user(){
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)
})


function nextSequence(){

    userClickedPattern = []

    $("#level-title").text("level " + level)

    level++

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour)
    animatePress(randomChosenColour)
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        const newLocal = "Game Over press any key to start";
        $("h1").text(newLocal)
        $("body").addClass("game-over")
        let wrongSound = new Audio("sounds/wrong.mp3")
        wrongSound.play()
        setTimeout(function(){
            $("body").removeClass("game-over")
        },1000)

        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}