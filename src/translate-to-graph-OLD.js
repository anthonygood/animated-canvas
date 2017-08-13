// A function to convert a plain object into graphical nodes.
// Takes origin co-ordinates, spacer value and a data object.
// eg.
//  translateToGraph(0, 0, 0, 100, {
//      a: 1,
//      b: 2
//  });
// returns:
//  [{
//    value: 1,
//    x: 0,
//    y: 0,
//  },{
//    value: 2,
//    x: 0,
//    y: 100, 
//  }]
const translateToGraph = (
    originX,
    originY,
    distanceBetweenNodesX,
    distanceBetweenNodesY,
    dataObject
) => {
    const keys = Object.keys(dataObject);
    const nodeArray = [];

    keys.reduce((prevNode, keyNext) => {
        if (prevNode) {
            prevX = prevNode.x;
            prevY = prevNode.y;
        } else {
            prevX = originX - distanceBetweenNodesX;
            prevY = originY - distanceBetweenNodesY;
        }

        const newNode = {
            value: dataObject[keyNext],
            x: prevX + distanceBetweenNodesX,
            y: prevY + distanceBetweenNodesY,
        };

        nodeArray.push(newNode);

        return newNode;
    }, null);

    return nodeArray;
};

module.exports = translateToGraph;
