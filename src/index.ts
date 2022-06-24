import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { httpServer } from './http_server/index.js';
import mouseMove from './assets/mouse-move.js';
import drawSquare from './assets/draw-square.js';
import drawRectangle from './assets/draw-rectangle.js'

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocketServer started')
  ws.on('message', function message(data: object) {
    console.log('received: %s', data);
    let [movement, distance, distance2] = data.toString().split(' ');
    const width = +distance;
    const height = +distance2 ?? null;
    const [action, direction] = movement.split('_');
    let { x, y } = robot.getMousePos();
    switch (action) {
      case 'mouse':
        mouseMove(direction, width, x, y);
        break;
      case 'draw':
        switch (direction) {
          case 'square':
            drawSquare(width, x, y);
            break;
          case 'rectangle':
            drawRectangle(width, height, x, y);
            break;
        }
        break;
    }
    ws.send(`Mouse_position:${x}/${y}`);
  });
  ws.send('WebSocketServer_started');
  ws.on('close', () => {
    console.log('WebSocketServer is closed!')
  })
});