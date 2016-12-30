function ChartOption( columnsNumber , aggregatorType, binsNumber){
    return {
        number_of_bins: binsNumber,
        column_s: columnsNumber,
        agg_type: aggregatorType,    //count, sum, mean, std, min, max, variance
    };
};

function updateDropdownColumn(columnsNumber, selectedColumn){
    $("#columnsSelector").empty();
    for (var i = 0; i < columnsNumber; i++) {
        //$("#columnsSelector").append('<option value="'+i+'">'+(i+1)+'</option>');
        $("#columnsSelector").append('<option value=' + (i) + '>' +(i+1)+ '</option>');
    };
    $("#columnsSelector").val(selectedColumn);
};

function drawchart(){
    // read file param
    var currentFile = $("#fileElem").val() ;
    if ( ! currentFile ){
        currentFile = "dace1_csv.csv"; // load first file arbitrary
    }

    $("#chart").remove();

    //Begin read csv
    d3.csv(currentFile, function(error, inputdata)
    {
        // read parameters
        var selectedColumn = $("#columnsSelector option:selected").val() ,
            currentAggregator = $( "#aggregatorSelector option:selected" ).text();

        var columnsNumber = Object.keys( inputdata[0] ).length;  // then taking the first row object and getting an array of the keys
        selectedColumn = selectedColumn >= columnsNumber ? 0 : selectedColumn ;
        updateDropdownColumn(columnsNumber, selectedColumn ); // update the number of columns of the file
        var myChart = histogramChart(inputdata, ChartOption(selectedColumn,currentAggregator,20));
    });
    //End read csv
};


//=========================================================================================================
//Startup
$(document).ready(function() 
{

    // redraw the chart on change of aggregator or colums number
    $("#columnsSelector, #aggregatorSelector, #fileElem").change(function(){
        drawchart(); 
    });

    // by default, draw for a arbitrary csv
    drawchart();
}); 