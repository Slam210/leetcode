/**
 *
 * Given an integer array nums, return the longest strictly increasing subsequence.
 * The intuition behind this problem is to use a binary search with sorting. When we
 * encounter an element that isn't greater than the final element, we perform the search
 * to find the index to replace.
 *
 */

function binarySearch(sub: number[], target: number): number {
  let left = 0,
    right = sub.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (sub[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

function lengthOfLIS(nums: number[]): number {
  const sub: number[] = [];

  for (const num of nums) {
    if (sub.length === 0 || num > sub[sub.length - 1]) {
      sub.push(num);
    } else {
      const i = binarySearch(sub, num);
      sub[i] = num;
    }
  }

  return sub.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
