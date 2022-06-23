import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocketServer started')
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // const { x, y } = robot.getMousePos()
    // ws.send(`mouse_position ${x,y}`)
    // ws.send(data)
  });
  ws.send('something');
});

wss.on('close', () => {
  console.log('WebSocketServer is closed!')
})