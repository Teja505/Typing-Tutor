//Author: teja Addaakula
const levels = {
  easy: 30,
  medium:25 ,
  hard: 20
};
let SmaxScore1;
let SmaxScore2;
let SmaxScore3;
const ShighScoreElt= document.querySelector('#ShighScore');
function changeDifficulty(num){
  if(num === 1){
    randomWord.fontcolor("green");
    currentLevel = levels.easy;
    time=levels.easy;
    score=0;
    premessage.innerHTML="";
    document.querySelector("#diff").innerHTML = "Easy";
    timeEl.innerHTML = 'Time Left '+Math.floor(time/60) + 'm:'+ Math.floor(time%60)+'s';
    scoreEl.innerHTML ='Score :'+score;
    text.focus();
    if((localStorage.getItem('ShighScore1'))==null){
      localStorage.setItem('ShighScore1',0);
    }
    ShighScoreElt.innerHTML ='High Score:'+localStorage.getItem('ShighScore1');
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
    if((localStorage.getItem('ShighScore2'))==null){
      localStorage.setItem('ShighScore2',0);
    }
    ShighScoreElt.innerHTML ='High Score:'+localStorage.getItem('ShighScore2');
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
if((localStorage.getItem('ShighScore3'))==null){
  localStorage.setItem('ShighScore3',0);
}
ShighScoreElt.innerHTML ='High Score:'+localStorage.getItem('ShighScore3');
  }
}

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const words=[...senset];


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
      ShighScoreElt.innerHTML = 'High Score :'+score;
      if(score >= SmaxScore1){
             localStorage.setItem('ShighScore1',score);
         }
         SmaxScore1 = localStorage.getItem('ShighScore1');
         if(SmaxScore1==0){
           SmaxScore1=1;
           localStorage.setItem('ShighScore1',1);
         }
         ShighScoreElt.innerHTML = 'High Score :'+SmaxScore1;
         if(SmaxScore1==score){
           h=1;
         }
    }
    else if(currentLevel==levels.medium){
      ShighScoreElt.innerHTML ='High Score :'+ score;
      if(score >= SmaxScore2){
             localStorage.setItem('ShighScore2',score);
         }
         SmaxScore2 = localStorage.getItem('ShighScore2');
         if(SmaxScore2==0){
           SmaxScore2=1;
           localStorage.setItem('ShighScore2',1);
         }
         ShighScoreElt.innerHTML ='High Score :'+SmaxScore2;
         if(SmaxScore2==score){
           h=1;
         }}
      else{
        ShighScoreElt.innerHTML = 'High Score :'+score;
        if(score >= SmaxScore3){
               localStorage.setItem('ShighScore3',score);
           }
           SmaxScore3 = localStorage.getItem('ShighScore3');
           if(SmaxScore3==0){
             SmaxScore3=1;
             localStorage.setItem('ShighScore3',1);
           }
           ShighScoreElt.innerHTML = 'High Score :'+SmaxScore3;
           if(SmaxScore3==score){
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
    time = time + 20;}
    else if(currentLevel==levels.medium){
      time=time +16;}
      else{
        time=time+13;
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
