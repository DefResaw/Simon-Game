var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var isResetting = false;

$("#reset-button").hide();

$("#reset-button").click(function() {
    startOverResetButton();
    initializeGame();
});

//Start the game by pressing on any key which changes the h1 to Level 1
function initializeGame() {
    $(document).one("keydown", function() {
        if (event.keyCode === 32 && !started) {
            $("#level-title").text("Game Starting...");
            setTimeout(function() {
                $("#game-instructions-title, #game-instructions").hide();
                nextSequence();
                started = true;
                $("#level-title").text("Level " + level);
                $("#reset-button").show();
            }, 1250);
        }
        if (event.keyCode !== 32) {
          initializeGame();
        }
    });
}

initializeGame(); // Initial call to set up the keydown event listener

$(".btn").click(function() {
  if (!started || isResetting) {
         return; // If the game has not started, do nothing on button click
     }

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);

  if (!checkAnswer(userClickedPattern.length -1)) {
      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Restarting Game...");

      setTimeout(function() {
        startOver();
      }, 2500 );

  } else {
  playSound(userChosenColour);
}
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        }, 1000);
    }
    return true;
  } else {
      return false;
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

      setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
          }, 100);
}

function startOverResetButton() {
  isResetting = true;
  level = 0;
  gamePattern = [];
  started = false;
  $("#game-instructions-title, #game-instructions").show();
$("#reset-button").hide();
$("#level-title").text("Press Space to Start");
}

function startOver() {
  if(!isResetting) {
  level = 0;
  gamePattern = [];
  started = false;
  nextSequence();
  started = true;
  }
}
