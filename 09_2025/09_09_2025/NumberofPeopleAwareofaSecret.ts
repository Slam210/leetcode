/**
 *
 * This problem is about dynamic programming with sliding contributions as each day, new people may learn the secret.
 * People may also forget the secret. We need to track how many new people learn the secret each day.
 *
 */

function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
  const MOD = 1_000_000_007;
  const dp = new Array(n + 1).fill(0);
  const prefix = new Array(n + 2).fill(0);

  dp[1] = 1;
  prefix[1] = 1;

  for (let day = 2; day <= n; day++) {
    const start = Math.max(0, day - forget);
    const end = Math.max(0, day - delay);

    dp[day] = (prefix[end] - prefix[start] + MOD) % MOD;
    prefix[day] = (prefix[day - 1] + dp[day]) % MOD;
  }

  let result = 0;
  for (let i = n - forget + 1; i <= n; i++) {
    if (i > 0) {
      result = (result + dp[i]) % MOD;
    }
  }
  return result;
}

/**
 *
 * Run time is O(n)
 * Space complexity is O(n)
 *
 */
