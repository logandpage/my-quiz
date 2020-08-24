// Questions
var questions = [{
  title: "Which of the following function of an array object adds one or more elements to the front of an array and returns the new length of the array?",
  choices: ["unshift", "sort", "splice", "toString"],
  answer: "unshift"
},
{
  title: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
  choices: ["last", "put", "push", "pop"],
  answer: "push"
},
{
  title: " Which built-in method returns the characters in a string beginning at the specified location?",
  choices: ["substr", "getSubstring", "slice", "None of the above."],
  answer: "substr"
},
{
  title: "Which of the following function of an array object adds and/or removes elements from an array?",
  choices: ["toSource", "sort", "unshift", "splice"],
  answer: "splice"
},
{
  title: "Which of the following function of String object combines the text of two strings and returns a new string?",
  choices: ["add", "concat", " merge", "append"],
  answer: "concat"
},
{
  title: "What does HTML stand for?",
  choices: ["Hyper Tag Markup Language", "Hyper Text Markup Language", "Hyper Text Mark Language", "Hyperlinking Text Marking Langauge"],
  answer: "Hyper Text Markup Language"
},
{
  title: "What symbol indicates a tag?",
  choices: ["Angle Brackets e.g. <>", "Curved Brackets e.g. {}", "Commas e.g. ''", "Exclamation Mark e.g. !"],
  answer: "Angle Brackets e.g. <>"
},
{
  title: "Whic built-in method calls a function for each element in the array?",
  choices: ["while", "loop", "forEach", "None of the above"],
  answer: "forEach"
},
{
  title: "Which of the following will write the message 'ALERT!' in an alert box?",
  choices: ["alertBox('ALERT!')", "alert('ALERT!')", "msgAlert('ALERT')", "alert('ALERT!')"],
  answer: "alert('ALERT!')"
},
{
  title: "How do you find the minimum of x and y using JavaScript?",
  choices: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
  answer: "Math.min(x,y)"
},

]


//scores and timers 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

timeLeft = 100;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
  timeLeft--;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(); 
  }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 10 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clear score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
  JavaScript Quiz!
</h1>
<h3>
  Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 10 seconds
function incorrect() {
timeLeft -= 10; 
next();
}

//increases the score by 10 points
function correct() {
score += 10;
next();
}
 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
  endGame();
  return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
  buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
  if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
  } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
  }
  quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}