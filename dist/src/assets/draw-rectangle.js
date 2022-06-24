import robot from 'robotjs';
export default (function (width, height, x, y) {
    var step = 5;
    var countWidth = width / step;
    var countHeight = height / step;
    var currentX = x;
    var currentY = y;
    robot.mouseToggle("down");
    for (var i = 0; i <= countWidth; i++) {
        currentX += step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= countHeight; i++) {
        currentY += step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= countWidth; i++) {
        currentX -= step;
        robot.dragMouse(currentX, currentY);
    }
    for (var i = 0; i <= countHeight; i++) {
        currentY -= step;
        robot.dragMouse(currentX, currentY);
    }
    robot.mouseToggle("up");
});
