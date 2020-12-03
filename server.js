// This is a lightweight socket server

const http = require('http');
// Start server, listening on port 8000
const server = http.createServer(() => {
    console.log("Listening on port 8000");
}).listen(8000);

const io = require('socket.io')(server);
// 
io.on('connection', socket => {
    console.log("New connection, ID: " + socket.id);
    
    // listen for events from the sockets.
    socket.on("connect_test", data => {
        console.log("Socket " + socket.id + " is testing connection");
        
    })
})