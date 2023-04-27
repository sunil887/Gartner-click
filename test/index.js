const assert = require('assert');
const { getSubsetClicks }  = require('../src/clickCalculation')
const { compareTime } = require('../src/utils')

describe( "Checking correctness", () => {
    
  it("getSubsetClick returning correct number of subset on different dates", () => {
    const clicks = [
      { "ip": "22.22.22.22", "timestamp": "3/11/2020 02:02:58", "amount": 7.0 },
      { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:12:32", "amount": 6.5 },
      { "ip": "11.11.11.11", "timestamp": "3/12/2020 02:12:32", "amount": 6.5 }
    ];

    const receivedSubsetClick = getSubsetClicks(clicks);
    assert.equal(receivedSubsetClick.length === 3, true)

  });

  it("compareTime function returning correct time comparision" , () => {
    const isEarlier = compareTime("3/11/2020 02:02:58", "3/11/2020 02:12:32");
    assert.equal(isEarlier, true)
  });

  
});