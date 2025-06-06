/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let i = 0;

  for (let n of nums) {
    if (i < 2 || n > nums[i - 2]) {
      nums[i] = n;
      i++;
    }
  }
  return i;
};

console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));
