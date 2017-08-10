const timeNow = () => (new Date()).getTime();
const secondsFromNow = seconds => timeNow() + (seconds * 1000);

module.exports = {
    secondsFromNow,
    timeNow
}
