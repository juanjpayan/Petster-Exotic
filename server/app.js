require('./db/config');
const express = require('express'),
  path = require('path'),
  openRoutes = require('./routes/open'),
  petsRoutes = require('./routes/secure/pets'),
  usersRoutes = require('./routes/secure/users'),
  cookieParser = require('cookie-parser'),
  fileUpload = require('express-fileupload'),
  cors = require('cors');
const passport = require('./middleware/authentication');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.URL || 'http://localhost:3000'
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/images'
  })
);
app.use(express.json());
app.use(cookieParser());

//Chat
// io.on('connection', (socket) => {
//   console.log('a user is connected', socket.id);

//   socket.on('send message', function (msg) {
//     io.emit('receive message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('...and disconnected');
//   });
// });

// Unauthenticated routes
app.use(openRoutes);

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Any authentication middleware and related routing would be here.
app.use(
  passport.authenticate('jwt', {
    session: false
  })
);
// Secure Route
app.use(usersRoutes);
app.use(petsRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
