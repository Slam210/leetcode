/**
 *
 * We are tasked with reducing num1 to zero using operations of the form num1 - (2^i + num2).
 * To solve this, we think in terms of performing k operations. After k steps, the total
 * subtracted must equal num1. That subtraction consists of k * num2 plus a sum of k powers of two.
 * Therefore, for a solution to exist, the difference num1 - k * num2 must be non-negative, at least k,
 * and expressible using at most k powers of two. By systematically checking possible values of k, we can
 * identify the minimum number of operations or determine that it’s impossible.
 *
 */

function countBits(x: bigint): number {
  let count = 0;
  while (x !== 0n) {
    count++;
    x &= x - 1n;
  }
  return count;
}

function makeTheIntegerZero(num1: number, num2: number): number {
  let k = 1;
  while (true) {
    let x: bigint = BigInt(num1) - BigInt(num2) * BigInt(k);
    if (x < BigInt(k)) {
      return -1;
    }
    if (k >= countBits(x)) {
      return k;
    }
    k++;
  }
}

function main() {
  let num1 = 3,
    num2 = -2;
  console.log(makeTheIntegerZero(num1, num2));

  num1 = 5;
  num2 = 7;
  console.log(makeTheIntegerZero(num1, num2));
}

main();

/**
 *
 * Time complexity is O(log(num1))
 * Space complexity is O(1)
 *
 */
