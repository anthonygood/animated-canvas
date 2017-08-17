const R = require('ramda')

const {
    newGraph,
    addConnectedNodes
} = require('../graph')
const decorateGraphWithCoordinates = require('../decorate-graph-with-coordinates')

graph = addConnectedNodes([], 'a')
graph = addConnectedNodes(graph, 'b', 'c')
graph = addConnectedNodes(graph, 'd', 'e', 'f')
graph = addConnectedNodes(graph, 'g')
graph = addConnectedNodes(graph, 'h', 'i', 'j')
graph = addConnectedNodes(graph, 'k', 'l', 'm', 'n')
graph = decorateGraphWithCoordinates(
    {
        originX: 500,
        originY: 25,
        offsetX: 0,
        offsetY: 100,
        marginX: 50
    },
    graph
)

module.exports = graph
