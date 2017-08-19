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

const newGraph  = graph => graph || []
const newNodeId = graph => graph.length
const isNodeConnectedTo = (otherNodeId, node) =>
    ~node.connectedTo.indexOf(otherNodeId)


const getConnectedNodes = (graph, nodeId) => {
    const isConnected = R.curry(isNodeConnectedTo)(nodeId)

    return graph.filter(isConnected)
}

const nodeForValueAndIndex = (graph, value, index) => ({
    value,
    id:          newNodeId(graph) + index,
    connectedTo: [ graph.length ? graph.length - 1 : null ],
    yDepth:      graph.length ? graph[graph.length-1].yDepth + 1 : 0,
})

const connectNodeTo = (node, ...otherNodes) => {
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

const addConnectedNodes = (graph, ...nodeValues) => {
    const makeNewConnectedNode = R.curry(nodeForValueAndIndex)(graph)
    const newNodes = nodeValues.map(makeNewConnectedNode)

    const oldLastNode = graph[graph.length-1]
    const newLastNode = connectNodeTo(oldLastNode, ...newNodes)
    const graphWithoutLastNode = graph.slice(0, graph.length - 1)

    return graphWithoutLastNode.concat(
        newLastNode,
        newNodes
    )
}

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
