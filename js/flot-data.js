// Real Time chart
        

  //Flot Line Chart
$(document).ready(function() {
    console.log("document ready");
    var offset = 0;
    plot();

    function plot() {
        var sin = [],
            cos = [];
        for (var i = 0; i < 12; i += 0.2) {
            sin.push([i, Math.sin(i + offset)]);
            cos.push([i, Math.cos(i + offset)]);
        }

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },

            grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            },
            yaxis: {
                min: -1.2,
                max: 1.2
            },
              colors: ["#fb9678", "#01c0c8"],
            grid: {
                color: "#AFAFAF",
                hoverable: true,
                borderWidth: 0,
                backgroundColor: '#FFF'
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' of %x.1 is %y.4",
                shifts: {
                    x: -60,
                    y: 25
                }
            }
        };

    }
});
// sales bar chart

    $(function() {
        //some data
        var d1 = [];
        for (var i = 1; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 1800)]);

        var d2 = [];
        for (var i = 1; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 1200)]);

        var d3 = [];
        for (var i = 1; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 750)]);

        var ds = new Array();

        ds.push({
            label : "谷",
            data : d1,
            bars : {
                order : 1
            }
        });
        ds.push({
            label : "平",
            data : d2,
            bars : {
                order : 2
            }
        });
        ds.push({
            label : "峰",
            data : d3,
            bars : {
                order : 3
            }
        });

        var stack = 0,
            bars = true,
            lines = true,
            steps = true;

        var options = {
            bars : {
                show : true,
                barWidth : 0.2,
                fill : 1
            },
            grid : {
                show : true,
                aboveData : false,
                labelMargin : 5,
                axisMargin : 0,
                borderWidth : 1,
                minBorderMargin : 5,
                clickable : true,
                hoverable : true,
                autoHighlight : false,
                mouseActiveRadius : 20,
                borderColor : '#f5f5f5'
            },
            series : {
                stack : stack
            },
            legend : {
                position : "ne",
                margin : [0, 0],
                noColumns : 0,
                labelBoxBorderColor : null,
                labelFormatter : function(label, series) {
                    // just add some space to labes
                    return '' + label + '&nbsp;&nbsp;';
                },
                width : 30,
                height : 5
            },
            yaxis : {
                tickColor : '#f5f5f5',
                font : {
                    color : '#bdbdbd'
                }
            },
            xaxis : {
                tickColor : '#f5f5f5',
                font : {
                    color : '#bdbdbd'
                }
            },
            colors : ["#4F5467", "#01c0c8", "#fb9678"],
            tooltip : false, //activate tooltip
            tooltipOpts : {
                content : "%s : %y.0",
                shifts : {
                    x : -30,
                    y : -50
                }
            }
        };

        $.plot($(".sales-bars-chart"), ds, options);
    });

