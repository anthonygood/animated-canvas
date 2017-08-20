const yDepth    = node                 => node.yDepth
const isOnRow   = (yDepth, node)       => node.yDepth === yDepth
const isUnique  = (node, index, array) => array.indexOf(node) === index
const newGraph  = graph                => graph || []
const newNodeId = graph                => graph.length

const isNodeConnectedTo = (otherNodeId, node) =>
    ~node.connectedTo.indexOf(otherNodeId)

module.exports = {
    isOnRow,
    isUnique,
    newGraph,
    newNodeId,
    isNodeConnectedTo,
    yDepth
}
