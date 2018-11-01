
var timer_text = document.getElementById('timer_text');
var total_minutes = document.querySelector("#minutes_input");
//var total_seconds = document.querySelector("#seconds_input");
var setTime = document.querySelector("#myBtn");



setTime.addEventListener("click", function(){

	if(!total_minutes.value){
		alert("Please input a valid number");
	}

	else {
		
		var hours = Math.floor(parseInt(total_minutes.value, 10) / 60);
		var minutes = parseInt(total_minutes.value, 10) % 60;
		var seconds = (parseInt(total_minutes.value, 10) * 60) % 60;

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		
		timer_text.innerHTML = hours + ":" + minutes + ":" + seconds;
		
		
	}

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
