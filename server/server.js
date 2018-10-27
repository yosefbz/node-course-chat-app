const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 't@t',
    text: 'Hey',
    creatAt: 123
  });

  socket.on('createMessage', (newMessage) => {
    console.log('Creat Message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
