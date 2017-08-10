const {
    secondsFromNow,
    timeNow,
} = require('./utils/time');

// All animated state attributes need:
// 1. A value
// 2. An initValue (same as value == no animation)
// 3. A timeBegin and timeEnd time (in milliseconds)
// (Optional TODO) 4. An animation curve
const stateWithAnimation = {
  foo: {
    value: 10,
    initValue: 0, // the value to animate from
    timeEnd: secondsFromNow(10),
    timeBegin: timeNow()
  },
  boo: {
    value: 25,
    initValue: 85,
    timeEnd: secondsFromNow(7),
    timeBegin: timeNow()
  },
  goo: {
    value: 100,
    initValue: 25,
    timeEnd: secondsFromNow(15),
    timeBegin: timeNow()
  },
  zoo: {
    value: 1000,
    initValue: -1000,
    timeEnd: secondsFromNow(18),
    timeBegin: timeNow()
  }
};

module.exports = stateWithAnimation;
