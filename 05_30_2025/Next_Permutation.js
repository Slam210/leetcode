/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 2;

  // Find first decreasing element from the end
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // Find the next greater element to swap with
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Swap nums[i] and nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // Reverse the elements after index i
  let left = i + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
};

console.log(nextPermutation([1, 2, 3]));
