;(function(){
  'use strict';
   var count = 0;
   var error = 0;
   var word;
   var matched = 0;
   var interval;
   var done=0;
   var best;
   function getRandomNumber(min, max) {
      var ran = Math.floor(Math.random() * (max - min) + min);
       return ran;
      };


   //this function will check if we need the new word::
   function end(){
     if(count === word.length)
     { if((localStorage.getItem('besttime')==null)&&parseFloat(accuracy.innerHTML)==100){
       localStorage.setItem('besttime',Number(time.innerHTML));
       wrapper.innerHTML=`
       <div id="end"><center>
       <img  id="wohoo" src="img/wohoo.jfif">
       <br>
       <br>
       <h3 id="end-text"> You've completed the sequence in least Time<h3>
       <center><h3 id="end-text">New record!!!<h3></center>
       <button type="button" class="btn btn-primary btn-sm" onclick="location.reload()" id="reload-button"><i class="fa fa-refresh"></i> refresh</button>
       <center></div>
       `;
     }
     best=localStorage.getItem('besttime');
       if((Number(time.innerHTML)<best)&&parseFloat(accuracy.innerHTML)==100){
       localStorage.setItem('besttime',Number(time.innerHTML));
       wrapper.innerHTML=`
       <div id="end"><center>
       <img  id="wohoo" src="img/wohoo.jfif">
       <br>
       <br>
       <h3 id="end-text"> You've completed the sequence in least Time<h3>
       <center><h3 id="end-text">New record!!!<h3></center>
       <button type="button" class="btn btn-primary btn-sm" onclick="location.reload()" id="reload-button"><i class="fa fa-refresh"></i> refresh</button>
       <center></div>
       `;
     }
     best=localStorage.getItem('besttime');
     besttime.innerHTML=best;
       done=1;
       return;
     }
};

  //this function is main one which generates the lessons/ words
  function generateWords() {

    count = 0;
    //from this array we select any of these...
    var lessons=[...combinations];


    var max = lessons.length;
    //we need to get random number from the above array so pass the parameters
    var num = getRandomNumber(0 , max);
    word = lessons[num];
    // here goes the core code for displaying the contents got from the array;

    var tags = document.getElementsByClassName('this')[0];
      tags.style.background = 'black';


    var newDiv = document.createElement('div');
      newDiv.setAttribute('id' , 'thisClass');
      tags.appendChild(newDiv);


    var tags = document.getElementsByClassName('this')[0];

    for(var i = 0 ; i < word.length ; i++)
    {	var spans = document.createElement('span');
      spans.setAttribute('id' , 'span'+i);
      spans.innerHTML = word[i];
      newDiv.appendChild(spans);

    }

    //this piece of code will highlight the first element
    var cnt = 0;
    highlight(cnt);

  };

  window.onload = function(){
    //on loading the main window generatewords and update the result means show matched = 0 , error = 0 and accuracy
    best=localStorage.getItem('besttime');
    besttime.innerHTML=best;
    generateWords();
    updateResult(matched , error , word.length);
    updateTime();
    };

      //this function is used to highlight .. it will give hint for which letter to type
        function highlight(cnt){
      if(cnt < word.length)
      {
      var get = document.getElementById('span'+ cnt);
      get.style.background = 'cyan';
      get.style.color="black";

      }
      };


    //We will the updated results .. how many characters matched .. errors etc
    function updateResult(matched , errors , totalWords){

      document.getElementById('totalWords').innerHTML = totalWords;
      var correctSpan = document.getElementById('correct');
      var errorSpan = document.getElementById('err');
      var acc = document.getElementById('accuracy');

      correctSpan.innerHTML = matched;
      errorSpan.innerHTML = error;


      var accc = (((matched+errors)-errors)/(matched+errors))*100;
      if(accc>=0){
      acc.innerHTML = accc.toFixed(2)+" %";
    }
    else{
      acc.innerHTML = "0";
    }

    }
    function updateTime(){
      if (interval === undefined) {
        interval = window.setInterval(function(){
        var time = document.getElementsByClassName('time')[0];
        if(done!=1){
        time.innerHTML = Number(time.innerHTML) +1;
      }
        },1000),+"secs";
     };
    }
   //the very important part of the project .. on key down ..
  window.onkeydown = function(event){


  changeColor();

  var hh = event.which;

  function changeColor(){

    var div =   String.fromCharCode(event.which);
     if(event.which === 32)
          {
              div = "space";
          }

          if(event.which === 8)
          {
              div = "bckspace";
          }
          var get = document.getElementById(div);
          get.style.background = 'green';

          setTimeout(function (){

          get.style.background = "black";

                  },150);

          };

  if((hh > 47 && hh<58 ) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh == 32)
  {
    var inputToNum = String.fromCharCode(hh).toLowerCase();
    var cnt = count+1;
    highlight(cnt);


    var check = word.charAt(count);


    if(inputToNum === check)
      {	//this is matched
        var getSpan = document.getElementById('span'+count);
        getSpan.style.color = 'blue';
        getSpan.style.background = 'none';
        matched++;
        count++;
        updateResult(matched , error , word.length);
        end();
       }
    else
      {
        //not matched
       var getSpan = document.getElementById('span'+count);
        getSpan.style.background = 'red';
        getSpan.style.color = 'white';
        error++;
        count++;
        updateResult(matched , error , word.length);
        end();
       }
      }

      }
  }

)();
