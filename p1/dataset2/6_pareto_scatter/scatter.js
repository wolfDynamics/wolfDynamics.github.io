function scatterChart(dataset, myOptions)
{

	//=========================================================================================================================
	//svg dimensions and margins

	var margintop = typeof(myOptions.margintop) !== 'undefined' ? myOptions.margintop : 20;
	var marginbottom = typeof(myOptions.marginbottom) !== 'undefined' ? myOptions.marginbottom : 20;
	var marginleft = typeof(myOptions.marginleft) !== 'undefined' ? myOptions.marginleft : 20;
	var marginright = typeof(myOptions.marginright) !== 'undefined' ? myOptions.marginright : 20;

	var margin = {
		top: margintop,
		right: marginright,
		bottom: marginbottom,
		left: marginleft
	}

	var responsive = typeof(myOptions.responsive) !== 'undefined' ? myOptions.responsive : 'no';

	if (responsive == 'yes')
	{

		//To get width and height of body element
		var width = window.innerWidth - 2 * margin.left - 2 * margin.right;
		var height = window.innerHeight - 2 * margin.top - 2 * margin.bottom;

		//This one gets the width and height of the div
		//var width = $('#myChart').width();

		//console.log(window.innerWidth)
		//console.log(window.innerHeight)

	}
	else
	{
		var width = typeof(myOptions.width) !== 'undefined' ? myOptions.width : 600;
		var height = typeof(myOptions.height) !== 'undefined' ? myOptions.height : 400;
		//var padding = typeof(myOptions.padding) !== 'undefined' ? myOptions.padding : 30;
	}

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



	//=========================================================================================================
	//column to sample in the input data

	//x axis
	var column_x = typeof(myOptions.column_x) !== 'undefined' ? myOptions.column_x : 1;

	//y axis
	var column_y = typeof(myOptions.column_y) !== 'undefined' ? myOptions.column_y : 2;

	//title 
	var column_t = typeof(myOptions.column_t) !== 'undefined' ? myOptions.column_t : 1;

	//color encoder for circles and legend
	var column_c = typeof(myOptions.column_c) !== 'undefined' ? myOptions.column_c : 1;

	//size encoder for circles and legend
	var column_s = typeof(myOptions.column_s) !== 'undefined' ? myOptions.column_s : 1;

	//legend title 
	var column_lt = typeof(myOptions.column_lt) !== 'undefined' ? myOptions.column_lt : column_c;

	//=========================================================================================================


	//=========================================================================================================================
	//Circle options

	//circle opacity
	var circle_opacity = typeof(myOptions.circle_opacity) !== 'undefined' ? myOptions.circle_opacity : 1;

	//circle radius
	var circle_r = typeof(myOptions.circle_r) !== 'undefined' ? myOptions.circle_r : 4;

	//circle color is no encoder is used
	var circle_color = typeof(myOptions.circle_color) !== 'undefined' ? myOptions.circle_color : "steelblue";

	//=========================================================================================================================


	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right      
	var xOffset = typeof(myOptions.xOffset) !== 'undefined' ? myOptions.xOffset : 20;

	//offset of graph and axis from top      
	var yOffset = typeof(myOptions.yOffset) !== 'undefined' ? myOptions.yOffset : 20;

	//offset of left axis and graph 
	//not used for the moment
	//var xa_start = typeof(myOptions.xa_start) !== 'undefined' ? myOptions.xa_start : 0;

	//offset of bottom axis and graph
	//not used for the moment
	//var ya_start = typeof(myOptions.ya_start) !== 'undefined' ? myOptions.ya_start : 0;

	//translate bottom axis 
	var shift_ax = typeof(myOptions.shift_ax) !== 'undefined' ? myOptions.shift_ax : 30;

	//translate left axis     
	var shift_ay = typeof(myOptions.shift_ay) !== 'undefined' ? myOptions.shift_ay : 40;
	//=========================================================================================================================


	//=========================================================================================================================
	//Legend position
	var legend_x = typeof(myOptions.legend_x) !== "undefined" ? myOptions.legend_x : 100;
	var legend_y = typeof(myOptions.legend_y) !== "undefined" ? myOptions.legend_y : 50;
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
	var enable_zoom_pan = typeof(myOptions.enable_zoom_pan) !== "undefined" ? myOptions.enable_zoom_pan : "no";
	var minZoom = typeof(myOptions.minZoom) !== "undefined" ? myOptions.minZoom : 1;
	var maxZoom = typeof(myOptions.maxZoom) !== "undefined" ? myOptions.maxZoom : 10;
	//enable zoom pan


	//Add scaling to x and y axis
	var xdelta = typeof(myOptions.xdelta) !== 'undefined' ? myOptions.xdelta : 1.0;
	var ydelta = typeof(myOptions.ydelta) !== 'undefined' ? myOptions.ydelta : 1.0;
	//To scale more axis to avoid close fitting with frame


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
	//Tooltip, selection, legend, transition and encoders

	var enable_lasso = typeof(myOptions.enable_lasso) !== 'undefined' ? myOptions.enable_lasso : "no";
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== 'undefined' ? myOptions.enable_tooltip : "yes";
	var tooltip_f = typeof(myOptions.tooltip_f) !== 'undefined' ? myOptions.tooltip_f : ".4f";

	var show_legend = typeof(myOptions.show_legend) !== 'undefined' ? myOptions.show_legend : "no";

	//number of levels in the legend colromap
	var colormap_levels = typeof(myOptions.colormap_levels) !== 'undefined' ? myOptions.colormap_levels : 5;

	//color range should be a list of two colors
	var color_range = typeof(myOptions.color_range) !== 'undefined' ? myOptions.color_range : ["white", "steelblue"];

	var linear_color_scale = typeof(myOptions.linear_color_scale) !== 'undefined' ? myOptions.linear_color_scale : "yes";
	var use_colorbrewer_linear = typeof(myOptions.use_colorbrewer_linear) !== 'undefined' ? myOptions.use_colorbrewer_linear : "yes";
	var use_colorbrewer_ordinal = typeof(myOptions.use_colorbrewer_ordinal) !== 'undefined' ? myOptions.use_colorbrewer_ordinal : "no";


	var enable_color_encoder = typeof(myOptions.enable_color_encoder) !== 'undefined' ? myOptions.enable_color_encoder : "no";

	if (enable_color_encoder == "no")
	{
		show_legend = "no"
		xOffset = 20;
		//circle_color = "white";
	};

	if (show_legend == "no")
	{
		xOffset = 20;
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

		circle_color = "white";
		circle_r = 2;

		plot_frame = "yes";

		enable_tooltip = "no";

		//$("#chart").css("background-color", "white"); 
	};

	//=========================================================================================================================



	//========================================================================================================================= 
	var headerNames = d3.keys(dataset[0]); //get header, using d3.  Here we get first row
	//console.log(headerNames)

	var keys = Object.keys(dataset[0]); //get keys outside the loop.  Same as the previous method but we do not use d3 
	//console.log(keys)

	//get id of header to plto as title and axis name
	var xLabel = Object.keys(dataset[0])[column_x];
	var yLabel = Object.keys(dataset[0])[column_y];
	var tLabel = Object.keys(dataset[0])[column_t];
	var ltLabel = Object.keys(dataset[0])[column_lt];

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
	// console.log(dataset[0]['dv1'])
	//=========================================================================================================================



	//=========================================================================================================================
	//get x and y values from dataset

	var xValue = function(d)
	{
		return d[keys[column_x]]
	};

	var yValue = function(d)
	{
		return d[keys[column_y]]
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
	
	//=========================================================================================================================



	//=========================================================================================================================
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
			.range([shift_ay, width - xOffset])
			.nice();
	};

	//console.log(d3.min(dataset, xValue))
	//console.log(d3.max(dataset, xValue))


	if (yaxis_auto_scale == "yes")
	{
		var yScale = d3.scale.linear()
			.domain([ydelta * d3.min(dataset, yValue), ydelta * d3.max(dataset, yValue)])
			//.range([height - ya_start, yOffset])
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

	//=========================================================================================================================



	//=========================================================================================================================
	//Create axes.  We need to draw them on the svg, this is done at the end
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(x_ticks)
		.tickFormat(d3.format(ax_f));

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(y_ticks)
		.tickFormat(d3.format(ay_f));

	if (plot_frame == "yes")
	{
		xAxis.outerTickSize(-height + yOffset + shift_ax);
		yAxis.outerTickSize(-width + xOffset + shift_ay);
	};

	//=========================================================================================================================



	//=========================================================================================================
	//zoom/pan behavior
	var zoom = d3.behavior.zoom()
		.x(xScale)
		.y(yScale)
		//.scaleExtent([1, 10])
		.scaleExtent([minZoom, maxZoom])
		.on("zoom", zoomed);

	//Zoom/pan reset
	//d3.select("button").on("click", reset);
	d3.select("#reset").on("click", reset);
	//=========================================================================================================



	//=========================================================================================================
	// setup fill color
	//var cValue = function(d) { return d.species;}
	var cValue = function(d)
	{
		return d[keys[column_c]];
	};

	var cMinval = d3.min(dataset, cValue);
	var cMaxval = d3.max(dataset, cValue);

	//console.log(cMinval,cMaxval)


	if (linear_color_scale == "yes")
	{
		if (use_colorbrewer_linear == "yes")
		{
			//Colorbrewer linear scales
			var color = d3.scale.linear()
				.domain([cMinval, cMaxval])
				//.range(colorbrewer.RdBu[6]); 			//color blind safe print safe
				//.range(colorbrewer.RdYlBu[9]); 		//color blind safe print safe
				.range(colorbrewer.Dark2[5]);
			//.range(colorbrewer.Accent[6]);
		}
		else
		{
			//linear d3 palette
			var color = d3.scale.linear()
				.domain([cMinval, cMaxval])
				.range(color_range)
				.interpolate(d3.interpolateRgb);
		}
	}
	else
	{
		if (use_colorbrewer_ordinal == "yes")
		{
			//Colorbrewer ordinal scales
			var color = d3.scale.ordinal()
				//.domain(["foo", "bar", "baz"]) 	//to define domain in range
				.range(colorbrewer.RdBu[6]) //color blind safe print safe
				// .range(colorbrewer.OrRd[8])
				// .range(colorbrewer.PuOr[6]) 	//ordinal colors minimum 3 cats
				// .range(colorbrewer.RdYlBu[3]) 	//ordinal colors minimum 3 cats
				// .range(colorbrewer.Dark2[8])
		}
		else
		{
			//ordinal d3 palette
			var color = d3.scale.category10();
			//var color = d3.scale.category20();
		}

	};

	//=========================================================================================================



	//=========================================================================================================================
	//tooltip function d3-tip
	//taken form http://bl.ocks.org/Caged/6476579
	//Tooltip method 1

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		//Set or get a tip's HTML content
		//Initialize tooltip 
		.html(function(d)
		{
			//return "<strong>Frequency:</strong> <span style='color:red'>" + d.y + "</span>";
			return "<span style='color:white;font-size:10px'>Position:</span> <span style='color:red;font-size:10px'>" + "(" + xValue(d) + ", " + yValue(d) + ")" + "</span>";
		});

	//=========================================================================================================================



	//=========================================================================================================================
	//create the svg where we are going to plot
	//add svg to DOM

	//select the body
	if (enable_zoom_pan == "yes")
	{
		var mySvg = d3.select("#myChart")
			//var mySvg = d3.select("body")
			.append("svg")
			.style("background-color", chart_background)
			.style("border", chart_border_width)
			.attr("id", "chart")
			//.style("background-color", svg_bgcolor)
			.call(zoom) //for programatic zoom
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			//Responsive svg
			//.call(responsivefy)
			.append("g")
			//.attr("transform", "translate("+ margin.left + ",0)")           //to traslate whole svg      
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	}
	else
	{
		var mySvg = d3.select("#myChart")
			//var mySvg = d3.select("body")
			.append("svg")
			.style("background-color", chart_background)
			.style("border", chart_border_width)
			.attr("id", "chart")
			//.style("background-color", svg_bgcolor)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			//Responsive svg
			//.call(responsivefy)
			.append("g")
			//.attr("transform", "translate("+ margin.left + ",0)")           //to traslate whole svg      
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	};

	//=========================================================================================================================



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



	//=========================================================================================================================
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

	//=========================================================================================================================



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
					return tLabel
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
				.text(title_label)
		}

	};
	//=========================================================================================================================



	//=========================================================================================================================
	// Define the line

	// var line = d3.svg.line()
	// 	.interpolate("basis")
	// 	//.interpolate("linear")
	// 	.x(function(d)
	// 	{
	// 		return xScale(d[keys[column_x]]);
	// 	})
	// 	.y(function(d)
	// 	{
	// 		return yScale(d[keys[column_y]]);
	// 	});
	//=========================================================================================================================



	//=========================================================================================================================
	// Add the line path

	// myLinePath = mySvg.append("path")
	// 	.datum(dataset)
	// 	.attr("class", "line")
	// 	.attr("clip-path", "url(#clip)")
	// 	// .attr('stroke', function(d, i) {
	// 	//   return colors[i % colors.length];
	// 	// })
	// 	.attr("d", line)
	// 	// .style("stroke","steelblue")
	// 	// .style("stroke-width",1)
	// 	// .style("stroke-dasharray", ("8, 0")) 
	// 	.style("stroke", linecolor)
	// 	.style("stroke-width", linewidth)
	// 	//.style("stroke-dasharray", ("8,8")) 
	// 	.style("stroke-dasharray", (linedash));
	//=========================================================================================================================



	//=========================================================================================================
	// draw dots

	circles = mySvg.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("clip-path", "url(#clip)")
		.attr("r", circle_r)
		// .attr("r", function(d,i)
		// {
		// 	return column_s(d)
		// })
		.attr("cx", xMap)
		.attr("cy", yMap);


	if (enable_color_encoder == "yes")
	{
		circles
			.style("fill", function(d)
			{
				return color(cValue(d));
			})
			.style("opacity", circle_opacity);
	}
	else
	{
		circles
			.style("fill", circle_color)
			.style("opacity", circle_opacity);
	};

	//=========================================================================================================



	//=========================================================================================================================
	//Invoke the tip in the context of your visualization 
	//apply the tooltip d3-tip to the svg

	mySvg.call(tip);

	//This will add the tooltip
	if (enable_tooltip == "yes")
	{
		circles
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
	};

	//two call two events at the same time use namespaces
	// .on("mouseover.mover", mover).on("mouseover.tip_s", tip.show)
	// .on("mouseout.mout", mout).on("mouseout.tip_h", tip.hide)

	//=========================================================================================================================



	//=========================================================================================================
	//This will clip path outside axes for zoom/pan
	//clippath 
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

	//=========================================================================================================



	//=========================================================================================================================
	//Add colormap legend
	if (show_legend == "yes")
	{
		my_legend = mySvg.append("g")
			.attr("class", "legendLinear")
			//.attr("transform", "translate(" + (width-5) + "," + (height/2 - 120) + ")")
			.attr("transform", "translate(" + (width - legend_x) + "," + (height / 2 - legend_y) + ")")
			//.attr("font-weight", "normal")
			.style("font-size", "12px")
			.style("font-family", "sans-serif");
		//.style("text-anchor", "middle")


		var legendLinear = d3.legend.color()
			.shapeWidth(15)
			.shapeHeight(15)
			.orient('vertical')
			.labelFormat(d3.format(".2f"))
			//.labelOffset(-120)
			.labelOffset(5)
			.shapePadding(0)
			//.shape('line')
			.cells(colormap_levels) //number of cells to plot default cell height is 15px
			.scale(color);

		mySvg.select(".legendLinear")
			.call(legendLinear);

		my_legend.append("text")
			.attr("x", 0)
			.attr("y", -5)
			//.attr("dy", "0.35em")
			.attr("text-anchor", "start")
			.attr("font-family", "sans-serif")
			.attr("font-size", "12px")
			.attr("font-weight", "bold")
			//.attr("fill", "black")
			//.text("Zone")
			.text(function()
			{
				return ltLabel
			});
	};

	//=========================================================================================================================



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
		//.ticks(5)
	};

	// function for the y grid lines
	function grid_y_axis()
	{
		return d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(y_ticks);
		//.ticks(5)
	};
	//=========================================================================================================================

	//=========================================================================================================================
	// Zoom function
	function zoomed()
	{
		mySvg.select(".x.axis").call(xAxis);
		mySvg.select(".y.axis").call(yAxis);
		//mySvg.selectAll('path.line').attr('d', line);

		mySvg.selectAll(".dot")
			.attr("cx", function(d)
			{
				return xScale(xValue(d));
			})
			.attr("cy", function(d)
			{
				return yScale(yValue(d));
			});

		// points.selectAll('circle').attr("transform", function(d) {
		//   return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")";
		// });
	};
	//=========================================================================================================================

	//=========================================================================================================================
	// Reset zoom function
	function reset()
	{
		d3.transition().duration(1000).tween("zoom", function()
		{
			if (xaxis_auto_scale == "yes" && yaxis_auto_scale == "yes")
			{
				var ix = d3.interpolate(xScale.domain(), [xdelta * d3.min(dataset, xValue), xdelta * d3.max(dataset, xValue)]),
					iy = d3.interpolate(yScale.domain(), [ydelta * d3.min(dataset, yValue), ydelta * d3.max(dataset, yValue)]);
			}
			else if (xaxis_auto_scale == "yes" && yaxis_auto_scale == "no")
			{
				var ix = d3.interpolate(xScale.domain(), [xdelta * d3.min(dataset, xValue), xdelta * d3.max(dataset, xValue)]),
					iy = d3.interpolate(yScale.domain(), [yMin, yMax]);
			}
			else if (xaxis_auto_scale == "no" && yaxis_auto_scale == "yes")
			{
				var ix = d3.interpolate(xScale.domain(), [xMin, xMax]),
					iy = d3.interpolate(yScale.domain(), [ydelta * d3.min(dataset, yValue), ydelta * d3.max(dataset, yValue)]);
			}
			else
			{
				var ix = d3.interpolate(xScale.domain(), [xMin, xMax]),
					iy = d3.interpolate(yScale.domain(), [yMin, yMax]);
			}

			return function(t)
			{
				zoom.x(xScale.domain(ix(t))).y(yScale.domain(iy(t)));
				zoomed();
			};

		});
	};
	//=========================================================================================================================

	//=========================================================================================================================
	//FUNCTIONS HERE
	//=========================================================================================================================



}