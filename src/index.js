const stateWithAnimation = require('./state-with-animation');

const body = document.querySelector('body');
body.style.backgroundColor = 'purple';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

document.querySelector('body').appendChild(canvas);

ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
);
