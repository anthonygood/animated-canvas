const R = require('ramda')

const {
    yDepth,
    isOnRow,
    isUnique
} = require('./utils')

const reduce = (graph, fn, initialValue) => {
    const rowIndices = graph.map(yDepth).filter(isUnique)

    let initialIndex,
        accumulator

    if (initialValue) {
        accumulator = initialValue
        initialIndex = 0
    } else {
        accumulator = graph[0]
        initialIndex = 1
    }

    rowIndices.forEach((rowIndex) => {
        const isOnThisRow = R.curry(isOnRow)(rowIndex)
        const nodes = graph.filter(isOnThisRow)

        let i

        for (i = initialIndex; i < nodes.length; i++) {
            const node = nodes[i]
            accumulator = fn(accumulator, node, i, rowIndex)
        }

        // Revert starting index for subsequent rows
        initialIndex = 0
    })

    return accumulator
}

module.exports = reduce
