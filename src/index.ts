import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { httpServer } from './http_server/index';
import mouseMove from './assets/mouse-move';
import drawSquare from './assets/draw-square';
import drawRectangle from './assets/draw-rectangle';
import drawCircle from './assets/draw-circle';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocketServer started')
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false  });
  duplex.on('data', async (chunk: object) => {
    console.log('received: %s', chunk);
    const [movement, distance, distance2] = chunk.toString().split(' ');
    const width = +distance;
    const height = +distance2 ?? null;
    const [action, direction] = movement.split('_');
    const { x, y } = robot.getMousePos();
    switch (action) {
      case 'mouse':
        mouseMove(direction, width, x, y);
        switch (direction) {
          case 'position':
            duplex.write(`mouse_position:_${x}_${y}\0`);
            break;
          default:
            duplex.write("Mouse_was_moved.\0")
        }
        break;
      case 'prnt': {
        const w = 200;
        const h = 200;
        const bitMap = robot.screen.capture(x - 35, y, w, h);
        const img = new Jimp(w, h);
        img.bitmap.data = bitMap.image;
        img.invert();
        img.normalize();
        const base64 = await img.getBufferAsync(Jimp.MIME_PNG);
        duplex.write(`prnt_scrn ${base64.toString("base64")}\0`)
      }
        break;
      case 'draw':
        switch (direction) {
          case 'square':
            drawSquare(width, x, y);
            duplex.write("Square_was_drawing.\0");
            break;
          case 'rectangle':
            drawRectangle(width, height, x, y);
            duplex.write("Rectangle_was_drawing.\0");
            break;
          case 'circle':
            drawCircle(width, x, y);
            duplex.write("Circle_was_drawing.\0");
            break;
        }
        break;
    }
  });
  duplex.write('WebSocketServer_started');
  duplex.on('end', () => {
    console.log('WebSocketServer is closed!')
  })
  duplex.on('error', (err) => {
    console.log('ERROR: ', err);
  })
});