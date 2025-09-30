/**
 *
 * We want to check if all global inversions are local inversions in a permutation.
 * By definition, local inversions are a subset of global inversions. Therefore, we
 * only need to ensure there is no global inversion that spans more than one index apart.
 * Iterating through the array and keeping track of the maximum value seen so far, we can
 * detect if any element violates the condition, ensuring that all global inversions are local.
 *
 */

function isIdealPermutation(nums: number[]): boolean {
  let maxVal = nums[0];

  for (let i = 0; i < nums.length - 2; i++) {
    maxVal = Math.max(maxVal, nums[i]);
    if (maxVal > nums[i + 2]) return false;
  }

  return true;
}

function main() {
  console.log(isIdealPermutation([1, 0, 2]));
  console.log(isIdealPermutation([1, 2, 0]));
  console.log(isIdealPermutation([0, 2, 1]));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
