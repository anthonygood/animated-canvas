const R = require('ramda')

// Each function returns an array of nodes with edges (connectedTo):
//    [{
//        value: { a: "foo" },
//        id: 0,
//        connectedTo: [2],
//        yDepth: 0
//    },{
//        value: { b: "bar" },
//        id: 1,
//        connectedTo: [1],
//        yDepth: 1
//    }]
// Node values can be anything.

const {
    isOnRow,
    isUnique,
    newGraph,
    newNodeId,
    isNodeConnectedTo,
    yDepth
} = require('./utils')

const forEach = require('./forEach')
const reduce  = require('./reduce')

const getConnectedNodes = (graph, nodeId) => {
    const isConnected = R.curry(isNodeConnectedTo)(nodeId)
    return graph.filter(isConnected)
}

const nodeForValueAndIndex = (graph, value, index) => ({
    value,
    id:          newNodeId(graph) + index,
    connectedTo: graph.length ? [graph.length - 1] : [],
    yDepth:      graph.length ? graph[graph.length-1].yDepth + 1 : 0,
})

const connectNodeTo = (node, ...otherNodes) => {
    if(!node) { return [] }

    const otherNodeIdsToConnect = otherNodes.map(node => node.id)
    const newConnectedNodeIds   = node.connectedTo.concat(otherNodeIdsToConnect)

    return Object.assign(
        {},
        node,
        {
            connectedTo: newConnectedNodeIds
        }
    )
}

const sample = array => array[
    Math.floor(
        Math.random() * array.length
    )
]

const addConnectedNodes = (graph, ...nodeValues) => {
    const makeNewConnectedNode = R.curry(nodeForValueAndIndex)(graph)
    const newNodes = nodeValues.map(makeNewConnectedNode)

    const oldLastNode = sample(graph)
    const newLastNode = connectNodeTo(oldLastNode, ...newNodes)
    const oldNodeIndex = oldLastNode && oldLastNode.id || 0

    const newGraph = graph
        .slice(0, oldNodeIndex)
        .concat(newLastNode)
        .concat(
            graph.slice(oldNodeIndex+1, graph.length)
        )

    return newGraph.concat(newNodes)
}

const mapRows = (graph, fn) => {
    const rowIndices = graph.map(yDepth).filter(isUnique)

    return rowIndices.map((row, index) => {
        const isOnThisRow = R.curry(isOnRow)(row)
        const nodes = graph.filter(isOnThisRow)

        return fn(nodes, index, row)
    })
}

const map = (graph, fn) => {
    const mapped = mapRows(graph, (row, rowIndex) => {
        return row.map((node, nodeIndexInRow) => {
            return fn(node, nodeIndexInRow, row, rowIndex)
        })
    })

    return R.flatten(mapped)
}

module.exports = {
    newGraph,
    getConnectedNodes,
    addConnectedNodes,
    mapRows,
    map,
    forEach,
    reduce
}
