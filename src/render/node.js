const {
    CIRCLE_RADIUS,
    STROKE_PRIMARY_COLOUR
} = require('../constants')

const renderNode = (context, graph, node) => {
    context.beginPath()
    context.arc(
        node.x,
        node.y,
        CIRCLE_RADIUS || 50,
        0,
        2 * Math.PI // 360 degrees
    )
    context.stroke()
    context.fill()
    context.closePath()
}

module.exports = renderNode
