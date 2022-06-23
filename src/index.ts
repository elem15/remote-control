import Jimp from 'jimp';
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import kbdMouse from './assets/kbd-mouse.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws: WebSocket.WebSocket) {
  console.log('WebSocketServer started')
  ws.on('message', function message(data: object) {
    kbdMouse(data, ws);
  });
  ws.send('WebSocketServer_started');
});

wss.on('close', () => {
  console.log('WebSocketServer is closed!')
})