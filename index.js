const express = require('express');
const app = express();
const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

var past_loc = {
    lat: 19,
    lng: 47
};

function genTracks(){
    // var sign = Math.random() > 0.13 ? 1 : -1;
    sign = 1;
    dice = Math.random();

    if (dice > 0.5){
        past_loc.lat = past_loc.lat + sign * dice * 0.0004;
        return past_loc
    } else {
        past_loc.lng = past_loc.lng + sign * dice * 0.0007;
        return past_loc
    }
}

setInterval(() => {
    console.log('emiting coords.');

    io.emit('coords', genTracks());
}, 1000);


server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));


var numUsers = 0;

io.on('connection', (socket) => {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;

        socket.emit('login', {
            numUsers: numUsers
        });

        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
});
