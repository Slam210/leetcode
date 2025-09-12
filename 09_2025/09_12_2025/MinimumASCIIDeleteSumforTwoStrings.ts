/**
 *
 * We’re aligning the two strings by only deleting characters.
 * Each decision either skips a character in s1 or s2.
 * The DP ensures we explore all possible ways and minimize cost.
 *
 */

export default function minimumDeleteSum(s1: string, s2: string): number {
  const n = s1.length,
    m = s2.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0)
  );

  for (let i = n - 1; i >= 0; i--) {
    dp[i][m] = dp[i + 1][m] + s1.charCodeAt(i);
  }

  for (let j = m - 1; j >= 0; j--) {
    dp[n][j] = dp[n][j + 1] + s2.charCodeAt(j);
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (s1[i] === s2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.min(
          s1.charCodeAt(i) + dp[i + 1][j],
          s2.charCodeAt(j) + dp[i][j + 1]
        );
      }
    }
  }

  return dp[0][0];
}

function main(): void {
  console.log(minimumDeleteSum("sea", "eat"));
  console.log(minimumDeleteSum("delete", "leet"));
}

main();

/**
 *
 * Time complexity os O(n * m)
 * Space complexity is O(n * m)
 *
 */
