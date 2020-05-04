window.onresize = reDraw;
window.onload = reDraw;
//Höjden på rektanglarna
function reDraw() {
    var dataTable = [30, 50, 70, 110, 50, 75];
    var height = window.innerHeight / 2;
    var width = window.innerWidth * 0.8;
    var barWidth = 50;
    var barMargin = 10;

    d3.select("svg").remove("staplar");



    //Skala
    var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataTable)])
    .range([0,height]);

    var xScale = d3.scaleBand()
    .domain(dataTable)
    .range([0, width])
    .padding(0.2);
//Skapa SVG med JS
    var canvas = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "lightgrey");

        //Tidsresan börjar här
        canvas.selectAll("staplar")
            .data(dataTable) // Fyll virtuella staplar med data från array

            //Gå in i varje virtuella stapel
            .enter() //for (i=0; i<dta.length; i++)
                .append("rect")
                .attr("width", function (data) {return xScale.bandwidth(); })
                //Bredden av rektangeln = värdet från datatabellen
                .attr("height", function(data) {return yScale(data) + barMargin; })
                //Första rektangeln x = 100*0, x2 = 100*1 ...
                .attr("x", function(data) {return xScale(data); })
                .attr("y", function(data) {return height - yScale(data) + barMargin; });

}
