/**
 *
 * We want the minimum steps to get n 'A's starting from one. Instead of brute-forcing operations, we recognize that every efficient
 * build corresponds to splitting n into factors. Each time we multiply the current count by some factor d, it costs d operations.
 * Thus, the minimum steps are simply the sum of the prime factors of n. This reduces the problem to prime factorization instead of
 * simulating copy/paste sequences.
 *
 */

function minSteps(n: number): number {
  let steps = 0;
  let d = 2;

  while (n > 1) {
    while (n % d === 0) {
      steps += d;
      n = Math.floor(n / d);
    }
    d++;
  }

  return steps;
}

function main() {
  console.log(minSteps(1));
  console.log(minSteps(3));
  console.log(minSteps(9));
  console.log(minSteps(12));
}

main();

/**
 *
 * Time complexity is O(sqrt(n))
 * Space complexity is O(1)
 *
 */
