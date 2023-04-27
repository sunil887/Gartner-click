const clicks = require('./data/clicks.json');

const { 
  getSubsetClicks
} = require('./src/clickCalculation')

getSubsetClicks(clicks);