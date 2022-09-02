const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    let usernames = ['Cleber', 'Pinguim', 'Steve Jobs', 'Biscoito',
    'Elon Musk', 'Foguete', 'Windows', 'Linux', 'Yamaha', 'Honda', 'BMW',
    'Ezreal', 'Blitzcrank', 'Annie', 'Aatrox', 'Heisenberg', 'Fiddlesticks']
    let username = usernames[Math.floor(Math.random() * usernames.length)]

    io.emit('user join', username);

    socket.on('disconnect', () => {
        io.emit('user exit');
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg, username);
    })

    socket.on('change username', (name) => {
        username = name;
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});