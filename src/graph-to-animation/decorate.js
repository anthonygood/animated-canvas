const R = require('ramda')
const { timeNow, secondsFromNow } = require('../utils/time')
const { reduce, getConnectedNodes } = require('../graph')

const decorateNode = (
    {
        delayBetweenRows = 1000,
        timeBegin        = timeNow(),
        timeEnd          = secondsFromNow(1),
        nodeDrawTime     = 500
    },
    node,
    rowIndex,
    graph
) => {
    const connected = getConnectedNodes(graph, node.id)
    const parent    = connected.filter(connectedNode => connectedNode.id < node.id)[0]
    const parentX   = parent && parent.x
    const parentY   = parent && parent.y

    const animationX = {
        value: node.x,
        initValue: parentX || node.x,
        timeBegin: timeNow(),
        timeEnd: secondsFromNow(1)
    }

    const animationY = {
        value: node.y,
        initValue: parentY || node.y,
        timeBegin: timeNow(),
        timeEnd: secondsFromNow(1)
    }

    return Object.assign(
        {},
        node,
        { x: animationX, y: animationY }
    )
}

const decorator = (
    options,
    newGraph,
    node,
    i,
    rowIndex
) => {
    const thisNode = decorateNode(options, node, rowIndex, newGraph)
    return newGraph.concat(thisNode)
}

const decorate = (
    options,
    graph
) => {
    const reducer = R.curry(decorator)(options)
    return reduce(graph, reducer, [])
}

module.exports = decorate
