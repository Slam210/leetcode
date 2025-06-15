/*

The intuition behind this problme is to use a binary search, yet we 
adjust it to handle duplicates by moving more than one space left or right
if it is a duplicate

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      right--;
    }
  }

  return nums[left];
};

console.log(findMin([4, 5, 6, 7, 0, 1, 4]));

/*

Run time is O(log n) since we are doing binary search though worse case is O(n)
Space complexity is O(1)

*/
