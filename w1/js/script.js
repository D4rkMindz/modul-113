var myfont_face = "Arial"; //Schriftfarbe
var myfont_size = "24"; //Schriftgrösse
var myfont_color = "#ffffcc"; //Schriftfarbe
var myback_color = "#000066"; //Hintergrundfarbe
var mywidth = 150; //Breite der Box
var my12_hour = 0; //24 Stunden => 1; 12 Stunden mit AM/PM => 0
var dn = "";
var myclock = "";

// create LiveClock element
document.write('<div id="LiveClock" style="width:'+mywidth+'px; background-color:'+myback_color+'"></div>');

/**
 * Render clock with current time into DOM
 */
function show_clock() {
    // Create new Date object
    var Digital = new Date();
    // Get date hours
    var hours = Digital.getHours();
    // Get date minutes
    var minutes = Digital.getMinutes();
    // Get date seconds
    var seconds = Digital.getSeconds();

    // Run the code below if my12_hour is true
    if (my12_hour) {
        // Add AM or PM according to hour value
        dn = "AM";
        if (hours > 12) {
            dn = "PM";
            hours = hours - 12;
        }
        // Set hours to 12 if 0
        if (hours == 0) {
            hours = 12;
        }
    } else {
        // DN is empty
        dn = "";
    }
    // Append zero if minutes is less than 9
    if (minutes <= 9) {
        minutes = "0"+minutes;
    }
    // Append zero if seconds is less than 9
    if (seconds <= 9) {
        seconds = "0"+seconds;
    }
    // Create HTML string to insert into DOM
    myclock += '<p style="color:'+myfont_color+'; font-family:'+myfont_face+'; font-size:'+myfont_size+'pt;">';
    myclock += hours+':'+minutes+':'+seconds+' '+dn;
    myclock += '</p>';
    // Query DOM to replace Element with ID LiveClock with HTML (myclock)
    var el = document.getElementById("LiveClock");
    el.innerHTML = myclock;
    // Update time every second (1000ms)
    setTimeout("show_clock()",1000);
}
// Check if addEventListener exists on document object
if(document.addEventListener){
    // Add eventlistener to execute script after DOM Content is completely loaded
    document.addEventListener('DOMContentLoaded', show_clock, false);
} else {
    // Use fallback to attach callback method on 'onload' method (same as above, but works in older browsers too)
    window.attachEvent('onload', show_clock, false);
}