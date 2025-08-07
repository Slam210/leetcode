/**
 *
 * We're given an integer array nums and an integer k, and we need to return the number of unique k-diff pairs
 * (nums[i], nums[j]) where i ≠ j and |nums[i] - nums[j]| == k. A key constraint is that only unique pairs
 * count — meaning we shouldn’t count duplicates like (3, 1) and (1, 3) separately if they both equal a k-difference
 * of 2. The intuition is to use a hash map to track frequencies of elements. For k > 0, for each unique number x, we
 * check if x + k exists. For k === 0, we look for elements with frequency ≥ 2 (since we're looking for pairs with zero
 * difference). This allows us to efficiently count valid pairs without generating all combinations.
 *
 */

function findPairs(nums: number[], k: number): number {
  if (k < 0) return 0;

  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  let count = 0;

  for (const [num, freq] of map.entries()) {
    if (k === 0) {
      if (freq >= 2) count++;
    } else {
      if (map.has(num + k)) count++;
    }
  }

  return count;
}

function main() {
  const nums = [3, 1, 4, 1, 5];
  const k = 2;
  const result = findPairs(nums, k);
  console.log(`Number of unique ${k}-diff pairs:`, result);

  const nums2 = [1, 2, 3, 4, 5];
  const k2 = 1;
  console.log(`Number of unique ${k2}-diff pairs:`, findPairs(nums2, k2));

  const nums3 = [1, 3, 1, 5, 4];
  const k3 = 0;
  console.log(`Number of unique ${k3}-diff pairs:`, findPairs(nums3, k3));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
