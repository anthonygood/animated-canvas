const { addConnectedNodes } = require('../graph')
const decorateGraphWithCoordinates = require('../decorate-graph-with-coordinates')

let graph
graph = addConnectedNodes([], 'a')
graph = addConnectedNodes(graph, 'b')
graph = addConnectedNodes(graph, 'c', 'd')
graph = addConnectedNodes(graph, 'e', 'f')
graph = addConnectedNodes(graph, 'g', 'h')
graph = addConnectedNodes(graph, 'i', 'j')
graph = addConnectedNodes(graph, 'k', 'l')
graph = decorateGraphWithCoordinates(
    {
        originX: 300,
        originY: 100,
        offsetX: 0,
        offsetY: 100,
        marginX: 50
    },
    graph
)

module.exports = graph
