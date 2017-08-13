import test from 'ava';

import translateToGraph from './translate-to-graph';

test('translates simple object of 2 values to 2 nodes', t => {
    const inputData = { a: 1, b: 2 };

    const expected =  [{
        value: 1,
        x: 0,
        y: 0,
    },{
        value: 2,
        x: 50,
        y: 25, 
    }];

    const output = translateToGraph(
        0,  // originX
        0,  // originY
        50, // distanceX,
        25, // distanceY
        inputData
    );

    t.deepEqual(output, expected);
});

test('can plot nodes to origin', t => {
    const inputData = { a: 7, b: 12 };

    const expected =  [{
        value: 7,
        x: 100,
        y: 200,
    },{
        value: 12,
        x: 105,
        y: 220, 
    }];

    const output = translateToGraph(
        100,  // originX
        200,  // originY
        5,    // distanceX,
        20,   // distanceY
        inputData
    );

    console.log(
        expected,
        output
    );

    t.deepEqual(
        output,
        expected
    );
});