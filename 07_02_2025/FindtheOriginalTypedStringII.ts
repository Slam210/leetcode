/**
 *
 * Alice types a string but sometimes holds keys too long, causing repeated characters in the final output.
 * Given this final typed string word and an integer k, determine how many possible original strings Alice
 * might have intended to type whose length is at least k. Each original character can be repeated one or more
 * times to produce the observed runs of repeated characters in word. Since the number of
 * possibilities can be very large, return the count modulo 10^9 + 7. The final string word can be viewed as a
 * sequence of runs of repeated characters. Each run corresponds to at least one original character,
 * but possibly more due to repetition. To find all possible original strings, we need to count how many ways
 * to partition each run’s length into one or more original characters. The problem reduces to counting combinations
 * of run-length partitions across the whole string, with the constraint that the total original string length is at
 * least k. The DP counts how many ways to distribute the repeated characters across runs to get original strings of
 * various lengths. Using prefix sums for transitions makes this fast, and in the end, you sum only those ways
 * where the original length meets the minimum length k.
 *
 */

function possibleStringCount(word: string, k: number): number {
  const mod = 1_000_000_007;
  const cnt: number[] = [];
  let total = 1;
  const n = word.length;
  let i = 0;

  // Run length compression and calculate total ways ignoring length limit
  while (i < n) {
    let j = i;
    while (i < n && word[i] === word[j]) i++;
    const len = i - j;
    if (len > 0) {
      // count extra repeats beyond minimum 1 per run
      cnt.push(len - 1);
      // total ways for this run
      total = (total * len) % mod;
    }
    // decrease k by 1 for each run because min length grows by runs count
    k--;
  }

  // If k <= 0, original string minimum length is already met
  if (k <= 0) return total;

  // DP array to count ways with total extra repeats up to k-1
  const dp = new Array(k).fill(0);
  dp[0] = 1;

  // For each run's extra repeats c, update dp with prefix sums
  for (const c of cnt) {
    // Prefix sum accumulation
    for (let i = 1; i < k; i++) {
      dp[i] = (dp[i] + dp[i - 1]) % mod;
    }
    // Subtract dp values to ensure we do not exceed c extra repeats for this run
    for (let i = k - 1; i > c; i--) {
      dp[i] = (dp[i] - dp[i - c - 1] + mod) % mod;
    }
  }

  // Final prefix sum accumulation
  for (let i = 1; i < k; i++) {
    dp[i] = (dp[i] + dp[i - 1]) % mod;
  }

  // Result = total ways - ways with original length less than k
  const result = (total - dp[k - 1] + mod) % mod;
  return result;
}

/**
 *
 * Time complexity is O(n * k)
 * Space complexity is O(n)
 *
 */
