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
