// #1 initialize Express
const express = require('express');
const app = express();

const server = require('http').Server(app); // #2 Create server -- http is built-in in js

app.set('view engine', 'ejs'); // #6 set view engine to ejs

// #4 root '/' -- ES6 fun to func -- req, res
app.get('/', (req, res) => {
   // res.status(200).send("hello world");
   res.render('room'); // #5 response to redierct to render the room.ejs
})


server.listen(3000); // #3 The server is local host and the port is 3000
