/**
 *
 * We want the minimum number of turns for the printer, which can only print one character repeatedly in a single turn.
 * This is solved with interval DP where we let dp[i][j] represent the minimum turns needed to print substring s[i..j].
 * A single character takes 1 turn. For a longer substring, the default is dp[i][j-1] + 1 (print everything up to j-1,
 * then print s[j] separately). However, if some earlier character s[k] matches s[j], then s[j] can be merged into that
 * same printing turn, reducing turns. Thus, the key recurrence is dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j-1])
 * when s[k] == s[j].
 *
 */

function strangePrinter(s: string): number {
  const n = s.length;
  if (n === 0) return 0;

  // dp[i][j] = minimum turns to print substring s[i..j]
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // a single character needs exactly 1 turn
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // Process substrings of increasing length
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;

      // print s[i..j-1], then print s[j] separately
      dp[i][j] = dp[i][j - 1] + 1;

      // if s[k] == s[j], merge printing of s[j] into s[k]'s turn
      for (let k = i; k < j; k++) {
        if (s[k] === s[j]) {
          dp[i][j] = Math.min(
            dp[i][j],
            dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0)
          );
        }
      }
    }
  }

  // Answer: minimum turns to print the entire string
  return dp[0][n - 1];
}

function main() {
  const tests = ["aaabbb", "aba", "abcabc", "aaaa"];
  for (const t of tests) {
    console.log(`Input: "${t}" -> Minimum Turns: ${strangePrinter(t)}`);
  }
}

main();

/**
 *
 * Run time is O(n^3)
 * Space time is O(n^2)
 *
 */
