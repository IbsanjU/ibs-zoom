const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');

const server = require('http').Server(app);
const io = require('socket.io')(server); // import socket.io -- specify the server

const { ExpressPeerServer } = require('peer'); // import peer server - peer working with express
const peerServer = ExpressPeerServer(server, {
   debug: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use('/peerjs', peerServer); // specify the peerserver which url is it going to use
app.get('/', (req, res) => {
   res.redirect(`/${uuidv4()}`);
})


app.get('/:room', (req, res) => {
   res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
   socket.on('join-room', (roomId, userId) => {
      socket.join(roomId); // join the new user to the same room with roomId
      socket.to(roomId).broadcast.emit('user-connected', userId); // broadcast to all the members of the room userId
      console.log("joined the room", roomId, "userId==", userId);
   })
})// when the user is connected to it 


server.listen(3000);
