const graph =  [{
    value: 'a', id: 0, connectedTo: [1,2], yDepth: 0,
    x: 250,
    y: 100,
},{
    value: 'b', id: 1, connectedTo: [0,2], yDepth: 1,
    x: 200,
    y: 200
},{
    value: 'c', id: 2, connectedTo: [0,1,3,4], yDepth: 1,
    x: 300,
    y: 200
},{
    value: 'd', id: 3, connectedTo: [2], yDepth: 2,
    x: 250,
    y: 400
},{
    value: 'e', id: 4, connectedTo: [2], yDepth: 2,
    x: 350,
    y: 400
}];

module.exports = graph
