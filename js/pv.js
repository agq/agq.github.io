$(document).ready(function () {
    "use strict";
    $(".counter").counterUp({
        delay: 100,
        time: 1200
    });

    $('.vcarousel').carousel({
        interval: 3000
    })

    var pvChart = echarts.init(document.getElementById('pvChart'));

    var myDate = new Date();
    var hour = myDate.getHours();
    var stopAt = new Number(hour)+1;
    var fuzhao = [0, 0, 0, 0, 0, 0, 20, 275, 580, 800, 950, 1075];
    var fadian = [0.00,0.00,0.00,0.00,0.00,0.00,5.45,75.00,158.18,218.18,259.09,293.18];

    for(var i=stopAt;i<fuzhao.length;i++){
        fuzhao[i]=null;
        fadian[i]=null;
    }

    var option_wth = {
        //backgroundColor: '#394056',
        title: {
            text: '',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
            left: '6%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['辐照', '发电量'],
            right: '4%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: ['0:0', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        }],
        yAxis: [{
            type: 'value',
            name: '辐照(W/m^2)',
            min:0,
            max:1200,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#57617B'
                }
            }
        },{
            type: 'value',
            name: '发电量(kW)',
            min:0,
            max:600,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [{
            name: '辐照',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 2,
            showSymbol: true,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12

                }
            },
            //data: [0, 0, 0, 0, 0, 0, 20, 275, 580, 800, 950, 1075, 1100, 1050, 900, 700, 550, 300, 80, 0, 0, 0, 0, 0
            data: fuzhao
        }, {
            name: '发电量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 2,
            showSymbol: true,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12

                }
            },
            yAxisIndex:1,
            //data: [0.00,0.00,0.00,0.00,0.00,0.00,5.45,75.00,158.18,218.18,259.09,293.18,300.00,286.36,245.45,190.91,150.00,81.82,21.82,0.00,0.00,0.00,0.00,0.00
            data: fadian
        }, ]
    };
    pvChart.setOption(option_wth);
    // Bar chart


});
