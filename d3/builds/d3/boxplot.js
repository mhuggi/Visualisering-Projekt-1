function drawChart() {
    
    d3.json("boxplot.json").then( function(d){
        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin * 2);
        var chartHeight = height - (margin * 2);
        console.log(d);

        var temps = [];
        for (i = 0; i<d.temperatures.length; i++) {
            temps.push(d.temperatures[i].temp);
        }
        console.log(temps);

        //Behov för boxplot
        var min = d3.min(temps);
        var max = d3.max(temps);
        var median;
        var lq;
        var uq;
        if (temps.length % 2 == 0) {
            median = temps[temps.length * 0.5];
            console.log(temps.length * 0.5);
            lq = temps[temps.length * 0.25];
            uq = temps[temps.length * 0.75];
        } else {
            var medLow = temps[Math.floor(temps.length * 0.5)];
            var medHigh = temps[Math.ceil(temps.length * 0.5)];
            var lqLow = temps[Math.floor(temps.length * 0.25)];
            var lqHigh = temps[Math.ceil(temps.length * 0.25)];
            var uqLow = temps[Math.floor(temps.length * 0.75)];
            var uqHigh = temps[Math.ceil(temps.length * 0.75)];

            median = (medLow + medHigh) / 2;
            lq = (lqLow + lqHigh) / 2;
            uq = (uqLow + uqHigh) / 2;

        }
        console.log(median);
        console.log(lq);

        var xScale = d3.scaleLinear()
        .domain([min -5, max +5])
        .range([0, chartWidth]);

        var xAxis = d3.axisBottom(xScale);

        var canvas = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);



        var chartGroup = canvas.append("g").attr("transform", "translate("+margin+","+margin+")");
        
        chartGroup.append("rect")
        .attr("width", function(data) {return xScale(uq) - xScale(lq);})
        .attr("height", 50)
        .attr("x", xScale(lq))
        .attr("y", 0);

        

        chartGroup.append("g").call(xAxis);
    });
};