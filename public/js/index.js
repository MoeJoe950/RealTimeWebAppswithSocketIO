var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnect from serer');
});

socket.on('newMessage', function (Message) {
    var time = moment(Message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: Message.text,
        from: Message.from,
        createdAt: time
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var time = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: time
    });

    jQuery('#messages').append(html);
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

