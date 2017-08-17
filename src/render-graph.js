const {
    CIRCLE_RADIUS,
    STROKE_PRIMARY_COLOUR
} = require('./constants')

const R = require('ramda')

const {
    getConnectedNodes,
    mapRows
} = require('./graph')

const drawEdge = (context, node, otherNode) => {
    context.beginPath()
    context.moveTo(node.x, node.y)
    context.lineTo(otherNode.x, otherNode.y)

    context.stroke()
    context.closePath()
}

const renderEdgesFromNode = (context, graph, node) => {
    const idGreaterThanThis = R.filter(item => item.id > node.id)
    const nodesBeneathThis = getConnectedNodes(graph, node.id).filter(idGreaterThanThis)

    const drawEdgeToOtherNode = R.curry(drawEdge)(context, node)
    nodesBeneathThis.forEach(drawEdgeToOtherNode)
}

const renderNode = (context, graph, node) => {
    context.beginPath()
    context.arc(
        node.x,
        node.y,
        CIRCLE_RADIUS || 50,
        0,
        2 * Math.PI // 360 degrees
    )
    context.stroke()
    context.closePath()

    renderEdgesFromNode(context, graph, node)
}

const renderRow = (context, graph, row) => {
    const renderNodeOnContext = R.curry(renderNode)(context, graph)

    row.forEach(renderNodeOnContext)
}

const renderNodes = (context, graph) => {
    context.strokeStyle = STROKE_PRIMARY_COLOUR || 'white'

    const renderRowOnContext = R.curry(renderRow)(context, graph)
    const eachRow = R.curry(mapRows)(graph)

    eachRow(renderRowOnContext)
};

module.exports = renderNodes