/*

We iterate through the array, and at each position, we track max and min product.
These are the maximum product ending at the current index and the minimum product
The reason we track min is in case of a negative number that becomes positive later.

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  if (!nums.length) return 0;

  let maxProd = nums[0];
  let minProd = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    let curr = nums[i];

    if (curr < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }

    maxProd = Math.max(curr, maxProd * curr);
    minProd = Math.min(curr, minProd * curr);

    result = Math.max(result, maxProd);
  }

  return result;
};

/*

Run time is O(n)
Space time is O(1)

*/
