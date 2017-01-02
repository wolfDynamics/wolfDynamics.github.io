'use strict';


//*************************************************************************************************************************
//To utomatically shift page when using scroll down option of navbar
var shiftWindow = function()
{
    scrollBy(0, -60)
};
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);
//*************************************************************************************************************************



//*************************************************************************************************************************
// ### Create Chart Objects
var gainOrLossChart = dc.pieChart("#gain-loss-chart");
var fluctuationChart = dc.barChart("#fluctuation-chart");
var quarterChart = dc.pieChart("#quarter-chart");
var dayOfWeekChart = dc.rowChart("#day-of-week-chart");
var moveChart = dc.lineChart("#monthly-move-chart");
var volumeChart = dc.barChart("#monthly-volume-chart");
var yearlyBubbleChart = dc.bubbleChart("#yearly-bubble-chart");
var yearChart = dc.barChart("#year-chart");
var nasdaqCount = dc.dataCount('.dc-data-count');
var nasdaqTable = dc.dataTable('.dc-data-table');
//*************************************************************************************************************************



//*************************************************************************************************************************
function drawChart()
{
    var inputfile = "data/table.csv"
    //var inputfile = "tablelarge.csv"

    //d3.csv("ndx.csv", function (data) {
    d3.csv(inputfile, function(data)
    {
        var transition_time = 500;

        /* since its a csv file we need to format the data a bit */
        //var dateFormat = d3.time.format("%m/%d/%Y"); //ndx.csv
        var dateFormat = d3.time.format('%Y-%m-%d'); //table.csv

        var numberFormat = d3.format(".2f");

        data.forEach(function(d)
        {
            d.dd = dateFormat.parse(d.date);
            d.month = d3.time.month(d.dd); // pre-calculate month for better performance
            d.close = +d.close; // coerce to number
            d.open = +d.open;
        });

        //### Create Crossfilter Dimensions and Groups
        var ndx = crossfilter(data);
        var all = ndx.groupAll();


        //*************************************************************************************************************************
        var yearlyDimension = ndx.dimension(function(d)
        {
            return d3.time.year(d.dd).getFullYear();
        });

        var yearlyPerformanceGroup = yearlyDimension.group().reduce(
            /* callback for when data is added to the current filter results */
            function(p, v)
            {
                ++p.count;
                p.absGain += v.close - v.open;
                p.fluctuation += Math.abs(v.close - v.open);
                p.sumIndex += (v.open + v.close) / 2;
                p.avgIndex = p.sumIndex / p.count;
                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                return p;
            },
            /* callback for when data is removed from the current filter results */
            function(p, v)
            {
                --p.count;
                p.absGain -= v.close - v.open;
                p.fluctuation -= Math.abs(v.close - v.open);
                p.sumIndex -= (v.open + v.close) / 2;
                p.avgIndex = p.count ? p.sumIndex / p.count : 0;
                p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
                p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
                return p;
            },
            /* initialize p */
            function()
            {
                return {
                    count: 0,
                    absGain: 0,
                    fluctuation: 0,
                    fluctuationPercentage: 0,
                    sumIndex: 0,
                    avgIndex: 0,
                    percentageGain: 0
                };
            }
        );
        //*************************************************************************************************************************


        //*************************************************************************************************************************
        var dateDimension = ndx.dimension(function(d)
        {
            return d.dd;
        });

        /* monthly index avg fluctuation in percentage */
        var moveMonths = ndx.dimension(function(d)
        {
            return d.month;
        });

        var monthlyMoveGroup = moveMonths.group().reduceSum(function(d)
        {
            return Math.abs(d.close - d.open);
        });

        var volumeByMonthGroup = moveMonths.group().reduceSum(function(d)
        {
            //return d.volume / 500000;
            return d.volume;
        });
        //*************************************************************************************************************************


        //*************************************************************************************************************************
        var yearDim = ndx.dimension(function(d)
        {
            return d3.time.year(d.dd).getFullYear();
        });
        var yearGroup = yearDim.group().reduceCount();
        //*************************************************************************************************************************


        //*************************************************************************************************************************
        var indexAvgByMonthGroup = moveMonths.group().reduce(
            function(p, v)
            {
                ++p.days;
                p.total += (v.open + v.close) / 2;
                p.avg = Math.round(p.total / p.days);
                return p;
            },
            function(p, v)
            {
                --p.days;
                p.total -= (v.open + v.close) / 2;
                p.avg = p.days ? Math.round(p.total / p.days) : 0;
                return p;
            },
            function()
            {
                return {
                    days: 0,
                    total: 0,
                    avg: 0
                };
            }
        );
        //*************************************************************************************************************************


        // Create categorical dimension
        //*************************************************************************************************************************
        var gainOrLoss = ndx.dimension(function(d)
        {
            return d.open > d.close ? 'Loss' : 'Gain';
        });
        var gainOrLossGroup = gainOrLoss.group();

        var fluctuation = ndx.dimension(function(d)
        {
            return Math.round((d.close - d.open) / d.open * 100);
        });
        var fluctuationGroup = fluctuation.group();

        var quarter = ndx.dimension(function(d)
        {
            var month = d.dd.getMonth();
            if (month <= 2)
            {
                return 'Q1';
            }
            else if (month > 2 && month <= 5)
            {
                return 'Q2';
            }
            else if (month > 5 && month <= 8)
            {
                return 'Q3';
            }
            else
            {
                return 'Q4';
            }
        });
        var quarterGroup = quarter.group().reduceSum(function(d)
        {
            return d.volume;
        });

        var dayOfWeek = ndx.dimension(function(d)
        {
            var day = d.dd.getDay();
            switch (day)
            {
                case 0:
                    return "0.Sunday";
                case 1:
                    return "1.Monday";
                case 2:
                    return "2.Tuesday";
                case 3:
                    return "3.Wednesday";
                case 4:
                    return "4.Thursday";
                case 5:
                    return "5.Friday";
                case 6:
                    return "6.Saturday";
            }
        });
        var dayOfWeekGroup = dayOfWeek.group();
        //*************************************************************************************************************************



        //### Define Chart Attributes
        //Define chart attributes using fluent methods. See the [dc API Reference](https://github.com/NickQiZhu/dc.js/blob/master/web/docs/api-1.6.0.md) for more information
        //*************************************************************************************************************************
        yearChart
            .width(900)
            .height(80)
            .margins(
            {
                top: 10,
                right: 20,
                bottom: 20,
                left: 20
            })
            .x(d3.scale.ordinal().domain(yearlyDimension))
            .xUnits(dc.units.ordinal)
            .transitionDuration(0)
            //.colors(d3.scale.category10())
            //.colors(colorbrewer.RdYlGn[9])
            .colors(["#5bc0de"]) //#d9534f #f9f9f9 #5bc0de #5cb85c #428bca bootstrap colors
            //.centerBar(true)
            //.gap(1)
            .elasticX(false)
            .elasticY(false)
            .valueAccessor(function(p)
            {
                //return p.value.yearDim;
                return 1;
            })
            .title(function(p)
            {
                return p.key + "\n" + "Gain: " + numberFormat(p.value.absGain);
                //return p.key;
            })
            .renderTitle(true)
            .dimension(yearDim)
            .group(yearGroup);
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        //#### Bubble Chart
        var chart1 = yearlyBubbleChart.width(900)
            .height(300)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 50,
                left: 50
            })
            .dimension(yearlyDimension)
            .group(yearlyPerformanceGroup)
            .transitionDuration(transition_time)
            //.colors(colorbrewer.RdYlGn[9])
            //.colors(["#a60000", "#ff0000", "#ff4040", "#ff7373", "#67e667", "#39e639", "#00cc00"])
            .colors(["FireBrick", "YellowGreen"])
            //.colors(colorbrewer.Dark2[7])
            .colorDomain([-500, 500])
            .colorAccessor(function(d)
            {
                return d.value.absGain;
            })
            .keyAccessor(function(p)
            {
                return p.value.absGain;
            })
            .valueAccessor(function(p)
            {
                return p.value.percentageGain;
            })
            .radiusValueAccessor(function(p)
            {
                return p.value.fluctuationPercentage;
                //return 2;
            })
            .maxBubbleRelativeSize(0.3)
            //.maxBubbleRelativeSize(0.015)  //for large tale
            .x(d3.scale.linear().domain([-2500, 2500]))
            .y(d3.scale.linear().domain([-100, 100]))
            .r(d3.scale.linear().domain([0, 4000]))
            .elasticX(true)
            .elasticY(true)
            //.elasticRadius(true)
            .xAxisPadding(500)
            .yAxisPadding(100)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            //Labels are displayed on the chart for each bubble. 
            //Titles displayed on mouseover.
            .renderLabel(true)
            .renderTitle(true)
            .xAxisLabel('Index Gain')
            .yAxisLabel('Index Gain %')
            .label(function(p)
            {
                return p.key;
            })
            .title(function(p)
            {
                return [
                    p.key,
                    'Index Gain: ' + numberFormat(p.value.absGain),
                    'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                    'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
                ].join('\n');
            });

        //the methods for xAxis and yAxis are not chainable so we split them
        //yearlyBubbleChart.xAxis().tickFormat(d3.format(".d"));
        chart1.xAxis().tickFormat(d3.format(".d"));
        chart1.yAxis().tickFormat(function(v)
        {
            return v + "%";
        });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        // #### Pie/Donut Chart
        gainOrLossChart
            .width(300) // (optional) define chart width, :default = 200
            .height(200) // (optional) define chart height, :default = 200
            .radius(80) // define pie radius
            .dimension(gainOrLoss) // set dimension
            .group(gainOrLossGroup) // set group
            .label(function(d)
            {
                if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key))
                {
                    return d.key + '(0%)';
                }
                var label = d.key;
                if (all.value())
                {
                    label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
                }
                return label;
            })
            .renderLabel(true)
            //.innerRadius(40)
            .transitionDuration(transition_time)
            //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            //.ordinalColors(["green","yellow","black","navy"])
            .ordinalColors(colorbrewer.Dark2[7])
            .legend(dc.legend().x(0).y(0));
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        quarterChart
            .width(300)
            .height(200)
            .radius(80)
            .innerRadius(30)
            .dimension(quarter)
            .group(quarterGroup)
            .transitionDuration(transition_time)
            //.ordinalColors(["green","yellow","black","navy"])
            //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            .ordinalColors(colorbrewer.Dark2[7])
            .legend(dc.legend().x(0).y(0))
            //.renderLabel(false)
            .renderTitle(false);
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        dayOfWeekChart
            .width(250)
            .height(200)
            .margins(
            {
                top: 20,
                left: 10,
                right: 10,
                bottom: 20
            })
            .group(dayOfWeekGroup)
            .dimension(dayOfWeek)
            //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            //.ordinalColors(["rgb(65, 174, 118)"])
            .ordinalColors(colorbrewer.Dark2[7])
            .label(function(d)
            {
                return d.key.split(".")[1];
            })
            .title(function(d)
            {
                return d.value + " days";
            })
            .transitionDuration(transition_time)
            .elasticX(true)
            .xAxis()
            .ticks(5)
            .tickFormat(d3.format(".d"));

        dayOfWeekChart.on("renderlet", function(chart)
        {
            chart.selectAll("g.row text")
                .attr('dx', '5')
                .attr('dy', '5')
                //.attr('transform', "rotate(-90)")
                .style("font-family", "sans-serif")
                .style("font-size", "12px")
                .style("font-weight", "normal")
                .style("text-anchor", "start")
                .style("fill", "black");
        });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart2 = fluctuationChart.width(420)
            .height(200)
            .margins(
            {
                top: 20,
                right: 10,
                bottom: 20,
                left: 50
            })
            .dimension(fluctuation)
            .group(fluctuationGroup)
            .transitionDuration(transition_time)
            .elasticY(true)
            .centerBar(true)
            .gap(1)
            .round(dc.round.floor)
            .alwaysUseRounding(true)
            .x(d3.scale.linear().domain([-25, 25]))
            .renderHorizontalGridLines(true)
            .ordinalColors(colorbrewer.Dark2[7])
            // Customize the filter displayed in the control span
            .filterPrinter(function(filters)
            {
                var filter = filters[0],
                    s = '';
                s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
                return s;
            });

        chart2.xAxis()
            .tickFormat(function(v)
            {
                return v + "%";
            });

        chart2.yAxis().tickFormat(d3.format(".d"));

        fluctuationChart.yAxis().ticks(5);
        //*************************************************************************************************************************


        //*************************************************************************************************************************
        var chart3 = moveChart
            .renderArea(true)
            .width(900)
            .height(200)
            .transitionDuration(0)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            })
            .dimension(moveMonths)
            // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
            .rangeChart(volumeChart)
            .mouseZoomable(true)
            .x(d3.time.scale().domain([new Date(1985, 10, 1), new Date(2016, 12, 31)]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            //.colors(colorbrewer.Dark2[7])
            .elasticY(true)
            .renderHorizontalGridLines(false)
            .renderVerticalGridLines(false)
            //.legend(dc.legend().x(80).y(20).itemHeight(14).gap(5))
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .brushOn(true)
            // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
            // legend.
            // The `.valueAccessor` will be used for the base layer
            .group(indexAvgByMonthGroup, 'Monthly Index Average')
            //.group(volumeByMonthGroup, 'Monthly Index Average')
            .valueAccessor(function(d)
            {
                return d.value.avg;
            })
            .stack(monthlyMoveGroup, 'Monthly Index Move', function(d)
            {
                return d.value;
            })
            // Title can be called by any stack layer.
            .title(function(d)
            {
                var value = d.value.avg ? d.value.avg : d.value;
                if (isNaN(value))
                {
                    value = 0;
                }
                return dateFormat(d.key) + '\n' + numberFormat(value);
            });

        //chart3.xAxis();
        //chart3.yAxis().tickFormat(d3.format(".d"));
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        volumeChart.width(900)
            .height(100)
            .margins(
            {
                top: 0,
                right: 20,
                bottom: 20,
                left: 50
            })
            .dimension(moveMonths)
            .group(volumeByMonthGroup)
            //.group(indexAvgByMonthGroup)
            //.colors(colorbrewer.Dark2[7])
            //.colors(["steelblue"])
            .transitionDuration(transition_time)
            .centerBar(true)
            .gap(1)
            .x(d3.time.scale().domain([new Date(1985, 10, 1), new Date(2016, 12, 31)]))
            //.gap(4)
            //.x(d3.time.scale().domain([new Date(2010, 10, 1), new Date(2016, 12, 31)]))
            .round(d3.time.month.round)
            .alwaysUseRounding(true)
            .xUnits(d3.time.months);
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        /* dc.dataCount('.dc-data-count', 'chartGroup'); */
        nasdaqCount
            .dimension(ndx)
            .group(all)
            // (_optional_) `.html` sets different html when some records or all records are selected.
            // `.html` replaces everything in the anchor with the html given using the following function.
            // `%filter-count` and `%total-count` are replaced with the values obtained.
            // .html(
            // {
            //     some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
            //         ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Reset All</a>',
            //     all: 'All records selected. Please click on the graph to apply filters.'
            // });


        /* dc.dataTable('.dc-data-table', 'chartGroup') */
        nasdaqTable
            .dimension(dateDimension)
            // Data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function(d)
            {
                var format = d3.format('02d');
                return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
            })
            // (_optional_) max number of records to be shown, `default = 25`
            .size(10)
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                // Use the `d.date` field; capitalized automatically
                'date',
                // Use `d.open`, `d.close`
                'open',
                'close',
                {
                    // Specify a custom format for column 'Change' by using a label with a function.
                    label: 'Change',
                    format: function(d)
                    {
                        return numberFormat(d.close - d.open);
                    }
                },
                // Use `d.volume`
                'volume'
            ])
            // (_optional_) sort using the given field, `default = function(d){return d;}`
            .sortBy(function(d)
            {
                return d.dd;
            })
            // (_optional_) sort order, `default = d3.ascending`
            .order(d3.ascending)
            // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
            .on('renderlet', function(table)
            {
                table.selectAll('.dc-table-group').classed('info', true);
            });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        dc.renderAll();
        //*************************************************************************************************************************

    });
    //*************************************************************************************************************************


    //*************************************************************************************************************************
    // Determine the current version of dc with `dc.version`
    d3.selectAll("#version").text(dc.version);
    //*************************************************************************************************************************
}