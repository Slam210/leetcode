/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minimizeMax = function (nums, p) {
  nums.sort((a, b) => a - b);

  const canFormPairs = (maxDiff) => {
    let count = 0;
    let i = 0;
    while (i < nums.length - 1) {
      if (nums[i + 1] - nums[i] <= maxDiff) {
        count++;
        i += 2;
      } else {
        i += 1;
      }
    }
    return count >= p;
  };

  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canFormPairs(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

console.log(minimizeMax([10, 1, 2, 7, 1, 3], 2));
