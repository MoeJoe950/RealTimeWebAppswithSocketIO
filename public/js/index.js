var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from serer');
});

socket.on('newMessage', function (Message) {
    var time = moment(Message.createdAt).format('h:mm a');
    console.log('You have a new Message', Message);
    var li = jQuery('<li></li>');
    li.text(`${Message.from} ${time}: ${Message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var time = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from} ${time}`);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();

    var messageTextBox = jQuery('[name=messages]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ... ');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');;
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    })
});

