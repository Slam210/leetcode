/**
 *
 * We want to determine how many valid flower lane pairs allow Alice to guarantee victory. Since each turn
 * removes one flower, the total number of moves equals the sum of flowers in both lanes. Alice starts, so
 * if this sum is odd, she will make the last move and win. If the sum is even, Bob wins instead. Thus, our
 * problem reduces to counting how many (x, y) pairs within the given ranges [1, n] and [1, m] result in an odd total.
 *
 */

function countOddEven(limit: number): [number, number] {
  const odd = Math.floor((limit + 1) / 2);
  const even = Math.floor(limit / 2);
  return [odd, even];
}

function flowerGame(n: number, m: number): number {
  const [oddN, evenN] = countOddEven(n);
  const [oddM, evenM] = countOddEven(m);
  return oddN * evenM + evenN * oddM;
}

function main() {
  console.log(flowerGame(3, 4));
  console.log(flowerGame(2, 2));
  console.log(flowerGame(5, 5));
}

main();

/**
 *
 * Time complexity is O(1)
 * Space complexity is O(1)
 *
 */
