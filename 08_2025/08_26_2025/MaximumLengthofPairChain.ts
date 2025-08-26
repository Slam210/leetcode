/**
 *
 * We are tasked with finding the longest chain of pairs where one pair can follow another only if the right value of the first
 * is less than the left value of the next. To solve this effectively, we should think in terms of maximizing opportunities for
 * future selections. By sorting pairs based on their ending values, we can greedily select the earliest finishing pair that can
 * still follow the current one. This approach guarantees we extend the chain as much as possible, similar to interval scheduling problems.
 *
 */

function findLongestChain(pairs: number[][]): number {
  pairs.sort((a, b) => a[1] - b[1]);
  let currentEnd = -Infinity;
  let count = 0;

  for (const [left, right] of pairs) {
    if (left > currentEnd) {
      count++;
      currentEnd = right;
    }
  }

  return count;
}

function main() {
  const pairs1 = [
    [1, 2],
    [2, 3],
    [3, 4],
  ];
  const pairs2 = [
    [1, 2],
    [7, 8],
    [4, 5],
  ];
  const pairs3 = [
    [1, 10],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
  ];

  console.log(findLongestChain(pairs1));
  console.log(findLongestChain(pairs2));
  console.log(findLongestChain(pairs3));
}

main();

/**
 *
 * Time complexity is O(n log(n)) for sorting
 * Space complexity is O(1)
 *
 */
