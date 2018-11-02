
var timer_text = document.getElementById('timer_text');
var total_minutes = document.querySelector("#minutes_inputted");
var setTime = document.querySelector("#myBtn");

//Text Inputs
var seconds_input = document.getElementById('seconds_input');
var minutes_input = document.getElementById('minutes_input');
var hours_input = document.getElementById('hours_input');




setTime.addEventListener("click", function(e){
	//e.preventDefault();
	hours_value = hours_input.value;
	minutes_value = minutes_input.value;
	seconds_value = seconds_input.value;
	console.log("Seconds",seconds_value)
	console.log("Minutes",minutes_value)
	console.log("Hours",hours_value);

	var end_date = (hours_value*60*60*1000) + (minutes_value * 60*1000) + (seconds_value * 1000);
	console.log(end_date);

	if(end_date <= 0){
		alert("Please enter a time");
		return;
	}

	// console.log(minutes_value == 0);
	
	// var hours = Math.floor(parseInt(total_minutes.value, 10) / 60);
	// var minutes = parseInt(total_minutes.value, 10) % 60;
	// var seconds = (parseInt(total_minutes.value, 10) * 60) % 60;

	var hours_text = hours_value == 0 ? "00" : hours_value < 10 ? "0" + hours_value : hours_value;
	var minutes_text = minutes_value == 0 ? "00" : minutes_value < 10 ? "0" + minutes_value : minutes_value;
	var seconds_text = seconds_value == 0 ? "00" : seconds_value < 10 ? "0" + seconds_value : seconds_value;

	timer_text.innerHTML = hours_text + ":" + minutes_text + ":" + seconds_text;
	

});




function press_start(){

		//deaden the set_time button
		setTime.onclick = null;

		var duration = getRemainderDuration() - 1;   //I decremented by 1 to cater for the lag that occurs when the timer starts


		//initialization of variables
		var start_button = document.getElementById('start_button');
		var reset_button = document.getElementById('reset_button');


		timer_text.style.color = "#00FF00";		//turn the text colour to green
		start_button.innerHTML = "STOP";		//change button text from 'start' to 'stop'


		//I gave the value of duration to variables timer, hours, minutes and seconds.
		var the_timer = duration, hours, minutes, seconds;
		console.log(the_timer)


		//The variable below is responsible for the tick-tock change of time. It's a fixed function in JS.
	    var my_countdowntimer = setInterval(function(){

	    	var hours = Math.floor(parseInt(the_timer / 3600, 10));
	        var minutes = Math.floor(parseInt(the_timer % 3600, 10) / 60);
	        var seconds = Math.floor(parseInt(the_timer % 3600, 10) % 60);

	        //Assigning values to minutes and seconds with the tenary operator
	        hours = hours < 10 ? "0" + hours : hours;
	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        //Setting the final time.. Since we'd always be counting down from an hour, I left the hour field as '00'
	        timer_text.innerHTML = hours +":" + minutes + ":" + seconds;

	        //Here, we're checking whether the timer has elapsed (00:00:00)
	        if(--the_timer < 0){
	            clearInterval(my_countdowntimer);
	            timer_text.style.color = "#0000FF";
				timer_text.innerHTML = "TIME ELAPSED!!!";
				reset_button.onclick = function(){
					timer_text.style.color = "#FF0000";
					setTime.click();
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
	return (parseInt(timeLeft.charAt(0) + timeLeft.charAt(1)) * 3600) + (parseInt(timeLeft.charAt(3) + timeLeft.charAt(4)) * 60) + parseInt(timeLeft.charAt(6) + timeLeft.charAt(7));

};