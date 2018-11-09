$(document).ready(function () {
    "use strict";

    //mock change soc
    var interval = 5000;
    setInterval(mockChangeAll,interval);
    mockChangeAll();

    function mockChangeAll() {
        var charts = $('#soccharts').find(".chart");
        charts.each(mockChange);
    }
    function mockBattery(){
        var battery = {};
        battery.totalV='704 V';
        var a= (74+Math.random() * 40).toFixed(0);
        battery.totalA= a+' A';

        battery.highestV = '32 V';
        battery.lowestV = '32 V';

        var highT= (24+Math.random() * 2).toFixed(0);
        var lowT= (22+Math.random() * 2).toFixed(0);
        battery.highestT = highT;
        battery.lowestT = lowT;
        battery.percent = (Math.random() * 100).toFixed(0);
        battery.state='charge';

        return battery;
    }

    function mockChange(index, chart) {

        var bid = chart.getAttribute("bid");

        var batteryStored = localStorage.getItem(bid);
        var battery;
        if(batteryStored == "undefined" || batteryStored == null){
            battery = mockBattery();
            localStorage.setItem(bid, JSON.stringify(battery));
        }else{
            battery = $.parseJSON(batteryStored);
        }
        battery.bid = bid;

        //mock percent
        var state = battery.state;
        if(state!='free'){
            var percent = new Number(battery.percent);

            if(percent == 100){
                state='release';
                battery.state = state;
            }
            if(percent <= 30){
                state='charge';
                battery.state = state;
            }

            if(state=='charge'){
                percent = percent + 1;
            }else{
                percent = percent - 1;
            }
            battery.percent = percent;
        }

        //mock temperature
        var highT= (24+Math.random() * 2).toFixed(0);
        var lowT= (22+Math.random() * 2).toFixed(0);
        battery.highestT = highT;
        battery.lowestT = lowT;

        localStorage.setItem(bid, JSON.stringify(battery));

        updateBatteryChart(battery, chart);
    }

    function updateBatteryChart(batteryObject, chart){

        //update total A
        if(batteryObject.state=='charge'){
            var selector = "#"+batteryObject.bid+" [propname=totalA]";
            $(selector).text('+148 A');
        }else{
            var selector = "#"+batteryObject.bid+" [propname=totalA]";
            $(selector).text('-148 A');
        }

        //update temperature
        var selectorHighestT = "#"+batteryObject.bid+" [propname=highestT]";
        $(selectorHighestT).text(batteryObject.highestT+" °C");

        var selectorLowestT = "#"+batteryObject.bid+" [propname=lowestT]";
        $(selectorLowestT).text(batteryObject.lowestT+" °C");


        var easyChart = $(chart).data('easyPieChart');
        if(batteryObject.percent <= 50){
            easyChart.options.barColor = '#00c292';
        }else{
            easyChart.options.barColor = '#13dafe';
        }
        easyChart.update(batteryObject.percent);
    }

});
