var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: "ali@example.com",
    //     text: "replay to your email"
    // });

    socket.emit('createMessage', {
        from: "Andrew",
        text: "The Message"
    });
});

socket.on('disconnect', function () {
    console.log('disconnect from serer');
});

// socket.on('newEmail', function (email) {
//     console.log('You\'ve Got Mail', email);
// });

socket.on('newMessage', function (Message) {
    console.log('You have a new Message', Message);
});