$(document).ready(function () {
    "use strict";
    function updateTime() {

        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getUTCMonth()+1;
        var date = myDate.getDate();
        var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
        var today = date+"-"+month;

        $("#theTime").text(time);
        $("#theDate").text(today);
        $("#theYear").text(year);
    }
    updateTime();
    setInterval(updateTime,1000);

});
