/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let totalTank = 0;
  let currTank = 0;
  let startIndex = 0;

  for (let i = 0; i < gas.length; i++) {
    let gain = gas[i] - cost[i];
    totalTank += gain;
    currTank += gain;

    if (currTank < 0) {
      startIndex = i + 1;
      currTank = 0;
    }
  }

  return totalTank >= 0 ? startIndex : -1;
};

gas = [1, 2, 3, 4, 5];
cost = [3, 4, 5, 1, 2];

console.log(canCompleteCircuit(gas, cost));
