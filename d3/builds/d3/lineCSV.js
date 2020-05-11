function drawChart() {
    d3.csv("linedata.csv").then(function(data) {
        //document.write(JSON.stringify(data));
        console.log(data);
        var temps = [];
        var months = [];
        var dataFix = [];
        for (i = 0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push( parseFloat(data[i].Temp));
            dataFix.push( {month:months[i], temp:temps[i]});
        }
        //console.log(dataFix);
        //console.log(temps);
        

    var width = 600, height = 300;
    var canvas = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    var xScale = d3.scaleBand()
    .domain(months)
    .range([0, width]);

    //Skala för temperatur
    var yScale = d3.scaleLinear()
    .domain([d3.min(temps), d3.max(temps)])
    .range([height, 0]);

    var dString = d3.line()
    .x(function(data) {return xScale(data.month)})
    .y(function(data) {return yScale(data.temp)});

    console.log(dString(data));

    canvas.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('d', dString(dataFix));
});

};