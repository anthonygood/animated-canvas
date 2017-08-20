const {
    CIRCLE_RADIUS,
    STROKE_SECONDARY_COLOUR
} = require('../constants')

const renderNode = (context, graph, node) => {
    const fill = context.fillStyle
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

    context.font = '24px sans-serif'
    context.fillStyle = STROKE_SECONDARY_COLOUR
    context.fillText(node.value, node.x - 6, node.y + 6)
    context.fillStyle = fill
}

module.exports = renderNode
