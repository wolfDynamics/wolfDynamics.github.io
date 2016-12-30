function hexbinChart(dataset, myOptions)
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
		var width = typeof(myOptions.width) !== 'undefined' ? myOptions.width : 800;
		var height = typeof(myOptions.height) !== 'undefined' ? myOptions.height : 600;
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



	//=========================================================================================================================
	//column to sample in the input data

	//columns to sample in the input data
	var column_x = typeof(myOptions.column_x) !== 'undefined' ? myOptions.column_x : 1;
	var column_y = typeof(myOptions.column_y) !== 'undefined' ? myOptions.column_y : 2;

	//column key to use as title 
	var column_t = typeof(myOptions.column_t) !== 'undefined' ? myOptions.column_t : 1;

	//column key to use as color encoder
	var column_c = typeof(myOptions.column_c) !== 'undefined' ? myOptions.column_c : 1;

	//column key to use as size encoder
	var column_s = typeof(myOptions.column_s) !== 'undefined' ? myOptions.column_s : 1;

	//=========================================================================================================================



	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right      
	var xOffset = typeof(myOptions.xOffset) !== 'undefined' ? myOptions.xOffset : 80;

	//offset of graph and axis from top      
	var yOffset = typeof(myOptions.yOffset) !== 'undefined' ? myOptions.yOffset : 40;

	//offset of left axis and graph 
	//var xa_start = typeof(myOptions.xa_start) !== 'undefined' ? myOptions.xa_start : 0;

	//offset of bottom axis and graph
	//var ya_start = typeof(myOptions.ya_start) !== 'undefined' ? myOptions.ya_start : 0;

	//translate bottom axis 
	var shift_ax = typeof(myOptions.shift_ax) !== 'undefined' ? myOptions.shift_ax : 0;

	//translate left axis     
	var shift_ay = typeof(myOptions.shift_ay) !== 'undefined' ? myOptions.shift_ay : 20;
	//=========================================================================================================================



	//=========================================================================================================================
	//EXPERIMENTAL

	//Start and end of clipping
	//var xc_begin = typeof(myOptions.xc_begin) !== 'undefined' ? myOptions.xc_begin : 0;
	//var xc_end = typeof(myOptions.xc_end) !== 'undefined' ? myOptions.xc_end : xc_Offset + xc_begin;
	//var yc_begin = typeof(myOptions.yc_begin) !== 'undefined' ? myOptions.yc_begin : 0;
	//var yc_end = typeof(myOptions.yc_end) !== 'undefined' ? myOptions.yc_end : yc_Offset + yc_begin;

	var xc_Offset = typeof(myOptions.xc_Offset) !== 'undefined' ? myOptions.xc_Offset : xOffset; //usually same as xOffSet if you want to clip to the end of the axis
	var yc_Offset = typeof(myOptions.yc_Offset) !== 'undefined' ? myOptions.yc_Offset : yOffset; //usually same as yOffSet if you want to clip to the ens of the axis
	//Start and end of clipping

	//EXPERIMENTAL
	//=========================================================================================================================



	//=========================================================================================================================
	//Hex parameters

	//Define circle radius and plot attribute
	var cir_r = typeof(myOptions.cir_r) !== 'undefined' ? myOptions.cir_r : 2;
	var show_data_circles = typeof(myOptions.show_data_circles) !== 'undefined' ? myOptions.show_data_circles : "yes";
	var circle_opacity = typeof(myOptions.circle_opacity) !== 'undefined' ? myOptions.circle_opacity : 1;
	var circle_color = typeof(myOptions.circle_color) !== 'undefined' ? myOptions.circle_color : "yellow";

	//Define hexes radius
	var hex_r = typeof(myOptions.hex_r) !== 'undefined' ? myOptions.hex_r : 20;

	//Define spacing between hexes
	var gap_hex = typeof(myOptions.gap_hex) !== 'undefined' ? myOptions.gap_hex : 0;

	//Define hexes opacity
	var hex_opacity = typeof(myOptions.hex_opacity) !== 'undefined' ? myOptions.hex_opacity : 1;

	//Hex parameters
	//=========================================================================================================================



	//=========================================================================================================================
	//Legend parameters and color range

	//max scales of color legend
	//set it to the maximum count in each hexbin
	//Better if it is computed automatically
	var color_max = typeof(myOptions.color_max) !== 'undefined' ? myOptions.color_max : 100;
	var color_max_auto_scale = typeof(myOptions.color_max_auto_scale) !== 'undefined' ? myOptions.color_max_auto_scale : 'yes';

	//color range should be a list of two colors
	var color_range = typeof(myOptions.color_range) !== 'undefined' ? myOptions.color_range : ["white", "steelblue"];

	//amplify color range, this option is disable for the moment
	//var color_range_amplify = typeof(myOptions.color_range_amplify) !== 'undefined' ? myOptions.color_range_amplify : "no";

	//number of levels in the legend colromap
	var colormap_levels = typeof(myOptions.colormap_levels) !== 'undefined' ? myOptions.colormap_levels : 5;


	//Legend position
	var legend_x = typeof(myOptions.legend_x) !== 'undefined' ? myOptions.legend_x : 45;
	var legend_y = typeof(myOptions.legend_y) !== 'undefined' ? myOptions.legend_y : 20;
	//Legend position

	//Legend parameters
	//=========================================================================================================================



	//=========================================================================================================================
	//x label position
	var text_padding_axx = typeof(myOptions.text_padding_axx) !== 'undefined' ? myOptions.text_padding_axx : width / 2 - margin.right;
	var text_padding_axy = typeof(myOptions.text_padding_axy) !== 'undefined' ? myOptions.text_padding_axy : 35;
	//x label position

	//y label position
	var text_padding_ayx = typeof(myOptions.text_padding_ayx) !== 'undefined' ? myOptions.text_padding_ayx : 45;
	var text_padding_ayy = typeof(myOptions.text_padding_ayy) !== 'undefined' ? myOptions.text_padding_ayy : height / 2;
	//y label position

	//title position
	var title_x = typeof(myOptions.title_x) !== 'undefined' ? myOptions.title_x : width / 2 - (margin.left + margin.right) / 2;
	var title_y = typeof(myOptions.title_y) !== 'undefined' ? myOptions.title_y : 20;
	//title position
	//=========================================================================================================================



	//=========================================================================================================================
	//show title and additional title parameters
	//yes or no
	var show_title = typeof(myOptions.show_title) !== 'undefined' ? myOptions.show_title : 'no';
	var title_auto_label = typeof(myOptions.title_auto_label) !== 'undefined' ? myOptions.title_auto_label : 'yes';
	var title_label = typeof(myOptions.title_label) !== 'undefined' ? myOptions.title_label : '{title_label: Chart title}';
	//show title


	//axes legend parameters
	//yes or no
	var xa_show_legend = typeof(myOptions.xa_show_legend) !== "undefined" ? myOptions.xa_show_legend : "yes";
	var xa_auto_legend = typeof(myOptions.xa_auto_legend) !== "undefined" ? myOptions.xa_auto_legend : "yes";
	var xa_legend = typeof(myOptions.xa_legend) !== "undefined" ? myOptions.xa_legend : "{axis label: label}";

	var ya_show_legend = typeof(myOptions.ya_show_legend) !== "undefined" ? myOptions.ya_show_legend : "yes";
	var ya_auto_legend = typeof(myOptions.ya_auto_legend) !== "undefined" ? myOptions.ya_auto_legend : "yes";
	var ya_legend = typeof(myOptions.ya_legend) !== "undefined" ? myOptions.ya_legend : "{axis label: label}";
	//axes legend parameters


	//x, y axes font size
	var axes_font_size = typeof(myOptions.axes_font_size) !== "undefined" ? myOptions.axes_font_size : 10;
	//x, y axes font size


	//axes number ticks
	var x_ticks = typeof(myOptions.x_ticks) !== "undefined" ? myOptions.x_ticks : 10;
	var y_ticks = typeof(myOptions.y_ticks) !== "undefined" ? myOptions.y_ticks : 10;
	//axes number ticks


	//plot inner frame
	var plot_frame = typeof(myOptions.plot_frame) !== "undefined" ? myOptions.plot_frame : "yes";


	//axes and tooltio number format
	//examples: .d .f .2f .2r
	var ax_f = typeof(myOptions.ax_f) !== "undefined" ? myOptions.ax_f : ".d";
	var ay_f = typeof(myOptions.ay_f) !== "undefined" ? myOptions.ay_f : ".d";
	var tooltip_f = typeof(myOptions.tooltip_f) !== "undefined" ? myOptions.tooltip_f : ".4f";
	//axes and tooltio number format


	//transition parameters
	var enable_transition = typeof(myOptions.enable_transition) !== 'undefined' ? myOptions.enable_transition : "yes";
	var transition_color = typeof(myOptions.transition_color) !== 'undefined' ? myOptions.transition_color : "orange";
	var transition_duration = typeof(myOptions.transition_duration) !== 'undefined' ? myOptions.transition_duration : 10;
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== 'undefined' ? myOptions.enable_tooltip : "yes";

	//transition parameters
	//=========================================================================================================================


	//=========================================================================================================================
	//aggregator type
	//count, mean, sum, min, max, std, variance
	var agg_type = typeof(myOptions.agg_type) !== "undefined" ? myOptions.agg_type : "count";

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

		color_range = ["white", "dimgray"];

		show_data_circles = "yes";
		circle_color = "white";

		enable_transition = "no";
		enable_tooltip = "no";

		//$("#chart").css("background-color", "white");	
	}
	//=========================================================================================================================



	//=========================================================================================================================
	//Put it outside the block in order to have global access
	//empty list for array of points to be created after reading the csv
	var points = [];

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

	//=========================================================================================================================



	//=========================================================================================================================
	// change string (from CSV) into number format

	dataset.forEach(function(d, i)
	{
		keys.forEach(function(key, i)
		{
			//Nice way to convert strings to numbers.
			//If it is a number it will converted otherwise will remain as a string
			orig = d[key];
			modified = Number(orig);
			d[key] = (typeof orig === "string" && !isNaN(modified)) ? modified : orig;

			//easy way to convert string to numbers       
			//d[key] = +d[key];             
		});


	});

	//=========================================================================================================================



	//=========================================================================================================================
	//kind of initialization of two functions that contains the desired values
	//Copy values of the columns to plot into the arrays

	var xValue = function(d)
	{
		return d[keys[column_x]]
	};

	var yValue = function(d)
	{
		return d[keys[column_y]]
	};

	//=========================================================================================================================



	//=========================================================================================================================
	//create scaling functions

	var xScale = d3.scale.linear()
		//.domain([0, 10])
		.domain([d3.min(dataset, xValue), d3.max(dataset, xValue)])
		.range([shift_ay, width - xOffset]) //force the range to the given values
		.nice();

	var yScale = d3.scale.linear()
		//.domain([0, 2])
		.domain([d3.min(dataset, yValue), d3.max(dataset, yValue)])
		.range([height - shift_ax, yOffset]) //force the range to the given values
		.nice();

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



	//=========================================================================================================================
	//create the hexbin with the hex radius defined in hex_r
	var myHexbin = d3.hexbin()
		//.size([width, height])			//what is size for? check api
		.radius(hex_r); //no scaling, use this option


	//console.log(xScale(0.4))
	//console.log(myHexbin)

	//=========================================================================================================================



	//=========================================================================================================================
	//create the svg where we are going to plot the hexbins
	//add svg to DOM
	var mySvg = d3.select("#myChart")
	//var mySvg = d3.select("body")
		.append("svg")
		.attr("id", "chart")
		.style("background-color", chart_background)
		.style("border", chart_border_width)
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		//Responsive svg
		//.call(responsivefy)
		.append("g")
		//.attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");
		.attr("transform", "translate(" + 2 * margin.left + ",0)");

	//=========================================================================================================================



	//=========================================================================================================================
	//Map columns from dataset to points variable
	//points is the data used to plot the hexes
	//Also scale the data according to xScale and yScale
	dataset.forEach(function(d)
	{
		points.push([xScale(d[keys[column_x]]), yScale(d[keys[column_y]])]);
		//console.log(points)
		//console.log(typeof(points[0][0]))
	});

	//console.log(points)

	//=========================================================================================================================



	//=========================================================================================================================
	//bin the data to the document
	//the data is coming from hexbin(points)
	//draw hexes

	var hexes = mySvg.append("g")
		.attr("clip-path", "url(#clip)")
		.selectAll(".hexagon")
		.data(myHexbin(points))
		.enter().append("path")


	//Move this block after calling aggregators in order to apply the computed agg
	//.attr("class", "hexagon")
	//.attr("d", myHexbin.hexagon(hex_r - gap_hex))
	//.attr("path", myHexbin.mesh())
	//translate the hexagons using the hexbin mesh
	// .attr("transform", function(d)
	// {
	// 	return "translate(" + d.x + "," + d.y + ")";
	// })
	// //fill the hexagons
	// .style("fill", function(d)
	// {
	// 	return color(d.length);
	// })
	// .style("opacity", hex_opacity);

	//=========================================================================================================================



	//=========================================================================================================================
	// call aggregators function

	var aggregator = aggregators(hexes, agg_type);

	if (color_max_auto_scale == "yes")
	{
		color_max = d3.max(aggregator);
	}


	//console.log(d3.max(aggregator))
	//console.log(aggregator);
	//=========================================================================================================================



	//=========================================================================================================================
	//Choose color scale for hexes

	//Disable for the moment this is to enable magnify scale
	// if (color_range_amplify == "yes")
	// {
	// 	var color = d3.scale.linear()
	// 		.domain([d3.min(aggregator), color_max / 2])
	// 		.range(color_range)
	// 		.interpolate(d3.interpolateLab);
	// }
	// else
	// {
	// 	var color = d3.scale.linear()
	// 		.domain([d3.min(aggregator), color_max])
	// 		.range(color_range)
	// 		.interpolate(d3.interpolateLab);
	// }

	var color = d3.scale.linear()
		.domain([d3.min(aggregator), color_max])
		.range(color_range)
		.interpolate(d3.interpolateRgb);

	//interpolate options
	//.interpolate(d3.interpolateLab);
	//.interpolate(d3.interpolateHsl);
	//.interpolate(d3.interpolateHcl);
	//.interpolate(d3.interpolateRgb);

	//=========================================================================================================================



	//=========================================================================================================================
	// apply aggregators and set attributes of hexes path

	hexes
		.attr("class", "hexagon")
		.attr("d", myHexbin.hexagon(hex_r - gap_hex))
		//.attr("path", myHexbin.mesh())
		//translate the hexagons using the hexbin mesh
		.attr("transform", function(d)
		{
			return "translate(" + d.x + "," + d.y + ")";
		})
		//fill the hexagons
		.style("fill", function(d, i)
		{
			//return color(d.length);
			return color(aggregator[i]);
		})
		.style("opacity", hex_opacity);



	//console.log(hexes)		//the hexes information is contained here such number of point inside or length	

	//HAILEYESUS

	// hexes.each(function(d, i)
	// {
	// 	var sum = 0;
	// 	d.forEach(function(v)
	// 	{
	// 		sum += v[0]
	// 	});
	// 	//console.log(hexes[0][i], d, sum);
	// 	//console.log(d, sum);
	// 	//console.log();
	// 	//console.log(sum)
	// })

	//END HAILEYESUS

	//=========================================================================================================================



	//=========================================================================================================================
	//tooltip function
	//taken form http://bl.ocks.org/Caged/6476579
	if (agg_type == "count")
	{
		tooltip_f = ".f"
	};

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, -0])
		//Set or get a tip's HTML content
		//Initialize tooltip 
		.html(function(d, i)
		{
			//return "<span style='color:white;font-size:10px'>Count:</span> <span style='color:red;font-size:10px'>" + d.length + "</span>";
			return "<span style='color:white;font-size:10px'>" + agg_type + ": </span> <span style='color:red;font-size:10px'>" + d3.format(tooltip_f)(aggregator[i]) + "</span>";
		});

	//=========================================================================================================================



	//=========================================================================================================================
	//Invoke the tip in the context of your visualization 
	//apply the tooltip to the svg
	mySvg.call(tip)

	if (enable_tooltip == "yes")
	{
		hexes
			.on("mouseover.tip_s", tip.show)
			.on("mouseout.tip_h", tip.hide)
	};

	if (enable_transition == "yes")
	{
		hexes
			.on("mouseover.mover", mover)
			.on("mouseout.mout", mout)
	};


	// //To trigger two events on one element we use namespace
	// 	.on("mouseover.mover", mover).on("mouseover.tip_s", tip.show)
	// 	.on("mouseout.mout", mout).on("mouseout.tip_h", tip.hide)

	//=========================================================================================================================



	//=========================================================================================================================
	//Add colormap legend
	var my_legend = mySvg.append("g")
		.attr("class", "legendLinear")
		.attr("transform", "translate(" + (width - legend_x) + "," + (height / 2 - legend_y) + ")")
		//.style("font-size", "10px")
		.style("font-family", "sans-serif")
		//.style("text-anchor", "middle")

	//remember default cell height is 15px
	var legendLinear = d3.legend.color()
		.shapeWidth(15)
		.orient('vertical')
		.labelFormat(d3.format(".1f"))
		.labelOffset(5)
		.shapePadding(0)
		//.shape('line')
		.cells(colormap_levels) //number of cells to plot 
		//.cells([0, color_max * 0.25, color_max * 0.5, color_max * 0.75, color_max * 1])
		//.cells([0, color_max * 0.2, color_max * 0.4, color_max * 0.6, color_max * 0.8, color_max * 1])
		//.cells([0, color_max * 0.1, color_max * 0.2, color_max * 0.3, color_max * 0.4, color_max * 0.5,color_max * 0.6, color_max * 0.7, color_max * 0.8, color_max * 0.9, color_max * 1.0])
		.scale(color);

	mySvg.select(".legendLinear")
		.call(legendLinear);

	my_legend.append("text")
		.attr("x", 0)
		.attr("y", -5)
		//.attr("dy", "0.35em")
		.style("text-anchor", "start")
		.style("font-family", "sans-serif")
		.style("font-size", "12px")
		.style("font-weight", "bold")
		.style("fill", "black")
		.text(agg_type);
	//.text("Count");

	//=========================================================================================================================



	//=========================================================================================================================
	//chart title
	if (show_title == "yes")
	{
		if (title_auto_label == "yes")
		{
			mySvg.append("text")
				.attr("x", title_x)
				.attr("y", title_y)
				//.attr("dy", "0.35em")
				.style("text-anchor", "middle")
				.style("font-family", "sans-serif")
				.style("font-size", "20px")
				.style("font-weight", "bold")
				.style("fill", "black")
				.text(function()
				{
					return tLabel;
				});
		}
		else
		{
			mySvg.append("text")
				.attr("x", title_x)
				.attr("y", title_y)
				//.attr("dy", "0.35em")
				.style("text-anchor", "middle")
				.style("font-family", "sans-serif")
				.style("font-size", "20px")
				.style("font-weight", "bold")
				.style("fill", "black")
				.text(title_label);
		};

	};

	//=========================================================================================================================



	//=========================================================================================================================
	//create a group where to apply the axes and labels

	var group = mySvg.append("g")
		//.attr("class", "x axis")
		.style("font-family", "sans-serif")
		.classed("axis", true)
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(0," + (height - shift_ax) + ")")
		.call(xAxis)

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
			.text(function()
			{
				return xLabel;
			});
	};



	var group = mySvg.append("g")
		/* .attr("class", "y axis")*/
		.style("font-family", "sans-serif")
		.classed("axis", true)
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(" + shift_ay + ",0)")
		.call(yAxis)

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
			.text(yLabel);
	};

	//=========================================================================================================================



	//=========================================================================================================================
	//bin the data to the document
	//the data is coming from points
	//draw circles

	if (show_data_circles == "yes")
	{
		circles = mySvg.selectAll("circle")
			//mySvg.selectAll(".dot")
			.data(points)
			.enter()
			.append("circle")
			//apply class to color edges
			.attr("class", "dot")
			.attr("cx", function(d)
			{
				return d[0];
			})
			.attr("cy", function(d)
			{
				return d[1];
			})
			.attr("r", cir_r) //circle radius
			.style("fill", circle_color)
			.style("opacity", circle_opacity)
			//.style("fill", "white");
			//.style("fill", "magenta");
	}


	//=========================================================================================================================



	//=========================================================================================================================
	//This will clip regression line if it goes outside the frame
	//clippath 
	if (plot_frame == "yes")
	{
		var myClip = mySvg.append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("transform", "translate(0," + shift_ax + ")")
			.attr("x", shift_ay)
			.attr("y", yOffset - shift_ax)
			.attr("width", width - xOffset - shift_ay)
			.attr("height", height - yOffset - shift_ax);
	}
	else
	{
		var myClip = mySvg.append("clipPath")
			.attr("id", "clip")
			.append("rect")
			//.attr("transform", "translate(0," + shift_ax + ")")
			.attr("x", shift_ay)
			.attr("y", 0)
			.attr("width", width)
			.attr("height", height - shift_ax);
	};

	//=========================================================================================================================



	//=========================================================================================================================
	//FUNCTIONS HERE
	//=========================================================================================================================

	//=========================================================================================================================
	//function to convert an array of objects to a single object
	//To get column on the d3 input object (CSV)
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



	//=========================================================================================================================
	//Function to call when you mouseover a hexa
	function mover(d)
	{
		var hex_sel = d3.select(this)
			.transition()
			//.duration(10)
			.duration(transition_duration)
			.style("fill", transition_color)
			.style("fill-opacity", 1);
	};

	//Mouseout function
	function mout(d)
	{
		var hex_sel = d3.select(this)
			.transition()
			.duration(1000)
			//.duration(10)
			//.style("fill", "orange")
			.style("fill", function(d, i)
			{
				return color(d.length);
				//return color(aggregator[i]);
			})
			.style("fill-opacity", hex_opacity);

		//console.log(agg_type)
		//console.log(d)
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

		// console.log(container)
		// console.log(width)
		// console.log(height)
		// console.log(aspect)

		// add viewBox and preserveAspectRatio properties,
		// and call resize so that svg resizes on inital page load
		svg.attr("viewBox", "0 0 " + width + " " + height)
			.attr("perserveAspectRatio", "xMinYMid")
			//.call(resize);   //seems that is not needed


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

			//var targetHeight = parseInt(container.style("height"));
			//console.log(targetWidth)

			//if (targetWidth < 600) 
			if (targetWidth < width + margin.left + margin.right)
			{
				svg.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect));
				//svg.attr("height", Math.round(targetHeight));
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
	//Aggregators
	function aggregators(hexes, agg_type)
	{
		var aggregator = [];

		if (agg_type == "count")
		{
			var count = 0;

			hexes.each(function(d, i)
			{
				aggregator.push(d.length);
				//console.log(d.length, i)
			})

			//console.log(xScale(8))
		}
		else if (agg_type == "sum_x")
		{
			hexes.each(function(d, i)
			{
				var sum = 0;
				d.forEach(function(v)
				{
					sum += v[0]
				});

				aggregator.push(sum);

				//console.log(hexes[0][i], d, sum);
				//console.log(d, sum);
				//console.log();
				//console.log(sum)
			})
		}
		else if (agg_type == "sum_y")
		{
			hexes.each(function(d, i)
			{
				var sum = 0;
				d.forEach(function(v)
				{
					sum += v[1]
				});

				aggregator.push(sum);
			})
		}
		else if (agg_type == "mean_x")
		{
			hexes.each(function(d, i)
			{
				var sum = 0;

				d.forEach(function(v)
				{
					sum += v[0]
				});

				aggregator.push(sum / d.length);

				//console.log(sum, d.length)
			})
		}
		else if (agg_type == "mean_y")
		{
			hexes.each(function(d, i)
			{
				var sum = 0;

				d.forEach(function(v)
				{
					sum += v[1]
				});

				aggregator.push(sum / d.length);

				//console.log(sum, d.length)
			})
		}
		else
		{
			//console.log("aggregator not in list")
			alert("Aggregator " + agg_type + " not in list.\nValid options: count, sum_x, sum_y, mean_x, mean_y")
		}

		//console.log(aggregator)

		return aggregator;
	};
	//Aggregators
	//=========================================================================================================================



}