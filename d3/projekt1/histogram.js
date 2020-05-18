var imgValues = [];
var redValues = []
var greenValues = [];
var blueValues = [];
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
document.getElementById("infile").addEventListener('change', handleFile);
document.getElementById("inlink").addEventListener('change', handleLink);

//var img = document.getElementById("input");


function drawChart() {
       
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
}
function reDraw() {
    
    var height = window.innerHeight / 2;
    var width = window.innerWidth * 0.8;
    var barMargin = 10;

    drawChart();

    d3.select("svg").remove("staplar");



    var yScale = d3.scaleLinear()
    .domain([0, d3.max(redValues)])
    .range([0,height]);
    console.log(d3.max(greenValues));
    console.log(d3.max(redValues));
    console.log(d3.max(blueValues));
    
    var rxScale = d3.scaleBand()
    .domain(redValues)
    .range([0, width]);
    var gxScale = d3.scaleBand()
    .domain(greenValues)
    .range([0, width]);
    var bxScale = d3.scaleBand()
    .domain(blueValues)
    .range([0, width]);

    var canvas = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "lightgrey");
    

    var chartGroup = canvas.append("g");
 

    chartGroup.selectAll("rstaplar")
    .data(redValues) // Fyll virtuella staplar med data från array
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
    

 
    chartGroup.selectAll("staplar")
    .data(greenValues)
    .enter()
    .append("rect")
    .style("fill", "green")
    .style("opacity", 0.3)
    .attr("width", function (data) {return gxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data) {return gxScale(data); })
    .attr("y", function(data) {return height - yScale(data) + barMargin; });


    chartGroup.selectAll("bstaplar")
    .data(blueValues)
    .enter()
    .append("rect")
    .style("fill", "blue")
    .style("opacity", 0.3)
    .attr("width", function (data) {return bxScale.bandwidth(); })
    .attr("height", function(data) {return yScale(data); })
    .attr("x", function(data) {return bxScale(data); })
    .attr("y", function(data) {return height - yScale(data) + barMargin; });

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
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0,0);

    }
    img.src = e.target.value;
    reDraw();

    console.log(canvas.toDataURL());
    //var imageData = context.getImageData(0,0,img.width, img.height);
   


}

