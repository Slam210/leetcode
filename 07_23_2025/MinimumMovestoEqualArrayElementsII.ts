/**
 *
 * We're given an array nums[] of integers. In one move, we can increment or decrement an element
 * by 1. We need to compute the minimum number of such moves to make all elements equal. To minimize
 * the total number of moves we want to choose a target value such that the sum of absolute differences
 * to that target is minimized. This is a classic statistical optimization problem as the median
 * minimizes the sum of absolute deviations.
 *
 */

function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  const median = nums[mid];

  let totalMoves = 0;
  for (const num of nums) {
    totalMoves += Math.abs(num - median);
  }

  return totalMoves;
}

function main() {
  const testCases = [
    { nums: [1, 2, 3], expected: 2 },
    { nums: [1, 10, 2, 9], expected: 16 },
    { nums: [1, 0, 0, 8, 6], expected: 14 },
    { nums: [1], expected: 0 },
    { nums: [1, 1, 1, 1000], expected: 999 },
  ];

  for (const { nums, expected } of testCases) {
    const result = minMoves2([...nums]);
    console.log(
      `nums = [${nums.join(", ")}] → Output: ${result} | Expected: ${expected}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n log(n))
 * Space complexity is O(1) unless the sort requires additional memory
 *
 */
