import test from 'ava'

import { decorateGraphWithCoordinates } from './decorate-graph-with-coordinates'

test.beforeEach(t => {
    t.context.line = [
        { value: 'a', id: 0, connectedTo: [1], yDepth: 0 },
        { value: 'b', id: 1, connectedTo: [0], yDepth: 1 }
    ]

    t.context.triangle = [
        { value: 'a', id: 0, connectedTo: [1,2], yDepth: 0 },
        { value: 'b', id: 1, connectedTo: [0,2], yDepth: 1 },
        { value: 'c', id: 2, connectedTo: [0,1], yDepth: 1 }
    ]
})

test('decorates simple graph of 2 nodes', t => {
    const expected =  [{
        value: 'a', id: 0, connectedTo: [1], yDepth: 0,
        x: 0,
        y: 0,
    },{
        value: 'b', id: 1, connectedTo: [0], yDepth: 1,
        x: 50,
        y: 25,
    }]

    const output = decorateGraphWithCoordinates(
        {
            originX: 0,
            originY: 0,
            offsetX: 50,
            offsetY: 25,
        },
        t.context.line
    )

    t.deepEqual(output, expected)
});

test('can plot nodes to origin', t => {
    const expected =  [{
        value: 'a', id: 0, connectedTo: [1], yDepth: 0,
        x: 100,
        y: 200,
    },{
        value: 'b', id: 1, connectedTo: [0], yDepth: 1,
        x: 105,
        y: 220,
    }];

    const output = decorateGraphWithCoordinates(
        {
            originX: 100,
            originY: 200,
            offsetX: 5,
            offsetY: 20
        },
        t.context.line
    );

    t.deepEqual(
        output,
        expected
    );
});

test('decorates more complex graph of 3 connected nodes', t => {
    const originX = 0
    const originY = 0
    const offsetX = 0   // no right or left tendency
    const offsetY = 100 // downward graph
    const marginX = 50  // expect X-adjacent nodes to be 50 apart

    const expected =  [{
        value: 'a', id: 0, connectedTo: [1,2], yDepth: 0,
        x: 0,
        y: 0,
    },{
        value: 'b', id: 1, connectedTo: [0,2], yDepth: 1,
        x: -25, //
        y: 100
    },{
        value: 'c', id: 2, connectedTo: [0,1], yDepth: 1,
        x: 25, // (50 / 2) + 25
        y: 100
    }];

    const output = decorateGraphWithCoordinates(
        {
            originX,
            originY,
            offsetX,
            offsetY
        },
        t.context.triangle
    );

    t.deepEqual(output, expected);
});