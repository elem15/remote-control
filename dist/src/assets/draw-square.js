import robot from 'robotjs';
export default (function (width, x, y) {
    var step = 5;
    var count = width / step;
    var currentX = x;
    var currentY = y;
    robot.mouseToggle("down");
    for (var i = 0; i <= count; i++) {
        currentX += step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= count; i++) {
        currentY += step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= count; i++) {
        currentX -= step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= count; i++) {
        currentY -= step;
        robot.dragMouse(currentX, currentY);
    }
    robot.mouseToggle("up");
});
