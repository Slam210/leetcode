/**
 *
 * We are given a number n and must count all permutations of numbers 1 to n that satisfy a specific
 * condition: at each position i (1-indexed), either the number at that position is divisible by i,
 * or i is divisible by the number. This is a classic backtracking problem. The intuition is to explore
 * all valid permutations using backtracking, but prune branches where the current number doesn't
 * satisfy the beautiful condition for the current position. This significantly reduces the search space,
 * as we skip invalid permutations early, and count only the valid arrangements.
 *
 */

function countArrangement(n: number): number {
  let count = 0;
  const used: boolean[] = new Array(n + 1).fill(false);

  function backtrack(pos: number) {
    if (pos > n) {
      count++;
      return;
    }

    for (let num = 1; num <= n; num++) {
      if (!used[num] && (num % pos === 0 || pos % num === 0)) {
        used[num] = true;
        backtrack(pos + 1);
        used[num] = false;
      }
    }
  }

  backtrack(1);
  return count;
}

function main() {
  const n = 3;
  const result = countArrangement(n);
  console.log(`Number of beautiful arrangements for n = ${n}:`, result);
}

main();

/**
 *
 * Time complexity is O(n!)
 * Space complexity is O(n)
 *
 */
