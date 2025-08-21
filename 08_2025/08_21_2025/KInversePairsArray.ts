/**
 *
 * We want the number of permutations of numbers from 1..n that produce exactly k inverse pairs. The trick is to
 * realize we can build solutions by adding the largest number n to permutations of size n-1. Each possible insertion
 * of n contributes a specific number of new inverse pairs, so the count for (n, k) becomes the sum of several
 * subproblems (n-1, x).
 *
 */

function kInversePairs(n: number, k: number): number {
  const MOD = 1e9 + 7;

  // dp[i][j] = number of arrays with i numbers and exactly j inverse pairs
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(k + 1).fill(0)
  );

  // empty array has 0 inverses
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    // only sorted order has 0 inverses
    dp[i][0] = 1;
    for (let j = 1; j <= k; j++) {
      // recurrence with prefix-sum
      dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % MOD;
      if (j >= i) {
        dp[i][j] = (dp[i][j] - dp[i - 1][j - i] + MOD) % MOD;
      }
    }
  }

  return dp[n][k];
}

function main() {
  console.log(kInversePairs(3, 0));
  console.log(kInversePairs(3, 1));
  console.log(kInversePairs(1000, 1000));
}

main();

/**
 *
 * Time complexity is O(n * k)
 * Space complexity is O(n * k)
 *
 */
