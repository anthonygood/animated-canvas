const decorateNode = (
    {
        originX = 0,
        originY = 0,
        offsetX = 0,
        offsetY = 100,
        marginX = 50,
        marginY = 0
    },
    node,
    nodeIndex,
    row,
    rowIndex
) => {
    const margins = row.length - 1
    const maxLeft = - (margins * marginX) / 2
    const maxTop  = - (margins * marginY) / 2
    const thisOffsetX = offsetX * rowIndex
    const thisOffsetY = offsetY * rowIndex

    const x = originX + thisOffsetX + (maxLeft + (marginX * nodeIndex))
    const y = originY + thisOffsetY + (maxTop + (marginY * nodeIndex))

    return Object.assign(
        {},
        node,
        { x, y }
    )
}

module.exports = decorateNode
