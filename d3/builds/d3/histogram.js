function drawChart() {


    d3.json("basketplayers.json").then( function(d){
        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin * 2);
        var chartHeight = height - (margin * 2);
        var barWidth = 40, barPadding = 5;
        console.log(d);

        var heights = [], names = [];
        for (i = 0; i<d.basketplayers.length; i++) {
            heights.push(d.basketplayers[i].size);
            names.push(d.basketplayers[i].name);
        }
        console.log(heights);
        console.log(names);

        //Klasser enligt längder
        var bins = ["170-179","180-189","190-199","200-209","210-219","220+"];
        //Y till frekvens
        var freq = []; //Antal spelare av en viss längd
        var binSize = 10; //160-169
        var bin = 170; //Håller koll på vilken bin man är i
        var binAmount = bins.length; // Mängd av klasser

        //Räkna
        for(i = 0; i<binAmount; i++) {
            var frequency = 0;
            for(j = 0; j<heights.length; j++) {
                if (heights[j]>= bin && heights[j]<(bin+binSize)) {
                    frequency++;
                }
            
            }
            freq.push(frequency);
            bin += binSize;
        }
        console.log(freq);

        var xScale = d3.scaleBand()
        .domain(bins)
        .range([0, chartWidth]);

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(freq)])
        .range([chartHeight, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        var canvas = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "lightgrey");

        var chartGroup = canvas.append("g")
        .attr("transform", "translate("+margin+","+margin+")");

        chartGroup.selectAll("staplar").data(freq).enter()
            .append("rect")
            .attr("width", barWidth)
            .attr("height", function(data) { return chartHeight - yScale(data) })
            .attr("x", function(data, i) {return i * (chartWidth / binAmount) + barWidth/2})
            .attr("y", function(data, i) { return yScale(data) });

            chartGroup.append("g").call(yAxis);
            chartGroup.append("g").call(xAxis).attr("transform", "translate(0,"+chartHeight+")");
    });


};