const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid'); // #7 import uuid v4 - version 4

const server = require('http').Server(app);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   // res.status(200).send("hello world");
   // res.render('room');
   res.redirect(`/${uuidv4()}`); // #8 Get a unique Id and redirect to "localhost:3000/uid"
})


app.get('/:room', (req, res) => {
   res.render('room', { roomId: req.params.room }); // #9 Pass 'roomId' onto room.ejs
}); 


server.listen(3000);
