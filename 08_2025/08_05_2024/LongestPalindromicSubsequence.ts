/**
 *
 * Given a string s, we are to find the length of the longest subsequence (not necessarily contiguous)
 * that forms a palindrome. A subsequence can be formed by deleting zero or more characters while
 * maintaining the order of the remaining characters. This is a classic Dynamic Programming (DP) problem.
 * A palindrome reads the same forward and backward. If characters at the two ends of a substring match,
 * they can be part of a palindromic subsequence.
 *
 */

function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  for (let cl = 2; cl <= n; cl++) {
    for (let i = 0; i <= n - cl; i++) {
      const j = i + cl - 1;
      if (s[i] === s[j]) {
        dp[i][j] = cl === 2 ? 2 : 2 + dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}

function main() {
  const s = "bbbab";
  const result = longestPalindromeSubseq(s);
  console.log(`Longest Palindromic Subsequence length: ${result}`);
}

main();

/**
 *
 * Time Complexity is O(n^2)
 * Space complexity is O(n^2)
 *
 */
