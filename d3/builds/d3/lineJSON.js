function drawChart() {


    var width = 500;
    var height = 300;

    d3.json("lineData.json").get( function(error, dataArray) {
        console.log(dataArray);

        var xs = [];
        var ys = [];

        for (i=0; i<dataArray.length; i++) {
            xs.push(dataArray[i].x);
            ys.push(dataArray[i].y);

        }
        console.log(xs);
        console.log(ys);

    var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var path = d3.line()
    .x(function(data) {return data.x * 5})
    .y(function(data) {return data.y * 5});

    //Rita en linje
    canvas.append("path")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d",path(dataArray));

    var dotsGroup = canvas.append('g');

    dotsGroup.selectAll('dots').data(dataArray)
        .enter()
            .append('circle')
            .attr('cx', function(d) {return d.x * 5})
            .attr('cy', function(d) {return d.y * 5})
            .attr('r', '2');



});


}