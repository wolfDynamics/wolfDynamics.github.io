function linearRegressionChart(dataset, myOptions)
{

	//=========================================================================================================================
	//svg dimensions and margins

	//var margin = {top: 20, right: 20, bottom: 20, left: 20};
	//var margin  = {top: 20, right: 20, bottom: 40, left: 60}

	var margintop = typeof(myOptions.margintop) !== "undefined" ? myOptions.margintop : 20;
	var marginbottom = typeof(myOptions.marginbottom) !== "undefined" ? myOptions.marginbottom : 60;
	var marginleft = typeof(myOptions.marginleft) !== "undefined" ? myOptions.marginleft : 60;
	var marginright = typeof(myOptions.marginright) !== "undefined" ? myOptions.marginright : 20;


	var margin = {
		top: margintop,
		right: marginright,
		bottom: marginbottom,
		left: marginleft
	};


	var responsive = typeof(myOptions.responsive) !== "undefined" ? myOptions.responsive : "no";

	if (responsive == "yes")
	{
		//To get width and height of body element
		var width = window.innerWidth - margin.left / 2 - margin.right / 2;
		var height = window.innerHeight - margin.top / 2 - margin.bottom / 2;

		//This one gets the width and height of the div
		//var width = $("#myChart").width();

		//console.log(window.innerWidth)
		//console.log(window.innerHeight)
	}
	else
	{
		var width = typeof(myOptions.width) !== "undefined" ? myOptions.width : 600;
		var height = typeof(myOptions.height) !== "undefined" ? myOptions.height : 400;
		//var padding = typeof(myOptions.padding) !== "undefined" ? myOptions.padding : 0;
	};

	var w1 = width; //width
	var h1 = height; //height

	var width = w1 - margin.left - margin.right;
	var height = h1 - margin.top - margin.bottom;


	var chart_background = typeof(myOptions.chart_background) !== 'undefined' ? myOptions.chart_background : '#F5F2EB';

	var chart_border = typeof(myOptions.chart_border) !== 'undefined' ? myOptions.chart_border : 'yes';
	if (chart_border == "yes")
	{
		var chart_border_width = 1;
	}
	else
	{
		var chart_border_width = 0;
	}
	//=========================================================================================================================


	//=========================================================================================================================
	//column to sample in the input data
	//x axis
	var column_x = typeof(myOptions.column_x) !== "undefined" ? myOptions.column_x : 0;

	//y axis
	var column_y = typeof(myOptions.column_y) !== "undefined" ? myOptions.column_y : 1;

	//color encoder
	var column_c = typeof(myOptions.column_c) !== "undefined" ? myOptions.column_c : 0;

	//size encoder
	var column_s = typeof(myOptions.column_s) !== "undefined" ? myOptions.column_s : 0;

	//title 
	var column_t = typeof(myOptions.column_t) !== "undefined" ? myOptions.column_t : column_y;

	//=========================================================================================================================


	//=========================================================================================================================
	//circle opacity
	var circle_opacity = typeof(myOptions.circle_opacity) !== 'undefined' ? myOptions.circle_opacity : 1;

	//circle size
	var circle_size = typeof(myOptions.circle_size) !== 'undefined' ? myOptions.circle_size : 3.5;

	//circle color is no encoder is used
	var circle_color = typeof(myOptions.circle_color) !== 'undefined' ? myOptions.circle_color : "steelblue";
	//=========================================================================================================================



	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right
	//var xOffset = 0;         
	var xOffset = typeof(myOptions.xOffset) !== "undefined" ? myOptions.xOffset : 10;

	//offset of graph and axis from top
	//var yOffset = 20;         
	var yOffset = typeof(myOptions.yOffset) !== "undefined" ? myOptions.yOffset : 0;

	//offset of left axis and graph
	//not used for the moment
	//var xa_start = typeof(myOptions.xa_start) !== "undefined" ? myOptions.xa_start : 0;

	//offset of bottom axis and graph
	//not used for the moment
	//var ya_start = typeof(myOptions.ya_start) !== "undefined" ? myOptions.ya_start : 0;

	//translate bottom axis 
	var shift_ax = typeof(myOptions.shift_ax) !== "undefined" ? myOptions.shift_ax : 72;

	//translate left axis     
	var shift_ay = typeof(myOptions.shift_ay) !== "undefined" ? myOptions.shift_ay : 0;
	//=========================================================================================================================


	//=========================================================================================================================
	//EXPERIMENTAL

	//These options are giving problems with the gridlines
	//maybe useful for clippling
	//Start and end of clipping
	// var xc_begin  = 0;
	// var xc_Offset = 0;     //usually same as xOffSet if you want to clip to the end of the axis
	// //var xc_end    = 0;
	// var xc_end    = xc_Offset + xc_begin;
	// var yc_begin  = 0;
	// var yc_Offset = 0;     //usually same as yOffSet if you want to clip to the ens of the axis
	// //var yc_end    = yc_Offset + yc_begin;
	// var yc_end    = 0;
	//Start and end of clipping

	//EXPERIMENTAL
	//=========================================================================================================================


	//=========================================================================================================================
	//Legend position
	var legend_x = typeof(myOptions.legend_x) !== "undefined" ? myOptions.legend_x : 0;
	var legend_y = typeof(myOptions.legend_y) !== "undefined" ? myOptions.legend_y : 0;
	//Legend position


	//x label position
	var text_padding_axx = typeof(myOptions.text_padding_axx) !== "undefined" ? myOptions.text_padding_axx : width / 2 - margin.right;
	var text_padding_axy = typeof(myOptions.text_padding_axy) !== "undefined" ? myOptions.text_padding_axy : 35;
	//x label position


	//y label position
	var text_padding_ayx = typeof(myOptions.text_padding_ayx) !== "undefined" ? myOptions.text_padding_ayx : 40;
	var text_padding_ayy = typeof(myOptions.text_padding_ayy) !== "undefined" ? myOptions.text_padding_ayy : height / 2;
	//y label position


	//title position
	var title_x = typeof(myOptions.title_x) !== "undefined" ? myOptions.title_x : width / 2;
	var title_y = typeof(myOptions.title_y) !== "undefined" ? myOptions.title_y : 10;
	//title position


	//gap for closing external frame on right side
	//var gap  = 1;
	var gap = typeof(myOptions.gap) !== "undefined" ? myOptions.gap : 0;


	//show title
	var show_title = typeof(myOptions.show_title) !== "undefined" ? myOptions.show_title : "no";
	var title_auto_label = typeof(myOptions.title_auto_label) !== "undefined" ? myOptions.title_auto_label : "yes";
	var title_label = typeof(myOptions.title_label) !== "undefined" ? myOptions.title_label : "{title_label: Chart title}";
	//show title


	//axes legend parameters
	//yes or no
	var xa_show_legend = typeof(myOptions.xa_show_legend) !== 'undefined' ? myOptions.xa_show_legend : 'yes';
	var xa_auto_legend = typeof(myOptions.xa_auto_legend) !== 'undefined' ? myOptions.xa_auto_legend : 'yes';
	var xa_legend = typeof(myOptions.xa_legend) !== 'undefined' ? myOptions.xa_legend : '{axis label: label}';

	var ya_show_legend = typeof(myOptions.ya_show_legend) !== 'undefined' ? myOptions.ya_show_legend : 'yes';
	var ya_auto_legend = typeof(myOptions.ya_auto_legend) !== 'undefined' ? myOptions.ya_auto_legend : 'yes';
	var ya_legend = typeof(myOptions.ya_legend) !== 'undefined' ? myOptions.ya_legend : '{axis label: label}';
	//axes legend parameters


	//Add scaling to x and y axis
	var xdelta = typeof(myOptions.xdelta) !== "undefined" ? myOptions.xdelta : 1.0;
	var ydelta = typeof(myOptions.ydelta) !== "undefined" ? myOptions.ydelta : 1.0;
	//To scale more axis to avoid close fitting with frame


	//x, y axes auto scale
	var xaxis_auto_scale = typeof(myOptions.xaxis_auto_scale) !== "undefined" ? myOptions.xaxis_auto_scale : "yes";
	var xMin = typeof(myOptions.xMin) !== "undefined" ? myOptions.xMin : 0;
	var xMax = typeof(myOptions.xMax) !== "undefined" ? myOptions.xMax : 1;

	var yaxis_auto_scale = typeof(myOptions.yaxis_auto_scale) !== "undefined" ? myOptions.yaxis_auto_scale : "yes";
	var yMin = typeof(myOptions.yMin) !== "undefined" ? myOptions.yMin : 0;
	var yMax = typeof(myOptions.yMax) !== "undefined" ? myOptions.yMax : 1;
	//x, y axes auto scale


	//x, y axes font size
	var axes_font_size = typeof(myOptions.axes_font_size) !== "undefined" ? myOptions.axes_font_size : 10;
	//x, y axes font size


	//enable zoom pan
	//var enable_zoom_pan = typeof(myOptions.enable_zoom_pan) !== "undefined" ? myOptions.enable_zoom_pan : "no";
	//var minZoom = typeof(myOptions.minZoom) !== "undefined" ? myOptions.minZoom : 1;
	//var maxZoom = typeof(myOptions.maxZoom) !== "undefined" ? myOptions.maxZoom : 10;
	//enable zoom pan


	//Gridlines
	var gridlines_x = typeof(myOptions.gridlines_x) !== "undefined" ? myOptions.gridlines_x : "no";
	var gridlines_y = typeof(myOptions.gridlines_y) !== "undefined" ? myOptions.gridlines_y : "no";
	//Gridlines


	//axes number ticks
	var x_ticks = typeof(myOptions.x_ticks) !== "undefined" ? myOptions.x_ticks : 10;
	var y_ticks = typeof(myOptions.y_ticks) !== "undefined" ? myOptions.y_ticks : 10;
	//axes number ticks

	//plot inner frame
	var plot_frame = typeof(myOptions.plot_frame) !== "undefined" ? myOptions.plot_frame : "no";


	//axes number format
	// var ax_f = ".d"  ".f"  ".2f"
	var ax_f = typeof(myOptions.ax_f) !== "undefined" ? myOptions.ax_f : ".r";
	var ay_f = typeof(myOptions.ay_f) !== "undefined" ? myOptions.ay_f : ".r";
	//=========================================================================================================================


	//=========================================================================================================================
	//Regression line options
	var transition_duration = typeof(myOptions.transition_duration) !== "undefined" ? myOptions.transition_duration : 1500;
	var transition_delay = typeof(myOptions.transition_delay) !== "undefined" ? myOptions.transition_delay : 500;
	var regline_color = typeof(myOptions.regline_color) !== "undefined" ? myOptions.regline_color : "crimson";
	var regline_width = typeof(myOptions.regline_width) !== "undefined" ? myOptions.regline_width : 2.0;

	//var linedash = "(8,8)";
	var regline_dash = typeof(myOptions.regline_dash) !== "undefined" ? myOptions.regline_dash : (0, 0);

	//Regression line options
	//=========================================================================================================================



	//=========================================================================================================================
	//Regression line options
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== 'undefined' ? myOptions.enable_tooltip : "no";
	var tooltip_f = typeof(myOptions.tooltip_f) !== 'undefined' ? myOptions.tooltip_f : ".4f";
	//=========================================================================================================================


	//=========================================================================================================================
	//Statistics text
	//var text_stats_padding = typeof(myOptions.text_stats_padding) !== 'undefined' ? myOptions.text_stats_padding : -20;
	var show_regression_stats = typeof(myOptions.show_regression_stats) !== 'undefined' ? myOptions.show_regression_stats : "yes";
	var show_statistics = typeof(myOptions.show_statistics) !== 'undefined' ? myOptions.show_statistics : "yes";
	if (show_statistics == "no" && show_regression_stats == "yes")
	{
		shift_ax = 20;
		text_stats_padding = 25;
	}
	else if (show_statistics == "no" && show_regression_stats == "no")
	{
		shift_ax = -10;
		text_stats_padding = 0;
	}
	else if (show_statistics == "yes" && show_regression_stats == "no")
	{
		shift_ax = 55;
		text_stats_padding = 0;
	}
	else
	{
		text_stats_padding = -20;
	};
	//=========================================================================================================================



	//=========================================================================================================================
	//Change to black and white for publications

	//set everything to black and white for publication
	var black_and_white = typeof(myOptions.black_and_white) !== 'undefined' ? myOptions.black_and_white : "no";
	//set everything to black and white for publication


	if (black_and_white == "yes")
	{
		chart_background = "white";
		//chart_border = "yes";
		//chart_border_width = 0;

		regline_color = "black";
		regline_width = 1;
		circle_color = "white";

		transition_duration = 0;
		transition_delay = 0;

		//show_statistics = "no";
		//show_regression_stats = "no";

		plot_frame = "yes";

		enable_tooltip = "no";

		//$("#chart").css("background-color", "white");	
	}
	//=========================================================================================================================



	//========================================================================================================================= 
	var headerNames = d3.keys(dataset[0]); //get header, using d3.  Here we get first row
	//console.log(headerNames)

	var keys = Object.keys(dataset[0]); //get keys outside the loop.  Same as the previous method but we do not use d3 
	//console.log(keys)

	//get id of header to plto as title and axis name
	var xLabel = Object.keys(dataset[0])[column_x];

	var yLabel = Object.keys(dataset[0])[column_y];
	//var yLabel = Object.keys(dataset[0])[column_y1];
	//var yLabel = Object.keys(dataset[0])[column_y2];

	var tLabel = Object.keys(dataset[0])[column_t];

	// console.log(xLabel)
	// console.log(yLabel)
	// console.log(tLabel)
	//=========================================================================================================================



	//=========================================================================================================================
	// change string (from CSV) into number format

	dataset.forEach(function(d, i)
	{
		keys.forEach(function(key, i)
		{
			//console.log(d[key])
			//console.log(key)

			//From Hayle. Nice way to convert strings to numbers
			//if it is a number it will converted otherwise will remain as a string
			orig = d[key];
			modified = Number(orig);
			d[key] = (typeof orig === "string" && !isNaN(modified)) ? modified : orig;

			//easy way to convert string to numbers       
			//d[key] = +d[key];             
		});

		//console.log(d)
		//console.log(keys[0],d[keys[0]])

	});


	// console.log(keys)
	// console.log(dataset[0])
	// console.log(dataset[0]["dv1"])
	//=========================================================================================================================



	//=========================================================================================================
	//get x and y values from dataset

	//Take in the values of the requested column and put them into xValue and yValue   
	var xValue = function(d)
	{
		return d[keys[column_x]];
	};

	var yValue = function(d)
	{
		return d[keys[column_y]];
	};


	//Scale the xValue and yValue using the scaling functions  
	//Use this for the circles          
	var xMap = function(d)
	{
		return xScale(xValue(d));
	};
	var yMap = function(d)
	{
		return yScale(yValue(d));
	};


	//console.log(typeof xMap)
	//console.log(xValue(dataset[0]))

	// console.log(typeof dataset)
	// console.log(typeof xValue)
	//=========================================================================================================



	//=========================================================================================================
	//create scaling functions and adjust range at the same time

	if (xaxis_auto_scale == "yes")
	{
		var xScale = d3.scale.linear()
			.domain([xdelta * d3.min(dataset, xValue), xdelta * d3.max(dataset, xValue)])
			//.range([xa_start, width - xOffset])
			.range([shift_ay, width - xOffset])
			.nice();
	}
	else
	{
		var xScale = d3.scale.linear()
			.domain([xMin, xMax])
			//.range([0,width-xOffset])
			//.range([xa_start, width - xOffset])
			.range([shift_ay, width - xOffset])
			.nice();
	};

	//console.log(d3.min(dataset, xValue))
	//console.log(d3.max(dataset, xValue))


	if (yaxis_auto_scale == "yes")
	{
		var yScale = d3.scale.linear()
			.domain([ydelta * d3.min(dataset, yValue), ydelta * d3.max(dataset, yValue)])
			.range([height - shift_ax, yOffset])
			.nice();
	}
	else
	{
		var yScale = d3.scale.linear()
			.domain([yMin, yMax])
			//.range([height,yOffset])
			.range([height - shift_ax, yOffset])
			.nice();
	};

	//=========================================================================================================



	//=========================================================================================================
	//Create axes.  We need to draw them on the svg, this is done at the end
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(x_ticks)
		//.outerTickSize(-height + shift_ax - gap)
		//.innerTickSize(-height - gap)
		//.tickSize(-250)  
		.tickFormat(d3.format(ax_f));

	// .tickPadding(10)
	// .tickSubdivide(true)

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(y_ticks)
		//.outerTickSize(-width + xOffset)
		//.innerTickSize(-width + xOffset)
		.tickFormat(d3.format(ay_f));


	if (plot_frame == "yes")
	{
		xAxis.outerTickSize(-height + yOffset + shift_ax);
		//xAxis.outerTickSize(-50);
		yAxis.outerTickSize(-width + xOffset + shift_ay);
	};

	//=========================================================================================================



	//=========================================================================================================
	//setup fill color
	//var cValue = function(d) { return d.species;}
	var cValue = function(d)
	{
		return d[keys[column_c]];
	};

	var color = d3.scale.category10();
	//var color = d3.scale.category20();

	//var color = d3.scale.ordinal()
	//.domain(["foo", "bar", "baz"])        //to define domain in range
	//.range(colorbrewer.RdBu[9])
	//.range(colorbrewer.OrRd[8])
	//.range(colorbrewer.PuOr[3])           //ordinal colors minimum 3 cats
	//.range(colorbrewer.RdYlBu[3])         //ordinal colors minimum 3 cats
	//.range(colorbrewer.Dark2[3])        
	//=========================================================================================================



	//=========================================================================================================================
	//tooltip function

	//taken form http://bl.ocks.org/Caged/6476579
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, -0])
		//.direction('e')
		//Set or get a tip's HTML content
		//Initialize tooltip 
		.html(function(d)
		{
			//return "<span style='color:white;font-size:10px'>x:</span> <span style='color:red;font-size:10px'>" + (height - d.y) + "</span>"
			return "</span> <span style='color:white;font-size:10px'>" + d3.format(tooltip_f)(d[keys[column_x]]) + "</span>" + " ," +
				"</span> <span style='color:white;font-size:10px'>" + d3.format(tooltip_f)(d[keys[column_y]]) + "</span>";
		});
	//=========================================================================================================================



	//=========================================================================================================
	// add the graph svg to the body of the webpage
	var mySvg = d3.select("#myChart")
	//var mySvg = d3.select("body")
		.append("svg")
		.style("background-color", chart_background)
		.style("border", chart_border_width)
		.attr("id", "chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//Responsive svg
		//.call(responsivefy)
		.append("g")
		//.attr("transform", "translate("+ margin.left + ",0)")                       //to traslate whole svg      
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//=========================================================================================================



	//=========================================================================================================================
	// Draw the x Grid lines

	if (gridlines_x == "yes")
	{
		mySvg.append("g")
			//.attr("class", "grid")
			.attr("transform", "translate(0," + (height - shift_ax) + ")")
			.style("stroke", "lightgrey")
			.style("stroke-opacity", 1)
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("8,8"))
			.style("shape-rendering", "crispEdges")
			//.style("stroke-dasharray", (linedash)) 
			.call(grid_x_axis()
				//.tickSize(-250, 0)
				.tickSize(-height + shift_ax + yOffset, 0)
				.tickFormat("")
			)
	};

	// Draw the y Grid lines
	if (gridlines_y == "yes")
	{
		mySvg.append("g")
			//.attr("class", "grid")
			.attr("transform", "translate(" + shift_ay + ",0)")
			.style("stroke", "lightgrey")
			.style("stroke-opacity", 1)
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("8,8"))
			.style("shape-rendering", "crispEdges")
			//.style("stroke-dasharray", (linedash)) 
			.call(grid_y_axis()
				//.tickSize(-width, 0, 0)
				.tickSize(-width + shift_ay + xOffset, 0)
				.tickFormat("")
			)
	};

	//=========================================================================================================================



	//=========================================================================================================
	// Axes will be drawn under the line
	// x-axis
	var group = mySvg.append("g")
		//.attr("class", "x axis")
		.classed("x axis", true)
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(0," + (height - shift_ax) + ")")
		.call(xAxis);

	if (xa_show_legend == "yes")
	{
		if (xa_auto_legend == "yes")
		{
			xLabel = xLabel;
		}
		else
		{
			xLabel = xa_legend;
		};

		group.append("text")
			//.attr("x", width + xOffset)
			//.attr("y", -12)
			.attr("y", text_padding_axy)
			.attr("x", text_padding_axx)
			//.attr("class", "label")
			.style("font-family", "sans-serif")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.style("fill", "black")
			.style("text-anchor", "middle")
			//.text("QOI");
			.text(xLabel);
		// .text(function()
		// {
		// 	return xLabel
		// });
	};



	// y-axis
	var group = mySvg.append("g")
		//.attr("class", "y axis")
		.classed("y axis", true)
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(" + shift_ay + ",0)")
		.call(yAxis);


	if (ya_show_legend == "yes")
	{
		if (ya_auto_legend == "yes")
		{
			yLabel = yLabel;
		}
		else
		{
			yLabel = ya_legend;
		}

		group.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -text_padding_ayx)
			.attr("x", -text_padding_ayy)
			//.attr("y", 6)
			//.attr("dy", ".71em")
			//.attr("class", "label")
			.style("font-family", "sans-serif")
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.style("fill", "black")
			.style("text-anchor", "middle")
			//.text("Count");
			.text(yLabel);
		// .text(function()
		// {
		// 	return yLabel
		// });
	};

	//=========================================================================================================



	//=========================================================================================================================
	//title
	if (show_title == "yes")
	{

		if (title_auto_label == "yes")
		{
			myTitle = mySvg.append("text")
				.attr("x", title_x)
				.attr("y", title_y)
				//.attr("x", width/2 )
				//.attr("x", width/2 - (margin.left + margin.right)/2 )
				//.attr("y", 0 + margin.top)
				//.attr("dy", "0.35em")
				.attr("text-anchor", "middle")
				.attr("font-family", "sans-serif")
				.attr("font-size", "20px")
				.attr("font-weight", "bold")
				.attr("fill", "black")
				//.text("Hexagonal Binning")
				.text(function()
				{
					return tLabel;
				})

		}
		else
		{
			myTitle = mySvg.append("text")
				.attr("x", title_x)
				.attr("y", title_y)
				//.attr("x", width/2 )
				//.attr("x", width/2 - (margin.left + margin.right)/2 )
				//.attr("y", 0 + margin.top)
				//.attr("dy", "0.35em")
				.attr("text-anchor", "middle")
				.attr("font-family", "sans-serif")
				.attr("font-size", "20px")
				.attr("font-weight", "bold")
				.attr("fill", "black")
				//.text("Hexagonal Binning")
				.text(title_label);
		};

	};
	//=========================================================================================================================



	//=========================================================================================================
	// draw dots
	points = mySvg.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		//.attr("clip-path", "url(#clip)") //this will clip the circles if they go outside the frame
		//.append("g")
		.attr("class", "dot")
		.attr("r", circle_size)
		//.attr("r", function(d) { return d[keys[column_s]];})
		//.attr("r", function(d) { return yScale(d[keys[column_s]]);})
		.attr("cx", xMap)
		.attr("cy", yMap)
		//.style("fill", "red") 
		//.style("fill", function(d) { return color(cValue(d));}) 
		.style("fill", circle_color)
		.style("opacity", circle_opacity);
	//=========================================================================================================



	//=========================================================================================================================
	//Invoke the tip in the context of your visualization 
	//apply the tooltip to the svg

	mySvg.call(tip);

	//This will add the tooltip
	if (enable_tooltip == "yes")
	{
		points
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
	};

	//two call two events at the same time use namespaces
	// .on("mouseover.mover", mover).on("mouseover.tip_s", tip.show)
	// .on("mouseout.mout", mout).on("mouseout.tip_h", tip.hide)

	//=========================================================================================================================



	//=========================================================================================================================
	//Find minimum and maximum to be used with the statistics

	// var xMinval = d3.min(dataset, function(d) { return d[keys[column_x]]; });                  
	// var xMaxval = d3.max(dataset, function(d) { return d[keys[column_x]]; });
	// var yMinval = d3.min(dataset, function(d) { return d[keys[column_y]]; });                        
	// var yMaxval = d3.max(dataset, function(d) { return d[keys[column_y]]; });

	//same as previous.  Which one is faster?
	var xMinval = d3.min(dataset, xValue);
	var xMaxval = d3.max(dataset, xValue);
	var yMinval = d3.min(dataset, yValue);
	var yMaxval = d3.max(dataset, yValue);
	//=========================================================================================================================



	//=========================================================================================================
	//Compute statistics

	//Get columns name and extract points (array of points)
	var cols = [keys[column_x], keys[column_y]];
	var points = getHexPoints(dataset, cols);

	//console.log(cols)
	//console.log(points)

	//x coordinate
	var filteredx = points.map(function(elem)
	{
		return elem[0];
	});
	//console.log(filteredx)

	//y coordinate
	var filteredy = points.map(function(elem)
	{
		return elem[1];
	});
	//console.log(filteredy)

	//compute statistics using simple statistics library
	var meanx = ss.mean(filteredx);
	var meany = ss.mean(filteredy);
	var varx = ss.sampleVariance(filteredx);
	var vary = ss.sampleVariance(filteredy);
	var cor = ss.sampleCorrelation(filteredx, filteredy);

	// console.log(meanx)
	// console.log(meany)
	// console.log(varx)
	// console.log(vary)
	// console.log(cor)

	//This one returns m and b
	var linReg1 = ss.linearRegression(points);
	//console.log(linReg1)
	//console.log(linReg1["b"])
	//console.log(linReg1["m"])


	//This one returns a function that gives the value of y1 at x1
	//and y2 at x2.  To get the values we give xMinval and xMaxval to the function
	//and we get the respective y1 and y2
	var linReg = ss.linearRegressionLine(ss.linearRegression(points));
	// console.log(xScale(xMinval))
	// console.log(xScale(xMaxval))
	// console.log(yScale(linReg(yMinval)))
	// console.log(yScale(linReg(yMaxval)))

	//=========================================================================================================



	//=========================================================================================================
	//Plot the regression line

	//Regression line with transition
	var regline_svg = mySvg.append("line")
		.attr("clip-path", "url(#clip)") //this will clip the line if it goes outside the frame
		.style("stroke", regline_color)
		.style("stroke-width", regline_width)
		.style("stroke-dasharray", regline_dash)
		.attr("x1", function(d)
		{
			return xScale(xMinval);
		})
		.attr("y1", function(d)
		{
			return yScale(linReg(xMinval));
		})
		.attr("x2", function(d)
		{
			return xScale(xMinval);
		})
		.attr("y2", function(d)
		{
			return yScale(linReg(xMinval));
		})
		.transition()
		// .duration(1500)
		// .delay(1500)
		.duration(transition_duration)
		.delay(transition_delay)
		.attr("x2", function(d)
		{
			return xScale(xMaxval);
		})
		.attr("y2", function(d)
		{
			return yScale(linReg(xMaxval));
		});


	//Regression line with no transition
	// var regline_svg = mySvg.append("line")
	// 	.style("stroke", "red")
	// 	.attr("stroke-width", 2)
	// 	//give xMinval to get y1
	// 	.attr("x1", xScale(xMinval))
	// 	.attr("y1", yScale(linReg(xMinval)))
	// 	//give xMaxval to get y2
	// 	.attr("x2", xScale(xMaxval))
	// 	.attr("y2", yScale(linReg(xMaxval)))
	//Mouse over regression lne.  
	//To use you need to setup tooltip
	//Does not work with transition
	// .on("mouseover", function(d)
	// {
	// 	tooltip.transition()
	// 		.duration(200)
	// 		.style("opacity", .9);

	// 	tooltip.html("m = " + linReg1["m"].toFixed(4) + "x " + "<br>" + "b = " + linReg1["b"].toFixed(4))
	// 		.style("left", (d3.event.pageX + 0) + "px")
	// 		.style("top", (d3.event.pageY - 20) + "px");
	// })
	// .on("mouseout", function(d)
	// {
	// 	tooltip.transition()
	// 		.duration(500)
	// 		.style("opacity", 0);
	// })

	//=========================================================================================================



	//=========================================================================================================
	//Create text elements for the statistics on the svg

	//var txtStat = d3.selectAll("mySvg")
	//var txtStat = d3.select("body")
	var txtStat = mySvg
		.append("text")
		//.attr("text-anchor", "middle")
		.attr("font-family", "sans-serif")
		.attr("font-size", "10px")
		//.attr("font-weight", "bold")
		.attr("fill", "black")
		//.attr("y",yOffset+height+140);
		//.attr("y", height - 20);
		.attr("y", height + text_stats_padding);

	if (show_statistics == "yes")
	{
		txtStat.append("tspan")
			.attr("x", 0)
			.text("Number of samples: " + points.length);

		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			.text("Mean of " + xLabel + " (x axis): " + meanx.toFixed(4));

		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			//.text("Mean of y: " + meany.toFixed(4));
			.text("Mean of " + yLabel + " (y axis): " + meany.toFixed(4));

		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			//.text("Sample variance of x: " + varx.toFixed(4));
			.text("Sample variance of " + xLabel + " (x axis): " + varx.toFixed(4));

		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			//.text("Sample variance of y: " + vary.toFixed(4));
			.text("Sample variance of " + yLabel + " (y axis): " + vary.toFixed(4));
	};

	if (show_regression_stats == "yes")
	{
		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			.text("Correlation: " + cor.toFixed(4));

		txtStat.append("tspan")
			.attr("x", 0)
			.attr("dy", "1.2em")
			//.text("Linear regression: Y = " + linReg1["m"].toFixed(4) + "X + " + linReg1["b"].toFixed(4));
			.text(function()
			{
				if (linReg1["b"] >= 0)
				{
					return "Linear regression: Y = " + linReg1["m"].toFixed(4) + "X + " + linReg1["b"].toFixed(4);
				}
				else
				{
					return "Linear regression: Y = " + linReg1["m"].toFixed(4) + "X - " + Math.abs(linReg1["b"].toFixed(4));
				}
			});
	};

	//=========================================================================================================



	//=========================================================================================================
	//This will clip regression line if it goes outside the frame
	//clippath 
	if (plot_frame == "yes")
	{
		mySvg.append("clipPath")
			.attr("id", "clip")
			.append("rect")
			// .attr("x", 0)
			// .attr("y", yOffset)
			// .attr("width", width - xOffset)
			// .attr("height", height - yOffset)
			.attr("transform", "translate(0," + shift_ax + ")")
			.attr("x", shift_ay)
			.attr("y", yOffset - shift_ax)
			.attr("width", width - xOffset - shift_ay)
			.attr("height", height - yOffset - shift_ax);
	};

	//=========================================================================================================





	//=========================================================================================================================
	//FUNCTIONS HERE
	//=========================================================================================================================

	//=========================================================================================================================
	// function for the x grid lines
	function grid_x_axis()
	{
		return d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(x_ticks);
	};

	// function for the y grid lines
	function grid_y_axis()
	{
		return d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(y_ticks);
	};
	//=========================================================================================================================

	//=========================================================================================================================
	// function to convert from array of object to array of points
	function getHexPoints(AofO, cols)
	{
		var output = AofO.map(function(entry, i)
		{
			return cols.map(function(col)
			{
				return entry[col];
			});
		});
		return output;
	};

	//=========================================================================================================================






}