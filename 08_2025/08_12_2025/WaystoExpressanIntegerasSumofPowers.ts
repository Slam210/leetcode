/**
 *
 * We are given positive integers n and x. Count the number of ways to write n as a sum of unique
 * positive integers raised to the power x. Each allowed term in the sum is k^x for some integer
 * k >= 1 such that k^x <= n. This becomes a subset-sum counting problem: given the list
 * L = [1^x, 2^x, 3^x, ..., m^x], count how many subsets of L sum to n. Because each base can be
 * used at most once, this is exactly the standard counting subsets that sum to target problem. We
 * can solve it efficiently with dynamic programming.
 *
 */

const MOD = 1000000007;

function intPow(base: number, exp: number, limit: number): number {
  let res = 1;
  for (let i = 0; i < exp; i++) {
    res *= base;
    if (res > limit) return res;
  }
  return res;
}

function buildPowers(n: number, x: number): number[] {
  const powers: number[] = [];
  let base = 1;
  while (true) {
    const val = intPow(base, x, n);
    if (val > n) break;
    powers.push(val);
    base++;
  }
  return powers;
}

function numberOfWays(n: number, x: number): number {
  const powers = buildPowers(n, x);
  const dp = new Array<number>(n + 1).fill(0);
  dp[0] = 1;

  for (const val of powers) {
    for (let s = n; s >= val; s--) {
      dp[s] = (dp[s] + dp[s - val]) % MOD;
    }
  }

  return dp[n];
}

function main() {
  const tests = [
    { n: 10, x: 2, expected: 1 },
    { n: 4, x: 1, expected: 2 },
    {
      n: 160,
      x: 3,
      expectedNote:
        "example shows at least one valid decomposition (2^3+3^3+5^3)",
    },
  ];

  for (const t of tests) {
    const ways = numberOfWays(t.n, t.x);
    if (t.expected !== undefined) {
      console.log(
        `n=${t.n}, x=${t.x} => ways=${ways} (expected ${t.expected})`
      );
    } else {
      console.log(
        `n=${t.n}, x=${t.x} => ways=${ways} (${t.expectedNote ?? ""})`
      );
    }
  }
}
main();

/**
 *
 * Time complexity is O(m * n) and O(n^2) in the worst case
 * Space complexity is O(n)
 *
 */
