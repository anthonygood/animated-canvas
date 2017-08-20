const R = require('ramda')

const {
    yDepth,
    isUnique,
    isOnRow
} = require('./utils')

const forEach = (graph, fn) => {
    const rowIndices = graph.map(yDepth).filter(isUnique)

    rowIndices.forEach((rowIndex) => {
        const isOnThisRow = R.curry(isOnRow)(rowIndex)
        const nodes = graph.filter(isOnThisRow)

        let i = 0

        for (i; i < nodes.length; i++) {
            const node = nodes[i]
            fn(node, i, nodes, rowIndex)
        }
    })
}

module.exports = forEach
