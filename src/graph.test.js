import test from 'ava';

import {
    getConnectedNodes,
    addConnectedNodes,
    mapRows
} from './graph';

test.beforeEach(t => {
    // A triangle!
    //   A
    //  / \
    // B - C
    t.context.graph = [
        {
            value: "a",
            id: 0,
            connectedTo: [1,2],
            yDepth: 0
        },
        {
            value: "b",
            id: 1,
            connectedTo: [0,2],
            yDepth: 1
        },
        {
            value: "c",
            id: 2,
            connectedTo: [0,1],
            yDepth: 1
        }
    ]
})

test('getConnectedNodes returns the edges for a given node', t => {
    t.deepEqual(
        getConnectedNodes(t.context.graph, 0),
        [t.context.graph[1], t.context.graph[2]]
    )

    t.deepEqual(
        getConnectedNodes(t.context.graph, 1),
        [t.context.graph[0], t.context.graph[2]]
    )

    t.deepEqual(
        getConnectedNodes(t.context.graph, 2),
        [t.context.graph[0], t.context.graph[1]]
    )
})

test('addConnectedNodes adds a node connected to previously last node', t => {
    // A ... thing!
    //   A
    //  / \
    // B - C
    //     |
    //     D
    const expectedLastNode = {
        value: "d",
        id: 3,
        connectedTo: [2],
        yDepth: 2
    }

    const newGraph = addConnectedNodes(t.context.graph, "d")

    t.is(
        newGraph.length,
        4
    )

    t.deepEqual(
        newGraph[3],
        expectedLastNode
    )
})

test('addConnectedNodes adds connects penultimate node to the new node', t => {
    // A ... thing!
    //   A
    //  / \
    // B - C
    //     |
    //     D
    const expectedPenultimateNode = {
        value: "c",
        id: 2,
        connectedTo: [0,1,3],
        yDepth: 1
    }

    const newGraph = addConnectedNodes(t.context.graph, "d")

    t.deepEqual(
        newGraph[2],
        expectedPenultimateNode
    )
})

test('addConnectedNodes adds multiple nodes connected to last node', t => {
    // A ... thing!
    //   A
    //  / \
    // B - C
    //    /|\
    //   D E F
    const expectedGraph = [{
        value: "a",
        id: 0,
        connectedTo: [1,2],
        yDepth: 0
    },{
        value: "b",
        id: 1,
        connectedTo: [0,2],
        yDepth: 1
    },{
        value: "c",
        id: 2,
        connectedTo: [0,1,3,4,5],
        yDepth: 1
    },{
        value: "d",
        id: 3,
        connectedTo: [2],
        yDepth: 2
    },{
        value: "e",
        id: 4,
        connectedTo: [2],
        yDepth: 2
    },{
        value: "f",
        id: 5,
        connectedTo: [2],
        yDepth: 2
    }]

    const newGraph = addConnectedNodes(t.context.graph, "d", "e", "f")

    t.deepEqual(
        newGraph,
        expectedGraph
    )
})

test('mapRows yields every row of nodes of the graph', t => {
    const expected = [1, 2]

    const actual = mapRows(
        t.context.graph,
        row => row.length
    )

    t.deepEqual(
        actual,
        expected
    )
})
