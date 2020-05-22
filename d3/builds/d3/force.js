function drawChart() {
    d3.json("nodes.json", function(data) {
        var width = 400, height = 400;

        var canvas = d3.select("body").append("svg")
            .attr("width", width).attr("height", height);


        var node = canvas.append("g").selectAll("nodes").data(data)
        .enter()
            .append("ellipse")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("r", 20)
            .attr("stroke", "green")
            .attr("fill", "lightgray");

    });
};