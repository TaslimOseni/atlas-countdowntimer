var timer_text = document.getElementById('timer_text');
var setTimeBtn = document.querySelector("#myBtn");

//Text Inputs
var seconds_input = document.getElementById('seconds_input');
var minutes_input = document.getElementById('minutes_input');
var hours_input = document.getElementById('hours_input');

//Buttons
var resetBtn = document.getElementById('reset_button');
var pauseBtn = document.getElementById('pause_button');


//Conversion rate
var second = 1000; // Total Millisecond In One Sec
var minute = second * 60; // Total Sec In One Min
var hour = minute * 60; // Total Min In One Hour
var day = hour * 24; // Total Hour In One Day

var sec_val, min_val, hour_val;

//Sound
var alarm = document.getElementById('player');

var timer;

//Flags
var isPaused = false;
var isCounting;

setTimeBtn.addEventListener('click', function(e){
    
    isCounting = true;

    clearInterval(timer);
    console.log('Button clicked');
    hour_val = hours_input.value;
	min_val = minutes_input.value;
    sec_val = seconds_input.value;
    
    //Converting to milliseconds
    var end_date = (hour_val*60*60*1000) + (min_val * 60*1000) + (sec_val * 1000);
    
    //No date was selected
    if(hour_val == 0 && min_val == 0 && sec_val == 0){
        alert("No time was entered");
        return;
    }

    if(hour_val < 0 || min_val < 0 || sec_val < 0 ){
        alert("Please enter a valid time!!!");
        resetInputs();
        return;
    }

    if(min_val > 60 || sec_val > 60){
        alert("Please enter a valid time!!!");
        resetInputs();
        return;
    }

    var hours_text = hour_val == 0 ? "00" : hour_val < 10 ? "0" + hour_val : hour_val;
	var minutes_text = min_val == 0 ? "00" : min_val < 10 ? "0" + min_val : min_val;
	var seconds_text = sec_val == 0 ? "00" : sec_val < 10 ? "0" + sec_val : sec_val;

	timer_text.innerHTML = hours_text + ":" + minutes_text + ":" + seconds_text;

    function showTimer(){
        if(!isPaused){
            end_date = end_date - 1000;
        }
        if(end_date <= 0){
            isCounting = false;
            timer_text.style.color = "#FF0000";
            timer_text.innerHTML = "TIME UP!";
            alarm.play();
            return;
        }

        var hours = Math.floor((end_date % day) / hour); // Get Remaining Hours
        var minutes = Math.floor((end_date % hour) / minute); // Get Remaining Min
        var seconds = Math.floor((end_date % minute) / second); // Get Remaining Sec

        hours_text = hours == 0 ? "00" : hours < 10 ? "0" + hours : hours;
        minutes_text = minutes == 0 ? "00" : minutes < 10 ? "0" + minutes : minutes;
        seconds_text = seconds == 0 ? "00" : seconds < 10 ? "0" + seconds : seconds;

        timer_text.innerHTML = hours_text + ":" + minutes_text + ":" + seconds_text;
    }
    
    timer = setInterval(showTimer, 1000); // Display Timer In Every 1 Sec

    e.preventDefault();
});

resetBtn.addEventListener('click', function(){
    isCounting = false;
    timer_text.style.color = "#00FF00"
    clearInterval(timer);
    resetInputs();
    alarm.pause();
    alarm.currentTime = 0;
    timer_text.innerHTML = "00:00:00";
    pauseBtn.innerHTML = "PAUSE";
});

pauseBtn.addEventListener('click', function(){
    if(isCounting){
        console.log("Pausing");
        isPaused = !isPaused;
        if(isPaused){
            pauseBtn.innerHTML = "PLAY"; 
            timer_text.style.color = "#FFFF00";
        }else{
            pauseBtn.innerHTML = "PAUSE";
        }
    }else{
        alert("The timer is not on, cant pause!!!");
    }
})

function resetInputs(){
    seconds_input.value = "";
    minutes_input.value = "";
    hours_input.value = "";
}