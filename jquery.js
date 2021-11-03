var playing = false;
var score;
var trialsLeft;
var fruits = ['apples', 'banana', 'cherries', 'grapes', 'heart', 'mango', 'orange', 'peach', 'pears', 'watermelon'];
var step;
var action; // used fro setInterval
$(function(){

    // click on start reset button 
$('#startreset').click(function(){

        //we are playing
        if(playing == true){
            // reload the page
            location.reload();
        }else {

            // we are not playing;
            playing = true; //game initiated;

            //set score to 0;
            score = 0;//set the score to 0;
            $('#scorevalue').html(score);

            //show trials left
            $('#trialsLeft').show();
            trialsLeft= 3;
            addHeart();
            //hide game over box;
            $('#gameover').hide();

            //change button text to reset game
             $('#startreset').html("Reset Game");


             startAction();

        }
});
 
$('#fruit1').mouseover(function(){
    score++;
    $('#scorevalue').html(score); //update;
    document.getElementById('slicesound').play(); //playsound;
    // $('#slicesound')[0].play();
    //stop fruit and hide it
    clearInterval(action);


        //hide fruit
        $('#fruit1').hide('explode', 500); //slice fruit

    //send  new fruit
    setTimeout(startAction, 500)
   


})

function addHeart(){
    //use it for not repeating heart when add it;
    $('#trialsLeft').empty();
    for(var i=0; i< trialsLeft; i++){
        $('#trialsLeft').append('<img src="images/heart.png" class="life">');
    }
}
function startAction(){

    //generate a fruit
   $('#fruit1').show();
   chooseFruit(); //choose a random fruit;
     $('#fruit1').css({'left': Math.round(550*Math.random()), 'top': -50});
//random position

//generate random step
step = 1+ Math.round(5*Math.random()); //change step
//move fruit down by one step every 10ms 
action = setInterval(function(){
   $('#fruit1').css('top', $('#fruit1').position().top + step);

//check if the fruit is too low
if($('#fruit1').position().top > $("#fruitsContainer").height()){
    //check if we have trials left;
    if(trialsLeft > 1){
        $('#fruit1').show();
        chooseFruit(); //choose a random fruit;
          $('#fruit1').css({'left': Math.round(550*Math.random()), 'top': -50});
     //random position
     
     //generate random step
        step = 1+ Math.round(5*Math.random()); //change step
        
                    //reduce trials by one
                    trialsLeft --;
                    //populate trialsleft box
                 addHeart();
    
    } else{// game over
           playing = false; //we are not playing anymore;
           $('#startreset').html("Start Game");   //change button to Start Game  
            $('#gameover').show();
            $('#gameover').html('<p>Game Over!</p><p>Your score is '+ score +'</p>')
            $('#trialsLeft').hide();
                stopAction();

    }
}

}, 10)

    }

function chooseFruit(){
    $('#fruit1').attr('src', 'images/' + fruits[Math.round(Math.random()*10)] + '.png');
  
}
    // Stop dropping fruits;
 function stopAction(){
     clearInterval(action);
     $('#fruit1').hide();
 }

});





