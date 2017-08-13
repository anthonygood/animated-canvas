const R = require('ramda')

// Each function returns an array of nodes with edges:
//    [{
//        value: { a: "foo" },
//        id: 0,
//        connectedTo: [2]
//    },{
//        value: { b: "bar" },
//        id: 1,
//        connectedTo: [1]
//    }]
// Node values can be anything.

const newGraph  = graph => graph || []
const newNodeId = graph => graph.length
const isNodeConnectedTo = (otherNodeId, node) =>
    ~node.connectedTo.indexOf(otherNodeId)


const getConnectedNodes = (nodeId, graph) => {
    const isConnected = R.curry(isNodeConnectedTo)(nodeId)

    return graph.filter(isConnected)
}

const addConnectedNodes = (graph, ...nodeValues) => graph.concat(
    nodeValues.map((value, index) => ({
        id: newNodeId(graph) + index,
        connectedTo: [graph.length - 1],
        value
    }))
)

module.exports = {
    newGraph,
    getConnectedNodes,
    addConnectedNodes
}
