const getTween = require('./get-tween');
const {
    STROKE_PRIMARY_COLOUR,
    STROKE_SUCCESS_COLOUR
} = require('./constants');

const drawLine = (
    ctx,
    x,
    y,
    data
) => {
    ctx.strokeStyle = STROKE_PRIMARY_COLOUR;
    ctx.beginPath();
    ctx.moveTo(x, y);

    const tween = getTween(data);

    if (tween === data.value) {
        console.log(`${tween} : ${data.value}`);
        ctx.strokeStyle = STROKE_SUCCESS_COLOUR;
    }

    ctx.lineTo(
        data.initValue,
        tween
    ); 
    
    ctx.stroke();
    ctx.closePath();
};

module.exports = drawLine;
