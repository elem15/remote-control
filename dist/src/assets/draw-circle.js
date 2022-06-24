import robot from 'robotjs';
export default (function (width, x, y) {
    var step = 5;
    var currentX = x;
    var currentY = y;
    robot.mouseToggle("down");
    for (var i = 0; i <= Math.PI * 2; i += 0.02) {
        var x_1 = (currentX - width) + width * Math.cos(i);
        var y_1 = currentY + width * Math.sin(i);
        robot.dragMouse(x_1, y_1);
    }
    robot.mouseToggle("up");
});
