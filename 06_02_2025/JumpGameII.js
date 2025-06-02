/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let jumps = 0;
  let farthest = 0;
  let end = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === end) {
      jumps++;
      end = farthest;
    }
  }

  return jumps;

  /*
  const n = nums.length;
  const dp = Array(n).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (j + nums[j] >= i) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }

  return dp[n - 1];
  */
};

console.log(jump([2, 3, 1, 1, 4]));
