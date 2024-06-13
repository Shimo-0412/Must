const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/messages', (req, res) => {
    const message = req.body;
    messages.push(message);
    io.emit('newMessage', message);
    res.status(201).json(message);
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('initMessages', messages);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});