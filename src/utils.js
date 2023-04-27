const getTimeStamp = date => (new Date(date)).getTime();
const compareTime = (timestamp1, timestamp2) => getTimeStamp(timestamp1) < getTimeStamp(timestamp2);

const getTimePeriod = dateTime => {
  const [date, time] = dateTime.split(' ');
  const hour = time.split(':')?.[0];

  // datekey created to support clicks from another dates as well.
  const dateKey = date.split('/').join('');
  return dateKey + hour + 1
}


module.exports = {
  compareTime,
  getTimePeriod
}