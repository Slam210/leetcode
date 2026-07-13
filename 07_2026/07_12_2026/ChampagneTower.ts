/*
 * @lc app=leetcode id=797 lang=typescript
 *
 * [797] All Paths From Source to Target
 */
// @lc code=start
function champagneTower(poured: number, queryRow: number, queryGlass: number): number {
  const dp: number[][] = Array.from(
    { length: 101 },
    () => Array(101).fill(0)
  )

  dp[0][0] = poured;

  for (let row = 0; row < 100; row++) {
    for (let glass = 0; glass <= row; glass++) {
      const overflow = Math.max(0, dp[row][glass] - 1);

      if (overflow > 0) {
        dp[row + 1][glass] += overflow / 2;
        dp[row + 1][glass + 1] += overflow / 2;
      }
    }
  }

  return Math.min(1, dp[queryRow][queryGlass])
}
// @lc code=end
