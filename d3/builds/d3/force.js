function drawChart() {
    d3.json("nodes.json", function(data) {
        var width = 400, height = 400;
        

        var canvas = d3.select("body").append("svg")
            .attr("width", width).attr("height", height);

        console.log(data.nodes);
        var node = canvas.append("g").selectAll("nodes").data(data.nodes)
        .enter()
            .append("ellipse")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("rx", 40)
            .attr("ry", 20)
            .attr("stroke", "black")
            .attr("fill", "lightgray")
            .on("mouseover", overHandler)
            .on("mouseout", outHandler);

        var label = canvas.append("g").selectAll("labels").data(data.nodes)
        .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .text(function(d) {return d.name});


            var simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody().strength(-20))
                .force("center", d3.forceCenter(width / 2, height /2));

            simulation.nodes(data.nodes).on("tick", tickHandler);

            function tickHandler() {
                node.attr("cx", function(d) {return d.x})
                node.attr("cy", function(d) {return d.y});

                label
                .attr("x", function(d) {return d.x})
                .attr("y", function(d) {return d.y + 5})
    
            }
            function overHandler(d) {
                d3.select(this).append("title").text(d.name);
            }
            function outHandler(d) {
                d3.select(this).select("title").remove();

            }
    });
};