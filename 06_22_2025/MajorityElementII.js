/*

We are looking for elements that appear more than ⌊n/3⌋ times. 
That means that there can be at most 2 such elements because 3 * k > n → k <= 2
So, the idea is to find up to two potential candidates, verify 
that these candidates actually occur more than ⌊n/3⌋ times, 
This is an extension of Boyer-Moore Majority Vote Algorithm 
which is originally for > n/2. Here, we generalize it for > n/3.

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  let candidate1 = null,
    candidate2 = null;
  let count1 = 0,
    count2 = 0;

  for (const num of nums) {
    if (candidate1 === num) {
      count1++;
    } else if (candidate2 === num) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  count1 = 0;
  count2 = 0;
  for (const num of nums) {
    if (num === candidate1) count1++;
    else if (num === candidate2) count2++;
  }

  const result = [];
  const threshold = Math.floor(nums.length / 3);
  if (count1 > threshold) result.push(candidate1);
  if (count2 > threshold) result.push(candidate2);

  return result;
};

console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([1, 1, 1, 3, 3, 2, 2, 2]));

/*

Time complexity is O(n)
Space complexity is O(1)

*/
