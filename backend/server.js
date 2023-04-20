/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();

// creating http server
const server = http.createServer(app);

// creating socket object
const io = socketIO(server);

const adminRoutes = require('./routes/admin');

const ADMIN = '/';

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'fronted/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ADMIN, adminRoutes);

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, lobbyname }) => {
    const user = userJoin(socket.id, username, lobbyname);
    socket.join(user.lobbyname);

    // Welcome current user
    socket.emit('message', formatMessage(botName, `Welcome ${user.username} to ${lobbyname}!`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.lobbyname)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and lobbyname info
    io.to(user.lobbyname).emit('roomUsers', {
      users: getRoomUsers(user.lobbyname)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', ({ username, lobbyname, msg }) => {
    io.to(lobbyname).emit('message', formatMessage(username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.lobbyname).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and lobbyname info
      io.to(user.lobbyname).emit('roomUsers', {
        users: getRoomUsers(user.lobbyname)
      });
    }
  });
});

const PORT = process.env.PORT || 4000;
console.log('Server listening on PORT: ', PORT);
server.listen(PORT);