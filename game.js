
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];



document.addEventListener('click', nextSequence);

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var audioName = "sounds/" + randomChosenColour + ".mp3";
  var audio = new Audio(audioName);
  audio.play();
}
