import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { httpServer } from './http_server/index.js';
import mouseMove from './assets/mouse-move.js';
import drawSquare from './assets/draw-square.js';
import drawRectangle from './assets/draw-rectangle.js';
import drawCircle from './assets/draw-circle.js';
var HTTP_PORT = 3000;
console.log("Start static http server on the ".concat(HTTP_PORT, " port!"));
httpServer.listen(HTTP_PORT);
var wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    console.log('WebSocketServer started');
    ws.on('message', function message(data) {
        var _a;
        console.log('received: %s', data);
        var _b = data.toString().split(' '), movement = _b[0], distance = _b[1], distance2 = _b[2];
        var width = +distance;
        var height = (_a = +distance2) !== null && _a !== void 0 ? _a : null;
        var _c = movement.split('_'), action = _c[0], direction = _c[1];
        var _d = robot.getMousePos(), x = _d.x, y = _d.y;
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
                    case 'circle':
                        drawCircle(width, x, y);
                        break;
                }
                break;
        }
        ws.send("Mouse_position:".concat(x, "/").concat(y));
    });
    ws.send('WebSocketServer_started');
    ws.on('close', function () {
        console.log('WebSocketServer is closed!');
    });
});
