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

var barChart1 = dc.barChart("#chart-bar1");
var barChart2 = dc.barChart("#chart-bar2");
var barChart3 = dc.barChart("#chart-bar3");
var barChart4 = dc.barChart("#chart-bar4");
var barChart5 = dc.barChart("#chart-bar5");

var rowChart1 = dc.rowChart("#chart-row1");

var pieChart1 = dc.pieChart("#chart-pie1");
var pieChart2 = dc.pieChart("#chart-pie2");

var tableCount = dc.dataCount('.dc-data-count');
var tableCount1 = dc.dataCount('.dc-data-count1');
var flightTable = dc.dataTable('.dc-data-table');
//*************************************************************************************************************************



//*************************************************************************************************************************
function drawChart()
{
	var inputfile = "data/test.csv";
	//var inputfile = "data/testsmall.csv";

	//d3.csv("ndx.csv", function (data) {
	d3.csv(inputfile, function(data)
	{
		//*******************************************************************************************
		var transition_time = 500;
		var dateFormat = d3.time.format.utc('%Y-%m-%dT%H%M');
		var numberFormat = d3.format(".2f");
		//*******************************************************************************************



		//*******************************************************************************************
		data.forEach(function(d)
		{
			d.DEP_DELAY = +d.DEP_DELAY;
			d.ARR_DELAY = +d.ARR_DELAY;
			d.DISTANCE = +d.DISTANCE;

			d.date = d.YEAR + '-' + d.MONTH + '-' + d.DAY_OF_MONTH + 'T' + d.DEP_TIME
			d.date = dateFormat.parse(d.date);

			//d.Year = +d.date.getFullYear();
			//d.month = +d.date.getMonth() + 1; //add one because it starts from 0

			//d.hours = +d.date.getHours();
			d.hours = +d.date.getUTCHours();

			//console.log(d.month)
			//console.log(d.ARR_DELAY)
			//console.log(d.hours)
		});

		//console.log(data);
		//*******************************************************************************************



		//*******************************************************************************************
		//### Create Crossfilter Dimensions and Groups
		var ndx = crossfilter(data);
		var all = ndx.groupAll();
		//*******************************************************************************************



		//*******************************************************************************************
		var genericAdd = function(p, v)
		{
			++p.count;
			p.totalDistance += v.DISTANCE;
			p.averageDistance = p.totalDistance / p.count;
			p.depdelay += v.DEP_DELAY;
			p.arrdelay += v.ARR_DELAY;
			p.hoursdep += v.hours;
			return p;        
		};

		var genericReduce = function(p, v)
		{
			--p.count;
			p.totalDistance -= v.DISTANCE;
			p.averageDistance = p.totalDistance / p.count;
			p.depdelay -= v.DEP_DELAY;
			p.arrdelay -= v.ARR_DELAY;
			p.hoursdep -= v.hours;
			return p;       
		};

		var genericInit = function(p, v)
		{            
			return {
				count: 0,
				totalDistance: 0,
				averageDistance: 0,
				depdelay: 0,
				arrdelay: 0,
				 
				hoursdep: 0,
			}; 
		};
		//*******************************************************************************************



		//*******************************************************************************************
		var dateDim = ndx.dimension(function(d)
		{
			return +d.date.getDate();
			//return console.log(+d.date.getDate()), +d.date.getDate();
		});

		var dateDimGroup = dateDim.group();

		var arrivals_delay_count = dateDimGroup.reduce(genericAdd, genericReduce, genericInit);
		//var arrivals_delay_count = dateDim.group()//.reduceCount();

		barChart1
			.width(750)
			.height(250)
			.margins(
			{
				top: 10,
				right: 20,
				bottom: 40,
				left: 40
			})
			.dimension(dateDim)
			.group(arrivals_delay_count)
			.transitionDuration(transition_time)
			//.elasticX(true)
			.elasticY(true)
			//.centerBar(true)
			.x(d3.scale.linear().domain([0, 32]))
			//.barPadding(0.2)
			//.gap(2)
			//.xUnits(function()
			// {
			//     return 50;
			// })
			.round(dc.round.floor)		//to round range in div chart-bar1
			.alwaysUseRounding(true)
			// .round(function(n)
			// {
			// 	return Math.floor(n) + 0.5;
			// })
			.valueAccessor(function(p)
			{
				return p.value.count;
				//return 2;
			})
			//.renderHorizontalGridLines(true)
			//.renderVerticalGridLines(true)
			//.brushOn(false)
			//.filter([0, 2])
			.renderTitle(true)
			//.xAxisPadding(2)
			//.yAxisPadding(2)
			.xAxisLabel("Day of the month", 10)
			.yAxisLabel("Flight count");

		barChart1.xAxis()
			//.ticks(31)
			.tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);

		barChart1.yAxis().tickFormat(d3.format(".d"));
		//*******************************************************************************************



		//*******************************************************************************************
		// var dateDim = ndx.dimension(function(d)
		// {
		// 	return d.ARR_DELAY;
		// });
		// var dateDimGroup = dateDim.group();

		var dateDim = ndx.dimension(function(d)
		{
			return Math.max(-60, Math.min(180, d.DEP_DELAY));
		});
		var dateDimGroup = dateDim.group(function(d)
		{
			return Math.floor(d / 10) * 10;
		});


		var departures_delay_count = dateDimGroup.reduce(genericAdd, genericReduce, genericInit);
		//var arrivals_delay_count = dateDim.group()//.reduceCount();

		barChart2
			.width(500)
			.height(200)
			.margins(
			{
				top: 10,
				right: 40,
				bottom: 40,
				left: 50
			})
			.dimension(dateDim)
			.group(departures_delay_count)
			.transitionDuration(transition_time)
			//.elasticX(true)
			.elasticY(true)
			.centerBar(true)
			.barPadding(1)
			.x(d3.scale.linear().domain([-70, 190]))
			//.x(d3.scale.linear().domain([-60, 100]).rangeRound([-60, 10 * 100]))
			//.x(d3.scale.linear().domain(d3.extent(data, function(d) { return d.ARR_DELAY; })))
			.xUnits(function()
			{
				return 15;
			})
			.alwaysUseRounding(true)
			// .round(function(n)
			// {
			// 	//return Math.floor(n) + 0.5;
			// 	return Math.floor(n);
			// })
			.round(dc.round.floor)			//to round range in div
			.valueAccessor(function(p)
			{
				return p.value.count;
			})
			.renderTitle(true)
			.xAxisLabel("Departure delay")
			.yAxisLabel("Flight count");

		barChart2.xAxis()
			//.ticks(20)
			.tickValues([-60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180]);

		barChart2.yAxis().tickFormat(d3.format(".d"));
		//*******************************************************************************************



		//*******************************************************************************************
		// var dateDim = ndx.dimension(function(d)
		// {
		// 	return d.ARR_DELAY;
		// });
		// var dateDimGroup = dateDim.group();

		var dateDim = ndx.dimension(function(d)
		{
			return Math.max(-60, Math.min(180, d.ARR_DELAY));
		});
		var dateDimGroup = dateDim.group(function(d)
		{
			return Math.floor(d / 10) * 10;
		});


		var arrivals_delay_count = dateDimGroup.reduce(genericAdd, genericReduce, genericInit);
		//var arrivals_delay_count = dateDim.group()//.reduceCount();

		barChart3
			.width(500)
			.height(200)
			.margins(
			{
				top: 10,
				right: 40,
				bottom: 40,
				left: 50
			})
			.dimension(dateDim)
			.group(arrivals_delay_count)
			.transitionDuration(transition_time)
			//.elasticX(true)
			.elasticY(true)
			.centerBar(true)
			.barPadding(1)
			.x(d3.scale.linear().domain([-70, 190]))
			//.x(d3.scale.linear().domain([-60, 100]).rangeRound([-60, 10 * 100]))
			//.x(d3.scale.linear().domain(d3.extent(data, function(d) { return d.ARR_DELAY; })))
			.xUnits(function()
			{
				return 15;
			})
			.alwaysUseRounding(true)
			// .round(function(n)
			// {
			// 	return Math.floor(n) + 0.5;
			// })
			.round(dc.round.floor)			//to round range in div
			.valueAccessor(function(p)
			{
				return p.value.count;
			})
			.renderTitle(true)
			.xAxisLabel("Arrival delay")
			.yAxisLabel("Flight count");

		barChart3.xAxis()
			//.ticks(20)
			.tickValues([-60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180]);

		barChart3.yAxis().tickFormat(d3.format(".d"));
		//*******************************************************************************************



		//*******************************************************************************************
		var dateDim = ndx.dimension(function(d)
		{
			//return +d.hours - 2;
			return +d.hours; //need to convert to UTC
		});

		var dateDimGroup = dateDim.group();


		var departure_time_count = dateDimGroup.reduce(genericAdd, genericReduce, genericInit);
		//var arrivals_delay_count = dateDim.group()//.reduceCount();

		barChart4
			.width(500)
			.height(200)
			.margins(
			{
				top: 10,
				right: 40,
				bottom: 40,
				left: 50
			})
			.dimension(dateDim)
			.group(departure_time_count)
			.transitionDuration(transition_time)
			//.elasticX(true)
			.elasticY(true)
			//.centerBar(true)
			//.barPadding(0.2)
			.x(d3.scale.linear().domain([-1, 25]))
			//.x(d3.scale.linear().domain([0, 24]).rangeRound([0, 10 * 24]))
			.alwaysUseRounding(true)
			// .round(function(n)
			// {
			// 	return Math.floor(n) + 0.5;
			// })
			.round(dc.round.floor)			//to round range in div
			.valueAccessor(function(p)
			{
				return p.value.count;
			})
			.renderTitle(true)
			.xAxisLabel("Departure time")
			.yAxisLabel("Flight count");

		barChart4.xAxis()
			//.ticks(23);
			.tickValues([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]);

		barChart4.yAxis().tickFormat(d3.format(".d"));
		//*******************************************************************************************



		//*******************************************************************************************
		var dateDim = ndx.dimension(function(d)
		{
			return Math.max(0, Math.min(2000, d.DISTANCE));
		});
		var dateDimGroup = dateDim.group(function(d)
		{
			return Math.floor(d / 50) * 50;
		});

		//var dateDimGroup = dateDim.group();


		var arrivals_delay_count = dateDimGroup.reduce(genericAdd, genericReduce, genericInit);
		//var arrivals_delay_count = dateDim.group()//.reduceCount();

		barChart5
			.width(500)
			.height(200)
			.margins(
			{
				top: 10,
				right: 40,
				bottom: 40,
				left: 50
			})
			.dimension(dateDim)
			.group(arrivals_delay_count)
			.transitionDuration(transition_time)
			//.elasticX(true)
			.elasticY(true)
			.centerBar(true)
			//.barPadding(0.2)
			.x(d3.scale.linear().domain([0, 2100]))
			.xUnits(function()
			{
				return 40;
			})
			.alwaysUseRounding(true)
			// .round(function(n)
			// {
			// 	return Math.floor(n) + 0.5;
			// })
			.round(dc.round.floor)			//to round range in div
			.valueAccessor(function(p)
			{
				return p.value.count;
			})
			.renderTitle(true)
			.xAxisLabel("Distance")
			.yAxisLabel("Flight count");

		barChart5.xAxis()
			.ticks(10);
		//.tickValues([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]);

		barChart5.xAxis().tickFormat(d3.format(".d"));
		barChart5.yAxis().tickFormat(d3.format(".d"));
		//*******************************************************************************************



		//*************************************************************************************************************************
		//dayOfWeekChart

		var dayOfWeek = ndx.dimension(function(d)
		{
			var day = d.date.getDay();

			//console.log(d.date,day)

			//The 0.sunday notation is to order the days by number and no lexicographical way
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

		rowChart1
			.width(300)
			.height(250)
			.margins(
			{
				top: 10,
				right: 10,
				bottom: 50,
				left: 10
			})
			.transitionDuration(transition_time)
			.dimension(dayOfWeek)
			.group(dayOfWeekGroup)
			//.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
			.ordinalColors(["rgb(65, 174, 118)"])
			//.ordinalColors(colorbrewer.Dark2[7])
			.label(function(d)
			{
				return d.key.split(".")[1];
				//return d.key;
			})
			.title(function(d)
			{
				return d.value + " flights";
			})
			//.transitionDuration(transition_time)
			.elasticX(true)
			.xAxis()
			//.xAxisLabel("Numer of flights")
			.ticks(5)
			.tickFormat(d3.format(".d"));

		// rowChart1.on("renderlet", function(chart)
		// {
		// 	chart.selectAll("g.row text")
		// 		.attr('dx', '5')
		// 		.attr('dy', '5')
		// 		//.attr('transform', "rotate(-90)")
		// 		.style("font-family", "sans-serif")
		// 		.style("font-size", "12px")
		// 		.style("font-weight", "normal")
		// 		.style("text-anchor", "start")
		// 		.style("fill", "black");
		// });
		//*************************************************************************************************************************



		//*******************************************************************************************
		//arrivals per airport

		var destDimension = ndx.dimension(function(d)
		{
			return d.DEST;
		});

		// var destGroup = destDimension.group().reduceCount(function(d)
		// {
		// 	return d.DEST;
		// });

		var destGroup = destDimension.group();

		pieChart1
			.width(600)
			.height(400)
			.transitionDuration(transition_time)
			.dimension(destDimension)
			.group(destGroup)
			.innerRadius(80)
			.radius(180)
			.slicesCap(16)
			.minAngleForLabel(.01)
			.externalLabels(40)
			.externalRadiusPadding(50)
			.drawPaths(true)
			// .label(function(d)
			// {
			// 	if (pieChart1.hasFilter() && !pieChart1.hasFilter(d.key))
			// 	{
			// 		return '0%';
			// 	}
			// 	return numberFormat(d.value / all.value() * 100) + '%';
			// })
            .ordering(function(p)
            {
                //return p.value.TotalCount;
                return p.value.DEST;
            })
			.renderLabel(true)
			//.ordinalColors(colorbrewer.Dark2[8])
			//.ordinalColors(colorbrewer.Paired[12])
			.colors(d3.scale.category20())
			.legend(dc.legend().x(0).y(10).itemHeight(16).gap(5));
		//*******************************************************************************************



		//*******************************************************************************************
		//US carrier

		var destDimension = ndx.dimension(function(d)
		{
			return d.CARRIER;
		});

		// var destGroup = destDimension.group().reduceCount(function(d)
		// {
		// 	return d.DEST;
		// });

		var destGroup = destDimension.group();

		pieChart2
			.width(600)
			.height(400)
			.transitionDuration(transition_time)
			.dimension(destDimension)
			.group(destGroup)
			.innerRadius(80)
			.radius(180)
			.slicesCap(16)
			.minAngleForLabel(.01)
			.externalLabels(40)
			.externalRadiusPadding(50)
			.drawPaths(true)
			// .label(function(d)
			// {
			// 	if (pieChart1.hasFilter() && !pieChart1.hasFilter(d.key))
			// 	{
			// 		return '0%';
			// 	}
			// 	return numberFormat(d.value / all.value() * 100) + '%';
			// })
            .ordering(function(p)
            {
                //return p.value.TotalCount;
                return p.value.DEST;
            })
			.renderLabel(true)
			//.ordinalColors(colorbrewer.Dark2[8])
			//.ordinalColors(colorbrewer.Paired[12])
			.colors(d3.scale.category20())
			.legend(dc.legend().x(0).y(10).itemHeight(16).gap(5));
		//*******************************************************************************************




		//*************************************************************************************************************************
		/* dc.dataCount('.dc-data-count', 'chartGroup'); */
		tableCount
			.dimension(ndx)
			.group(all);

		tableCount1
			.dimension(ndx)
			.group(all);

		// tableCount.html(
		// {
		//     some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
		//         ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Reset All</a>',
		//     all: 'All records selected. Please click on the graph to apply filters.'
		// });
		//*************************************************************************************************************************



		//*************************************************************************************************************************
		/* dc.dataTable('.dc-data-table', 'chartGroup') */
		flightTable
			.dimension(dateDim)
			.group(function(d)
			{
				return "List of filtered flights - Only 100 records are shown"
			})
			.size(100)
			//.columns([
			// function(d)
			// {
			//     return d.date;
			// },
			// 'date',
			// 'ORIGIN',
			// 'DEST',
			// 'DISTANCE',
			//'ARR_DELAY',
			//])
			.columns([
			{
				label: 'Date',
				format: function(d)
				{
					return d.date.getDate() + "-" +
						(d.date.getMonth() + 1) + "-" + //add 1 to month becasue counter starts form 0
						d.date.getFullYear();
				}
			},
			{
				label: 'Departure time',
				format: function(d)
				{
					// return d.date.getHours() + ":" +
					//     d.date.getMinutes();
					return d.DEP_TIME
				}
			},
			{
				label: 'Departure airport',
				format: function(d)
				{
					return d.ORIGIN;
				}
			},
			{
				label: 'Arrival airport',
				format: function(d)
				{
					return d.DEST;
				}
			},
			{
				label: 'Distance (mi.)',
				format: function(d)
				{
					return d.DISTANCE;
				}
			},
			{
				label: 'Delay at arrival (min.)',
				format: function(d)
				{
					return d.ARR_DELAY;
				}
			}, ])
			.sortBy(function(d)
			{
				//return d.ARR_DELAY;
				return d.date;
			})
			.order(d3.ascending)
			//.order(d3.descending)
			.on('renderlet', function(table)
			{
				table.selectAll('.dc-table-group').classed('info', true);
			})
			.on('renderlet', function(table)
			{
				table.selectAll('.dc-data-group').classed('early', true);
				//.classed('early', function(d) { return d.ARR_DELAY < 0; });
			});

		//*************************************************************************************************************************


		//*************************************************************************************************************************
		//download table
		d3.select('#download')
			.on('click', function() 
			{
			    var blob = new Blob([d3.csv.format(dateDim.top(Infinity))], {type: "text/csv;charset=utf-8"});
			    saveAs(blob, 'data.csv');	//it use js/FileSaver.js
			});
		//*************************************************************************************************************************



		//*******************************************************************************************
		dc.renderAll();
		//dc.redrawAll();
		//*******************************************************************************************



	});
	//*************************************************************************************************************************



	//*************************************************************************************************************************
	// Determine the current version of dc with `dc.version`
	d3.selectAll("#version").text(dc.version);
	//*************************************************************************************************************************
}