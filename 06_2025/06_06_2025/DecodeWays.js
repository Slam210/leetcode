/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[n] = 1;

  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === "0") {
      dp[i] = 0;
    } else {
      dp[i] = dp[i + 1];
      if (i + 1 < n) {
        const twoDigit = parseInt(s.slice(i, i + 2), 10);
        if (twoDigit >= 10 && twoDigit <= 26) {
          dp[i] += dp[i + 2];
        }
      }
    }
  }

  return dp[0];
};
