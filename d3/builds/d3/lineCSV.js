function drawChart() {
    d3.csv("linedata.csv").then(function(data) {
        document.write(JSON.stringify(data));
        console.log(data);
        var temps = [];
        var months = [];
        for (i = 0; i<data.length; i++) {
            months.push(data[i].Month);
            temps.push(data[i].Temp);
        }
        console.log(months);
        console.log(temps);
        
    });
}