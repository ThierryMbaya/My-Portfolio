var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level" + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];

   level++;
   $("h1").html("Level " + level);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)

  playSound(randomChosenColor)
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");},200);

      startOver();
    }
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("h1").text("Game Over, Press Any Key to Restart")
    }
