
var timer_text = document.getElementById('timer_text');
var inputHour = document.querySelector("#hours");
var inputMin = document.querySelector("#minutes");
var inputSec = document.querySelector("#seconds");

var setTime = document.querySelector("#myBtn");

setTime.addEventListener("click", function() {
	console.log(inputHour);
	
	if(inputHour.value === "") {
		console.log(inputHour.value);
		inputHour.value = "00";
		console.log(inputHour.value);
	}
	
	if(inputMin.value === "") {
		inputMin.value = "00";
	}
	var inputTime = inputHour.value + ":" + inputMin.value + ":" + inputSec.value;
	timer_text.innerHTML = inputTime;
});


start_button.addEventListener("click", function() {
	var duration = (parseInt(inputHour.value) * 3600) + (parseInt(inputMin.value * 60)) + (parseInt(inputSec.value));
	console.log(duration);
	var inputTime = inputHour.value + ":" + inputMin.value + ":" + inputSec.value
	timer_text.innerHTML = inputTime;
	press_start(duration);
});


function press_start(duration){

		var inputTime = inputHour.value + ":" + inputMin.value + ":" + inputSec.value
		console.log(inputTime);
		duration -= 1;	//I decremented by 1 to cater for the lag that occurs when the timer starts

		//initialization of variables
		var start_button = document.getElementById('start_button');
		var reset_button = document.getElementById('reset_button');


		timer_text.style.color = "#00FF00";	//turn the text colour to green
		start_button.innerHTML = "STOP";		//change button text from 'start' to 'stop'


		//I gave the value of duration to variables timer, minutes and seconds.
		var the_timer = duration, minutes, seconds;


		//The variable below is responsible for the tick-tock change of time. It's a fixed function in JS.
	    var my_countdowntimer = setInterval(function(){

	        minutes = parseInt(the_timer / 60, 10)
	        seconds = parseInt(the_timer % 60, 10);

	        //Assigning values to minutes and seconds with the tenary operator
	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        //Setting the final time.. Since we'd always be counting down from an hour, I left the hour field as '00'
	        timer_text.innerHTML = "00:" + minutes + ":" + seconds;

	        //Here, we're checking whether the timer has elapsed (00:00:00)
	        if(--the_timer < 0){
	            clearInterval(my_countdowntimer);
	            timer_text.style.color = "#0000FF";
				timer_text.innerHTML = "TIME ELAPSED!!!";
				reset_button.onclick = function(){
					timer_text.style.color = "#FF0000";
					timer_text.innerHTML = inputTime;
					start_button.innerHTML = "START";
					start_button.onclick = function(){
					press_start(3599);
						}
					}
				start_button.innerHTML = "-----";
				start_button.onclick = null;

	        }
	    }, 1000);


	    //when reset is pressed during countdown
	    reset_button.onclick = function(){
	    		clearInterval(my_countdowntimer);
	    		timer_text.style.color = "#FF0000";
				timer_text.innerHTML = inputTime;
				start_button.innerHTML = "START";
				start_button.onclick = function(){
					console.log("clicked");
					press_start(duration -1);
				}
	    }

	    //when start button is pressed during countdown
	    start_button.onclick = function(){
	    	//if the text on the start-button is 'stop'
	    	if(start_button.textContent === 'STOP'){
	    		clearInterval(my_countdowntimer);
	    		start_button.innerHTML = "START";
	    		timer_text.style.color = "#FFFF00";
	    	}

	    	//if the text on the start-button is 'start'
	    	else if(start_button.textContent === 'START'){
	    		press_start(getRemainderDuration());
	    	}
	    }

}


function getRemainderDuration(){
	//get the string version of the time left
	var timeLeft = timer_text.textContent;

	//extract the seconds and minutes from the string version above and return it
	return (parseInt(timeLeft.charAt(3) + timeLeft.charAt(4)) * 60) + parseInt(timeLeft.charAt(6) + timeLeft.charAt(7));

};