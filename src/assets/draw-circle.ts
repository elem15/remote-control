import robot from 'robotjs';

export default (width: number, x: number, y: number) => {
  const step = 5;
  let currentX = x;
  let currentY = y;
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const x = (currentX - width) + width * Math.cos(i);
    const y = currentY + width * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
}