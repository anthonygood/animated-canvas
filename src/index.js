const R = require('ramda')

const {
    CANVAS_HEIGHT,
    CANVAS_WIDTH
} = require('./constants')

const { addConnectedNodes } = require('./graph')
const renderNodes = require('./render/render-graph')
const decorateGraphWithCoordinates = require('./graph-to-2d/')
// const graph       = require('./fixtures/graph')

const body = document.querySelector('body')
// body.style.backgroundColor = 'purple'

const canvas  = document.createElement('canvas')
canvas.width  = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

document.querySelector('body').appendChild(canvas)

const ctx = canvas.getContext('2d')

// renderNodes(ctx, graph)

const options = {
    originX: 500,
    originY: 30,
    offsetX: 0,
    offsetY: 100,
    marginX: 100
}

const decorate = R.curry(decorateGraphWithCoordinates)(options)
const render   = R.curry(renderNodes)(ctx)

const decorateAndRender = (graph) => R.pipe(
    decorate,
    render
)(graph)

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

setInterval(
    renderAGraph([
        graph1,
        graph2,
        graph3,
        graph4,
        graph5,
        graph6
    ]),
    1000
)
