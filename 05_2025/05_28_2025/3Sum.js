/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];

  // Sort the array
  nums.sort((a, b) => a - b);

  // Iterate through the array
  for (let i = 0; i < nums.length - 2; i++) {
    // Step 4a: Skip duplicate base values
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    // Two-pointer search
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);

        // Skip duplicate left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
};

const nums = [-1, 0, 1, 2, -1, -4];
const result = threeSum(nums);
console.log(result);
