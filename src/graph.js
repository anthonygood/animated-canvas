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

const newGraph = graph => graph || []
const createId = graph => graph.length
const isNodeConnectedTo = (otherNodeId, node) => ~node.connectedTo.indexOf(otherNodeId)

const addNode = (node, graph) => {
    const nodeId = createId(graph)

    const newGraph = graph.concat([node])

}

const getConnectedNodes = (nodeId, graph) => {
    const isConnected = R.curry(isNodeConnectedTo)(nodeId)

    return graph.filter(isConnected)
}

const addConnectedNode = (graph, nodeValue) => graph.concat({
    id: createId(graph),
    value: nodeValue,
    connectedTo: [graph.length - 1]
})

module.exports = {
    newGraph,
    getConnectedNodes,
    addConnectedNode,
}
