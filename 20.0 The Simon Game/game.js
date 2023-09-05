// Game logic

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        startTracker = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Randomly choose a color from buttonColours and add it to the gamePattern
function nextSequence() {

    // Reset userClickedPattern to an empty array
    userClickedPattern = [];

    // Display proper level title    
    level++;
    $("#level-title").text("Level " + level);

    // Generate a random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play corresponding sounds
    playSound(randomChosenColour);
}

// Take the name of the color and play the corresponding sound
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Add animations to the user click
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {$("#" + currentColour).removeClass("pressed")}, 150);
}

// Compare system generated sequence with user entered sequence
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Successful!");
        
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    } else {
        console.log("Unsuccessful!");
        
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 300)

        // Game over, reset the game
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}