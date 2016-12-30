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
var yearBar = dc.barChart("#yearBar");
var shipAvgBar = dc.barChart("#shipAvgBar");
var bestBar = dc.rowChart("#bestBar");
var worseBar = dc.rowChart("#worseBar");
var lineAvgBar = dc.barChart("#lineAvgBar");
var pielineAvgBar = dc.pieChart("#pielineAvgBar");
var pielineAvgBar1 = dc.pieChart("#pielineAvgBar1");
var distBar = dc.rowChart("#distBar");

var dataCount = dc.dataCount('.dc-data-count');

var numberFormat = d3.format('.2f');
var numberFormat_int = d3.format('.d');
//*************************************************************************************************************************



//*************************************************************************************************************************
function drawChart()
{
    var transition_time = 500;
    var inputfile = "data/cruise_ratings.csv"

    d3.csv(inputfile, function(error, data)
    {

        //*************************************************************************************************************************
        function toNumbers(d)
        {
            d.Line = d.Line.trim()
            d.Rating = parseInt(d.Rating)
            d.Year = parseInt(d.Sail_year)
            d.Best = d.Best_rating.trim()
            d.Worse = d.Worse_rating.trim()
            d.Ship = d.Ship.trim()
            d.Count = parseInt(d.Count)
        };

        data.forEach(toNumbers);
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var ndx = crossfilter(data);
        var all = ndx.groupAll();

        var line = ndx.dimension(function(d)
        {
            return d.Line;
        });

        var rating = ndx.dimension(function(d)
        {
            return d.Rating;
        });

        var year = ndx.dimension(function(d)
        {
            return d.Year;
        });

        var ship = ndx.dimension(function(d)
        {
            return d.Ship;
        });

        var best = ndx.dimension(function(d)
        {
            return d.Best;
        });

        var worse = ndx.dimension(function(d)
        {
            return d.Worse;
        });

        var count = ndx.dimension(function(d)
        {
            return d.Count;
        });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var lineGroup = line.group();
        var yearGroup = year.group();
        var ratingGroup = rating.group();
        var shipGroup = ship.group();
        var bestGroup = best.group();
        var worseGroup = worse.group();
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        // var genericAdd = function(p, v)
        //     {
        //         p.TotalCount += v.Count;
        //         p.TotalRating += v.Rating;
        //         p.AverageRating = p.TotalRating / p.TotalCount
        //         return p;        
        //     },
        //     genericReduce = function(p, v)
        //     {
        //         p.TotalCount -= v.Count;
        //         p.TotalRating -= v.Rating;
        //         p.AverageRating = p.TotalRating / p.TotalCount
        //         return p;       
        //     },
        //     genericInit = function(p, v)
        //     {            
        //         return {
        //             TotalCount: 0,
        //             TotalRating: 0,
        //             AverageRating: 0       
        //         }  
        //     };



        var genericAdd = function(p, v)
        {
            p.TotalCount += v.Count;
            p.TotalRating += v.Rating;
            p.AverageRating = p.TotalRating / p.TotalCount
            return p;        
        };

        var genericReduce = function(p, v)
        {

            p.TotalCount -= v.Count;
            p.TotalRating -= v.Rating;
            p.AverageRating = p.TotalRating / p.TotalCount
            return p;       
        };

        var genericInit = function(p, v)
        {            
            return {
                TotalCount: 0,
                TotalRating: 0,
                AverageRating: 0       
            }  
        };
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var lineDimensionGroup = lineGroup.reduce(genericAdd, genericReduce, genericInit);
        var yearDimensionGroup = yearGroup.reduce(genericAdd, genericReduce, genericInit);
        var ratingDimensionGroup = ratingGroup.reduce(genericAdd, genericReduce, genericInit);
        var shipDimensionGroup = shipGroup.reduce(genericAdd, genericReduce, genericInit);
        var bestDimensionGroup = bestGroup.reduce(genericAdd, genericReduce, genericInit);
        var worseDimensionGroup = worseGroup.reduce(genericAdd, genericReduce, genericInit);


        var len = data.length,
            trues = data.filter(function(d)
            {
                return d.Count
            }).length,
            percentage = trues / len * 100;
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        function print_filter(filter)
        {
            var f = eval(filter);
            if (typeof(f.length) != "undefined")
            {}
            else
            {}
            if (typeof(f.top) != "undefined")
            {
                f = f.top(Infinity);
            }
            else
            {}
            if (typeof(f.dimension) != "undefined")
            {
                f = f.dimension(function(d)
                {
                    return "";
                }).top(Infinity);
            }
            else
            {}
            console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
        }



        // var totalline = lineGroup.reduceCount(function(d)
        // {
        //     return d.line;
        // });
        // print_filter("totalline");

        // var totalyear = yearGroup.reduceCount(function(d)
        // {
        //     return d.line;
        // });
        // print_filter("totalyear");

        // var total = lineGroup.reduceCount(function(d)
        // {
        //     //return total;
        // });
        //print_filter("total");

        // var mylineDimensionGroup = lineGroup.reduceCount(function(d)
        // {
        //     //return total;
        // });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart1 = yearBar
            //.width($("#yearBar").width()) 
            .width(400)
            .height(200)
            .margins(
            {
                top: 20,
                right: 10,
                bottom: 20,
                left: 20
            })
            .x(d3.scale.ordinal().domain(yearDimensionGroup))
            //.x(d3.scale.ordinal().domain([0,5]))
            .xUnits(dc.units.ordinal)
            .y(d3.scale.linear().domain([0, 5]))
            .transitionDuration(transition_time) //2000
            //.colors('steelblue')
            .colors(["LightSeaGreen "]) //#d9534f #f9f9f9 #5bc0de #5cb85c #428bca bootstrap colors
            .elasticX(false)
            //.elasticY(true)
            .valueAccessor(function(p)
            {
                return p.value.AverageRating;
                //return p.value.TotalCount;
            })
            // .ordering(function(p)
            // {
            //     return p.value.TotalCount;
            // })
            //.xAxisLabel("")
            //.yAxisLabel("")
            .renderTitle(true)
            .title(function(p)
            {
                return p.key + "\n" + "Average rating: " + numberFormat(p.value.AverageRating) + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
                //return p.key;
            })
            .dimension(year)
            .group(yearDimensionGroup)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(false);

        chart1.yAxis().tickFormat(function(v)
            {
                return v;
            })
            .ticks(6);

        chart1.yAxis().tickFormat(d3.format(".1s")).ticks(5);
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart2 = shipAvgBar
            //.width($("#question_half_hour").width()) 
            .width(1000)
            .height(300)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 20,
                left: 40
            })
            .dimension(ship)
            .group(shipDimensionGroup)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(false)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .y(d3.scale.linear().domain([0, 5]))
            //.colors(['steelblue'])
            .colors(["GoldenRod"]) //#d9534f #f9f9f9 #5bc0de #5cb85c #428bca bootstrap colors
            .elasticX(false)
            //.elasticY(true)
            .valueAccessor(function(p)
            {
                return p.value.AverageRating;
            })
            // .ordering(function(p)
            // {
            //     //return p.value.TotalCount;
            //     return p.value.AverageRating;
            // })
            //.brushOn(true)
            .transitionDuration(transition_time) //2000
            //.centerBar(false)
            //.barPadding(0.1)
            //.outerPadding(0.05)
            .gap(0.5)
            //.xAxisLabel("")
            //.yAxisLabel("")
            //.renderLabel(true)
            // .label(function(p)
            // {
            //     return p.key;
            // })
            .renderTitle(true)
            .title(function(p)
            {
                return p.key + "\n" + "Average rating: " + numberFormat(p.value.AverageRating) + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
                //return p.key
            });


        chart2.yAxis().tickFormat(d3.format(".1s")).ticks(6);
        chart2.xAxis().ticks(0).tickSize(0);
        // shipAvgBar.xAxis().tickFormat(function(v)
        // {
        //     return "";
        // });

        chart2.on("renderlet", function(chart)
        {
            chart.selectAll("g.x text")
                .attr('dx', '5')
                .attr('dy', '0')
                .attr('transform', "rotate(-90)")
                // .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .style("text-anchor", "start")
                //.style("fill", "white");
        });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart3 = bestBar
            .width(400)
            .height(300)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 20,
                left: 120
            })
            .valueAccessor(function(p)
            {
                return p.value.TotalCount / all.value() * 100;
            })
            .ordering(function(p)
            {
                return p.value.TotalCount;
            })
            .gap(1)
            .transitionDuration(transition_time) //2000
            //.colors([steelblue')
            //.colors("#5cb85c") //#d9534f #f9f9f9 #5bc0de #5cb85c #428bca bootstrap colors
            .colors("#5cb85c")
            .label(function(p)
            {
                if (isNaN(p.value.TotalCount))
                {
                    return ""
                }
                else
                {
                    return p.key
                }
            })
            .elasticX(false)
            .title(function(p)
            {
                return p.key + "\n" + "Total best ratings: " + numberFormat(p.value.TotalCount / all.value() * 100) + "%" + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
            })
            .elasticX(true) //true
            .renderTitle(true)
            .renderLabel(true)
            .labelOffsetX(-120)
            .labelOffsetY(10)
            .dimension(best)
            .group(bestDimensionGroup);

        chart3.xAxis().ticks(5);

        // chart3.on("renderlet", function(chart)
        // {
        //     chart.selectAll("g.row text")
        //         .attr('dx', '5')
        //         .attr('dy', '5')
        //         //.attr('transform', "rotate(-90)")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "12px")
        //         .style("font-weight", "normal")
        //         .style("text-anchor", "start")
        //         .style("fill", "black");
        // });

        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart4 = worseBar
            .width(400)
            .height(300)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 20,
                left: 120
            })
            .valueAccessor(function(p)
            {
                return p.value.TotalCount / all.value() * 100;
            })
            .ordering(function(p)
            {
                return p.value.TotalCount;
            })
            .gap(1)
            .transitionDuration(transition_time) //2000
            //.colors('steelblue')
            //.colors("#d9534f") //#d9534f #f9f9f9 #5bc0de #5cb85c #428bca bootstrap colors
            .colors("#d9534f")
            .label(function(p)
            {
                if (isNaN(p.value.TotalCount))
                {
                    return ""
                }
                else
                {
                    return p.key
                }
            })
            .elasticX(false)
            .title(function(p)
            {
                return p.key + "\n" + "Total worse ratings: " + numberFormat(p.value.TotalCount / all.value() * 100) + "%" + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
            })
            .elasticX(true)
            .renderTitle(true)
            .renderLabel(true)
            .labelOffsetX(-120)
            .labelOffsetY(10)
            .dimension(worse)
            .group(worseDimensionGroup);

        chart4.xAxis().ticks(5);

        // chart4.on("renderlet", function(chart)
        // {
        //     chart.selectAll("g.row text")
        //         .attr('dx', '5')
        //         .attr('dy', '5')
        //         //.attr('transform', "rotate(-90)")
        //         .style("font-family", "sans-serif")
        //         .style("font-size", "12px")
        //         .style("font-weight", "normal")
        //         .style("text-anchor", "start")
        //         .style("fill", "black");
        // });

        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart5 = lineAvgBar
            //.width($("#yearBar").width()) 
            .width(450)
            .height(200)
            .margins(
            {
                top: 20,
                right: 10,
                bottom: 20,
                left: 20
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .y(d3.scale.linear().domain([0, 5]))
            .transitionDuration(transition_time)
            .brushOn(false)
            .valueAccessor(function(p)
            {
                return p.value.AverageRating;
            })
            .ordering(function(p)
            {
                //return p.value.TotalCount;
                return p.value.AverageRating;
            })
            //.centerBar(false)
            .colors('steelblue')
            //.barPadding(0.1)
            //.outerPadding(0.05)
            //.gap(1)
            .elasticX(false)
            //.elasticY(true)
            //.xAxisLabel("")
            //.yAxisLabel("")
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(false)
            .title(function(p)
            {
                return p.key + "\n" + "Average rating: " + numberFormat(p.value.AverageRating) + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
            })
            .renderTitle(true)
            .dimension(line)
            .group(lineDimensionGroup);

        //chart5.yAxis().tickFormat(d3.format(".1s")).ticks(5);
        chart5.yAxis().tickFormat(d3.format(".1s")).ticks(6);
        chart5.xAxis().ticks(0).tickSize(0);

        chart5.on("renderlet", function(chart)
        {
            chart.selectAll("g.x text")
                .attr('dx', '10')
                .attr('dy', '2')
                .attr('transform', "rotate(-90)")
                .style("font-family", "sans-serif")
                .style("font-size", "14px")
                .style("text-anchor", "start")
                .style("fill", "black");
        });
        //*************************************************************************************************************************


        //*************************************************************************************************************************
        //#### Pie/Donut Chart

        var year = ndx.dimension(function(d)
        {
            return d.Year;
        });

        var dimensionGroup = year.group();

        //var yearGroup = year.group();
        //var yearDimensionGroup = yearGroup.reduce(genericAdd, genericReduce, genericInit);

        var chart6 = pielineAvgBar
            .width(350) // (optional) define chart width, :default = 200
            .height(400) // (optional) define chart height, :default = 200
            .radius(160) // define pie radius
            .innerRadius(50)
            .minAngleForLabel(.1)
            .externalLabels(40)
            .externalRadiusPadding(50)
            .drawPaths(true)
            //.slicesCap(4)
            .dimension(year)
            .group(dimensionGroup)
            //.group(linetot)
            //.renderLabel(true)
            //.innerRadius(40)
            .transitionDuration(transition_time)
            //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            //.ordinalColors(["green","yellow","black","navy"])
            .renderTitle(true)
            // .title(function(d)
            // {
            //     return d.line;
            // })
            .title(function(p)
            {
                return p.key + "\n" + "Total count of ratings: " + numberFormat_int(p.value);
                //return p.key;
            })
            //.ordinalColors(colorbrewer.Dark2[8])
            .colors(d3.scale.category20());
        //.legend(dc.legend().x(10).y(0).itemHeight(20).gap(2))

        //*************************************************************************************************************************



        //*************************************************************************************************************************
        //#### Pie/Donut Chart

        var year = ndx.dimension(function(d)
        {
            return d.Line;
        });

        var dimensionGroup = year.group();

        //var yearGroup = year.group();
        //var yearDimensionGroup = yearGroup.reduce(genericAdd, genericReduce, genericInit);

        var chart7 = pielineAvgBar1
            .width(350) // (optional) define chart width, :default = 200
            .height(400) // (optional) define chart height, :default = 200
            .radius(160) // define pie radius
            .innerRadius(50)
            .minAngleForLabel(.1)
            .externalLabels(40)
            .externalRadiusPadding(50)
            .drawPaths(true)
            //.slicesCap(4)
            .dimension(year)
            .group(dimensionGroup)
            //.group(linetot)
            //.renderLabel(true)
            //.innerRadius(40)
            .transitionDuration(transition_time)
            //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
            //.ordinalColors(["green","yellow","black","navy"])
            .renderTitle(true)
            // .title(function(d)
            // {
            //     return d.line;
            // })
            .title(function(p)
            {
                return p.key + "\n" + "Total count of ratings: " + numberFormat_int(p.value);
                //return p.key;
            })
            //.ordinalColors(colorbrewer.Dark2[8])
            .colors(d3.scale.category20());
        //.legend(dc.legend().x(10).y(0).itemHeight(20).gap(2))

        //*************************************************************************************************************************



        //*************************************************************************************************************************
        var chart8 = distBar
            //.width($("#yearBar").width()) 
            .width(380)
            .height(300)
            .margins(
            {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            })
            .valueAccessor(function(p)
            {
                return p.value.TotalCount / all.value() * 100;
            })
            .gap(1)
            .transitionDuration(transition_time)
            .colors('steelblue')
            .label(function(p)
            {
                if (isNaN(p.value.TotalCount))
                {
                    return ""
                }
                else
                {
                    return p.key
                }
            })
            .elasticX(false)
            .title(function(p)
            {
                return p.key + "-star" + "\n" + numberFormat(p.value.TotalCount / all.value() * 100) + "% of total ratings " + "\n" + "Total count of ratings: " + numberFormat_int(p.value.TotalCount);
            })
            .elasticX(true)
            .renderTitle(true)
            .renderLabel(true)
            .labelOffsetX(-15)
            .labelOffsetY(25)
            .dimension(rating)
            .group(ratingDimensionGroup);

        distBar.xAxis().ticks(3);

        // chart8.on("renderlet", function(chart)
        // {
        //     chart.selectAll("g.row text")
        //         //.attr('dx', '0')
        //         //.attr('dy', '0')
        //         //.attr('transform', "rotate(-90)")
        //         //.style("font-family", "sans-serif")
        //         .style("font-size", "14px")
        //         .style("font-weight", "bold")
        //         .style("text-anchor", "start")
        //         .style("fill", "black");
        // });
        //*************************************************************************************************************************



        //*************************************************************************************************************************
        /* dc.dataCount('.dc-data-count', 'chartGroup'); */
        dataCount
            .dimension(ndx)
            .group(all)
            //# (_optional_) `.html` sets different html when some records or all records are selected.
            //# `.html` replaces everything in the anchor with the html given using the following function.
            //# `%filter-count` and `%total-count` are replaced with the values obtained.
            // .html(
            // {
            //     some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
            //         ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Reset All</a>',
            //     //all: 'All records selected. Please click on the graph to apply filters.'
            // });

        //*************************************************************************************************************************



        //*************************************************************************************************************************
        dc.renderAll();
        //dc.redrawAll();
        //*************************************************************************************************************************

    });


    //*************************************************************************************************************************
    // Determine the current version of dc with `dc.version`
    d3.selectAll("#version").text(dc.version);
    //*************************************************************************************************************************
}