const fs = require('fs');

const { 
  compareTime,
  getTimePeriod
} = require('./utils')

const { 
  resultFilePath,
  permissibleLimit
} = require('./contants');


const updateIpCounter = (ipCounter, incomingClick) => {
  const ip = incomingClick.ip;
  const { counter } = ipCounter.get(ip) || {};

  if(counter) { 
    ipCounter.set(ip, { ip, counter:counter + 1})  
  }
  else {
    ipCounter.set(ip, {ip, counter: 1 })
  }
}


const getSelectedClickForTimePeriod = (existingClick, incomingClick) => {
  if(!existingClick) {
    return incomingClick;
  }

  if(existingClick.amount === incomingClick.amount){
    const isExistingClickIsEarly = compareTime(existingClick.timestamp, incomingClick.timestamp);
    return isExistingClickIsEarly ? existingClick : incomingClick
  }
  return existingClick.amount > incomingClick.amount ? existingClick : incomingClick;
}

const getSubsetClicks = (clicks) => {
  if( clicks && clicks?.length === 0) return [];

  const ipCounter = new Map();
  const hashedClicksForEachIpAndTimePeriod = new Map();

  clicks.forEach( click => {
    updateIpCounter(ipCounter, click);
    const timePeriodOfClick =  getTimePeriod(click.timestamp);
    const hashCode = timePeriodOfClick + click.ip;
    const selectedClick  = getSelectedClickForTimePeriod(hashedClicksForEachIpAndTimePeriod.get(hashCode), click);
    hashedClicksForEachIpAndTimePeriod.set(hashCode, selectedClick);
  });

  const ipsClickedMoreThanPermissibleLimit = Array.from(ipCounter.values())
                                      .filter(({counter}) => counter >= permissibleLimit)
                                      .map(({ ip }) => ip);

  const subSetClicks = Array.from(hashedClicksForEachIpAndTimePeriod.values())
                            .filter( ({ ip }) => !ipsClickedMoreThanPermissibleLimit.includes(ip) ) 

  fs.writeFile(resultFilePath, JSON.stringify(subSetClicks, null, "\t"),
   (err) => { if (err) throw err; });

  return subSetClicks;
}

module.exports = {
  getSubsetClicks,
} 
