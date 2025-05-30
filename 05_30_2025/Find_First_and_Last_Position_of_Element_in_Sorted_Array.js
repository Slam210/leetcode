/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // Helper: Find first occurrence
  function findFirst(nums, target) {
    let left = 0,
      right = nums.length - 1,
      index = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        index = mid;
        // keep searching left
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return index;
  }

  // Helper: Find last occurrence
  function findLast(nums, target) {
    let left = 0,
      right = nums.length - 1,
      index = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        index = mid;
        // keep searching right
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return index;
  }

  return [findFirst(nums, target), findLast(nums, target)];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
