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
    //canvas.height = img.height;
    //context.drawImage(img, 0,0);
    var imageData = context.getImageData(0,0,img.width, img.height);
    

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
        var imageData = context.getImageData(0,0,img.width, img.height);
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
    img.src = e.target.value;

    console.log(img);
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0,0);
        console.log(canvas.toDataURL());
        //var imageData = context.getImageData(0,0,img.width, img.height);
        reDraw();


}

