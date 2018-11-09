$(document).ready(function () {
    "use strict";
    $(".counter").counterUp({
        delay: 100,
        time: 1200
    });

    $('.vcarousel').carousel({
        interval: 3000
    })




    //mock change soc

    setInterval(mockChangeAll,5000);


    function mockChangeAll() {
        var charts = $('#soccharts').find(".chart");
        charts.each(mockChange);
    }
    function mockChange(index, chart) {
        var percent = Math.round(chart.getAttribute("data-percent"));
        var state = chart.getAttribute("state");
        if(percent == 100){
            state='release';
            chart.setAttribute("state", state);
        }
        if(percent <= 30){
            state='c';
            chart.setAttribute("state", state);
        }

        if(state=='c'){
            percent = percent + 1;
        }else{
            percent = percent - 1;
        }
        chart.setAttribute("data-percent", percent);
        var chart1 = $(chart).data('easyPieChart');
        chart1.update(percent);
    }



    var chargeChart = echarts.init(document.getElementById('chargeChart'));

    var timeSerialData = [];
    for(var i=0;i<9;i++){
        timeSerialData.push('0'+i+':00');
        timeSerialData.push('0'+i+':30');
    }
    for(var i=10;i<24;i++){
        timeSerialData.push(i+':00');
        timeSerialData.push(i+':30');
    }
    timeSerialData.push('24:00');

    //before 6:00, about 50
    var loadSerialData = [];
    var otherLoadSerialData = [];
    var totalLoadSerialData = [];
    for(var i=0;i<15;i++){
        var load = (40+Math.random() * 20).toFixed(0);
        var histLoad = (10+Math.random() * 10).toFixed(0);
        loadSerialData.push(load);
        otherLoadSerialData.push(histLoad);
        totalLoadSerialData.push(new Number(load)+new Number(histLoad));
    }

    //7:00-10:00 climb to 300
    for(var i=15;i<20;i++){
        var load = (30+(i-14)*50+Math.random() * 30).toFixed(0);
        var histLoad = (10+(i-14)*10+Math.random() * 20).toFixed(0);
        loadSerialData.push(load);
        otherLoadSerialData.push(histLoad);
        totalLoadSerialData.push(new Number(load)+new Number(histLoad));
    }

    //10:00-13:00 above 300
    for(var i=20;i<25;i++){
        var load = (300+Math.random() * 40).toFixed(0);
        var histLoad = (10+Math.random() * 10).toFixed(0);
        loadSerialData.push(load);
        otherLoadSerialData.push(histLoad);
        totalLoadSerialData.push(new Number(load)+new Number(histLoad));
    }

    //13:00-15:00 around 300
    for(var i=25;i<30;i++){
        var load = (330+Math.random() * 40).toFixed(0);
        var shidianLoad = (300-Math.random() * 40).toFixed(0);
        var histLoad = (30+Math.random() * 10).toFixed(0);
        loadSerialData.push(load);
        otherLoadSerialData.push(histLoad);
        totalLoadSerialData.push(new Number(load)+new Number(histLoad));
    }



    //15:00-22:00 down to 50
    for(var i=30;i<45;i++){
        var load = (340-(i-29)*20+Math.random() * 40).toFixed(0);
        var histLoad = (340-(i-29)*20+Math.random() * 40).toFixed(0);
        // loadSerialData.push(load);
        // chargeLoadSerialData.push(histLoad);
    }

    //22:00-24:00 about 50
    for(var i=45;i<49;i++){
        var load = (40+Math.random() * 20).toFixed(0);
        var histLoad = (40+Math.random() * 20).toFixed(0);
        // loadSerialData.push(load);
        // chargeLoadSerialData.push(histLoad);
    }


    var myDate = new Date();
    var hour = myDate.getHours();
    var stopAt = new Number(hour)*2;
    for(var i=stopAt;i<49;i++){
        loadSerialData[i]=null;
        otherLoadSerialData[i]=null;
        totalLoadSerialData[i]=null;
    }

    var option = {
        title: {
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
            right: 20,
            orient: 'horizontal',
            textStyle: {
                color:"#fff"
            },
            data: ['总负荷','充电桩负荷', '其他负荷']
        },
        xAxis: {
            type: 'category',
            data: timeSerialData,
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: 'black',
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#96a2b4'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#96a2b4',
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: 'black',
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#96a2b4'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#96a2b4',
                    fontSize: 14
                }
            }
        },
        series: [ {
            name: '总负荷',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: totalLoadSerialData,
            itemStyle: {
                normal: {
                    color: '#58c8da'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        },{
            name: '充电桩负荷',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: loadSerialData,
            itemStyle: {
                normal: {
                    color: '#ff7676'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }, {
            name: '其他负荷',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: otherLoadSerialData,
            itemStyle: {
                normal: {
                    color: '#f7bbbb'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }]
    };
    chargeChart.setOption(option);

});
