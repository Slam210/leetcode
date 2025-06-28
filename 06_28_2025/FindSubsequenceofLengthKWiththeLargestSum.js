/**
 *
 * Given a list of integers, num, and an integer k, return the max subsequence
 * that can be derived from nums with k elements. The intuition for this problem
 * is to sort the array using the values while maintaining the index. From there,
 * we can cut the elements so k elements remain, resort based on index, and return
 * the result.
 *
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSubsequence = function (nums, k) {
  const indexed = nums.map((num, idx) => ({ num, idx }));
  indexed.sort((a, b) => b.num - a.num);
  const topK = indexed.slice(0, k);
  topK.sort((a, b) => a.idx - b.idx);
  return topK.map((item) => item.num);
};

/**
 *
 * Run time is O(n)
 * Space complexity is O(n)
 *
 */
