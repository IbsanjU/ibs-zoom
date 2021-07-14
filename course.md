# Ibs-Zoom-clone
## Plan of Action
---
- Initialize the NodeJS Project
- Initialize the First View
- Create a room Id
- Add the ability to view our own Video
- Add the ability to allow otherrs to stream their video 
- Add Styling
- Add the ability to create messages
- Add Mute button
- Add Stop Video button

## API's, Server and Dependencies
---
- Socket.io
- NodeJS
- PeerJS
- EJS
- UUID
- Express Server
- WebRTC

---
## Step 1
- Install express.js -- `npm install express`
1. initialize express in server.js
      - What is Express Node.Js
      - It is a minimalistic node.js web application framework that provides various features for web and mobile applications
2. Create Server in server.js
      - http is built-in in js
      - listen to server with port 3000
3. Run node server using nodemon
      - install nodemon `npm install -g nodemon`
      - -g stands for installing globally
      - run the server by `nodemon server.js`
## Step 2
- Create a view for our Room
1. Create room.ejs file in views folder
      - .ejs is embedded js - It will allow us to communicate variables with frontend
2. Install ejs  `npm install ejs`
      - set the server to load the room.ejs `res.render('room')'
      - we dont need to import room.ejs in server.js 
      - instead we need to set the view engine to ejs ``
## Step 3
- Create room id usind uuid
1. Install uuid `npm install uuid`
      - uuid provide unique random id for the room participants
      - import uuid in server.js and create unique uuid
      - pass the new uuid (roomId) to room.ejs
## Step 4
- View our video on browser
1. Create a new script.js in public folder and link it in room.js
      - tell the server.js where the public files are located
2. Create a video element to view our own video
      - `navigator.mediaDevices.getUserMedia()` will get audio and video from the chrome browser
      - getUserMedia takes an Object `{video:true, audio:true}` to get access
      - It is a Promise and Promise an event in the future it is either accept or reject
      - get the video and set it up to play afte the stream is loaded
3. Create a video-grid in room.ejs
      - create a video element in room.ejs
## Step 5
- Allow others to stream their video
1.  use SOCKET.IO 
      - socket.io is used for realtime two way communication on the same channel
      - socket.io uses websocket which is popular for asynchromous realtime engine
      - websocket is like a internet protocol but not the same.
      - The difference between http and socket is that 'hhtp' can only as a cliet make request to the server but the server can only repond and it cannot start a request.
      - In socket Io the the server can request and response at the same time and doesn't have to wait for the client to request.
   - Install socket.io `npm install scocket.io`
      - In server.js and room.ejs import socket.io
      - `socket.emit('join-room')` in script.js
      - check if the user is joined the room when the user is connected 
   - using the roomId from the room.ejs add the video element of others the video-grid
      -  we can join the room from the specific roomId from server.js
      - `socket.emit('join-room', ROOM_ID);` ROOM_ID is accessed from the room.ejs
      - broadcast new user connected to the room members
      - listen on the new user-connected on the socket in script.js `socket.on('user-connected')`
      - when a new user connects its identified
2. WebRTC & PeerJS
      - WebRTC is  a free, open-source project thta allows web browsers to communicate with eachother in real time
      - [PeerJS](https://peerjs.com) wraps the webbrowsers with WebRTC implementation to provide a complete, configurable and easy-to-use peer-to-peer connection API.
   - install peerJS `npm install peer`
      - import ExperssPeerServer -- peer is working with express
      - setup peerServer and specify the url for it to use `app.use('/peerjs', peerServer)`
   - Open the peerConnection in the frontend (script.js)
      - import in the room.ejs
      - `<script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>`
      - create a new peer connection `var peer = new Peer()`
      - Now listen on the peerConnection and pass the new user id using socket.emit 
      - connectToNewUser by CALLing on the userId and stream video
      - the stream is coming form the promise so we wait for the promise to listen to the user-connected
      - Answer the call
