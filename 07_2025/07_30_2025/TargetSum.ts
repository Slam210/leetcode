/**
 *
 * We're given an integer array nums and an integer target. The goal is to add either '+' or '-' before
 * each number in nums, such that the resulting arithmetic expression evaluates to target. Return how
 * many such expressions are possible. This is a classic recursive / dynamic programming problem. At
 * each number in the array, we can either add it to your current sum or subtract it from your current
 * sum. This naturally lends itself to a recursive backtracking approach. To optimize, we use memoization
 * to avoid re-computation of overlapping subproblems.
 *
 */

function findTargetSumWays(nums: number[], target: number): number {
  const memo = new Map<string, number>();

  function dp(index: number, currentSum: number): number {
    const key = `${index},${currentSum}`;
    if (memo.has(key)) return memo.get(key)!;

    if (index === nums.length) {
      return currentSum === target ? 1 : 0;
    }

    const add = dp(index + 1, currentSum + nums[index]);
    const subtract = dp(index + 1, currentSum - nums[index]);

    memo.set(key, add + subtract);
    return add + subtract;
  }

  return dp(0, 0);
}

function main() {
  const testCases: { nums: number[]; target: number }[] = [
    { nums: [1, 1, 1, 1, 1], target: 3 },
    { nums: [1], target: 1 },
    { nums: [2, 1], target: 1 },
    { nums: [0, 0, 0, 0, 0], target: 0 },
  ];

  for (const { nums, target } of testCases) {
    const result = findTargetSumWays(nums, target);
    console.log(
      `nums = [${nums.join(", ")}], target = ${target} → Ways: ${result}`
    );
  }
}

main();

/**
 *
 * Time complexity is O(n * t)
 * Space complexity is O(n * t)
 *
 */
