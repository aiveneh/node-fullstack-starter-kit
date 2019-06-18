#!/usr/bin/env node

import dotenv from 'dotenv';
import http from 'http';
import Socket from 'socket.io';
import app from './app';
import { MongoConnect } from './connection';
import Log from './services/Logger';

dotenv.config();

MongoConnect()
  .then(() => {
    Log.info('Connection to Database successful');
  })
  .catch(connectionError => {
    Log.error(connectionError.message);
  });

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.set('port', port);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      Log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  Log.info(`Server Listening on  ${bind}`);
}

export const io = Socket(server);

io.on('connection', () => {
  Log.info('socket connection established');
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
