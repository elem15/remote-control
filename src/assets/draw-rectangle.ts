import robot from 'robotjs';

export default (width: number, height: number, x: number, y: number) => {
  const step = 5;
  const countWidth = width / step;
  const countHeight = height / step;
  let currentX = x;
  let currentY = y;
  robot.mouseToggle("down");
  for(let i = 0; i <= countWidth; i++) {
    currentX += step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= countHeight; i++) {
    currentY += step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= countWidth; i++) {
    currentX -= step;
    robot.dragMouse(currentX, currentY)
  }
  for(let i = 0; i <= countHeight; i++) {
    currentY -= step;
    robot.dragMouse(currentX, currentY)
  }
  robot.mouseToggle("up");
}