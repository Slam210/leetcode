/**
 *
 * We are given a binary array nums and asked to find the maximum length of a contiguous subarray that
 * contains an equal number of 0s and 1s. To solve this efficiently, we can transform the problem: treat
 * every 0 as -1, so the problem becomes finding the longest subarray with a sum of 0. Using a prefix sum
 * and a hashmap, we keep track of the first index where each cumulative sum appears. If the same sum is
 * seen again at a later index, it means the subarray between those two indices has a net sum of 0.
 * We update the max length whenever we find such a pair.
 *
 */

function findMaxLength(nums: number[]): number {
  const map = new Map<number, number>();
  map.set(0, -1);

  let sum = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 0 ? -1 : 1;

    if (map.has(sum)) {
      maxLen = Math.max(maxLen, i - map.get(sum)!);
    } else {
      map.set(sum, i);
    }
  }

  return maxLen;
}

function main() {
  console.log(findMaxLength([0, 1]));
  console.log(findMaxLength([0, 1, 0]));
  console.log(findMaxLength([0, 1, 0, 1, 0, 1, 1]));
  console.log(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1]));
}

main();

/**
 *
 * Time complexity is O((n)
 * Space complexity is O(n)
 *
 */
