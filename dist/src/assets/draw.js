import robot from 'robotjs';
export default (function (direction, width, x, y) {
    switch (direction) {
        case 'square':
            robot.dragMouse(x);
    }
});
