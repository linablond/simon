var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var level = 0;

$(document).one("keypress", nextSequence);

$(".btn").on("click", function(event) {
    userChosenColor = event.delegateTarget.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
})

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
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).one("keypress", startOver);
    }
}


function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var counter = 0;
    var intervalID = setInterval(function() {
        var randomNumber = Math.round(Math.random() * 3);
        var randomChosenColor = buttonColors[randomNumber];
        var button = $("#" + randomChosenColor);
        button.fadeOut(100).fadeIn(100);

        playSound(randomChosenColor);
        gamepattern.push(randomChosenColor);
        counter++;
        if (counter === level) {
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
    nextSequence();
}























































/*function checkNumber(number) {
    switch (number) {
        case 1:
            $(".green").fadeOut(100).fadeIn(100);
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case 2:
            $(".red").fadeOut(100).fadeIn(100);
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case 3:
            $(".yellow").fadeOut(100).fadeIn(100);
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case 4:
            $(".blue").fadeOut(100).fadeIn(100);
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        default:
            break;
    }
}
*/

