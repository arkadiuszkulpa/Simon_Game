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
  } else if (gameOver == true)  {
    location.reload()
  }
})

$(".btn").click(function() {
  buttonColourPressed = $(this).attr('id');
  console.log(buttonColourPressed);
  if (waitingForInput == true) {
    if (level > 0) {

      animateButton($(this).attr('id'));


      playerPattern.push(buttonColourPressed)

      checkAnswer(level);
    }
  }


});

function increaseLevel() {
  level += 1
  $("#level-title").text("Level " + level + " !");
  console.log(level);
}

function gameIsOver() {
  gameOver = true;
  $("#level-title").text("Game Over! Press any key to play again.");
  console.log(level);
}

function checkAnswer(level) {
  if (playerPattern[playerPattern.length - 1] == gamePattern[playerPattern.length - 1]) {
    console.log("match");

    //is sequence finished?
    if (playerPattern.length == gamePattern.length) {
      console.log("sequence finished");
      waitingForInput = false;
      increaseLevel();
      setTimeout(nextSequence, 1000);

    }
  } else {
    console.log("mismatch");
    gameIsOver();
    waitingForInput = false;
  }
}

function animateButton(buttonColour) {
  var button = $("#" + buttonColour);
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
  waitingForInput = true;
}
