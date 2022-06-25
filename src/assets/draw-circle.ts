import robot from 'robotjs';

export default (width: number, x: number, y: number) => {
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const currentX = (x - width) + width * Math.cos(i);
    const currentY = y + width * Math.sin(i);
    robot.dragMouse(currentX, currentY);
  }
  robot.mouseToggle("up");
}