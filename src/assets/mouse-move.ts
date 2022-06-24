import robot from 'robotjs';

export default (direction: string, distance: number, x: number, y: number) => {  
  switch (direction) {
    case 'up':
      robot.dragMouse(x, y - distance);
      break;
    case 'down':
      robot.dragMouse(x, y + distance);
      break;
    case 'left':
      robot.dragMouse(x - distance, y);
      break;
    case 'right':
      robot.dragMouse(x + distance, y);
      break;
    default: 
      robot.dragMouse(x,y)
  }
}