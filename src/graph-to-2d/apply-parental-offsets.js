const {
    reduce,
    getConnectedNodes
} = require('../graph')

const applyParentalOffsets = (
    {
        originX = 0,
        originY = 0,
        offsetX = 0,
        offsetY = 0,
    },
    nodeArray
) => {
    return reduce(nodeArray, (graph, node) => {
        const axis = offsetY > offsetX ? 'x' : 'y'
        const connected = getConnectedNodes(graph, node.id)
        const parent    = connected.filter(connectedNode => connectedNode.id < node.id)[0]

        if (!parent) { return graph.concat(node) }

        const axisOrigin = axis === 'x' ? originX : originY
        const parentOffset = parent[axis] - axisOrigin

        const thisNode = Object.assign(
            {},
            node,
            {
                [axis]: node[axis] + parentOffset
            }
        )

        return graph.concat(thisNode)
    }, [])
}

module.exports = applyParentalOffsets
