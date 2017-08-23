const R = require('ramda')

const {
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} = require('./constants')

const { addConnectedNodes } = require('./graph')
const renderNodes = require('./render/render-graph')
const decorateGraphWithCoordinates = require('./graph-to-2d/')
// const graph       = require('./fixtures/graph')
const decorateGraphForAnimation = require('./graph-to-animation/decorate')
const getTweenGraph = require('./graph-to-animation/get-tween-graph')
const { timeNow, secondsFromNow } = require('./utils/time')

const body = document.querySelector('body')
// body.style.backgroundColor = 'purple'

const canvas  = document.createElement('canvas')
canvas.width  = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

document.querySelector('body').appendChild(canvas)

const ctx = canvas.getContext('2d')

const options = {
    originX: 500,
    originY: 30,
    offsetX: 0,
    offsetY: 125,
    marginX: 100
}

const decorate = R.curry(decorateGraphWithCoordinates)(options)
const render   = R.curry(renderNodes)(ctx)

const graph1 = addConnectedNodes([], 'a')
const graph2 = addConnectedNodes(graph1, 'b')
const graph3 = addConnectedNodes(graph2, 'c', 'd', 'e')
const graph4 = addConnectedNodes(graph3, 'f', 'g')
const graph5 = addConnectedNodes(graph4, 'h')
const graph6 = addConnectedNodes(graph5, 'i', 'j')

const renderAGraph = (graphs, count = 0) => () => {
    ctx.clearRect(0, 0, 1000, 1000)
    if (count > graphs.length -1) { count = 0 }

    decorateAndRender(graphs[count++])
}

const animationOptions = {
    delayBetweenRows: 1000,
    timeBegin: timeNow(),
    timeEnd: secondsFromNow(5),
    nodeDrawTime: 500
}

const decorateAnimate = R.curry(decorateGraphForAnimation)(animationOptions)

const decorateAndRender = (graph) => R.pipe(
    decorate,
    decorateAnimate,
    getTweenGraph,
    render
)(graph)

setInterval(
    () => {
        ctx.clearRect(0, 0, 1000, 1000)
        decorateAndRender(graph6)
    },
    100
)
