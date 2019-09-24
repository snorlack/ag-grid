var columnDefs = [
    { field: "country", width: 150, chartDataType: 'category' },
    { field: "gold", chartDataType: 'series' },
    { field: "silver", chartDataType: 'series'  },
    { field: "bronze", chartDataType: 'series' },
    { headerName: "A", valueGetter: 'Math.floor(Math.random()*1000)', chartDataType: 'series' },
    { headerName: "B", valueGetter: 'Math.floor(Math.random()*1000)', chartDataType: 'series' },
    { headerName: "C", valueGetter: 'Math.floor(Math.random()*1000)', chartDataType: 'series' },
    { headerName: "D", valueGetter: 'Math.floor(Math.random()*1000)', chartDataType: 'series' }
];

function createRowData() {
    var countries = [
        "Ireland", "Spain", "United Kingdom", "France", "Germany", "Luxembourg", "Sweden",
        "Norway", "Italy", "Greece", "Iceland", "Portugal", "Malta", "Brazil", "Argentina",
        "Colombia", "Peru", "Venezuela", "Uruguay", "Belgium"
    ];
    
    return countries.map(function(country, index) {
        return {
            country: country,
            gold: Math.floor(((index + 1 / 7) * 333) % 100),
            silver: Math.floor(((index + 1 / 3) * 555) % 100),
            bronze: Math.floor(((index + 1 / 7.3) * 777) % 100),
        };
    });
}

var gridOptions = {
    defaultColDef: {
        width: 100,
        resizable: true
    },
    popupParent: document.body,
    columnDefs: columnDefs,
    rowData: createRowData(),
    enableRangeSelection: true,
    enableCharts: true,
    onFirstDataRendered: onFirstDataRendered,
    processChartOptions: processChartOptions,
};

function processChartOptions(params) {
    var options = params.options;
    console.log('chart options:', options);

    // we are only interested in processing scatter or bubble type.
    // so if user changes the type using the chart control,
    // we ignore it.
    if ([ 'scatter', 'bubble' ].indexOf(params.type) < 0) {
        console.log('chart type is ' + params.type + ', making no changes.');
        return params.options;
    }

    var xAxis = options.xAxis;
    xAxis.title = { 
        enabled: true,
        text: 'Country',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        color: 'gray'
    };
    xAxis.lineWidth = 2;
    xAxis.lineColor = 'gray';
    xAxis.tickWidth = 2;
    xAxis.tickSize = 10;
    xAxis.tickColor = 'gray';
    xAxis.labelFontStyle = 'italic';
    xAxis.labelFontWeight = 'bold';
    xAxis.labelFontSize = 15;
    xAxis.labelFontFamily = 'Arial, sans-serif';
    xAxis.labelPadding = 10;
    xAxis.labelColor = '#de7b73';
    xAxis.labelRotation = 20;
    xAxis.labelFormatter = function (params) {
        var value = String(params.value);
        return value === 'United Kingdom' ? 'UK' : '(' + value + ')';
    };
    xAxis.gridStyle = [
        {
            stroke: 'rgba(94,100,178,0.5)'
        }
    ];

    var yAxis = options.yAxis;
    yAxis.lineWidth = 2;
    yAxis.lineColor = 'blue';
    yAxis.tickWidth = 2;
    yAxis.tickSize = 10;
    yAxis.tickColor = 'blue';
    yAxis.labelFontStyle = 'italic';
    yAxis.labelFontWeight = 'bold';
    yAxis.labelFontSize = 15;
    yAxis.labelFontFamily = 'Arial, sans-serif';
    yAxis.labelPadding = 10;
    yAxis.labelColor = '#de7b73';
    yAxis.labelRotation = 20;
    yAxis.labelFormatter = function (params) {
        return params.value.toString().toUpperCase();
    };
    yAxis.gridStyle = [
        {
            stroke: '#80808044',
            lineDash: undefined
        },
        {
            stroke: '#80808044',
            lineDash: [6, 3]
        }
    ];

    var seriesDefaults = options.seriesDefaults;

    seriesDefaults.fills = [ '#e1ba00', 'silver', 'peru' ];
    seriesDefaults.strokes = [ 'black', '#ff0000' ];
    seriesDefaults.strokeWidth = 2;
    seriesDefaults.highlightStyle = {
        fill: 'red',
        stroke: 'yellow'
    };

    seriesDefaults.marker = true;
    seriesDefaults.markerSize = 12;
    seriesDefaults.minMarkerSize = 5;
    seriesDefaults.markerStrokeWidth = 4;

    seriesDefaults.tooltipRenderer = function(params) {
        var xField = params.xField;
        var yField = params.yField;
        var x = params.datum[xField];
        var y = params.datum[yField];
        return '<u style="color: ' + params.color + '">' + params.title + '</u><br><br><b>' + xField.toUpperCase() + ':</b> ' + x + '<br/><b>' + yField.toUpperCase() + ':</b> ' + y;
    };

    return options;
}

function onFirstDataRendered(params) {
    var cellRange = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver', 'bronze']
    };

    var createRangeChartParams = {
        cellRange: cellRange,
        chartType: 'scatter'
    };

    params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});
