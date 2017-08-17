const R = require('ramda')

// Each function returns an array of nodes with edges:
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

const newGraph  = graph => graph || []
const newNodeId = graph => graph.length
const isNodeConnectedTo = (otherNodeId, node) =>
    ~node.connectedTo.indexOf(otherNodeId)


const getConnectedNodes = (graph, nodeId) => {
    const isConnected = R.curry(isNodeConnectedTo)(nodeId)

    return graph.filter(isConnected)
}

const addConnectedNodes = (graph, ...nodeValues) => graph.concat(
    nodeValues.map((value, index) => ({
        id: newNodeId(graph) + index,
        connectedTo: [ graph.length ? graph.length - 1 : null ],
        yDepth: graph.length ? graph[graph.length-1].yDepth + 1 : 0,
        value
    }))
)

const yDepth   = node => node.yDepth
const isOnRow  = (yDepth, node) => node.yDepth === yDepth
const isUnique = (node, index, array) => array.indexOf(node) === index

const mapRows = (graph, fn) => {
    const rows = graph.map(yDepth).filter(isUnique)

    return rows.map((row, index) => {
        const isOnThisRow = R.curry(isOnRow)(row)
        const nodes = graph.filter(isOnThisRow)

        return fn(nodes, index, row)
    })
}

module.exports = {
    newGraph,
    getConnectedNodes,
    addConnectedNodes,
    mapRows
}
