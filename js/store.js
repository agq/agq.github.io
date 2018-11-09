$(document).ready(function () {
    "use strict";

    $('[data-target=#myModal]').click(function(o) {
        var bid = o.currentTarget.getAttribute('id');
        localStorage.setItem('currentBattery',bid);

        var batteryStored = localStorage.getItem(bid);
        var battery;
        if(batteryStored == "undefined" || batteryStored == null){
            battery = mockBattery();
            localStorage.setItem(bid, JSON.stringify(battery));
        }else{
            battery = $.parseJSON(batteryStored);
        }

        var highest = new Number(battery.highestT);
        var lowest = new Number(battery.lowestT);
        var gap = new Number(highest - lowest);

        var data = [];
        for (var i=0;i<22;i++){
            for (var j=0;j<40;j++){
                var r= (lowest+Math.random() * gap).toFixed(1);
                data.push([i,j,r]);
            }
        }

        data = data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });

        var option = myChart.getOption();
        option.series[0].data=data;
        myChart.setOption(option);
    });


    var myChart = echarts.init(document.getElementById('main'));


    var hours = [];

    for (var i=1;i<41;i++)
    {
        hours.push(i);
    }
    var days = [];
    for (var i=1;i<23;i++)
    {
        days.push(i);
    }

    var data = [];
    for (var i=0;i<22;i++){
        for (var j=0;j<40;j++){
            var r= (25+Math.random() * 6).toFixed(1);
            var t;
            if(r>28){
                r=r-6;
            }
            data.push([i,j,r]);
        }
    }

    data = data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });

    var option = {
        textStyle:{
            color:"#fff"
        },
        tooltip: {
            position: 'top'
        },
        animation: false,
        grid: {
            height: '50%',
            y: '10%'
        },
        xAxis: {
            type: 'category',
            data: hours,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: days,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 20,
            max: 30,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            name: '温度',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: false
                }
            },
            tooltip:{
                formatter: function (params, ticket, callback) {
                    return params.value[2]+' &#8451;';
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 100,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



    //soc chart
    var socChart = echarts.init(document.getElementById('socChart'));

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

    var socSerialData = [];
    var wSerialData = [];
    for(var i=0;i<10;i++){
        socSerialData.push(94);
        wSerialData.push(null);
    }
    for(var i=10;i<15;i++){
        socSerialData.push(96);
        wSerialData.push(null);
    }
    for(var i=15;i<16;i++){
        socSerialData.push(98);
        wSerialData.push(null);
    }

    for(var i=16;i<30;i++){
        socSerialData.push((88-(i-16)*3+Math.random() * 10).toFixed(0));
        wSerialData.push((104+(i-16)*10+Math.random() * 50).toFixed(0));
    }

    var myDate = new Date();
    var hour = myDate.getHours();
    var stopAt = new Number(hour)*2;
    for(var i=stopAt;i<30;i++){
        socSerialData[i]=null;
        wSerialData[i]=null;
    }

    var socChartOption = {
        textStyle:{
            color:"#fff"
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            containLabel: true
        },
        legend: {
            textStyle: {
                color:"#fff",
                fontSize: 16
            },
            data: ['SOC','放电功率'],
            show: true
        },
        xAxis: [{
            type: 'category',

            axisTick: {
                alignWithLabel: true
            },
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }

            },
            data: timeSerialData
        }],
        yAxis: [{
            type: 'value',
            name: 'SOC',
            min: 0,
            max: 100,
            position: 'right',
            axisLabel: {
                formatter: '{value} %'
            },
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: 'black',
                    type: 'dashed'
                }
            }
        }, {
            type: 'value',
            name: '放电功率',
            min: 0,
            max: 500,
            position: 'left',
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: 'black',
                    type: 'dashed'
                }
            }
        }],
        series: [{
            name: 'SOC',
            type: 'line',
            smooth: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    color: '#2cabe3',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },
            areaStyle: {normal: {color: '#3D3D3D'}},
            data: socSerialData
        }, {
            name: '放电功率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    color: '#96a2b4',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },

            data: wSerialData
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    socChart.setOption(socChartOption);

});
