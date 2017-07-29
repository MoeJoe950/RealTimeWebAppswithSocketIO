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

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}`);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name="messages"]').val()
    }, function () {
        //FUNCTION HERE
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('unable to fetch location');
    })
});
