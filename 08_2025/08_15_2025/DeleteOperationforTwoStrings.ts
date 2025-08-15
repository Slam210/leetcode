/**
 *
 * We want the smallest number of deletions to make two strings identical. The optimal strategy is to keep only the
 * longest common subsequence (LCS) between the two strings and delete all other characters. The LCS length can be
 * found using dynamic programming. Once we have the LCS length, the number of deletions needed is the sum of the
 * characters in both strings that are not part of the LCS:
 * (word1.length - LCS) + (word2.length - LCS).
 *
 */

function minDistance(word1: string, word2: string): number {
  const m = word1.length,
    n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs = dp[m][n];
  return m - lcs + (n - lcs);
}

function main() {
  console.log(minDistance("sea", "eat"));
  console.log(minDistance("leetcode", "etco"));
}

main();

/**
 *
 * Time complexity is O(m * n), where m and n are the lengths of the two strings.
 * Space complexity is O(m * n) due to the DP table.
 *
 */
