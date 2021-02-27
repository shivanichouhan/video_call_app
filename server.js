
// Importing express module 
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path")
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// app.set('view engine', 'ejs');
// Calling the public folder 
app.use(express.static("public"));

// Handling get request 
app.get("/", (req, res) => {
    res.send("Welcome to GeeksforGeeks Video Call App");
})
app.get("/videocall", (req, res) => {
    res.render('Index',{RoomId:"23456"})
    // res.sendFile(path.join(__dirname , '/views/index.html'))
});

// app.get()

io.on('connection', (socket) => {
    socket.on('newUser', (id) => {
        socket.join('/');
        socket.to('/').broadcast.emit("userJoined", id);
    });
});



// navigator.mediaDevices.getUserMedia({ 
//     video:true, 
//     audio:true
//     }).then((stream)=>{ 

//         // Some more code 
//     }).catch(err=>{ 
//         alert(err.message) 
//     })


// Listing the server  
server.listen(4000, () => {
    console.log("Server running on port 4000");
}
)  