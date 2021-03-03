// #1 initialize Express
const express = require('express');
const app = express();

// #2 Create server -- http is built-in in js
const server = require('http').Server(app);

// #4 root '/' -- ES6 fun to func -- req, res
app.get('/', (req, res) => {
   res.status(200).send("hello world");
})


// #3 The server is local host and the port is 3000
server.listen(3000);