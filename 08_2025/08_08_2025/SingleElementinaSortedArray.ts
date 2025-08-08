/**
 *
 * In a sorted array where every element appears twice except one, the pairs occur in order until the single
 * element disrupts this pattern. Before the single element, each pair starts at an even index; after it, pairs
 * start at odd indices. We can use binary search to locate the point where this parity pattern changes, the
 * single element will be the first index where the pairing rule breaks.
 *
 */

function singleNonDuplicate(nums: number[]): number {
  let low = 0,
    high = nums.length - 1;

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (mid % 2 === 1) mid--;

    if (nums[mid] === nums[mid + 1]) {
      low = mid + 2;
    } else {
      high = mid;
    }
  }

  return nums[low];
}

console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8]));
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11]));

/**
 *
 * Time complexity is O(log(n))
 * Space complexity is O(n)
 *
 */
