const {
    STROKE_PRIMARY_COLOUR,
    FILL_PRIMARY_COLOUR,
    LINE_WIDTH
} = require('../constants')

const R = require('ramda')

const {
    getConnectedNodes,
    mapRows
} = require('../graph')

const renderNode = require('./node')
const renderEdge = require('./edge')

const renderEdgesFromNode = (context, graph, node) => {
    const idGreaterThanThis = R.filter(item => item.id > node.id)
    const nodesBeneathThis = getConnectedNodes(graph, node.id).filter(idGreaterThanThis)

    const renderEdgeToOtherNode = R.curry(renderEdge)(context, node)
    nodesBeneathThis.forEach(renderEdgeToOtherNode)
}

const renderNodesOnRow = (context, graph, row) => {
    const renderNodeOnContext = R.curry(renderNode)(context, graph)
    row.forEach(renderNodeOnContext)
}

const renderEdgesOnRow = (context, graph, row) => {
    const renderEdgesOnContext = R.curry(renderEdgesFromNode)(context, graph)
    row.forEach(renderEdgesOnContext)
}

const renderNodes = (context, graph) => {
    const renderRowOnContext = R.curry(renderNodesOnRow)(context, graph)
    const eachRow = R.curry(mapRows)(graph)

    eachRow(renderRowOnContext)
};

const renderEdges = (context, graph) => {
    context.strokeStyle = STROKE_PRIMARY_COLOUR || 'black'
    context.fillStyle   = FILL_PRIMARY_COLOUR   || 'black'
    context.lineWidth   = LINE_WIDTH            || 1

    const renderRowEdgesOnContext = R.curry(renderEdgesOnRow)(context, graph)
    const eachRow = R.curry(mapRows)(graph)

    eachRow(renderRowEdgesOnContext)
}

const renderGraph = (context, graph) => {
    renderEdges(context, graph)
    renderNodes(context, graph)
}

module.exports = renderGraph
