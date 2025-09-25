function countPrimeSetBits(left: number, right: number): number {
  const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);

  function countBits(n: number): number {
    let count = 0;
    while (n > 0) {
      n &= n - 1;
      count++;
    }
    return count;
  }

  let result = 0;
  for (let i = left; i <= right; i++) {
    let bits = countBits(i);
    if (primes.has(bits)) result++;
  }
  return result;
}

function main() {
  console.log(countPrimeSetBits(6, 10));
  console.log(countPrimeSetBits(10, 15));
}

main();
