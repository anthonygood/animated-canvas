const {
    reduce,
    getConnectedNodes
} = require('../graph')

const applyParentalOffsets = (
    {
        originX = 0
    },
    nodeArray
) => {
    return reduce(nodeArray, (graph, node) => {
        const connected = getConnectedNodes(graph, node.id)
        const parent    = connected.filter(connectedNode => connectedNode.id < node.id)[0]

        if (!parent) { return graph.concat(node) }

        const parentOffset = parent.x - originX
        const thisNode = Object.assign(
            {},
            node,
            { x: node.x + parentOffset }
        )

        return graph.concat(thisNode)
    }, [])
}

module.exports = applyParentalOffsets
