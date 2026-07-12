/*
 * @lc app=leetcode id=1331 lang=typescript
 *
 * [1331] Rank Transform of an Array
 */

// @lc code=start
function arrayRankTransform(arr: number[]): number[] {
  // Remove duplicates
  const unique = [...new Set(arr)];

  // Sort the unique elements
  unique.sort((a, b) => a - b);

  // Create a rank map
  const rankMap = new Map<number, number>();

  // Populate the rank map
  unique.forEach((num, index) => rankMap.set(num, index + 1));

  // Transform the original array using the rank map
  return arr.map(num => rankMap.get(num)!);
};
// @lc code=end
