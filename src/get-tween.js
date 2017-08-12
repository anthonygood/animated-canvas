// A function which returns the current value in time,
// with reference to the final value's resolveBy
// and the initial animation value.
const getTween = (
    valueWithMetaData,
    timeNow = (new Date()).getTime()
) => {
  // If the clock has run down, the animation value should be set to the actual value
  if (valueWithMetaData.timeEnd <= timeNow) {
    return valueWithMetaData.value;
  }

  // equation for a line is:
  // y = mx + b (where b is the y intersect)
  //            (ie. where b is the initial animationValue)
  const [y1, y2] = [valueWithMetaData.initValue,  valueWithMetaData.value ];
  const [x1, x2] = [valueWithMetaData.timeBegin, valueWithMetaData.timeEnd];
  const slope = (y2 - y1) / (x2 - x1);
  const yIntersect = valueWithMetaData.initValue;

  // ponder this line
  const x = ((new Date()).getTime() -  valueWithMetaData.timeBegin);

  const y = (slope * x) + yIntersect;

  return y;
};

module.exports = getTween;
