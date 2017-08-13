import test from 'ava';

import {
    getConnectedNodes,
    addConnectedNodes
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
            connectedTo: [1,2]
        },
        {
            value: "b",
            id: 1,
            connectedTo: [0,2] 
        },
        {
            value: "c",
            id: 2,
            connectedTo: [0,1]
        }
    ]
})

test('getConnectedNodes returns the edges for a given node', t => {
    const expectedNodes = [
        t.context.graph[1],
        t.context.graph[2]
    ]

    const actualNodes = getConnectedNodes(0, t.context.graph)

    t.deepEqual(
        getConnectedNodes(0, t.context.graph),
        [t.context.graph[1], t.context.graph[2]]
    )

    t.deepEqual(
        getConnectedNodes(1, t.context.graph),
        [t.context.graph[0], t.context.graph[2]]
    )

    t.deepEqual(
        getConnectedNodes(2, t.context.graph),
        [t.context.graph[0], t.context.graph[1]]
    )
})

test('addConnectedNodes adds a node connected to last node', t => {
    // A ... thing!
    //   A
    //  / \
    // B - C
    //     |
    //     D
    const expectedGraph = t.context.graph.concat({
        value: "d",
        id: 3,
        connectedTo: [2]
    })

    const newGraph = addConnectedNodes(t.context.graph, "d")

    t.deepEqual(
        newGraph,
        expectedGraph
    )
})

test('addConnectedNodes adds multiple nodes connected to last node', t => {
    // A ... thing!
    //   A
    //  / \
    // B - C
    //    /|\
    //   D E F
    const expectedGraph = t.context.graph.concat([{
        value: "d",
        id: 3,
        connectedTo: [2]
    },
    {
        value: "e",
        id: 4,
        connectedTo: [2]
    },
    {
        value: "f",
        id: 5,
        connectedTo: [2]
    }])

    const newGraph = addConnectedNodes(t.context.graph, "d", "e", "f")

    t.deepEqual(
        newGraph,
        expectedGraph
    )
})
