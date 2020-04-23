var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// This button for starting the game.
$(".btnstart").click(function() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $(".btnstart").fadeOut();
  setTimeout(function() {
    nextSequence();
  }, 2000);
  $("h1").text("Level " + level);
});

// This function is created to start new sequence.
function nextSequence() {
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomnumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  // console.log(gamePattern);
  level++;
  $("h1").text("Level " + level);
}

// This function is created to play sounds.
function playSound(buttonid) {
  var buttonAudio = new Audio("sounds/" + buttonid + ".mp3");
  buttonAudio.play();
}

// This function is created to animate the clicked one.
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function userChosenColor(buttonid) {
  userClickedPattern.push(buttonid);
  // console.log(gamePattern);
  // console.log(userClickedPattern);
  var lastUserAnswer = userClickedPattern.length - 1
  // console.log(lastUserAnswer);
  checkAnswer(lastUserAnswer);
}

$(".btn").on("click", function(event) {
  var buttonClicked = $(this).attr("id")
  animatePress(buttonClicked);
  playSound(buttonClicked);
  userChosenColor(buttonClicked);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Succeed");
    var status = "Succeed";
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var status = "Wrong";
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press a Start Button to Restart")
    $(".btnstart").fadeIn();
  }
}
