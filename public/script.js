const videoGrid =  document.getElementById('video-grid'); // #8 reference the video-grid to put the video element later
const myVideo = document.createElement('video'); // #7 create an video element

let myVideoStream;

// #1 gets the video and audio from the chrome
// #2 getUserMedia will accept an Object
// also its an promise
navigator.mediaDevices.getUserMedia({
   video: true,
   audio: true
}).then(stream => {
   myVideoStream = stream; // #3 captures the video and pass it to myVideoStream
   addVideoStream(myVideo, stream);
})

// #4 create a func which takes the video on the element and a stream.
// play the stream video
const addVideoStream = (video, stream) => {
   video.srcObject = stream; // #5 setting the source for the video
   video.addEventListener('loadedmetadata', () => {
      video.play(); // #6 after we load the video we will play it using the event listener
   })
   videoGrid.append(video); 
}