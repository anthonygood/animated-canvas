const renderEdge = (context, node, otherNode) => {
    context.beginPath()
    context.moveTo(node.x, node.y)
    context.lineTo(otherNode.x, otherNode.y)

    context.stroke()
    context.closePath()
}

module.exports = renderEdge
