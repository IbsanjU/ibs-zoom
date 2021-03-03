const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');

const server = require('http').Server(app);
const io = require('socket.io')(server); // import socket.io -- specify the server

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.redirect(`/${uuidv4()}`);
})


app.get('/:room', (req, res) => {
   res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
   socket.on('join-room', (roomId) => {
      socket.join(roomId); // join the new user to the same room with roomId
      socket.to(roomId).broadcast.emit('user-connected'); // broadcast to all the members of the room
      console.log("joined the room", roomId);
   })
})// when the user is connected to it 


server.listen(3000);
