/**
 *
 * We want to check if we can make an array non-decreasing by modifying at most one element.
 * A violation occurs when a number is greater than the one after it. If more than one violation
 * exists, we immediately return false. Otherwise, we can fix the issue by adjusting either the
 * left or right element of the violation, depending on the surrounding values. This way, we ensure
 * the overall sequence remains non-decreasing while making at most one modification.
 *
 */

function checkPossibility(nums: number[]): boolean {
  let count = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      count++;
      if (count > 1) return false;

      if (i === 0 || nums[i - 1] <= nums[i + 1]) {
        nums[i] = nums[i + 1];
      } else {
        nums[i + 1] = nums[i];
      }
    }
  }

  return true;
}

function main() {
  console.log(checkPossibility([4, 2, 3]));
  console.log(checkPossibility([4, 2, 1]));
  console.log(checkPossibility([3, 4, 2, 3]));
  console.log(checkPossibility([5, 7, 1, 8]));
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(1)
 *
 */
