$(document).ready(function () {
    "use strict";
    $(".counter").counterUp({
        delay: 100,
        time: 1200
    });

    $('.vcarousel').carousel({
        interval: 3000
    });


    //the data for month storage moving and benefit

    var forecastMonth = echarts.init(document.getElementById('forecastMonth'));
    var colors = ['#ffd285', '#ec4863', '#ec4863'];

    var option1 = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'cross'}
        },
        grid: {
            right: '10%'
        },
        legend: {
            textStyle: {
                color:"#fff",
                fontSize: 16
            },
            data:['削峰填谷','效益']
        },
        xAxis: [

            {
                type: 'category',
                splitArea:{
                    show:true,
                    areaStyle:{
                        color: ['rgba(250,250,250,0)','rgba(200,200,200,0.1)'],
                        shadowColor: 'rgba(11, 255, 255, 0.1)',
                        shadowBlur: 23
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },

        ],
        yAxis: [
            {
                type: 'value',
                name: '削峰填谷',
                min: 0,
                max: 8000,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} kWh'
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: 'black',
                        type: 'dashed'
                    }
                }
            },
            {
                type: 'value',
                name: '效益',
                min: 0,
                max: 8000,
                position: 'right',

                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} 元'
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
        series: [
            {
                name:'削峰填谷',
                type:'bar',
                data:[0, 0, 0, 0, 3000, 5600, 6700, 6500, 6046, 5830, 204, ]
            },
            {
                name:'效益',
                type:'bar',
                yAxisIndex: 1,
                data:[0, 0, 0, 0, 3247, 6138, 7302, 7193, 6871, 6518, 228, ]
            },
        ]
    };
    forecastMonth.setOption(option1);

    //end the data for month storage moving and benefit

    //mock change soc

    setInterval(mockChangeAll,500);


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

    // data for the forecast Chart
    var forecastChart = echarts.init(document.getElementById('forecastChart'));

    var realtimeShidian = [140.00,95.00,132.00,211.00,326.00,488.00,520.00,514.00,551.82,631.82,548.91,546.82,467.00,505.64,555.55,659.09,590.00,538.18,478.18,620.00,539.00,320.00,210.00,200.00
    ];
    var myDate = new Date();
    var hour = myDate.getHours();
    var stopAt = new Number(hour)+1;

    for(var i=stopAt;i<realtimeShidian.length;i++){
        realtimeShidian[i]=null;
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
                color: '#7588E4'
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        legend: {
            right: 20,
            orient: 'horizontal',
            textStyle: {
                color:"#fff",
                fontSize: 16
            },
            data: ['申报需量', '预测负荷','实时市电','预测市电', '预测光伏', '储能']
        },
        xAxis: {
            type: 'category',
            data: ['0:0', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
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
                    color: ['black'],
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
            data: [900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00,900.00
            ],
            itemStyle: {
                normal: {
                    color: '#993333'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    //type:'dotted'
                }
            }
        }, {
            name: '实时市电',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: realtimeShidian,
            itemStyle: {
                normal: {
                    color: '#00CCFF'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            },
            areaStyle:{
                normal:{
                    //shadowColor: 'rgba(100, 232, 100, 40.5)',
                    shadowBlur: 10,
                    opacity: 0.7
                }
            }
        },{
            name: '预测市电',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [140.00,95.00,132.00,211.00,326.00,488.00,520.00,514.00,551.82,631.82,548.91,546.82,467.00,505.64,555.55,659.09,590.00,538.18,478.18,620.00,539.00,320.00,210.00,200.00
            ],
            itemStyle: {
                normal: {
                    color: '#0099CC'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    type:'dotted'
                }
            },
            areaStyle: {
                normal: {
                    //shadowColor: 'rgba(100, 232, 100, 40.5)',
                    shadowBlur: 0,
                    opacity: 0.2
                }
            }
        },{
            name: '预测负荷',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [140.00,95.00,132.00,211.00,326.00,488.00,520.00,514.00,710.00,950.00,858.00,840.00,767.00,792.00,801.00,900.00,740.00,620.00,500.00,620.00,539.00,320.00,170.00,160.00
            ],
            itemStyle: {
                normal: {
                    color: '#a37676'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    type:'dotted'
                }
            },
            areaStyle: {
                normal: {
                    //shadowColor: 'rgba(100, 232, 100, 40.5)',
                    shadowBlur: 0,
                    opacity: 0.2
                }
            }
        }, {
            name: '预测光伏',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [0.00,0.00,0.00,0.00,0.00,0.00,5.45,75.00,158.18,218.18,259.09,293.18,300.00,286.36,245.45,190.91,150.00,81.82,21.82,0.00,0.00,0.00,0.00,0.00
            ],
            itemStyle: {
                normal: {
                    color: '#99dd66'
                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    type:'dotted'
                }
            },
            areaStyle:{
                normal:{
                    //shadowColor: 'rgba(80, 132, 100, 40.5)',
                    shadowBlur: 2,
                    opacity: 0.3
                }
            }
        }, {
            name: '储能',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [40.00,40.00,40.00,40.00,20.00,0.00,0.00,0.00,0.00,-100.00,-50.00,-50.00,0.00,0.00,-30.00,-50.00,0.00,0.00,0.00,0.00,0.00,40.00,40.00,40.00
            ],
            itemStyle: {
                normal: {
                    color: '#f7b851'
                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    type:'dotted'
                }
            },
            areaStyle:{
                normal:{
                    //shadowColor: 'rgba(80, 132, 100, 40.5)',
                    shadowBlur: 5,
                    opacity: 0.5
                }
            }
        }]
    };

    forecastChart.setOption(option);

});
