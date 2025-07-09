/**
 * 
 * Given a positive integer n, if n is even → replace it with n / 2 or if n is odd → replace it 
 * with either n + 1 or n - 1. The goal is to find the minimum number of operations to 
 * reduce n to 1. The problem boils down to choosing the most optimal path when n is odd.
 * If n is even, always divide by 2. If n is odd, we must choose between n - 1 and n + 1.
 * For odd numbers, n + 1 may lead to more trailing 0s in binary. Therefore we always add
 * 1 with the exception being 4 when we can just turn it to 2.
 * 
 */

function integerReplacement(n: number): number {
  let count = 0;

  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else if (n === 3 || (n - 1) % 4 === 0) {
      n = n - 1;
    } else {
      n = n + 1;
    }
    count++;
  }

  return count;
}

/**
 * 
 * Run complexity is O(log(n))
 * Space complexity is O(1)
 * 
 */