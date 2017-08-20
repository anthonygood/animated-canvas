const R = require('ramda')

const {
    getConnectedNodes,
    map,
    reduce
} = require('./graph')

const decorateNode = (
    {
        originX = 0,
        originY = 0,
        offsetX = 0,
        offsetY = 100,
        marginX = 50,
    },
    node,
    nodeIndex,
    row,
    rowIndex
) => {
    const margins = row.length - 1
    const maxLeft = - (margins * marginX) / 2

    const thisOffsetX = offsetX * rowIndex
    const thisOffsetY = offsetY * rowIndex

    const x = originX + thisOffsetX + (maxLeft + (marginX * nodeIndex))
    const y = (originY + thisOffsetY)

    return Object.assign(
        {},
        node,
        { x, y }
    )
}

/**
 * A function to decorate a graph's nodes with co-ordinates for rendering.
 * @param {object} options:
    * @param {number} originX
    * @param {number} originY
    * @param {number} offsetX - the X value to offset sequential nodes,
    *                           use to direct the graph left or right.
    * @param {number} offsetY - the Y value to offset sequential nodes,
    *                           use to direct the graph up or down.
    * @param {number} marginX - the X margin between nodes on the graph
    * @param {number} marginY - the Y margin between nodes on the graph
 * @param {array} nodeArray - the actual graph to decorate
 * @example
 * decorateGraphWithCoordinates(0, 0, 50, 100, [
 *     { value: 'a', id: 0, connectedTo: [1] },
 *     { value: 'b', id: 1, connectedTo: [0] }
 * ]);
 * returns:
 * [{
 *     value: 1,
 *     x: 0,
 *     y: 0,
 *       ...
 * },{
 *     value: 2,
 *     x: 50,
 *     y: 100,
 *       ...
 * }]
 */
const decorateGraphWithCoordinates = (
    {
        originX = 0,
        originY = 0,
        offsetX = 0,
        offsetY = 100,
        marginX = 50
    },
    nodeArray
) => {
    const decorate = R.curry(decorateNode)(
        { originX, originY, offsetX, offsetY, marginX }
    )

    return map(nodeArray, decorate)
}

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

const decorateWithOffsets = (options, nodeArray) => {
    const decorated = decorateGraphWithCoordinates(options, nodeArray)
    const offset    = applyParentalOffsets(options, decorated)

    return offset
}

module.exports = decorateWithOffsets
