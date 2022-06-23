import robot from 'robotjs';
import { WebSocketServer } from 'ws';

export default (data: object, ws: WebSocket.WebSocket) => {
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
}