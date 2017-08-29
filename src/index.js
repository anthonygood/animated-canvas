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

const options = {
    originX: 500,
    originY: 20,
    offsetX: 0,
    offsetY: 3,
    marginX: 5
}

const decorate = R.curry(decorateGraphWithCoordinates)(options)
const render   = R.curry(renderNodes)(ctx)

const rand = max => Math.floor(
    Math.random() * max
) + 1

const generateRandomGraph = () => {
    const depth = 150

    let graph = [],
        i     = 0

    for (i; i < depth; i++) {
        let breadth

        if (i) {
            breadth = rand(50)
        } else {
            breadth = 1
        }

        const tokens = (new Array(breadth)).join('a')

        graph = addConnectedNodes(graph, ...tokens)
    }

    return graph
}

let graph = { nodes: generateRandomGraph() }

const getAnimationOptions = () => ({
    delayBetweenRows: 100,
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
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    decorateAndRender(graph.nodes)
}

const DELAY_BEFORE_RESTART = 750
const animate = () => {
    if (timeNow() > optionsForAnimation.timeEnd + DELAY_BEFORE_RESTART) {
        const { timeBegin, timeEnd } = getAnimationOptions()
        optionsForAnimation.timeBegin = timeBegin
        optionsForAnimation.timeEnd = timeEnd
        graph.nodes = generateRandomGraph()
    }

    drawFrame()
    requestAnimationFrame(animate)
}

animate()
