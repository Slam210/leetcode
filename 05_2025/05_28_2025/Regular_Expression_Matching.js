/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;

  // dp table initialized to false
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

  //Empty String matches empty patter
  dp[0][0] = true;

  // a*, a*b*, etc patterns when matching empty strings
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        // Zero occurrence
        dp[i][j] = dp[i][j - 2];
        // One or more occurrence
        if (p[j - 2] === s[i - 1] || p[j - 2] === ".") {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }

  return dp[m][n];
};

const result1 = isMatch("aab", "c*a*b"); // true
const result2 = isMatch("mississippi", "mis*is*p*."); // false
const result3 = isMatch("ab", ".*"); // true

console.log(result1, result2, result3);
