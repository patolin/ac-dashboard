const ip = require("ip");
const localIp=ip.address();

var http = require('http'),
    dgram = require('dgram'),
    socketio = require('socket.io');

var app = http.createServer(handleRequest),
    io = socketio(app, {  
        cors: {
            origin: `http://${localIp}:3000`,
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    }),
    socket = dgram.createSocket('udp4');


socket.on('message', function(content, rinfo) {
    //console.log('got message ', 'from', rinfo.address, rinfo.port);
    io.sockets.emit('udp-message', content.toString());
});

function handleRequest(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end("<!doctype html> \
        <html><head> \
        <script src='/socket.io/socket.io.js'></script> \
        <script> \
            var socket = io.connect('localhost:3001', {port: 3001}); \
            socket.on('udp message', function(message) { console.log('-----'); console.log(message); }); \
            console.log('waiting for data'); \
        </script></head> \
        <body>ok</body> \
        </html>");
}
console.log('Iniciando interfaz UDP -> WebSocket en puertos 18877 -> 3001 en IP:', localIp);
socket.bind(18877);
app.listen(3001);


// const dgram =require('node:dgram');

// const server = dgram.createSocket('udp4');

// server.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   server.close();
// });

// server.on('message', (msg, rinfo) => {
//   console.log(`server got msg from ${rinfo.address}:${rinfo.port}`);
//   console.log(msg.toString());

// });

// server.on('listening', () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(18877);