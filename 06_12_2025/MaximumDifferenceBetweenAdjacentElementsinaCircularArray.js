/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAdjacentDistance = function (nums) {
  let maxDiff = 0;

  for (let i = 0; i < nums.length; i++) {
    let nextIndex = (i + 1) % nums.length;
    let diff = Math.abs(nums[i] - nums[nextIndex]);
    maxDiff = Math.max(maxDiff, diff);
  }

  return maxDiff;
};

console.log(maxAdjacentDistance([1, 3, 6, 2]));
