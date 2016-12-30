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
	var column_c = typeof(myOptions.column_c) !== 'undefined' ? myOptions.column_c : 15;

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
	var circle_r = typeof(myOptions.circle_r) !== 'undefined' ? myOptions.circle_r : 3;

	//circle color is no encoder is used
	var circle_color = typeof(myOptions.circle_color) !== 'undefined' ? myOptions.circle_color : "steelblue";

	//=========================================================================================================================



	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right      
	var xOffset = typeof(myOptions.xOffset) !== 'undefined' ? myOptions.xOffset : 120;

	//offset of graph and axis from top      
	var yOffset = typeof(myOptions.yOffset) !== 'undefined' ? myOptions.yOffset : 40;

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
	//Tooltip, selection, legend, transition and encoders

	var enable_lasso = typeof(myOptions.enable_lasso) !== 'undefined' ? myOptions.enable_lasso : "no";
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== 'undefined' ? myOptions.enable_tooltip : "yes";
	var tooltip_f = typeof(myOptions.tooltip_f) !== 'undefined' ? myOptions.tooltip_f : ".4f";

	var show_legend = typeof(myOptions.show_legend) !== 'undefined' ? myOptions.show_legend : "yes";

	var enable_color_encoder = typeof(myOptions.enable_color_encoder) !== 'undefined' ? myOptions.enable_color_encoder : "yes";

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
	//=========================================================================================================



	//=========================================================================================================
	//create scaling functions and adjust range at the same time

	if (xaxis_auto_scale == "yes")
	{
		var xScale = d3.scale.linear()
			.domain([d3.min(dataset, xValue), d3.max(dataset, xValue)])
			//force the range to the given values
			.range([shift_ay, width - xOffset])
			.nice();
	}
	else
	{
		var xScale = d3.scale.linear()
			.domain([xMin, xMax])
			//force the range to the given values
			.range([shift_ay, width - xOffset])
			.nice();
	};

	if (yaxis_auto_scale == "yes")
	{
		var yScale = d3.scale.linear()
			.domain([d3.min(dataset, yValue), d3.max(dataset, yValue)])
			//force the range to the given values
			.range([height - shift_ax, yOffset])
			.nice();
	}
	else
	{
		var yScale = d3.scale.linear()
			.domain([yMin, yMax])
			//force the range to the given values
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

	//=========================================================================================================



	//=========================================================================================================
	// setup fill color
	//var cValue = function(d) { return d.species;}
	var cValue = function(d)
	{
		return d[keys[column_c]];
	};

	var color = d3.scale.category10();
	//var color = d3.scale.category20();

	//Colorbrewer scales
	//var color = d3.scale.ordinal()
	//.domain(["foo", "bar", "baz"])        //to define domain in range
	//.range(colorbrewer.RdBu[6])			//color blind safe print safe
	//.range(colorbrewer.OrRd[8])
	//.range(colorbrewer.PuOr[6])           //ordinal colors minimum 3 cats
	//.range(colorbrewer.RdYlBu[3])         //ordinal colors minimum 3 cats
	//.range(colorbrewer.Dark2[8])   

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
		//.attr("transform", "translate("+ margin.left + ",0)")           //to traslate whole svg      
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
			);
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
			);
	};

	//=========================================================================================================================



	//=========================================================================================================
	// Lasso functions to execute while lassoing

	//Trigger this event as soon as we start the lasso utility
	var lasso_start = function()
	{
		lasso.items()
			.attr("r", circle_r) // reset size
			//.style("fill",null)                                   // clear all of the fills
			.classed(
			{
				"not_possible": true,
				"selected": false
			}); // style as not possible
	};

	//Style of possible selection insede and outside the lasso
	var lasso_draw = function()
	{
		// // Style the possible dots
		// lasso.items().filter(function(d)
		// 	{
		// 		return d.possible === true
		// 	})
		// 	.classed(
		// 	{
		// 		"not_possible": false,
		// 		"possible": true
		// 	});

		// // Style the not possible dot
		// lasso.items().filter(function(d)
		// 	{
		// 		return d.possible === false
		// 	})
		// 	.classed(
		// 	{
		// 		"not_possible": true,
		// 		"possible": false
		// 	});
	};

	//Style after selection
	//inside and outside lasso
	var lasso_end = function()
	{
		// Reset the color of all dots
		lasso.items()
			.style("fill", function(d)
			{
				//return color(d[keys[column_c]]);
				if (enable_color_encoder == "yes")
				{
					return color(d[keys[column_c]]);
				}
				else
				{
					return circle_color;
				};
			});
		//.style("fill", "red");

		// Style the selected dots
		lasso.items().filter(function(d)
			{
				return d.selected === true
			})
			.classed(
			{
				"not_possible": false,
				"possible": false
			})
			//.style("fill", "red")
			.style("fill", function(d)
			{
				//return color(d[keys[column_c]]);
				if (enable_color_encoder == "yes")
				{
					return color(d[keys[column_c]]);
				}
				else
				{
					return "crimson";
				};
			})
			.style("opacity", 0)	//to change selection style
			.attr("r", 7);

		// Reset the style of the not selected dots
		lasso.items().filter(function(d)
			{
				return d.selected === false
			})
			.classed(
			{
				"not_possible": false,
				"possible": false
			})
			.style("opacity", circle_opacity)
			.attr("r", circle_r);

	};

	// Create the area where the lasso event can be triggered
	var lasso_area = mySvg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("opacity", 0);

	// Define the lasso
	var lasso = d3.lasso()
		.closePathDistance(75) // max distance for the lasso loop to be closed
		.closePathSelect(true) // can items be selected by closing the path?
		.hoverSelect(true) // can items by selected by hovering over them?
		.area(lasso_area) // area where the lasso can be started
		.on("start", lasso_start) // lasso start function
		.on("draw", lasso_draw) // lasso draw function
		.on("end", lasso_end); // lasso end function

	// Init the lasso on the svg:g that contains the dots
	if (enable_lasso == "yes")
	{
		mySvg.call(lasso);
	}

	//=========================================================================================================



	//=========================================================================================================
	//Axes will be drawn under the circles

	// x-axis
	var group = mySvg.append("g")
		//.attr("class", "x axis")
		.classed("axis", true)
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
		.classed("axis", true)
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
		};

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
				});
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
	circles = mySvg.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", circle_r)
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
	//Trigger lasso selection
	lasso.items(d3.selectAll(".dot"));

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
			.orient('vertical')
			.labelFormat(d3.format(".01f"))
			//.labelOffset(-120)
			.labelOffset(5)
			.shapePadding(2)
			//.shape('line')
			//.cells(10) //numbe of cells to plot default cell height is 15px
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
	//Responsive svg
	function responsivefy(svg)
	{
		// get container + svg aspect ratio
		var container = d3.select(svg.node().parentNode),
			width = parseInt(svg.style("width")), //convert string to number
			height = parseInt(svg.style("height")), //convert string to number
			//width  = svg.style("width"),            //This outputs a string (the value with the units px)
			//height = svg.style("height"),           //This outputs a string (the value with the units px)
			aspect = width / height;

		//console.log(container)
		// console.log(width)
		// console.log(height)
		// console.log(aspect)

		// add viewBox and preserveAspectRatio properties,
		// and call resize so that svg resizes on inital page load
		svg.attr("viewBox", "0 0 " + width + " " + height)
			.attr("perserveAspectRatio", "xMinYMid");
		//     .call(resize);   //seems that is not needed


		// to register multiple listeners for same event type, 
		// you need to add namespace, i.e., 'click.foo'
		// necessary if you call invoke this function for multiple svgs
		// api docs: https://github.com/mbostock/d3/wiki/Selections#on
		d3.select(window).on("resize." + container.attr("id"), resize);

		// console.log(width)
		// console.log(height)

		// get width of container and resize svg to fit it
		function resize()
		{
			var targetWidth = parseInt(container.style("width"));
			//svg.attr("width", targetWidth);
			//svg.attr("height", Math.round(targetWidth / aspect));

			//console.log(targetWidth)

			//if (targetWidth < 600) 
			if (targetWidth < width + margin.left + margin.right)
			{
				svg.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect));
			}
			// else 
			// {
			//     width = 600 
			//     height = 400 
			//     svg.attr("width", width);
			//     svg.attr("height", height);
			// } 

		};
	};
	//=========================================================================================================================

	//=========================================================================================================================
	// function zoomed() {
	//   mySvg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	// }



	// d3.selectAll("button[data-zoom]")
	//     .on("click", clicked);

	// function zoomed() {
	//   mySvg.select(".x.axis").call(xAxis);
	//   mySvg.select(".y.axis").call(yAxis);
	// }

	// function clicked() {
	//   mySvg.call(zoom.event); // https://github.com/mbostock/d3/issues/2387

	//   // Record the coordinates (in data space) of the center (in screen space).
	//   var center0 = zoom.center(), translate0 = zoom.translate(), coordinates0 = coordinates(center0);
	//   zoom.scale(zoom.scale() * Math.pow(2, +this.getAttribute("data-zoom")));

	//   // Translate back to the center.
	//   var center1 = point(coordinates0);
	//   zoom.translate([translate0[0] + center0[0] - center1[0], translate0[1] + center0[1] - center1[1]]);

	//   svg.transition().duration(750).call(zoom.event);
	// }

	// function coordinates(point) {
	//   var scale = zoom.scale(), translate = zoom.translate();
	//   return [(point[0] - translate[0]) / scale, (point[1] - translate[1]) / scale];
	// }

	// function point(coordinates) {
	//   var scale = zoom.scale(), translate = zoom.translate();
	//   return [coordinates[0] * scale + translate[0], coordinates[1] * scale + translate[1]];
	// }
	//=========================================================================================================================



}