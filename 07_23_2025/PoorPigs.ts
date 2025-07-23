/**
 *
 * We are given buckets, which is the total number of buckets, one of which is poisonous, minutesToDie
 * which is the minutes it takes after drinking for a pig to die and minutesToTest which is the total
 * minutes we have to test. We must determine the minimum number of pigs required to figure out exactly
 * which bucket is poisonous within the allowed time.  Each pig can be used multiple times based on the
 * number of test rounds available (minutesToTest / minutesToDie). In each round, a pig either dies or
 * survives, and across all rounds, a single pig can encode multiple outcomes. This gives each pig T + 1
 * distinct states (where T is the number of rounds). With p pigs, we can distinguish (T + 1)^p combinations
 * as we can think of each pig as a digit in a base-T + 1 number system. We need to find the smallest number
 * of pigs p such that these combinations can uniquely identify all buckets.
 *
 */

function poorPigs(
  buckets: number,
  minutesToDie: number,
  minutesToTest: number
): number {
  // Calculate how many full tests we can run
  const rounds = Math.floor(minutesToTest / minutesToDie);

  let pigs = 0;

  // Each pig can have (rounds + 1) different states:
  // - Dies in round 1, 2, ..., or survives all rounds.
  // With p pigs, we can distinguish (rounds + 1)^p buckets.
  // We loop until we can cover all buckets.
  while (Math.pow(rounds + 1, pigs) < buckets) {
    pigs++;
  }

  return pigs;
}

function main() {
  const testCases = [
    { buckets: 1000, minutesToDie: 15, minutesToTest: 60, expected: 5 },
    { buckets: 4, minutesToDie: 15, minutesToTest: 15, expected: 2 },
    { buckets: 1, minutesToDie: 1, minutesToTest: 1, expected: 0 },
    { buckets: 100, minutesToDie: 15, minutesToTest: 30, expected: 5 },
    { buckets: 25, minutesToDie: 5, minutesToTest: 30, expected: 2 },
  ];

  for (const { buckets, minutesToDie, minutesToTest, expected } of testCases) {
    const result = poorPigs(buckets, minutesToDie, minutesToTest);
    console.log(
      `buckets = ${buckets}, die = ${minutesToDie}, test = ${minutesToTest} → Output: ${result} | Expected: ${expected}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(logBuckets)
 * Space complexity is O(1)
 *
 */
