console.log("Hello world!");

var http = require('http');

var server = http.createServer(function(request, response) {
    console.log("Nån vill se på webappen");
    response.write("Serverar webbappen");
    response.end();
});

server.listen(3000);
