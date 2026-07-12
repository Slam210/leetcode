/*
 * @lc app=leetcode id=795 lang=typescript
 *
 * [795] Number of Subarrays with Bounded Maximum
 */
// @lc code=start
function numSubarrayBoundedMax(nums: number[], left: number, right: number): number {
  function count(bound: number): number {
    let total = 0;
    let streak = 0;

    for (const num of nums) {
      if (num <= bound) {
        streak++;
      } else {
        streak = 0;
      }
      total += streak;
    }
    return total;
  }

  return count(right) - count(left - 1);
}
// @lc code=end
