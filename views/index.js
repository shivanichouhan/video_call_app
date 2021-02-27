const socket = io('/');
const peer = new Peer();

peer.on('open', (id) => {
    socket.emit("newUser", id);
});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {

    // Some more code 
}).catch(err => {
    alert(err.message)
})


socket.on('userJoined', id => {
    console.log("new user joined")

    // Calling other client and sending our stream 
    const call = peer.call(id, myVideoStream);
    const vid = document.createElement('video');
    call.on('error', (err) => {
        alert(err);
    })

    // Taking the stream of the other client 
    // when they will send it. 
    call.on('stream', userStream => {

        // addVideo is a function which append 
        // the video of the clients 
        addVideo(vid, userStream);
    })
    
})
peer.on('call' , call=>{ 
  
    // Here client 2 is answering the call 
    // and sending back their stream 
    call.answer(stream);  
        const vid = document.createElement('video'); 
  
    // This event append the user stream.  
    call.on('stream' , userStream=>{ 
        addVideo(vid , userStream); 
    }) 
    call.on('error' , (err)=>{ 
        alert(err) 
    }) 
  })

  