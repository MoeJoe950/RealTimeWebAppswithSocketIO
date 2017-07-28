const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newEmail', {
        from: "Mike@wxample.com",
        text: "hey .. What is up",
        createdAt: "12:54"
    });

    socket.emit('newMessage', {
        from: "Andrew",
        text: "hey .. can we meet at 6"
    });

    socket.on('createMessage', (newMessage) => {
        console.log('You have got a new message', newMessage);
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail)
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, ()=> {
    console.log(`server is up on server ${port}`);
});