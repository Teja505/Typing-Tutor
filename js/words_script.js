//Author: teja Addaakula
const levels = {
  easy: 11,
  medium:10 ,
  hard: 8
};
let maxScore1;
let maxScore2;
let maxScore3;
const highScoreElt= document.querySelector('#highScore');
function changeDifficulty(num){
  if(num === 1){
    currentLevel = levels.easy;
    time=levels.easy;
    score=0;
    premessage.innerHTML="";
    document.querySelector("#diff").innerHTML = "Easy";
    timeEl.innerHTML = 'Time Left '+Math.floor(time/60) + 'm:'+ Math.floor(time%60)+'s';
    scoreEl.innerHTML ='Score :'+score;
    text.focus();
    if((localStorage.getItem('highScore1'))==null){
      localStorage.setItem('highScore1',0);
    }
    highScoreElt.innerHTML ='High Score:'+localStorage.getItem('highScore1');
  }
  else if(num === 2){
    currentLevel = levels.medium;
    time=levels.medium;
    score=0;
    premessage.innerHTML="";
    document.querySelector("#diff").innerHTML = "Medium";
    timeEl.innerHTML = 'Time Left '+Math.floor(time/60) + 'm:'+ Math.floor(time%60)+'s';
    scoreEl.innerHTML = 'Score :'+score;
    text.focus();
    if((localStorage.getItem('highScore2'))==null){
      localStorage.setItem('highScore2',0);
    }
    highScoreElt.innerHTML ='High Score:'+localStorage.getItem('highScore2');
  }
  else{
    currentLevel = levels.hard;
    time=levels.hard;
    score=0;
    premessage.innerHTML="";
    document.querySelector("#diff").innerHTML = "Hard";
    timeEl.innerHTML = 'Time Left '+Math.floor(time/60) + 'm:'+ Math.floor(time%60)+'s';
    scoreEl.innerHTML = 'Score :'+score;
text.focus();
if((localStorage.getItem('highScore3'))==null){
  localStorage.setItem('highScore3',0);
}
highScoreElt.innerHTML ='High Score:'+localStorage.getItem('highScore3');
  }
}

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const words=[...wordset];

// Init word
let randomWord;
let h=0;
// Init score
let score = 0;

// Init time

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
  message.innerHTML="";
}

// Update score
function updateScore() {
  if(time>=0){
  score++;
}
    scoreEl.innerHTML ='Score :'+score;
    if(currentLevel==levels.easy){
      highScoreElt.innerHTML = 'High Score :'+score;
      if(score > maxScore1){
             localStorage.setItem('highScore1',score);
         }
         maxScore1 = localStorage.getItem('highScore1');
         if(maxScore1==0){
           maxScore1=1;
           localStorage.setItem('highScore1',1);
         }
         highScoreElt.innerHTML = 'High Score :'+maxScore1;
         if(maxScore1==score){
           h=1;
         }
    }
    else if(currentLevel==levels.medium){

      highScoreElt.innerHTML ='High Score :'+ score;
      if(score > maxScore2){
             localStorage.setItem('highScore2',score);
         }
         maxScore2 = localStorage.getItem('highScore2');
         if(maxScore2==0){
           maxScore2=1;
           localStorage.setItem('highScore2',1);
         }
         highScoreElt.innerHTML ='High Score :'+maxScore2;
         if(maxScore2==score){
           h=1;
         }
       }
      else{
        highScoreElt.innerHTML = 'High Score :'+score;
        if(score >maxScore3){
               localStorage.setItem('highScore3',score);
           }
           maxScore3 = localStorage.getItem('highScore3');
           if(maxScore3==0){
             maxScore3=1;
             localStorage.setItem('highScore3',1);
           }
           highScoreElt.innerHTML = 'High Score :'+maxScore3;
           if(maxScore3==score){
             h=1;
           }
      }
}

// Update time
function updateTime() {
  time--;
  if(time>=0){
  timeEl.innerHTML = 'Time Left '+Math.floor(time/60) + 'm:'+ Math.floor(time%60)+'s';
}
  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  if(h==1){
    actual.innerHTML=`
    <div id="endgame-div1"><center>
    <img  id="highscore-img" src="img/highscore.jfif">
    <br>
    <br>
    <h3 id="end-text">New High Score!!!!<h3>
    <center><h3 id="end-text">Your Score: ${score}<h3></center>
    <button type="button" class="btn btn-primary btn-sm" onclick="location.reload()" id="reload-button"><i class="fa fa-refresh"></i> refresh</button>
    <center></div>
    `;
  }
  else{
  actual.innerHTML = `
  <div id="endgame-div2">
    <h1 id="endgame-heading">Time's up</h1>
    <p id="end-stmt">Your final score is ${score}</p>
    <button type="button" class="btn btn-outline-primary" onclick="location.reload()">reload</button>
    </div>
  `;

  actual.style.display = 'flex';
}
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if(currentLevel==levels.easy){
    time = time + 5;}
    else if(currentLevel==levels.medium){
      time=time +4;}
      else{
        time=time+3;
      }

    updateTime();
    correct();
  }

});
function correct()
{
  message.innerHTML="correct";
  setTimeout ( "done()", 500 );
}
function done( )
{
  message.innerHTML="Typing...";

}
