function boxplotChart(dataset, myOptions)
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
		var width = typeof(myOptions.width) !== 'undefined' ? myOptions.width : 400;
		var height = typeof(myOptions.height) !== 'undefined' ? myOptions.height : 150;
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

	//column to sample
	var column_sample = typeof(myOptions.column_sample) !== 'undefined' ? myOptions.column_sample : 1;

	//column key to use as title 
	var column_t = typeof(myOptions.column_t) !== 'undefined' ? myOptions.column_t : column_sample;

	//column to sample
	var log_sample = typeof(myOptions.log_sample) !== 'undefined' ? myOptions.log_sample : "no";
	//=========================================================================================================================



	//=========================================================================================================================
	//Add some offset

	//Control the chart position using offset and margins

	//offset of graph and axis from right      
	var xOffset = typeof(myOptions.xOffset) !== 'undefined' ? myOptions.xOffset : 0;

	//offset of graph and axis from top      
	var yOffset = typeof(myOptions.yOffset) !== 'undefined' ? myOptions.yOffset : 0;

	//offset of left axis and graph 
	var xa_start = typeof(myOptions.xa_start) !== 'undefined' ? myOptions.xa_start : 0;

	//offset of bottom axis and graph
	var ya_start = typeof(myOptions.ya_start) !== 'undefined' ? myOptions.ya_start : 0;

	//translate bottom axis 
	var shift_ax = typeof(myOptions.shift_ax) !== 'undefined' ? myOptions.shift_ax : 0;

	//translate left axis     
	var shift_ay = typeof(myOptions.shift_ay) !== 'undefined' ? myOptions.shift_ay : 0;
	//=========================================================================================================================



	//=========================================================================================================================
	//box, whiskers and outliers

	//shift box away from horizontal axis
	var shift_box = typeof(myOptions.shift_box) !== 'undefined' ? myOptions.shift_box : -5;

	//compute midline of svg
	var midline = typeof(myOptions.midline) !== 'undefined' ? myOptions.midline : height / 2 + shift_box;

	//circles diameter
	var cir_r = typeof(myOptions.cir_r) !== 'undefined' ? myOptions.cir_r : 2.5;
	var cir_magnification = typeof(myOptions.cir_magnification) !== 'undefined' ? myOptions.cir_magnification : 2.5;
	var outlier_r = typeof(myOptions.outlier_r) !== 'undefined' ? myOptions.outlier_r : 2.5;

	//circle opacity
	var cir_opacity = typeof(myOptions.cir_opacity) !== 'undefined' ? myOptions.cir_opacity : 1;
	var outlier_opacity = typeof(myOptions.outlier_opacity) !== 'undefined' ? myOptions.outlier_opacity : 1;

	//whisker height
	var whiskerheight = typeof(myOptions.whiskerheight) !== 'undefined' ? myOptions.whiskerheight : 30;

	//box height
	var boxheight = typeof(myOptions.boxheight) !== 'undefined' ? myOptions.boxheight : 60;

	//median height
	var medianheight = typeof(myOptions.medianheight) !== 'undefined' ? myOptions.medianheight : boxheight / 2;

	//median height
	var meanheight = typeof(myOptions.meanheight) !== 'undefined' ? myOptions.meanheight : boxheight / 2;

	//add jitter to the scatter distribution
	var jitter = typeof(myOptions.jitter) !== 'undefined' ? myOptions.jitter : "yes";

	//jitter width
	var jitter_width = typeof(myOptions.jitter_width) !== 'undefined' ? myOptions.jitter_width : 20;

	//add jitter to the scatter distribution
	var draw_mean_line = typeof(myOptions.draw_mean_line) !== 'undefined' ? myOptions.draw_mean_line : "yes";

	//outliers color
	var outlier_color = typeof(myOptions.outlier_color) !== 'undefined' ? myOptions.outlier_color : "crimson";

	//inner circles color
	var cir_color = typeof(myOptions.cir_color) !== 'undefined' ? myOptions.cir_color : "LawnGreen";

	//To only show outliers, yes or no
	var show_only_outliers = typeof(myOptions.show_only_outliers) !== 'undefined' ? myOptions.show_only_outliers : "no";

	//box legend color DarkGoldenrod, RoyalBlue, black
	var bl_color = typeof(myOptions.bl_color) !== 'undefined' ? myOptions.bl_color : "teal";

	//Box bottom text relative spacing in y
	var bl_dy = typeof(myOptions.bl_dy) !== 'undefined' ? myOptions.bl_dy : "15px";

	//Box top text relative spacing in y
	var bl_dy1 = typeof(myOptions.bl_dy1) !== 'undefined' ? myOptions.bl_dy1 : "-6px";

	//Box text font size
	var bl_fs = typeof(myOptions.bl_fs) !== 'undefined' ? myOptions.bl_fs : "10px";

	//Box text number format ex. ".5g", ".2f", " "
	//use " " to disable thousond separator
	var bl_f = typeof(myOptions.bl_f) !== 'undefined' ? myOptions.bl_f : ".4f ";

	//show boxplot legend yes/no
	var sbpl = typeof(myOptions.sbpl) !== 'undefined' ? myOptions.sbpl : "yes";

	//mean, median, quartile lines color and width
	var mean_line_color = typeof(myOptions.mean_line_color) !== 'undefined' ? myOptions.mean_line_color : "black";
	var median_line_color = typeof(myOptions.median_line_color) !== 'undefined' ? myOptions.median_line_color : "cyan";
	var quartiles_line_color = typeof(myOptions.quartiles_line_color) !== 'undefined' ? myOptions.quartiles_line_color : "orange";
	var box_color = typeof(myOptions.box_color) !== 'undefined' ? myOptions.box_color : "lightsteelblue";
	var quartiles_line_width = typeof(myOptions.quartiles_line_width) !== 'undefined' ? myOptions.quartiles_line_width : 2;
	var mean_line_width = typeof(myOptions.mean_line_width) !== 'undefined' ? myOptions.mean_line_width : 2;
	var median_line_width = typeof(myOptions.median_line_width) !== 'undefined' ? myOptions.median_line_width : 2;
	//=========================================================================================================================


	//=========================================================================================================================
	//EXPERIMENTAL

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
	var legend_x = typeof(myOptions.legend_x) !== 'undefined' ? myOptions.legend_x : 0;
	var legend_y = typeof(myOptions.legend_y) !== 'undefined' ? myOptions.legend_y : 0;
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
	var xa_show_legend = typeof(myOptions.xa_show_legend) !== 'undefined' ? myOptions.xa_show_legend : 'yes';
	var xa_auto_legend = typeof(myOptions.xa_auto_legend) !== 'undefined' ? myOptions.xa_auto_legend : 'yes';
	var xa_legend = typeof(myOptions.xa_legend) !== 'undefined' ? myOptions.xa_legend : '{axis label: label}';
	var axes_font_size = typeof(myOptions.axes_font_size) !== "undefined" ? myOptions.axes_font_size : 10;
	var x_ticks = typeof(myOptions.x_ticks) !== "undefined" ? myOptions.x_ticks : 10;
	//axes legend parameters


	//axes and tooltip number format
	//examples: .d .f .2f .2r
	var a_f = typeof(myOptions.a_f) !== 'undefined' ? myOptions.a_f : ".d";
	var tooltip_f = typeof(myOptions.tooltip_f) !== 'undefined' ? myOptions.tooltip_f : ".4f";
	//axes and tooltip number format


	//transition parameters
	var enable_transition = typeof(myOptions.enable_transition) !== 'undefined' ? myOptions.enable_transition : "no";
	var transition_color = typeof(myOptions.transition_color) !== 'undefined' ? myOptions.transition_color : "orange";
	var transition_duration = typeof(myOptions.transition_duration) !== 'undefined' ? myOptions.transition_duration : 250;
	var enable_tooltip = typeof(myOptions.enable_tooltip) !== 'undefined' ? myOptions.enable_tooltip : "yes";
	//transition parameters

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

		cir_color = "white";
		outlier_color = "black";

		bl_color = "black";

		mean_line_color = "black";
		median_line_color = "black";
		quartiles_line_color = "black";
		box_color = "white";
		quartiles_line_width = 1;
		mean_line_width = 1;
		median_line_width = 1;

		enable_transition = "no";
		enable_tooltip = "no";

		//$("#chart").css("background-color", "white");	
	}
	//=========================================================================================================================



	//=========================================================================================================================
	//Put it outside the block in order to have global access
	//empty list for array of points to be created after reading the csv

	//initialize boxplot statistics
	var data = [];
	var outliers = [];
	var minVal = Infinity;
	var lowerWhisker = Infinity;
	var q1Val = Infinity;
	var medianVal = 0;
	var q3Val = -Infinity;
	var iqr = 0;
	var upperWhisker = -Infinity;
	var maxVal = -Infinity;
	//=========================================================================================================================



	//========================================================================================================================= 
	var headerNames = d3.keys(dataset[0]); //get header, using d3.  Here we get first row
	//console.log(headerNames)

	var keys = Object.keys(dataset[0]); //get keys outside the loop.  Same as the previous method but we do not use d3 
	//console.log(keys)

	//get id of header to plot as title and axis name
	var xLabel = Object.keys(dataset[0])[column_sample];
	var tLabel = Object.keys(dataset[0])[column_t];
	//=========================================================================================================================



	//=========================================================================================================================
	dataset.forEach(function(d, i)
	{
		keys.forEach(function(key, i)
		{
			orig = d[key];
			modified = Number(orig);
			d[key] = (typeof orig === "string" && !isNaN(modified)) ? modified : orig;
		});
	});
	//=========================================================================================================================



	//=========================================================================================================================
	//map data to new arrays
	//in this case we are mapping the data in column_sample of dataset
	//can be a good idea to add a loop here to map all columns automatically

	var mapdata = dataset.map(function(d, i)
	{
		if (log_sample == "yes")
		{
			return Math.log10(d[keys[column_sample]]);
		}
		else
		{
			return d[keys[column_sample]];
		}
	});

	data = mapdata.sort(d3.ascending);

	//console.log(mapdata);

	//=========================================================================================================================



	//=========================================================================================================================
	//calculate the boxplot statistics

	//min val in the sorted array
	var minVal = data[0];
	//max val in the sorted array
	var maxVal = data[data.length - 1];

	//q1 25%
	var q1Val = d3.quantile(data, .25);

	//q2 50% same as median
	var medianVal = d3.quantile(data, .5);
	//var medianVal = d3.median(data, .5);

	//q3 75%  
	//there is a small deviation computing this quartile
	//0.75 does not correponds exactly to my test cases
	//round off?
	//var q3Val = d3.quantile(data, .765);
	var q3Val = d3.quantile(data, .75);

	//inter quartile range
	var iqr = q3Val - q1Val;

	//compute mean value
	var meanVal = d3.mean(data);

	//lower and upper whiskers

	//Attention, when outliers are present it gives a small
	//deviation from python benchmark
	//This is related to iqr deviation
	// minVal = 180;  //Test value, do not use in production

	var lowerWhisker = d3.max([minVal, q1Val - 1.5 * iqr]);
	var upperWhisker = d3.min([maxVal, q3Val + 1.5 * iqr]);

	// var lowerWhisker = q1Val - 1.5*iqr;
	// var upperWhisker = q3Val + 1.5*iqr;

	//compute std value
	//var stdVal = d3.deviation(data);
	//console.log(stdVal)


	// console.log(data)
	// console.log(data[0])

	// console.log("minval " + minVal)
	// console.log("q1 " + q1Val)
	// console.log("median " + medianVal)
	// console.log("q3 " + q3Val)
	// console.log("iqr " + iqr)
	// console.log("max " + maxVal)

	// //There is a small difference in the whisker outputs check
	// console.log("lower whisker " + lowerWhisker)
	// console.log("upper whisker " + upperWhisker)
	//=========================================================================================================================



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
			return 	"<span style='color:white;font-size:10px'>" + "MIC " + Object.keys(dataset[0])[column_sample] + " = " +
					"</span> <span style='color:red;font-size:10px'>" + d3.format(tooltip_f)(d[keys[column_sample]]) + "</span>" + "<br/>" +
					"<span style='color:white;font-size:10px'>" + "Bacteria " + " = " + d.bacteria + "</span>";
		});
	//=========================================================================================================================



	//=========================================================================================================================
	//initialize the x scale

	var xScale = d3.scale.linear();
	//var xScale = d3.scale.log();

	//map the domain to the x scale +10%
	//This is to avoid the circles lying on the limit
	//xScale.domain([0,maxVal*1.10]);

	//Fixing minimum value of xScale to 0
	//There is a mod related to how to plot the box
	//xScale.domain([0,maxVal*1.0])

	//Fixing minimum value of xScale to the min value of the input data
	//There is a mod related to how to plot the box
	xScale.domain([minVal * 1.0, maxVal * 1.0])
		.range([xa_start, width - xOffset])
		.nice(); //fit nice the axis

	//minimum value of the xaxis
	var smin = xScale.domain()[0];
	//maximumvalue of the xaxis
	var smax = xScale.domain()[1];

	// console.log(smin)
	// console.log(smax)

	//=========================================================================================================================



	//=========================================================================================================================
	//initialize the x axis

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(x_ticks)
		.tickFormat(d3.format(a_f));
	//.tickFormat(d3.format(""))

	//=========================================================================================================================



	//=========================================================================================================================
	//create the svg where we are going to plot the histogram
	//add svg to DOM

	var mySvg = d3.select("#myChart")
	//var mySvg = d3.select("body")
		.append("svg")
		.style("background-color", chart_background)
		.style("border", chart_border_width)
		.attr("id", "chart") //add style to svg, defined in main.css 
		.attr("width", width + margin.left + margin.right) //The svg does not have margin
		.attr("height", height + margin.top + margin.bottom) //The svg does not have margin
		//For responsive svg 
		//.call(responsivefy)
		.append("g") //not sure what this group is doing   
		.attr("transform", "translate(" + (margin.left + 0 * margin.right) + ",0)") //to traslate whole svg      
		//.attr("transform", "translate("+ 2*margin.left +","+ margin.top +")")         //to traslate whole svg  

	//=========================================================================================================================



	//=========================================================================================================================
	//append the axis
	//create a group where to apply the axes

	var group = mySvg.append("g")
		//.attr("class", "axis")
		.classed("axis", true)
		.attr("font-size", axes_font_size)
		.attr("transform", "translate(0," + (height - shift_ax) + ")") //translate axis from top to bottom
		.call(xAxis);

	if (xa_show_legend == "yes")
	{
		if (xa_auto_legend == "yes")
		{
			xLabel = xLabel
		}
		else
		{
			xLabel = xa_legend
		};

		group.append("text")
			.attr("y", text_padding_axy)
			.attr("x", text_padding_axx)
			.style("font-family", "sans-serif")
			.style("font-size", "12px")
			.style("font-weight", "bold") //light, normal, bold
			.style("fill", "black")
			.style("text-anchor", "middle")
			//.style("text-anchor", "end")
			//.text(function(){ var title = Object.keys(dataset[0])[column_sample]; return title});
			.text(function()
			{
				return xLabel
			});
	};
	//=========================================================================================================================



	//=========================================================================================================================
	//draw rectangle for iqr

	var box = mySvg.append("rect")
		//.attr("class", "box")
		//.classed("box", true)
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("shape-rendering", "crispEdges")
		.attr("fill", box_color)
		.attr("x", xScale(q1Val))
		.attr("y", midline - boxheight / 2)
		//If minVal is fix to 0 in xscale
		//.attr("width", xScale(iqr))
		//When using the minval of the input data
		.attr("width", xScale(smin + iqr))
		//.attr("height", 20);
		.attr("height", boxheight);
	//.style("fill", "steelblue")

	//=========================================================================================================================



	//=========================================================================================================================
	//draw verical line for lowerWhisker

	var lw = mySvg.append("line")
		//.attr("class", "whisker")
		.classed("whisker", true)
		.attr("x1", xScale(lowerWhisker))
		.attr("x2", xScale(lowerWhisker))
		.attr("stroke", "black")
		.attr("y1", midline - whiskerheight)
		.attr("y2", midline + whiskerheight);
	//.style("stroke", "red")

	//=========================================================================================================================



	//=========================================================================================================================
	//draw vertical line for upperWhisker

	var uw = mySvg.append("line")
		//.attr("class", "whisker")
		.classed("whisker", true)
		.attr("x1", xScale(upperWhisker))
		.attr("x2", xScale(upperWhisker))
		.attr("stroke", "black")
		.attr("y1", midline - whiskerheight)
		.attr("y2", midline + whiskerheight);
	//.style("stroke", "blue")

	//=========================================================================================================================



	//=========================================================================================================================
	//draw horizontal line from lowerWhisker to upperWhisker

	var whl = mySvg.append("line")
		//.attr("class", "whisker")
		.classed("whiskers_hline", true)
		.attr("x1", xScale(lowerWhisker))
		.attr("x2", xScale(upperWhisker))
		.attr("stroke", "black")
		.attr("y1", midline)
		.attr("y2", midline)
		.style("stroke-dasharray", ("10, 5"));
	//.style("stroke", "orange")

	//=========================================================================================================================



	//=========================================================================================================================
	//draw vertical line for q1 hisker

	mySvg.append("line")
		.attr("stroke", quartiles_line_color)
		.attr("stroke-width", quartiles_line_width)
		.attr("shape-rendering", "crispEdges")
		.attr("x1", xScale(q1Val))
		.attr("x2", xScale(q1Val))
		.attr("y1", midline - medianheight)
		.attr("y2", midline + medianheight);
	// .style("stroke", "orange")
	// .style("stroke-width", 2);

	//draw vertical line for q3 whisker
	mySvg.append("line")

	.attr("stroke", quartiles_line_color)
		.attr("stroke-width", quartiles_line_width)
		.attr("shape-rendering", "crispEdges")
		.attr("x1", xScale(q3Val))
		.attr("x2", xScale(q3Val))
		.attr("y1", midline - medianheight)
		.attr("y2", midline + medianheight);
	// .style("stroke", "orange")
	// .style("stroke-width", 2);

	//=========================================================================================================================



	//=========================================================================================================================
	//draw vertical line at median

	var medianvl = mySvg.append("line")
		//.attr("class", "median")
		//.classed("median", true)
		.attr("stroke", median_line_color)
		.attr("stroke-width", median_line_width)
		.attr("shape-rendering", "crispEdges")
		.attr("x1", xScale(medianVal))
		.attr("x2", xScale(medianVal))
		.attr("y1", midline - medianheight)
		.attr("y2", midline + medianheight);

	//=========================================================================================================================



	//=========================================================================================================================
	//draw mean line

	if (draw_mean_line == "yes")
	{
		var meanline = mySvg.append("line")
			//.classed("mean", true)
			.attr("stroke", mean_line_color)
			.attr("stroke-width", mean_line_width)
			.attr("shape-rendering", "crispEdges")
			.attr("x1", xScale(meanVal))
			.attr("x2", xScale(meanVal))
			.attr("y1", midline - meanheight)
			.attr("y2", midline + meanheight)
			.style("stroke-dasharray", ("5, 5"));
	};

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
				//.text("This the title");
				//.text(function(){ var title = Object.keys(dataset[0])[column_s]; return title});
				.text(function()
				{
					return tLabel
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
				//.text("This the title");
				//.text(function(){ var title = Object.keys(dataset[0])[column_s]; return title});
				.text(title_label);
		}

	};
	//=========================================================================================================================



	//=========================================================================================================================
	//boxplot legends

	if (sbpl == "yes")
	{
		mySvg.append("text")
			.attr("x", xScale(lowerWhisker))
			.attr("y", midline + boxheight / 2)
			.attr("dy", bl_dy)
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", bl_fs)
			//.style("font-weight", "bold")
			.style("fill", bl_color)
			//.text("This the title");
			.text(function()
			{
				return d3.format(bl_f)(lowerWhisker)
			});


		mySvg.append("text")
			.attr("x", xScale(upperWhisker))
			.attr("y", midline + boxheight / 2)
			.attr("dy", bl_dy)
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", bl_fs)
			//.style("font-weight", "bold")
			.style("fill", bl_color)
			//.text("This the title");
			.text(function()
			{
				return d3.format(bl_f)(upperWhisker)
			});


		mySvg.append("text")
			.attr("x", xScale(medianVal))
			.attr("y", midline + boxheight / 2)
			.attr("dy", bl_dy)
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", bl_fs)
			//.style("font-weight", "bold")
			.style("fill", bl_color)
			//.text("This the title");
			.text(function()
			{
				return d3.format(bl_f)(medianVal)
			});


		mySvg.append("text")
			.attr("x", xScale(q1Val))
			.attr("y", midline - boxheight / 2)
			.attr("dy", bl_dy1)
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", bl_fs)
			//.style("font-weight", "bold")
			.style("fill", bl_color)
			//.text("This the title");
			.text(function()
			{
				return d3.format(bl_f)(q1Val)
			});


		mySvg.append("text")
			.attr("x", xScale(q3Val))
			.attr("y", midline - boxheight / 2)
			.attr("dy", bl_dy1)
			.style("text-anchor", "middle")
			.style("font-family", "sans-serif")
			.style("font-size", bl_fs)
			//.style("font-weight", "bold")
			.style("fill", bl_color)
			//.text("This the title");
			.text(function()
			{
				return d3.format(bl_f)(q3Val)
			});
	};

	//=========================================================================================================================



	//=========================================================================================================================
	//draw data as points

	var circles = mySvg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		//.attr("r", 2.5)
		// .attr("r", cir_r)
		.attr("r", function(d)
		{
			if (d[keys[column_sample]] < lowerWhisker || d[keys[column_sample]] > upperWhisker)
			{
				return outlier_r;
			}
			else
			{
				//return "point";
				if (show_only_outliers == "yes")
				{
					return null;
				}
				else
				{
					return cir_r;
				}
			}
		})
		.attr("opacity", cir_opacity)
		//.classed("point",true)
		//.attr("class", function(d)
		.attr("fill", function(d)
		{
			if (d[keys[column_sample]] < lowerWhisker || d[keys[column_sample]] > upperWhisker)
			{
				return outlier_color;
			}
			else
			{
				if (show_only_outliers == "yes")
				{
					return null;
				}
				else
				{
					return cir_color;
				}
			}
		})
		//.attr("fill","navy")
		.attr("cx", function(d)
		{
			return xScale(d[keys[column_sample]]);
		})
		.attr("cy", function(d)
		{
			return random_jitter();
			//return midline;
		})
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("shape-rendering", "crispEdges");



	//appending title, this is shortcut to append tooltip in the ez way
	//The title attribute is implemented in a browser dependent fashion
	// .append("title")
	// .append("text")
	// .text(function(d) {
	// //return "Date: " + d.date + "; value: " + d.value;
	// return "value: " + d[keys[column_sample]];
	// })

	//=========================================================================================================================



	//=========================================================================================================================
	//Invoke the tip in the context of your visualization 
	//apply the tooltip to the svg

	mySvg.call(tip);

	//To enable tooltip and transitions

	if (enable_tooltip == "yes")
	{
		circles
			.on('mouseover.tip_s', tip.show)
			.on('mouseout.tip_h', tip.hide)
	}

	if (enable_transition == "yes")
	{
		circles
			.on("mouseover.mover", mover)
			.on("mouseout.mout", mout)
	}


	//=========================================================================================================================



	//=========================================================================================================================
	//FUNCTIONS HERE
	//=========================================================================================================================

	//=========================================================================================================================
	//Function to call when you mouseover a circle

	function mover(d)
	{
		var cir_sel = d3.select(this)
			.transition()
			//.duration(1000)
			.duration(10)
			.style("fill", "orange")
			.style("fill-opacity", 1)
			.attr("r", cir_r + cir_magnification);
	};

	//Mouseout function
	function mout(d)
	{
		var cir_sel = d3.select(this)
			.transition()
			.duration(1000)
			//.duration(10)
			//.style("fill", "orange")
			//.style("fill", function(d)
			//{
			//	//return outlier_color;
			//	return cir_color;
			//})
			//.attr("class", function(d)
			.style("fill", function(d)
			{
				if (d[keys[column_sample]] < lowerWhisker || d[keys[column_sample]] > upperWhisker)
				{
					return outlier_color;
					//return "outlier";
				}
				else
				{
					//return "point";
					if (show_only_outliers == "yes")
					{
						return null;
					}
					else
					{
						return cir_color;
						//return "point";
					}
				}
			})
			//.style("fill-opacity", cir_opacity);
			//.attr("r", cir_r);
			.attr("r", function(d)
			{
				if (d[keys[column_sample]] < lowerWhisker || d[keys[column_sample]] > upperWhisker)
				{
					return outlier_r;
				}
				else
				{
					return cir_r;
				}
			})
	};

	//=========================================================================================================================


	//=========================================================================================================================
	//Jitter function
	function random_jitter()
	{

		if (jitter == "yes")
		{
			if (Math.round(Math.random() * 1) == 0)
			//var seed = -5;
				var seed = -jitter_width;
			else
			//var seed = 5; 
				var seed = jitter_width;

			//return midline + Math.floor((Math.random() * seed) + 1);
			return midline + Math.floor((Math.random() * seed) + 0);
		}
		else
		{
			return midline;
		}

	};
	//=========================================================================================================================



}