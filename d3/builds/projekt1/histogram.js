var imgValues = [];
var redValues = new Array(256);
var greenValues = new Array(256);
var blueValues = new Array(256);
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
document.getElementById("infile").addEventListener('change', handleFile);
document.getElementById("inlink").addEventListener('change', handleLink);

//var img = document.getElementById("input");


function drawChart() {
    //console.log(canvas.toDataURL());
    var img = document.getElementById("canvas");
    console.log(img);
    //canvas.height = img.height;
    //context.drawImage(img, 0,0);
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
    var barMargin = 10;

    drawChart();

    d3.select("svg").remove("staplar");

    if (d3.max(rBin) > d3.max(gBin) && d3.max(rBin) > d3.max(bBin)) {
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(rBin)])
        .range([0,height]);
    } else if (d3.max(gBin) > d3.max(rBin) && d3.max(gBin) > d3.max(bBin)) {
    var yScale = d3.scaleLinear()
    .domain([0, d3.max(gBin)])
    .range([0,height]);
    } else {
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(gBin)])
        .range([0,height]);
    }
    console.log(rBin);
    console.log(gBin);
    console.log(bBin);


    
    var rxScale = d3.scaleBand()
    .domain(rBin)
    .range([0, width]);
    var gxScale = d3.scaleBand()
    .domain(gBin)
    .range([0, width]);
    var bxScale = d3.scaleBand()
    .domain(bBin)
    .range([0, width]);

    var canvas = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "lightgrey");
    
    var chartGroup = canvas.append("g");
setTimeout(function() {
    chartGroup.selectAll("rstaplar")
    .data(rBin) // Fyll virtuella staplar med data från array
    //Gå in i varje virtuella stapel
    .enter() //for (i=0; i<dta.length; i++)
        .append("rect")
        .style("fill", "red")
        .style("opacity", 0.3)
        .attr("width", function (data) {return rxScale.bandwidth(); })
        //Bredden av rektangeln = värdet från datatabellen
        .attr("height", function(data) {return yScale(data); })
        //Första rektangeln x = 100*0, x2 = 100*1 ...
        .attr("x", function(data) {return rxScale(data); })
        .attr("y", function(data) {return height - yScale(data) + barMargin; });
    
    chartGroup.selectAll("gstaplar")
    .data(gBin)
    .enter()
    .append("rect")
    .style("fill", "green")
    .style("opacity", 0.3)
    .attr("width", function (data) {return gxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data) {return gxScale(data); })
    .attr("y", function(data) {return height - yScale(data) + barMargin; });


    chartGroup.selectAll("bstaplar")
    .data(bBin)
    .enter()
    .append("rect")
    .style("fill", "blue")
    .style("opacity", 0.3)
    .attr("width", function (data) {return bxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data) {return bxScale(data); })
    .attr("y", function(data) {return height - yScale(data) + barMargin; });
}, 50);
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

