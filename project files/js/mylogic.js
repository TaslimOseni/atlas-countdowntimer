var timer_text = document.getElementById('timer_text');
var setTimeBtn = document.querySelector("#myBtn");

//Text Inputs
var seconds_input = document.getElementById('seconds_input');
var minutes_input = document.getElementById('minutes_input');
var hours_input = document.getElementById('hours_input');

var resetBtn = document.getElementById('reset_button');

var second = 1000; // Total Millisecond In One Sec
 var minute = second * 60; // Total Sec In One Min
 var hour = minute * 60; // Total Min In One Hour
 var day = hour * 24; // Total Hour In One Day

var sec_val, min_val, hour_val;

var timer;

setTimeBtn.addEventListener('click', function(e){
    
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

    function showTimer(){
        end_date = end_date - 1000;
        if(end_date <= 0){
            timer_text.style.color = "#0000FF";
            timer_text.innerHTML = "TIME ELAPSED!!!";
            return;
        }

        // var days = Math.floor(remain / day); // Get Remaining Days
        var hours = Math.floor((end_date % day) / hour); // Get Remaining Hours
        var minutes = Math.floor((end_date % hour) / minute); // Get Remaining Min
        var seconds = Math.floor((end_date % minute) / second); // Get Remaining Sec

        var hours_text = hours == 0 ? "00" : hours < 10 ? "0" + hours : hours;
        var minutes_text = minutes == 0 ? "00" : minutes < 10 ? "0" + minutes : minutes;
        var seconds_text = seconds == 0 ? "00" : seconds < 10 ? "0" + seconds : seconds;

        timer_text.innerHTML = hours_text + ":" + minutes_text + ":" + seconds_text;
    }
    
    // console.log("Selected", sec_val, min_val, hour_val);
    // console.log("Ending",end_date);

    

    // timer_text.innerHTML = hours_text + ":" + minutes_text + ":" + seconds_text;
    timer = setInterval(showTimer, 1000); // Display Timer In Every 1 Sec

    e.preventDefault();
});

resetBtn.addEventListener('click', function(){
    console.log("Restting");
    clearInterval(timer);
    resetInputs();
    timer_text.innerHTML = "00:00:00";
})

function resetInputs(){
    seconds_input.value = "";
    minutes_input.value = "";
    hours_input.value = "";
}