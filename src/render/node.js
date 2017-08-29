const {
    CIRCLE_RADIUS,
    BACKGROUND_PRIMARY_COLOUR,
    NODE_DRAW_SPEED
} = require('../constants')

const getTweenNodeRadius = node => Math.min(
    (node.timeSinceInPosition / NODE_DRAW_SPEED) * CIRCLE_RADIUS,
    CIRCLE_RADIUS
)

const renderNode = (context, graph, node) => {
    if (!node.inPosition) { return }

    const fill = context.fillStyle
    context.beginPath()
    context.arc(
        node.x,
        node.y,
        getTweenNodeRadius(node),
        0,
        2 * Math.PI // 360 degrees
    )
    context.stroke()
    context.fill()
    context.closePath()

    context.textAlign = 'center'
    context.font = '24px sans-serif'
    context.fillStyle = BACKGROUND_PRIMARY_COLOUR
    context.fillText(node.value, node.x, node.y + 7)
    context.fillStyle = fill
}

module.exports = renderNode
