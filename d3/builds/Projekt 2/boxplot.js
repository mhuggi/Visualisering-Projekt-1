    //variabeln data innehåller här JSON-filen som returneras från webbtjänsten


function drawChart() {
    var days = document.getElementById("days").value;
    var format = document.getElementById("format").value;
    $.get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=EUR&limit="+days+"&api_key=51c7d72b0d64ae36dc113a2f99628bcb475eb682a4fcbb3f92a4563044984504",function(data, status){     
d3.select("svg").remove("path");
d3.select("svg").remove("rect");



        var width = 800, height = 500, margin = 50;
        var chartWidth = width - (margin * 2);
        var chartHeight = height - (margin * 2);
        var boxHeight = 50, boxPosition = chartHeight - boxHeight;
        var lineY = boxPosition + (boxHeight/2);


        var xs = [];
        var ys = [];
        var date = [];
        dataArray = data.Data.Data;


        for (i=0; i<dataArray.length; i++) {
            ys.push(dataArray[i].close);
            xs.push(dataArray[i].time);
            var newDate = new Date(dataArray[i].time * 1000);
            var dayMonth = newDate.getDate() + "." + (newDate.getMonth() + 1);
            date.push(dayMonth);
        }
        
    var canvas = d3.select("section")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var chartGroup = canvas.append('g').attr("transform","translate("+margin+","+margin+")");

if (format == 1) {
    if (days == 90) {
        newDateScale = [];
        for (i = 0; i<date.length;i+=10) {
            newDateScale.push(date[i]);
        }
        var dateScale = d3.scaleBand()
        .domain(newDateScale)
        .range([0, chartWidth]);
    } else {
            var dateScale = d3.scaleBand()
            .domain(date)
            .range([0, chartWidth]);
    }
            var xScale = d3.scaleBand()
            .domain(xs)
            .range([0, chartWidth]);
        
            //Skala för temperatur
            var yScale = d3.scaleLinear()
            .domain([d3.min(ys) - 100 , d3.max(ys) + 100])
            .range([chartHeight, 0]);
    
    
    
    var path = d3.line()
    .x(function(data) {return xScale(data.time)})
    .y(function(data) {return yScale(data.close)});

    var area = d3.area()
    .x(function(d) { return xScale(d.time); })
    .y0(chartHeight)
    .y1(function(d) { return yScale(d.close); });

    var div = d3.select("section").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);



    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(dateScale);

    
    //Rita en linje
    chartGroup.append("path")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("d",path(dataArray))
    .attr("transform","translate("+chartWidth/xs.length/2+",0)");
    
    chartGroup.append("g").call(yAxis);
    chartGroup.append("g").call(xAxis).attr("transform","translate(0,"+chartHeight+")");
    
    chartGroup.append("path")
       .data([dataArray])
       .attr("fill", "LightPink")
       .attr("d", area)
       .attr("transform","translate("+chartWidth/xs.length/2+",0)");

    chartGroup.selectAll('dots').data(dataArray)
    .enter()
        .append('circle')
        .attr('cx', function(d) {return xScale(d.time)})
        .attr('cy', function(d) {return yScale(d.close)})
        .attr('r', '8')
        .attr('opacity', 0)
        .attr("transform","translate("+chartWidth/xs.length/2+",0)")
                .on("mouseover", function(d) {
                  var time = new Date(d.time * 1000);
                    		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.close + "€<br>" + time.getDate() + "." + (time.getMonth()+1))	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
;
   
       


} else {
    var currentTime = new Date();
    var hours = (days * 24) + currentTime.getHours();
    $.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=EUR&limit="+hours+"&api_key=51c7d72b0d64ae36dc113a2f99628bcb475eb682a4fcbb3f92a4563044984504",function(hData, status){     
    var hDataArray = hData.Data.Data;
    var hDataDays = [];
    var today = [];
    var time = [];
    var allMax = 0;
    var allMin = Number.MAX_VALUE;
    var allData = [];
    var currentTime = new Date(hDataArray[hDataArray.length -1].time * 1000);
    for (i = currentTime.getHours();i>0;i--) {
        today.push(hDataArray[hDataArray.length - i]);
    }
    hDataDays.push(today);
    for(i = 0;i<(hDataArray.length - currentTime.getHours() - 1);i+=24) {
        var d = [];
        for (j = 0;j<24;j++) {
            d.push(hDataArray[j+i]);
        }
        time.push(hDataArray[i].time)
        hDataDays.push(d);
    }
    time.push(today[0].time);
    console.log(hDataDays);
    console.log(time);


var boxPos = 0;

    for (i = 0;i<hDataDays.length;i++) {
        var highsToday = [];
        var lowsToday = [];
        var closed = [];
        var median;
        var lq;
        var uq;

        for (j = 0;j<hDataDays[i].length;j++) {
            highsToday.push(hDataDays[i][j].high);
            lowsToday.push(hDataDays[i][j].low);
            closed.push(hDataDays[i][j].close);
        }
        closed.sort();
        var max = d3.max(highsToday);
        var min = d3.min(lowsToday);
        if (closed.length % 2 == 0) {
            median = closed[closed.length * 0.5];

            var lqLow = closed[Math.floor(closed.length * 0.25)];
            var lqHigh = closed[Math.ceil(closed.length * 0.25)];
            var uqLow = closed[Math.floor(closed.length * 0.75)];
            var uqHigh = closed[Math.ceil(closed.length * 0.75)];
            lq = (lqLow + lqHigh) / 2;
            uq = (uqLow + uqHigh) / 2;

        } else {
            var medLow = closed[Math.floor(closed.length * 0.5)];
            var medHigh = closed[Math.ceil(closed.length * 0.5)];
            var lqLow = closed[Math.floor(closed.length * 0.25)];
            var lqHigh = closed[Math.ceil(closed.length * 0.25)];
            var uqLow = closed[Math.floor(closed.length * 0.75)];
            var uqHigh = closed[Math.ceil(closed.length * 0.75)];
            median = (medLow + medHigh) / 2;
            lq = (lqLow + lqHigh) / 2;
            uq = (uqLow + uqHigh) / 2;
        }
        if (max > allMax) {
            allMax = max;
        }
        if (min < allMin) {
            allMin = min;
        }

        allData.push({median:median, lq:lq, uq:uq, max:max, min:min, time:time[i]});
        /*console.log(median);
        console.log(lq);
        console.log(uq);
        console.log(max);
        console.log(min);
var yScale = d3.scaleLinear()
.domain([min -5, max +5])
.range([0, chartHeight]);


chartGroup.append("rect")
.attr("height", yScale(uq) - yScale(lq))
.attr("width", function(d) {return xScale.bandwidth() -20;})
.attr("fill", "grey")
.attr("stroke", "lightgreen")
.attr("y", yScale(lq))
.attr("x", boxPos);

boxPos += 90;
/*


chartGroup.append("line")
.attr("stroke", "black")
.attr("y1", yScale(min))
.attr("y2", yScale(min))
.attr("x1", boxPosition + 10)
.attr("x2", boxPosition + boxHeight - 10);

chartGroup.append("line")
.attr("stroke", "black")
.attr("y1", yScale(max))
.attr("y2", yScale(max))
.attr("x1", boxPosition + 10)
.attr("x2", boxPosition + boxHeight - 10);


chartGroup.append("line")
.attr("stroke", "black")
.attr("y1", yScale(min))
.attr("y2", yScale(max))
.attr("x1", lineY)
.attr("x2", lineY);


chartGroup.append("line")
.attr("stroke", "black")
.attr("y1", yScale(median))
.attr("y2", yScale(median))
.attr("x1", boxPosition)
.attr("x2", boxPosition + boxHeight);
*/





    }
    console.log(allData);
    allData.reverse();
    console.log(allData);

    var xScale = d3.scaleBand()
    .domain(time)
    .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
    .domain([allMax +5, allMin -5])
    .range([0, chartHeight]);


    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.selectAll("varline")
    .data(allData)
    .enter()
        .append("line")
        .attr("stroke", "black")
        .attr("x1", function(d) {return xScale(d.time)})
        .attr("x2", function(d) {return xScale(d.time)})
        .attr("y1", function(d) {return yScale(d.max)})
        .attr("y2", function(d) {return yScale(d.min)})
        .attr("transform","translate("+chartWidth/time.length/2+",0)");    


    chartGroup.selectAll("rect")
    .data(allData)
    .enter()
        .append("rect")
        .attr("height", function(d) {return yScale(d.lq) - yScale(d.uq)})
        .attr("width", function(d) {return xScale.bandwidth();})
        .attr("fill", "grey")
        .attr("stroke", "lightgreen")
        .attr("x", function(d) {return xScale(d.time)})
        .attr("y", function(d) {return yScale(d.uq) });
    
    chartGroup.selectAll("medline")
    .data(allData)
    .enter()
        .append("line")
        .attr("stroke", "black")
        .attr("x1", function(d) {return xScale(d.time)})
        .attr("x2", function(d) {return xScale(d.time) + xScale.bandwidth()})
        .attr("y1", function(d) {return yScale(d.median)})
        .attr("y2", function(d) {return yScale(d.median)});
    



        chartGroup.append("g").call(xAxis).attr("transform","translate(0,"+chartHeight+")");
        chartGroup.append("g").call(yAxis);
});

}

    });

};

