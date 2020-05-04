function drawChart() {

    var dataArray = [{x:5, y:5}, {x:10,y:15}, {x:20, y:7}, {x:30,y:18}, {x:40,y:10}];

    var width = 500;
    var height = 300;

    var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var path = d3.line()
    .x(function(data, i) {return data.x * 5})
    .y(function(data, i) {return data.y * 5})
    .curve(d3.curveCardinal);

    //Rita en linje
    canvas.append("path")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d",path(dataArray));




}