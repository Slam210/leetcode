/*
 * @lc app=leetcode id=798 lang=typescript
 *
 * [798] Smallest Rotation with Highest Score
 */
// @lc code=start
function bestRotation(nums: number[]): number {
  const n = nums.length;
  const diff = new Array<number>(n).fill(0);

  for (let i = 0; i < n; i++) {
    const start = (i - nums[i] + 1 + n) % n;
    const end = (i + 1) % n;

    diff[start]--;

    if (end > start) {
      diff[end]++;
    } else {
      diff[0]++;
      diff[end]++;
    }
  }

  let bestRotation = 0;
  let score = n + diff[0];
  let maxScore = score;

  for (let k = 1; k < n; k++){
    score += diff[k];

    if (score > maxScore) {
      maxScore = score;
      bestRotation = k;
    }
  }

  return bestRotation;
}
// @lc code=end
