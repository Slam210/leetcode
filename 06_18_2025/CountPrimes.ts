/*

The intuition behind this is to use a Sieve of Eratosthenes so that
instead of checking each number one-by-one, we use a sieve. This allows
us to mark all numbers as potential primes and then eliminate multiples of every found prime.

*/

function countPrimes(n: number): number {
  if (n <= 2) return 0;

  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.reduce((count, val) => count + (val ? 1 : 0), 0);
}

console.log(countPrimes(10));

/*

Run time is O(n log(log(n)))
Space complexity is O(n)

*/
