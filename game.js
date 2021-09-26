var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];
var level = 0;
var answerCheckPosition = 0;
var waitingForInput = false;
var gameOver = false;

$(document).keydown(function() {
  if ((level == 0) && (waitingForInput == false)) {
    increaseLevel();
    nextSequence();
    waitingForInput = true;
  } else if ((level > 0) && (waitingForInput == true) && (gameOver == true))  {
    location.reload()
  }
})

$(".btn").click(function() {
  buttonColourPressed = $(this).attr('id');
  if (waitingForInput == true) {
    if (level > 0) {

      animateButton(buttonColourPressed);

      
      if ((playerPattern.length + 1) < gamePattern.length) {
        playerPattern.push(buttonColourPressed)
        console.log("player pattern added");
        console.log(playerPattern);
        console.log(gamePattern);
        checkAnswer();

      } else if ((playerPattern.length + 1) == gamePattern.length) {
        waitingForInput == false;
        playerPattern.push(buttonColourPressed);
        console.log("player pattern added + check answer");
        console.log(playerPattern);
        console.log(gamePattern);
        checkAnswer();
      }
    }
  }


});

function increaseLevel() {
  level += 1
  $("#level-title").text("Level " + level + " !");
  console.log(level);
}

function gameOver() {
  level = 0;
  gameOver = true;
  $("#level-title").text("Game Over! Press any key to play again.");
  console.log(level);
}

function checkAnswer() {
  for (var i = 0; i < playerPattern.length; i++) {

    if (playerPattern[i] == gamePattern[i]) {
      console.log("match");
      if (gamePattern.length == playerPattern.length) {
        setTimeout(nextSequence, 500);
      }
    } else {
      console.log("mismatch");
      gameOver();
    }
  }
}

function animateButton(buttonColour) {
  var button = $(".btn").filter(buttonColour);
  console.log(button);
  // Animate button
  $(button).addClass("pressed");
  setTimeout(function() {
    $(button).removeClass("pressed");
  }, 200);

  // Play Audio
  var audioName = "sounds/" + buttonColour + ".mp3";
  var audio = new Audio(audioName);
  audio.play();
}

function nextSequence() {
  playerPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];


  //Add to nextSequence
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  animateButton(randomChosenColour);
}
