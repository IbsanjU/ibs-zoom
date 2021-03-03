const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
   path: '/peerjs', // got this from the host server.js
   host: '/', // any host which is hosted on ex: localhost, heroku, etc.
   port: '3000' // server poet is 3000
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
   video: true,
   audio: false
}).then(stream => {
   myVideoStream = stream;
   addVideoStream(myVideo, stream);
   
   console.log('above peer Call')
   peer.on('call', call => {
      console.log('inside peer Call')
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })

   socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream);
   }) // listen on the new user connected
})


peer.on('open', id => { // listen to peer new connection
   socket.emit('join-room', ROOM_ID, id); // pass the newly connected user id
   console.log("peerId==", id);
})


const connectToNewUser = (userId, stream) => {
   console.log("new userId==", userId);
   const call = peer.call(userId, stream); // call the userId with stream
   const video = document.createElement('video'); // create a new video element to append
   call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
   })
}

const addVideoStream = (video, stream) => {
   video.srcObject = stream;
   video.addEventListener('loadedmetadata', () => {
      video.play();
   })
   videoGrid.append(video);
}