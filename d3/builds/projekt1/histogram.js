var imgValues = [];
var redValues = new Array(256);
var greenValues = new Array(256);
var blueValues = new Array(256);
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
document.getElementById("infile").addEventListener('change', handleFile);
document.getElementById("inlink").addEventListener('change', handleLink);

window.onresize = reDraw;

function drawChart() {
    var img = document.getElementById("canvas");
    console.log(img);
    var imageData = context.getImageData(0,0,img.width, img.height);
    console.log(imageData);

for (i = 0; i < imageData.data.length; i += 4) {
    if (redValues[imageData.data[i]] == null) {
        redValues[imageData.data[i]] = 1;
    } else {
        redValues[imageData.data[i]] += 1;
    }
    if (greenValues[imageData.data[i + 1]] == null) {
        greenValues[imageData.data[i + 1]] = 1;
    } else {
        greenValues[imageData.data[i + 1]] += 1;
    }
    if (blueValues[imageData.data[i + 2]] == null) {
        blueValues[imageData.data[i + 2]] = 1;
    } else {
        blueValues[imageData.data[i + 2]] += 1;
    }
    }

    rBin = [];
    gBin = [];
    bBin = [];
    for (i = 0;i<redValues.length;i+=2) {
        rValues = redValues[i] + redValues[i+1];
        rBin.push(rValues);
        gValues = greenValues[i] + greenValues[i+1];
        gBin.push(gValues);
        bValues = blueValues[i] + blueValues[i+1];
        bBin.push(bValues);
    }
}
function reDraw() {
    
    var height = window.innerHeight / 2;
    var width = window.innerWidth * 0.8;
    var margin = 10;
    var chartWidth = width - (margin * 2);
    var chartHeight = height - (margin * 2);    

    drawChart();

    d3.select("svg").remove("staplar");

    if (d3.max(rBin) > d3.max(gBin) && d3.max(rBin) > d3.max(bBin)) {
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(rBin)+ 500])
        .range([0,chartHeight]);
        var showYScale = d3.scaleLinear()
        .domain([d3.max(rBin)+ 500, 0])
        .range([0,chartHeight]);

    } else if (d3.max(gBin) > d3.max(rBin) && d3.max(gBin) > d3.max(bBin)) {
    var yScale = d3.scaleLinear()
    .domain([0, d3.max(gBin)+ 500])
    .range([0,chartHeight]);
    var showYScale = d3.scaleLinear()
    .domain([d3.max(rBin)+ 500, 0])
    .range([0,chartHeight]);

    } else {
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(gBin)+ 500])
        .range([0,chartHeight]);
        var showYScale = d3.scaleLinear()
        .domain([d3.max(rBin)+ 500, 0])
        .range([0,chartHeight]);

    }

    var botValues = [];
    for(i = 0;i<256;i+=10) {
        botValues.push(i);
    }
    

    var bottomAxis = d3.scaleBand()
    .domain(botValues)
    .range([0, chartWidth]); 

    var rxScale = d3.scaleBand()
    .domain(rBin)
    .range([0, chartWidth]);
    var gxScale = d3.scaleBand()
    .domain(gBin)
    .range([0, chartWidth]);
    var bxScale = d3.scaleBand()
    .domain(bBin)
    .range([0, chartWidth]);

    var canvas = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "lightgrey");
    
    var chartGroup = canvas.append("g");

    var xAxis = d3.axisBottom(bottomAxis);
    var yAxis = d3.axisRight(showYScale);


setTimeout(function() {
    chartGroup.selectAll("rstaplar")
    .data(rBin) // Fyll virtuella staplar med data från array
    //Gå in i varje virtuella stapel
    .enter() //for (i=0; i<dta.length; i++)
        .append("rect")
        .style("fill", "red")
        .style("opacity", 0.25)
        .attr("width", function (data) {return rxScale.bandwidth(); })
        //Bredden av rektangeln = värdet från datatabellen
        .attr("height", function(data) {return yScale(data); })
        //Första rektangeln x = 100*0, x2 = 100*1 ...
        .attr("x", function(data, i) {return i * (chartWidth / rBin.length) + rxScale.bandwidth()/2; })
        .attr("y", function(data) {return chartHeight - yScale(data); });
    
    chartGroup.selectAll("gstaplar")
    .data(gBin)
    .enter()
    .append("rect")
    .style("fill", "green")
    .style("opacity", 0.25)
    .attr("width", function (data) {return gxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data, i) {return i * (chartWidth / gBin.length) + gxScale.bandwidth()/2; })
    .attr("y", function(data) {return chartHeight - yScale(data) ; });


    chartGroup.selectAll("bstaplar")
    .data(bBin)
    .enter()
    .append("rect")
    .style("fill", "blue")
    .style("opacity", 0.25)
    .attr("width", function (data) {return bxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data, i) {return i * (chartWidth / bBin.length) + bxScale.bandwidth()/2; })
    .attr("y", function(data) {return chartHeight - yScale(data); });
}, 50);


chartGroup.append("g").call(yAxis);
chartGroup.append("g").call(xAxis).attr("transform","translate(0,"+chartHeight+")");

}
function handleFile(event) {
    imgValues = [];
    redValues = []
    greenValues = [];
    blueValues = [];
    console.log(event.target.files[0]);
    var reader = new FileReader;
    var imgURL = reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (event) {
        var img = new Image;
        img.src = event.target.result;
        console.log(img);
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            context.drawImage(img, 0,0);
            reDraw();
        }
    }
}
function handleLink(e) {
    imgValues = [];
    redValues = []
    greenValues = [];
    blueValues = [];
    
    console.log(e.target.value);
    var img = new Image;
    img.crossOrigin = "Anonymous";
    img.src = e.target.value;
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0,0);
        reDraw();

    }
    console.log(img.src);
    console.log(canvas.toDataURL());


    //var imageData = context.getImageData(0,0,img.width, img.height);
   


}

