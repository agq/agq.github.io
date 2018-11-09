$(document).ready(function () {
    "use strict";
    $(".counter").counterUp({
        delay: 100,
        time: 1200
    });

    $('.vcarousel').carousel({
        interval: 3000
    })


    activeDate();

    function activeDate() {
        var dayWeathers =  $('#weather').find("li");
        var week = new Date().getDay();
        if(week > 0){
            $(dayWeathers[week-1]).addClass('active');
        }

    }


    var demaondChart = echarts.init(document.getElementById('demaondChart'));

    var myDate = new Date();
    var hour = myDate.getHours();
    var stopAt = new Number(hour)*2;
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

    var requestDemandData = [];
    for(var i=0;i<49;i++){
        requestDemandData.push(300);
    }

    //before 6:00, about 50
    var loadSerialData = [];
    var historySerialData = [];
    var shidianSerialData = [];
    for(var i=0;i<15;i++){
        var load = (40+Math.random() * 20).toFixed(0);
        var histLoad = (30+Math.random() * 30).toFixed(0);
        loadSerialData.push(load);
        shidianSerialData.push(load);
        historySerialData.push(histLoad);
    }

    //7:00-10:00 climb to 300
    for(var i=15;i<20;i++){
        var load = (30+(i-14)*50+Math.random() * 30).toFixed(0);
        var histLoad = (20+(i-14)*50+Math.random() * 40).toFixed(0);
        loadSerialData.push(load);
        historySerialData.push(histLoad);
        shidianSerialData.push(load);
    }

    //10:00-13:00 above 300
    for(var i=20;i<25;i++){
        var load = (300+Math.random() * 40).toFixed(0);
        var shidianLoad = (300-Math.random() * 40).toFixed(0);
        var histLoad = (300+Math.random() * 40).toFixed(0);
        loadSerialData.push(load);
        historySerialData.push(histLoad);
        shidianSerialData.push(shidianLoad);
    }

    //13:00-15:00 around 300
    for(var i=25;i<30;i++){
        var load = (330+Math.random() * 40).toFixed(0);
        var shidianLoad = (300-Math.random() * 40).toFixed(0);
        var histLoad = (330+Math.random() * 40).toFixed(0);
        loadSerialData.push(load);
        historySerialData.push(histLoad);
        shidianSerialData.push(shidianLoad);
    }

    //15:00-22:00 down to 50
    for(var i=30;i<45;i++){
        var load = (340-(i-29)*20+Math.random() * 40).toFixed(0);
        var histLoad = (340-(i-29)*20+Math.random() * 40).toFixed(0);
        // loadSerialData.push(load);
        historySerialData.push(histLoad);
    }

    //22:00-24:00 about 50
    for(var i=45;i<49;i++){
        var load = (40+Math.random() * 20).toFixed(0);
        var histLoad = (40+Math.random() * 20).toFixed(0);
        // loadSerialData.push(load);
        historySerialData.push(histLoad);
    }

    for(var i=stopAt;i<49;i++){
        loadSerialData[i]=null;
        shidianSerialData[i]=null;
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
            data: ['申报需量','负荷','历史同期', '市电']
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
        series: [{
            name: '申报需量',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: requestDemandData,
            itemStyle: {
                normal: {
                    color: '#f7bbbb'
                }
            },
            lineStyle: {
                normal: {
                    width: 3,
                    type:'dotted'
                }
            }
        }, {
            name: '负荷',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: loadSerialData,
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
            name: '历史同期',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: historySerialData,
            itemStyle: {
                normal: {
                    color: '#ff7676'
                }
            },
            lineStyle: {
                normal: {
                    width: 3,
                    type:'dotted'
                }
            }
        }, {
            name: '市电',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: shidianSerialData,
            itemStyle: {
                normal: {
                    color: '#f7b851'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }]
    };
    demaondChart.setOption(option);

   //年度用电量发电量
    var total = [];
    var feng = [];
    var gu=[];
    var ping=[];
    var fadian=[];

    for(var i=0; i<10; i++){
        var t = (70000+Math.random() * 25000).toFixed(0);
        total.push(t);
        feng.push((t*1/5+Math.random() * 3000).toFixed(0));
        ping.push((t*3/5+Math.random() * 3000).toFixed(0));
        gu.push((t/5).toFixed(0));
        if(i<6){
            fadian.push((10000+Math.random() * 10000).toFixed(0));
        }else{
            fadian.push((20000+Math.random() * 10000).toFixed(0));
        }

    }

    var yearElectricChart = echarts.init(document.getElementById('yearElectricChart'));
    var colors = ['#ffd285', '#ec4863', '#ec4863'];
    var yearElectricChartOption = {
        color: colors,
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            textStyle: {
                color:"#fff",
                fontSize: 16
            },
            data:['谷时用电量','平时用电量','峰时用电量','发电量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: 'black',
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: 'black',
                        type: 'dashed'
                    }
                }
            }
        ],
        series : [
            {
                name:'谷时用电量',
                type:'bar',
                stack: '用电量',
                data:gu,
                itemStyle: {
                    normal: {
                        color: '#eee'
                    }
                }
            },
            {
                name:'平时用电量',
                type:'bar',
                stack: '用电量',
                data:ping,
                itemStyle: {
                    normal: {
                        color: '#58c8da'
                    }
                }

            },
            {
                name:'峰时用电量',
                type:'bar',
                stack: '用电量',
                data:feng,
                itemStyle: {
                    normal: {
                        color: '#9BCA63'
                    }
                }

            },
            {
                name:'发电量',
                type:'bar',
                data:fadian,
                itemStyle: {
                    normal: {
                        color: '#C6E579'
                    }
                },

                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            }
        ]
    };

    yearElectricChart.setOption(yearElectricChartOption);
});
