/**
 *
 * We want to count how many attendance records of length n have fewer than 2 'A's and never have 3
 * or more consecutive 'L's (lates). To do this efficiently, we first count how many valid strings
 * have zero 'A's with no 3 consecutive 'L's using DP. Then, for exactly one 'A', we place the 'A'
 * at each possible position and multiply the valid zero-'A' strings on either side. We use BigInt
 * arithmetic to handle large numbers modulo 1e9+7 safely.
 *
 */

const MOD = BigInt(1000000007);

function buildZeroA(n: number): bigint[] {
  // dp[i][j]: number of strings of length i ending with j consecutive 'L's (j = 0,1,2)
  const dp: bigint[][] = Array.from({ length: n + 1 }, () => [
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ]);

  // Base case: empty string of length 0 ends with 0 L's, count = 1
  dp[0][0] = BigInt(1);

  // Build dp from length 1 up to n
  for (let i = 1; i <= n; i++) {
    // Add 'P' to strings ending with any number of L's: resets L streak to 0
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MOD;

    // Add 'L' to strings that ended with 0 consecutive L: now ends with 1 L
    dp[i][1] = dp[i - 1][0];

    // Add 'L' to strings that ended with 1 consecutive L: now ends with 2 L's
    dp[i][2] = dp[i - 1][1];
  }

  // zeroA[i] = total number of valid zero-'A' strings of length i (sum of all endings)
  const zeroA = new Array(n + 1).fill(BigInt(0));
  for (let i = 0; i <= n; i++) {
    zeroA[i] = (dp[i][0] + dp[i][1] + dp[i][2]) % MOD;
  }

  // Return precomputed counts for all lengths up to n
  return zeroA;
}

function checkRecord(n: number): number {
  // Get counts of zero-'A' valid strings for all lengths up to n
  const zeroA = buildZeroA(n);

  // Start with strings with zero 'A's
  let total = zeroA[n];

  // Add strings with exactly one 'A' placed at every position
  for (let pos = 0; pos < n; pos++) {
    // Multiply number of zero-'A' strings on left and right sides of 'A'
    total = (total + ((zeroA[pos] * zeroA[n - 1 - pos]) % MOD)) % MOD;
  }

  // Convert BigInt result back to number for output
  return Number(total);
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
