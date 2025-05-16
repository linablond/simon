var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var level = 0;
var run = true;

$(document).one("keypress", nextSequence);

$(".btn").on("click", eventHandler);

function eventHandler(event) {
    userChosenColor = event.delegateTarget.id;
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
    console.log(userClickedPattern[currentLevel]);
    console.log(gamepattern[gamepattern.length - (level - currentLevel)]);
    if (userClickedPattern[currentLevel] === gamepattern[gamepattern.length - (level - currentLevel)]) {
        
        if (level === userClickedPattern.length) {
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];
        }
    }
    else {
        run = false;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $(".btn").off("click", eventHandler);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).one("keypress", startOver);
    }
}


function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var counter = 0;
    var intervalID = setInterval(function() {
        if (run) {
            var randomNumber = Math.round(Math.random() * 3);
            var randomChosenColor = buttonColors[randomNumber];
            var button = $("#" + randomChosenColor);
            button.fadeOut(100).fadeIn(100);

            gamepattern.push(randomChosenColor);
            counter++;
            if (counter === level) {
                clearInterval(intervalID);
            }
        }
        else {
            clearInterval(intervalID);
        }
    }, 500);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var selector = $("#" + currentColor)
    selector.addClass("pressed");
    setTimeout(function () {
        selector.removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamepattern = [];
    userClickedPattern = [];
    run = true;
    nextSequence();
    $(".btn").on("click", eventHandler);
}
