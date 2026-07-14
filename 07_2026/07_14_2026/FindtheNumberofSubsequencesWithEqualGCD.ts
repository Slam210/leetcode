/*
 * @lc app=leetcode id=3336 lang=typescript
 *
 * [3336] Find the Number of Subsequences With Equal GCD
 */
// @lc code=start
function subsequencePairCount(nums: number[]): number {
  const MOD = 1_000_000_007;
  const MAX = 200;

  const gcdTable: number[][] = Array.from({ length: MAX + 1 }, () =>
    new Array(MAX + 1).fill(0),
  );

  function gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  }

  for (let g = 0; g <= MAX; g++) {
    for (let x = 1; x <= MAX; x++) {
      gcdTable[g][x] = g === 0 ? x : gcd(g, x);
    }
  }

  let dp: number[][] = Array.from({ length: MAX + 1 }, () =>
    new Array(MAX + 1).fill(0),
  );

  dp[0][0] = 1;

  for (const x of nums) {
    const next: number[][] = Array.from({ length: MAX + 1 }, () =>
      new Array(MAX + 1).fill(0),
    );

    for (let g1 = 0; g1 <= MAX; g1++) {
      for (let g2 = 0; g2 <= MAX; g2++) {
        const ways = dp[g1][g2];

        if (ways === 0) continue;

        next[g1][g2] = (next[g1][g2] + ways) % MOD;

        const ng1 = gcdTable[g1][x];
        next[ng1][g2] = (next[ng1][g2] + ways) % MOD;

        const ng2 = gcdTable[g2][x];
        next[g1][ng2] = (next[g1][ng2] + ways) % MOD;
      }
    }

    dp = next;
  }

  let answer = 0;

  for (let g = 1; g <= MAX; g++) {
    answer = (answer + dp[g][g]) % MOD;
  }

  return answer;
}
// @lc code=end