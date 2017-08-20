const { addConnectedNodes } = require('../graph')
const decorateGraphWithCoordinates = require('../graph-to-2d')

let graph
graph = addConnectedNodes([], 'a')
graph = addConnectedNodes(graph, 'b')
graph = addConnectedNodes(graph, 'c', 'd')
graph = addConnectedNodes(graph, 'e', 'f')
graph = addConnectedNodes(graph, 'g', 'h')
graph = addConnectedNodes(graph, 'i', 'j')
graph = decorateGraphWithCoordinates(
    {
        originX: 500,
        originY: 30,
        offsetX: 0,
        offsetY: 100,
        marginX: 100
    },
    graph
)

module.exports = graph
