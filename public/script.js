const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

var peer = new Peer(undefined, {
    path: '/peerjs', // got this from the host server.js
    host: '/', // any host which is hosted on ex: localhost, heroku, etc.
    port: '443' // server poet is 3000
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: { width: { exact: 640 }, height: { exact: 480 } },
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
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

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
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
    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

const msg = document.getElementById('chat_message');
msg.addEventListener('keydown', e => {
    if (e.key === 'Enter' && msg.value !== '') {
        // console.log(msg.value);
        socket.emit('message', msg.value);
        msg.value = '';
    }
    // console.log(e.key, e.code);
})



let msgLi = document.getElementById('messages');
socket.on('createMessage', message => {
    // console.log('This is coming from the server', message);
    let li = document.createElement('li');
    li.classList.add('message');
    let b = document.createElement('B');
    b.append(document.createTextNode("User"));
    li.append(b);
    li.append(document.createElement('br'));
    li.append(document.createTextNode(message));
    msgLi.append(li);

    scrollToBottom();
})

const scrollToBottom = () => {
    let d = document.getElementById("main__chat__window");
    d.scrollTop = d.scrollHeight;
}


const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButtom();
    } else {
        setMuteButtom();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

setMuteButtom = () => {
    const html = `
   <i class="fas fa-microphone"></i>
   <span>Mute</span>
   `
    document.querySelector('.main__mute__button').innerHTML = html;
}
setUnmuteButtom = () => {
    const html = `
   <i class="unmute fas fa-microphone-slash"></i>
   <span>Unmute</span>
   `
    document.querySelector('.main__mute__button').innerHTML = html;
}


const playStop = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

setPlayVideo = () => {
    const html = `
   <i class="stop fas fa-video-slash"></i>
   <span>Play Video</span>
   `
    document.querySelector('.main__video__button').innerHTML = html;
}
setStopVideo = () => {
    const html = `
   <i class="fas fa-video"></i>
   <span>Stop Video</span>
   `
    document.querySelector('.main__video__button').innerHTML = html;
}