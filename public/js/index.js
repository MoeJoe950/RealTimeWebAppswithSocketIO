var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from serer');
});

socket.on('newMessage', function (Message) {
    console.log('You have a new Message', Message);
    var li = jQuery('<li></li>');
    li.text(`${Message.from}: ${Message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name="messages"]').val()
    }, function () {

    });
});