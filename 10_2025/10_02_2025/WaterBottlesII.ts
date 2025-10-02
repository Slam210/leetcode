/**
 *
 * We start by drinking all the full bottles we have because drinking always increases empties and never hurts our ability to exchange later.
 * After drinking we use empties to do one exchange at a time for the current numExchange requirement where each exchange gives one full bottle
 * and raises numExchange by one, so if we still have enough empties we can repeat. By alternating drinking and performing single exchanges
 * until no more exchanges are possible, we maximize the total bottles drunk.
 *
 */

export default function maxBottlesDrunk(
  numBottles: number,
  numExchange: number
): number {
  if (numBottles <= 0) return 0;
  if (numExchange <= 0) {
    return numBottles;
  }

  let total = 0;
  let full = numBottles;
  let empty = 0;
  let k = numExchange;

  while (full > 0 || empty >= k) {
    if (full > 0) {
      total += full;
      empty += full;
      full = 0;
    } else {
      empty -= k;
      full += 1;
      k += 1;
    }
  }

  return total;
}

function main(): void {
  const cases = [
    { numBottles: 3, numExchange: 1 },
    { numBottles: 9, numExchange: 3 },
    { numBottles: 5, numExchange: 5 },
    { numBottles: 0, numExchange: 3 },
    { numBottles: 100, numExchange: 1 },
  ];

  for (const c of cases) {
    const ans = maxBottlesDrunk(c.numBottles, c.numExchange);
    console.log(
      `numBottles=${c.numBottles}, numExchange=${c.numExchange} -> ${ans}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
