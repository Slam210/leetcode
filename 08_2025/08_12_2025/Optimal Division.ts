/**
 *
 * We want to arrange parentheses in the division expression nums[0]/nums[1]/nums[2]/.../nums[n-1]
 * such that the resulting value is maximized. Division is left-associative by default, but we can
 * change the order by adding parentheses. The key observation is that to maximize the value, we
 * should make the denominator as small as possible. Since division decreases the result, we group
 * all numbers from nums[1] to nums[n-1] into a single denominator by placing them inside one set of
 * parentheses: nums[0]/(nums[1]/nums[2]/.../nums[n-1]). This ensures nums[1] is divided by nums[2],
 * nums[3], etc., which makes the denominator smaller and thus the overall value larger.
 * If the array length is 1, just return nums[0] as a string. If length is 2, return "a/b" without
 * parentheses because they aren't needed. For length > 2, wrap nums[1:] in parentheses exactly once.
 *
 */

function optimalDivision(nums: number[]): string {
  const n = nums.length;

  if (n === 1) {
    return nums[0].toString();
  }

  if (n === 2) {
    return `${nums[0]}/${nums[1]}`;
  }

  return `${nums[0]}/(${nums.slice(1).join("/")})`;
}

/**
 *
 * Time complexity is O(n) where n is the length of nums
 * Space complexity is O(n) for building the output string
 *
 */
