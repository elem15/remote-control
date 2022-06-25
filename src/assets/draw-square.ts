import robot from 'robotjs';

export default (width: number, x: number, y: number) => {
  const step = 5;
  const count = width / step;
  let currentX = x;
  let currentY = y;
  robot.mouseToggle("down");
  for(let i = 0; i <= count; i++) {
    currentX += step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= count; i++) {
    currentY += step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= count; i++) {
    currentX -= step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= count; i++) {
    currentY -= step;
    robot.dragMouse(currentX, currentY)
  }
  robot.mouseToggle("up");
}
