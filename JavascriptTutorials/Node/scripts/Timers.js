require("linqjs");

var timerExpirations = 0;

setImmediate(() => console.log("Immediate"));

var timer = setInterval(() => 
{ 
    console.log('Heh');  
    timerExpirations++;
    if (timerExpirations >= 10)
        clearInterval(timer);
}, 1);