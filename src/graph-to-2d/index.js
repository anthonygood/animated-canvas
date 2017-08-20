const decorateGraphWithCoordinates = require('./decorate-graph-with-coordinates')
const applyParentalOffsets         = require('./apply-parental-offsets')

const decorateWithOffsets = (options, nodeArray) => {
    const decorated = decorateGraphWithCoordinates(options, nodeArray)
    const offset    = applyParentalOffsets(options, decorated)

    return offset
}

module.exports = decorateWithOffsets
