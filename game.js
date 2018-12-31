var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function makeSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout (function () { //sets a timer to toggle class pressed on and off when user clicks
    $("#"+ currentColor).removeClass("pressed");
  }, 100);
}

//When user presses any key on document, detect keypress and do something
$(document).on("keypress", function() {
  if (!started)//checks to see if game has started, if not, sets the html H1 game level, calls nextSequence method
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true; //sets game started to true.
  }
});

//Detects button clicks from user and does something.
$(".btn").click(function ()
{
  var userChosenColor = $(this).attr("id"); //returns attribute ID value of the button that was clicked
  userClickedPattern.push(userChosenColor); //Pushed user click pattern to an array
  makeSound(userChosenColor); //Plays sound associated with button using attribute ID value
  animatePress(userChosenColor); //adds css class pressed to give a clicking effect.
  checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function (){
        nextSequence();
      }, 1000)
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout (function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver ()
{
  level =0;
  gamePattern = [];
  started = false;

}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut("fast").fadeIn("fast");
    makeSound(randomChosenColor);
}
