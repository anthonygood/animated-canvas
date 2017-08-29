const R        = require('ramda')
const { map }  = require('../graph')
const getTween = require('../get-tween')
const { timeNow } = require('../utils/time')

const getTweenNode = (
    time,
    decoratedNode
) => {

    // Don't include node before its timeBegin
    if (decoratedNode.x.timeBegin > time) {
        return null
    }

    return Object.assign(
        {},
        decoratedNode,
        {
            x: getTween(decoratedNode.x, time),
            y: getTween(decoratedNode.y, time),
            inPosition: time >= decoratedNode.x.timeEnd,
            timeSinceInPosition: time - decoratedNode.x.timeEnd
        }
    )
}

const getTweenGraph = (
    decoratedGraph,
    time = timeNow()
) => {
    const mapGraph = R.curry(map)(decoratedGraph)
    const getTween = R.curry(getTweenNode)(time)

    return mapGraph(getTween).filter(node => node !== null)
}

module.exports = getTweenGraph
