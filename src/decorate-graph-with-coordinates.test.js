import test from 'ava'

import decorateGraphWithCoordinates from './decorate-graph-with-coordinates'

test.beforeEach(t => {
    t.context.line = [
        { value: 'a', id: 0, connectedTo: [1] },
        { value: 'b', id: 1, connectedTo: [0] }
    ]

    t.context.triangle = [
        { value: 'a', id: 0, connectedTo: [1,2] },
        { value: 'b', id: 1, connectedTo: [0,2] },
        { value: 'c', id: 2, connectedTo: [0,1] }
    ]
})

test('decorates simple graph of 2 nodes', t => {
    const expected =  [{
        value: 'a', id: 0, connectedTo: [1],
        x: 0,
        y: 0,
    },{
        value: 'b', id: 1, connectedTo: [0],
        x: 50,
        y: 25, 
    }];

    const output = decorateGraphWithCoordinates(
        {
            originX: 0,
            originY: 0,
            offsetX: 50,
            offsetY: 25,
        },
        t.context.line
    );

    t.deepEqual(output, expected);
});

test('can plot nodes to origin', t => {
    const expected =  [{
        value: 'a', id: 0, connectedTo: [1],
        x: 100,
        y: 200,
    },{
        value: 'b', id: 1, connectedTo: [0],
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
    const offsetX = 50
    const offsetY = 25

    const expected =  [{
        value: 'a', id: 0, connectedTo: [1,2],
        x: 0,
        y: 0,
    },{
        value: 'b', id: 1, connectedTo: [0,2],
        x: 50,
        y: 25, 
    },{
        value: 'c', id: 1, connectedTo: [0,1],
        x: 50,
        y: 25, 
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