const R = require('ramda')
const Rx = require('rxjs/Rx')

const {
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} = require('./constants')

const { addConnectedNodes }        = require('./graph')
const renderNodes                  = require('./render/render-graph')
const decorateGraphWithCoordinates = require('./graph-to-2d/')
const decorateGraphForAnimation    = require('./graph-to-animation/decorate')
const getTweenGraph                = require('./graph-to-animation/get-tween-graph')
const { timeNow, secondsFromNow }  = require('./utils/time')

// const body = document.querySelector('body')
// body.style.backgroundColor = 'purple'

const canvas  = document.createElement('canvas')
canvas.width  = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

document.querySelector('body').appendChild(canvas)

const ctx = canvas.getContext('2d')

// standard top-down tree
// const options = {
//     originX: 500,
//     originY: 30,
//     offsetX: 0,
//     offsetY: 100,
//     marginX: 100
// }

// left-to-right tree
const options = {
    originX: 50,
    originY: 300,
    offsetX: 100,
    offsetY: 0,
    marginX: 0,
    marginY: 100
}


const decorate = R.curry(decorateGraphWithCoordinates)(options)
const render   = R.curry(renderNodes)(ctx)

const graph1 = addConnectedNodes([], 'a')
const graph2 = addConnectedNodes(graph1, 'b')
const graph3 = addConnectedNodes(graph2, 'c', 'd', 'e')
const graph4 = addConnectedNodes(graph3, 'f', 'g')
const graph5 = addConnectedNodes(graph4, 'h')
const graph6 = addConnectedNodes(graph5, 'i', 'j')

const getAnimationOptions = () => ({
    delayBetweenRows: 1000,
    timeBegin: timeNow(),
    timeEnd: secondsFromNow(5),
    nodeDrawTime: 500
})

let optionsForAnimation = getAnimationOptions()

const decorateAnimate = R.curry(decorateGraphForAnimation)(optionsForAnimation)

const decorateAndRender = (graph) => R.pipe(
    decorate,
    decorateAnimate,
    getTweenGraph,
    render
)(graph)

const drawFrame = () => {
    ctx.clearRect(0, 0, 1000, 1000)
    decorateAndRender(graph6)
}

const animate = () => {
    if (timeNow() > optionsForAnimation.timeEnd + 500) {
        const { timeBegin, timeEnd } = getAnimationOptions()
        optionsForAnimation.timeBegin = timeBegin
        optionsForAnimation.timeEnd = timeEnd
    }

    drawFrame()
    requestAnimationFrame(animate)
}

animate()
