const {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    BACKGROUND_PRIMARY_COLOUR
} = require('./constants')

const Rx = require('rxjs/Rx')
const R = require('ramda')

const stateWithAnimation = require('./state-with-animation')
const drawLine           = require('./draw-line')
const renderNodes        = require('./render-graph')
const graph              = require('./fixtures/graph')

const body = document.querySelector('body')
body.style.backgroundColor = 'purple'

const canvas = document.createElement('canvas')
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

document.querySelector('body').appendChild(canvas)

ctx = canvas.getContext('2d')
ctx.fillStyle = BACKGROUND_PRIMARY_COLOUR

const drawLineToDataPoint = R.curry(drawLine)(
    ctx,
    400, // x-origin
    400, // y-origin
)

const clearCanvas = ctx => {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

const animate = () => {
    clearCanvas(ctx)

    const keys = Object.keys(stateWithAnimation)
    const data = keys.map(key => stateWithAnimation[key])

    data.forEach(drawLineToDataPoint)

    requestAnimationFrame(animate)
}

const animateGraph = graph => {

}

// requestAnimationFrame(animate)

renderNodes(ctx, graph)
