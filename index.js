import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocketServer started')
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    const [direction, distance] = data.toString().split(' ');
    let { x, y } = robot.getMousePos();
    switch (direction) {
      case 'mouse_up':
        robot.dragMouse(x, y - +distance);
        break;
      case 'mouse_down':
        robot.dragMouse(x, y + +distance);
        break;
      case 'mouse_left':
        robot.dragMouse(x - +distance, y);
        break;
      case 'mouse_right':
        robot.dragMouse(x + +distance, y);
        break;
      default: 
        robot.dragMouse(x,y)
    }
    ws.send(`Mouse_position:${x}/${y}`);
  });
  ws.send('WebSocketServer_started');
});

wss.on('close', () => {
  console.log('WebSocketServer is closed!')
})