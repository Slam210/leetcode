/**
 *
 * We need to count how many integers in [0, n] have binary representations without consecutive 1’s. This problem
 * relates to Fibonacci numbers. If we consider all binary strings of length k with no consecutive 1’s, the count
 * follows a Fibonacci sequence. If the first bit is 0, the rest k-1 bits can be any valid string of length k-1.
 * If the first bit is 1, the next must be 0, and the remaining k-2 bits can be any valid string of length k-2. So
 * dp[k] = dp[k-1] + dp[k-2], which is Fibonacci. But since we only need numbers up to n, we combine this Fibonacci
 * counting with a bitwise scan.
 *
 */

function findIntegers(n: number): number {
  const fib: number[] = Array(32).fill(0);
  fib[0] = 1;
  fib[1] = 2;
  for (let i = 2; i < 32; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  let ans = 0;
  let prevBit = 0;
  let k = 30;

  // Traverse each bit of n
  while (k >= 0) {
    // If current bit is 1
    if ((n & (1 << k)) !== 0) {
      // Add all valid numbers formed by setting this bit to 0
      // and freely choosing the remaining k bits
      ans += fib[k];

      // If previous bit was also 1, stop early
      if (prevBit === 1) {
        return ans;
      }
      prevBit = 1;
    } else {
      prevBit = 0;
    }
    k--;
  }

  return ans + 1;
}

function main() {
  console.log(findIntegers(5));
  console.log(findIntegers(1));
  console.log(findIntegers(2));
  console.log(findIntegers(8));
}

main();
