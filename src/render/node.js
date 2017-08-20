const {
    CIRCLE_RADIUS,
    BACKGROUND_PRIMARY_COLOUR
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

    context.textAlign = 'center'
    context.font = '24px sans-serif'
    context.fillStyle = BACKGROUND_PRIMARY_COLOUR
    context.fillText(node.value, node.x, node.y + 7)
    context.fillStyle = fill
}

module.exports = renderNode
