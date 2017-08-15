const R = require('ramda')

const {
    getConnectedNodes,
    mapRows
} = require('./graph')

/**
 * A function to decorate a graph's nodes with co-ordinates for rendering.
 * @param {object} options:
    * @param {number} originX
    * @param {number} originY
    * @param {number} offsetX - the X value to offset sequential nodes,
    *                      use to direct the graph left or right.
    * @param {number} offsetY - the Y value to offset sequential nodes,
    *                      use to direct the graph up or down.
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
// const decorateGraphWithCoordinates = (
//     {
//         originX = 0,
//         originY = 0,
//         offsetX = 0,
//         offsetY = 100,
//         marginX = 50,
//         marginY = 0
//     },
//     nodeArray
// ) => {

//     return nodeArray.map((node, index) => {
//         const x = originX + (offsetX * index)
//         const y = originY + (offsetY * index)

//         return Object.assign(
//             {},
//             node,
//             { x, y }
//         )
//     })
// }

const decorateGraphWithCoordinates = (
    {
        originX = 0,
        originY = 0,
        offsetX = 0,
        offsetY = 100,
        marginX = 50,
        marginY = 0
    },
    nodeArray,
    index,
    visitedNodes
) => {
    const decoratedNodes = mapRows(nodeArray, (row, rowIndex) => {
        return row.map((node, nodeIndex) => {

            const margins = row.length - 1
            const maxLeft = (originX - (margins * marginX) / 2)

            const thisOffsetX = offsetX * rowIndex
            const thisOffsetY = offsetY * rowIndex

            const x = thisOffsetX + (originX + maxLeft + (marginX * nodeIndex))
            const y = (originY + (thisOffsetY * rowIndex))


            return Object.assign(
                {},
                node,
                { x, y }
            )
        })
    })

    return R.flatten(decoratedNodes)
}

module.exports = { decorateGraphWithCoordinates }
