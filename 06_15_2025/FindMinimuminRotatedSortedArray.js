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
    } else {
      right = mid;
    }
  }

  return nums[left];
};

console.log(findMin([4, 5, 6, 7, 0, 1, 2]));

/*

Run time is O(logn) since we are using binary search
Space time is O(1) since we are using pointers

*/
