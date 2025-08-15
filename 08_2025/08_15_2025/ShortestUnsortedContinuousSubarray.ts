/**
 *
 * We want the smallest subarray that, if sorted, makes the whole array sorted. We first detect the initial disorder from the
 * left and from the right. Then we find the minimum and maximum within this segment. If numbers outside the segment are greater
 * than the min or smaller than the max, we expand the boundaries accordingly. The length of this adjusted segment is the answer.
 * If the array is already sorted, we return 0.
 *
 */

function findUnsortedSubarray(nums: number[]): number {
  let left = 0;
  while (left < nums.length - 1 && nums[left] <= nums[left + 1]) {
    left++;
  }
  if (left === nums.length - 1) return 0;

  let right = nums.length - 1;
  while (right > 0 && nums[right] >= nums[right - 1]) {
    right--;
  }

  let minInWindow = Infinity,
    maxInWindow = -Infinity;
  for (let i = left; i <= right; i++) {
    minInWindow = Math.min(minInWindow, nums[i]);
    maxInWindow = Math.max(maxInWindow, nums[i]);
  }

  while (left > 0 && nums[left - 1] > minInWindow) {
    left--;
  }
  while (right < nums.length - 1 && nums[right + 1] < maxInWindow) {
    right++;
  }

  return right - left + 1;
}
function main() {
  console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));
  console.log(findUnsortedSubarray([1, 2, 3, 4]));
  console.log(findUnsortedSubarray([1]));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
