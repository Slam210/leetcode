/**
 *
 * We want to count the number of ways to decode a string with digits and * wildcards, where each character may stand
 * alone or pair with its neighbor. To solve this, we apply dynamic programming: at each step, the number of decodings
 * depends on single-character decodings and two-character decodings from the previous step. Handling the * carefully is
 * crucial since it introduces multiple decoding possibilities depending on context. By iterating through the string and
 * applying these rules with modular arithmetic, we compute the total number of decodings efficiently.
 *
 */

function numDecodings(s: string): number {
  const mod = 1_000_000_007;

  // Count single-character decoding possibilities
  function singleWays(ch: string): number {
    if (ch === "*") return 9;
    if (ch === "0") return 0;
    return 1;
  }

  // Count two-character decoding possibilities
  function pairWays(c1: string, c2: string): number {
    // '**' → 11–19, 21–26
    if (c1 === "*" && c2 === "*") return 15;
    if (c1 === "*") {
      // '*d' where d ≤ 6 → '1d' or '2d'
      if (c2 >= "0" && c2 <= "6") return 2;
      return 1;
    }
    if (c2 === "*") {
      // '1*' → 11–19
      if (c1 === "1") return 9;
      // '2*' → 21–26
      if (c1 === "2") return 6;
      return 0;
    }
    const num = parseInt(c1 + c2);
    return num >= 10 && num <= 26 ? 1 : 0;
  }

  // empty string has no decodings
  let n = s.length;
  if (n === 0) return 0;

  // dp0 = ways up to i-2, dp1 = ways up to i-1
  let dp0 = 1;
  // Initialize based on first character
  let dp1 = singleWays(s[0]);

  // Iterate through string, building solutions like Fibonacci
  for (let i = 1; i < n; i++) {
    let ways1 = singleWays(s[i]);
    let ways2 = pairWays(s[i - 1], s[i]);

    // Combine both paths (one step back and two steps back)
    let dp2 = (ways1 * dp1 + ways2 * dp0) % mod;

    // Move window forward
    dp0 = dp1;
    dp1 = dp2;
  }

  return dp1;
}

function main() {
  console.log(numDecodings("*"));
  console.log(numDecodings("1*"));
  console.log(numDecodings("2*"));
}
main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
