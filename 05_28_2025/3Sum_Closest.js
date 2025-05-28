/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  // Sort the array
  nums.sort((a, b) => a - b);

  // Initialize the closest sum
  let closestSum = nums[0] + nums[1] + nums[2];

  // Loop through each base index
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    // Two-pointer search
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      // Update if this sum is closer to the target
      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }

      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        // Exact match
        return sum;
      }
    }
  }

  return closestSum;
};

const nums = [-1, 2, 1, -4];
const result = threeSumClosest(nums, 1);
console.log(result);
